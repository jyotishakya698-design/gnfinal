// ============================================================
// Enquiry storage — persists contact-form submissions to an
// Excel (.xlsx) workbook on the server.
//
// The workbook lives at <project-root>/data/enquiries.xlsx and
// is created automatically the first time a submission arrives.
// ============================================================

import fs from "node:fs";
import path from "node:path";
import ExcelJS from "exceljs";

const DATA_DIR = path.join(process.cwd(), "data");
const FILE_PATH = path.join(DATA_DIR, "enquiries.xlsx");
const SHEET_NAME = "Enquiries";

const COLUMNS = [
  { header: "S.No.", key: "sno", width: 8 },
  { header: "Date & Time", key: "submittedAt", width: 22 },
  { header: "Name", key: "name", width: 24 },
  { header: "Email", key: "email", width: 32 },
  { header: "Phone", key: "phone", width: 18 },
  { header: "Course", key: "course", width: 38 },
  { header: "Message", key: "message", width: 48 },
];

// Serialize writes so concurrent submissions can't corrupt the file.
let writeQueue = Promise.resolve();

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function styleHeader(worksheet) {
  const header = worksheet.getRow(1);
  header.height = 24;
  header.font = { bold: true, size: 12, color: { argb: "FFFFFFFF" } };
  header.alignment = { vertical: "middle", horizontal: "left" };
  header.eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF1B4DA1" },
    };
    cell.border = {
      bottom: { style: "thin", color: { argb: "FF0E3575" } },
    };
  });
}

async function loadWorkbook() {
  const workbook = new ExcelJS.Workbook();
  if (fs.existsSync(FILE_PATH)) {
    await workbook.xlsx.readFile(FILE_PATH);
  }

  let worksheet = workbook.getWorksheet(SHEET_NAME);
  if (!worksheet) {
    worksheet = workbook.addWorksheet(SHEET_NAME, {
      views: [{ state: "frozen", ySplit: 1 }],
    });
    worksheet.columns = COLUMNS;
    styleHeader(worksheet);
  }
  return { workbook, worksheet };
}

function formatTimestamp(date = new Date()) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(date);
}

/**
 * Append a single enquiry to the workbook.
 * @param {{name:string,email:string,phone:string,course:string,message?:string}} entry
 */
export function addEnquiry(entry) {
  const task = writeQueue.then(async () => {
    ensureDataDir();
    const { workbook, worksheet } = await loadWorkbook();

    const nextSno = Math.max(1, worksheet.rowCount); // header row counts as 1
    const row = worksheet.addRow([
      nextSno,
      formatTimestamp(),
      entry.name,
      entry.email,
      entry.phone,
      entry.course,
      entry.message || "",
    ]);

    row.alignment = { vertical: "top", wrapText: true };
    row.eachCell((cell) => {
      cell.border = {
        bottom: { style: "hair", color: { argb: "FFE2E8F0" } },
      };
    });

    await workbook.xlsx.writeFile(FILE_PATH);
    return { sno: nextSno };
  });

  // Keep the queue alive even if this write fails.
  writeQueue = task.catch(() => {});
  return task;
}

/** Read every enquiry back out of the workbook. */
export async function getEnquiries() {
  if (!fs.existsSync(FILE_PATH)) return [];
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(FILE_PATH);
  const worksheet = workbook.getWorksheet(SHEET_NAME);
  if (!worksheet) return [];

  const rows = [];
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;
    const values = row.values; // 1-based array
    rows.push({
      sno: values[1] ?? "",
      submittedAt: values[2] ?? "",
      name: values[3] ?? "",
      email: values[4] ?? "",
      phone: values[5] ?? "",
      course: values[6] ?? "",
      message: values[7] ?? "",
    });
  });
  return rows;
}

/** Return the workbook as a Buffer (creating an empty one if needed). */
export async function getWorkbookBuffer() {
  ensureDataDir();
  if (!fs.existsSync(FILE_PATH)) {
    const { workbook } = await loadWorkbook();
    await workbook.xlsx.writeFile(FILE_PATH);
  }
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(FILE_PATH);
  const buffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(buffer);
}

/** Very small guard for the admin/export endpoints. */
export function isAuthorized(request) {
  const expected = process.env.ADMIN_KEY || "goodnotation";
  const url = new URL(request.url);
  const provided =
    request.headers.get("x-admin-key") || url.searchParams.get("key") || "";
  return provided === expected;
}

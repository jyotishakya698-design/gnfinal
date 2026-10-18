import { getWorkbookBuffer, isAuthorized } from "../../../../lib/enquiries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Protected endpoint — streams the Excel workbook as a download.
export async function GET(request) {
  if (!isAuthorized(request)) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const buffer = await getWorkbookBuffer();
    const stamp = new Date().toISOString().slice(0, 10);
    const filename = `good-notation-enquiries-${stamp}.xlsx`;

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": String(buffer.length),
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("[enquiry] Failed to export workbook:", error);
    return new Response("Unable to generate the Excel file.", { status: 500 });
  }
}

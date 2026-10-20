// ============================================================
// Brochure download — SINGLE SOURCE OF TRUTH
// ------------------------------------------------------------
// Want to change where the responses are emailed, or which
// brochure is offered? Edit ONLY this file.
//
// Optional environment overrides (handy for different deploys):
//   BROCHURE_EMAIL  -> overrides `email`
//   BROCHURE_FILE   -> overrides `file`
//   BROCHURE_NAME   -> overrides `fileName`
// ============================================================

export const brochureConfig = {
  // 1) Where brochure-request form responses are emailed.
  email: process.env.BROCHURE_EMAIL || "info@goodnotation.com",

  // 2) The brochure file offered for download.
  //    Drop your PDF into /public/brochures/ and point to it here.
  file: process.env.BROCHURE_FILE || "/brochures/Good-Notation-Brochure.pdf",

  // 3) The filename the visitor sees when the download starts.
  fileName: process.env.BROCHURE_NAME || "Good-Notation-Brochure.pdf",

  // 4) Subject line used for the email notification.
  subject: "New Brochure Download Request — Good Notation",
};

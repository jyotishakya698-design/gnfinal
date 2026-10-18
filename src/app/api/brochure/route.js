import { NextResponse } from "next/server";
import { addEnquiry } from "../../../lib/enquiries";
import { sendNotification, formSubmitEndpoint } from "../../../lib/mailer";
import { brochureConfig } from "../../../data/brochureConfig";
import { getProgramBrochure } from "../../../data/courseData";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Public endpoint — receives brochure-download form submissions.
// It (1) stores the enquiry, (2) emails the configured address and
// (3) returns the brochure URL so the client can start the download.
export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const course = String(body.course || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Please fill in your name, email and phone number." },
        { status: 400 }
      );
    }

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const courseLabel = course || "Brochure Download";

    // 1) Persist the enquiry (best-effort — never block the download).
    try {
      await addEnquiry({ name, email, phone, course: courseLabel, message });
    } catch (error) {
      console.error("[brochure] Failed to store enquiry:", error);
    }

    // 2) Email the configured address (best-effort).
    const mail = await sendNotification({
      to: brochureConfig.email,
      subject: brochureConfig.subject,
      replyTo: email,
      fields: [
        ["Name", name],
        ["Email", email],
        ["Phone", phone],
        ["Interested In", courseLabel],
        ["Message", message],
        ["Source", "Brochure Download (Courses page)"],
      ],
    });

    // 3) Resolve the brochure for the requested program (falls back to the
    //    general brochure when the program has no dedicated syllabus PDF),
    //    then hand it back to the client. When no server-side transport is
    //    configured we also return the FormSubmit endpoint so the browser
    //    can deliver the notification itself.
    const brochure = course
      ? getProgramBrochure(course)
      : { file: brochureConfig.file, fileName: brochureConfig.fileName };

    return NextResponse.json(
      {
        success: true,
        emailed: mail.sent,
        formEndpoint: mail.sent ? null : formSubmitEndpoint(brochureConfig.email),
        formSubject: brochureConfig.subject,
        brochureUrl: brochure.file,
        fileName: brochure.fileName,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[brochure] Failed to process request:", error);
    return NextResponse.json(
      { error: "Unable to process your request right now. Please try again." },
      { status: 500 }
    );
  }
}

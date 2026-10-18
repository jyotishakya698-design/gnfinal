import { NextResponse } from "next/server";
import { addEnquiry, getEnquiries, isAuthorized } from "../../../lib/enquiries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Public endpoint — receives contact-form submissions.
export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const course = String(body.course || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !phone || !course) {
      return NextResponse.json(
        { error: "Please fill in your name, email, phone number and course." },
        { status: 400 }
      );
    }

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const result = await addEnquiry({ name, email, phone, course, message });
    return NextResponse.json({ success: true, ...result }, { status: 201 });
  } catch (error) {
    console.error("[enquiry] Failed to save submission:", error);
    return NextResponse.json(
      { error: "Unable to save your enquiry right now. Please try again." },
      { status: 500 }
    );
  }
}

// Protected endpoint — lists stored enquiries for the admin page.
export async function GET(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const enquiries = await getEnquiries();
    return NextResponse.json(
      { count: enquiries.length, enquiries },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("[enquiry] Failed to read enquiries:", error);
    return NextResponse.json(
      { error: "Unable to load enquiries." },
      { status: 500 }
    );
  }
}

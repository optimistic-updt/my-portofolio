import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Simple in-memory store for rate limiting
// In production, use Redis or similar for distributed systems
const rateLimit = new Map<string, { count: number; timestamp: number }>();

// Rate limit configuration
const RATE_LIMIT_WINDOW = 3600000; // 1 hour in milliseconds
const MAX_REQUESTS = 4; // Maximum requests per window

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW;

  // Clean up old entries
  for (const [key, value] of rateLimit.entries()) {
    if (value.timestamp < windowStart) {
      rateLimit.delete(key);
    }
  }

  const currentLimit = rateLimit.get(ip);

  if (!currentLimit) {
    rateLimit.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (currentLimit.timestamp < windowStart) {
    // Reset if outside window
    rateLimit.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (currentLimit.count >= MAX_REQUESTS) {
    return false;
  }

  currentLimit.count++;
  return true;
}

export async function POST(request: Request) {
  try {
    // Get IP address from request headers
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0] : "127.0.0.1";

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const { name, email, message } = await request.json();

    // Validate inputs
    if (!email || !message) {
      return NextResponse.json(
        { error: "Email, and message are required" },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    // Validate message length
    if (message.length > 1000) {
      return NextResponse.json(
        { error: "Message is too long (max 1000 characters)" },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error sending email:", error);

    // Handle specific nodemailer errors
    if (error instanceof Error) {
      if (error.message.includes("EAUTH")) {
        return NextResponse.json(
          { error: "Email authentication failed" },
          { status: 500 },
        );
      }
      if (error.message.includes("ESOCKET")) {
        return NextResponse.json(
          { error: "Failed to connect to email server" },
          { status: 500 },
        );
      }
    }

    // Generic error
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}

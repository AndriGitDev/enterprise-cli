import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, message } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate message length if provided
    if (message && typeof message === 'string' && message.length > 1000) {
      return NextResponse.json(
        { error: 'Message too long (max 1000 characters)' },
        { status: 400 }
      );
    }

    // TODO: Implement actual demo request logic
    // Could send email via Resend API or store in database

    return NextResponse.json({
      success: true,
      message: 'Demo request received! I will contact you shortly.',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

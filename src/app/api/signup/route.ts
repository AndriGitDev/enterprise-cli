import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name } = body;

    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
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

    // Validate name length
    if (typeof name !== 'string' || name.length > 100) {
      return NextResponse.json(
        { error: 'Invalid name (max 100 characters)' },
        { status: 400 }
      );
    }

    // TODO: Implement actual signup logic with Vercel KV or email service

    return NextResponse.json({
      success: true,
      message: 'Thank you for signing up! We will be in touch soon.',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

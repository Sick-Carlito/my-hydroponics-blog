// ============================================
// FILE: app/api/newsletter/route.ts
// Server-side API route for EmailOctopus
// ============================================

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Enhanced email validation
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Trim whitespace and convert to lowercase
    const cleanEmail = email.trim().toLowerCase();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Block common fake/temporary email domains
    const blockedDomains = [
      'tempmail.com',
      'guerrillamail.com', 
      '10minutemail.com',
      'throwaway.email',
      'mailinator.com',
      'trashmail.com'
    ];
    
    const emailDomain = cleanEmail.split('@')[1];
    if (blockedDomains.includes(emailDomain)) {
      return NextResponse.json(
        { error: 'Please use a permanent email address' },
        { status: 400 }
      );
    }

    // EmailOctopus API credentials
    const EMAILOCTOPUS_API_KEY = process.env.EMAILOCTOPUS_API_KEY;
    const LIST_ID = process.env.EMAILOCTOPUS_LIST_ID;

    if (!EMAILOCTOPUS_API_KEY || !LIST_ID) {
      return NextResponse.json(
        { error: 'Newsletter service not configured' },
        { status: 500 }
      );
    }

    // Call EmailOctopus API with cleaned email
    const response = await fetch(
      `https://emailoctopus.com/api/1.6/lists/${LIST_ID}/contacts`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: EMAILOCTOPUS_API_KEY,
          email_address: cleanEmail, // Use cleaned email
          status: 'SUBSCRIBED',
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      // Check if already subscribed
      if (data.error?.code === 'MEMBER_EXISTS_WITH_EMAIL_ADDRESS') {
        return NextResponse.json(
          { 
            success: true, 
            message: 'You\'re already subscribed! Check your inbox for our emails.',
            alreadySubscribed: true 
          },
          { status: 200 }
        );
      }

      // Handle invalid email from EmailOctopus
      if (data.error?.code === 'INVALID_PARAMETERS') {
        return NextResponse.json(
          { error: 'Please enter a valid email address' },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: data.error?.message || 'Failed to subscribe' },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thanks for subscribing! Check your email to confirm.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Newsletter API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
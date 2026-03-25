// ============================================
// FILE: app/api/newsletter/route.ts
// Server-side API route for EmailOctopus
// ============================================

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // EmailOctopus API credentials
    const EMAILOCTOPUS_API_KEY = 'eo_1a8337b49b592b88ec8ee3837f2c33717dcc3a05337ee2c352fbe1431bdc1d9b';
    const LIST_ID = 'b3651b0a-205e-11f1-a886-af841e43e49a';

    // Call EmailOctopus API
    const response = await fetch(
      `https://emailoctopus.com/api/1.6/lists/${LIST_ID}/contacts`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: EMAILOCTOPUS_API_KEY,
          email_address: email,
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
            message: 'You\'re already subscribed!',
            alreadySubscribed: true 
          },
          { status: 200 }
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
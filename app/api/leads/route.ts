import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';
import { Lead } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Basic validation
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Optional: Honeypot check for spam (assuming form has a hidden 'botField')
    if (data.botField) {
      return NextResponse.json({ message: 'Spam detected' }, { status: 400 });
    }

    const lead: Omit<Lead, 'id'> = {
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      message: data.message,
      projectType: data.projectType || '',
      budgetRange: data.budgetRange || '',
      source: data.source || 'contact_form',
      status: 'new',
      notes: [],
      read: false,
      createdAt: Date.now()
    };

    // Write to Firestore via Admin SDK
    const docRef = await adminDb.collection('leads').add(lead);

    // FUTURE EXTRAS: Trigger an email notification here using SendGrid, Resend, or Firebase Trigger Email Extension.
    console.log(`[API/Leads] New lead created with ID: ${docRef.id}`);

    return NextResponse.json({ success: true, id: docRef.id });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

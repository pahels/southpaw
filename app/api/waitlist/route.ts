import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  const { firstName, lastName, email, phone } = await req.json();

  if (!firstName || !lastName || !email || !phone) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }

  const { error } = await supabase.from('waitlist').insert([
    { first_name: firstName, last_name: lastName, email, phone },
  ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

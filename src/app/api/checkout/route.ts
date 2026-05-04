import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, contact, location, variantName } = await req.json();

    if (!email || !name) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: `"NOJO" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Order Received - Welcome to the Cult of NOJO',
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #000; color: #fff; padding: 40px; text-align: center;">
          <h1 style="font-size: 24px; font-weight: normal; letter-spacing: 4px; margin-bottom: 20px;">NOJO</h1>
          <p style="font-size: 18px; color: #ccc;">Hello ${name},</p>
          <p style="font-size: 16px; color: #aaa; line-height: 1.6; max-width: 600px; margin: 0 auto 30px auto;">
            We have received your order for <strong>${variantName || 'NOJO Classic'}</strong>. 
            Prepare yourself for the ultimate cold experience. Your tastebuds are about to undergo a profound awakening.
          </p>
          <div style="background-color: #111; border: 1px solid #333; padding: 20px; border-radius: 8px; max-width: 400px; margin: 0 auto;">
            <h3 style="margin-top: 0; color: #fff;">Order Details:</h3>
            <p style="margin: 5px 0; color: #ccc;"><strong>Variant:</strong> ${variantName || 'NOJO Classic'}</p>
            <p style="margin: 5px 0; color: #ccc;"><strong>Location:</strong> ${location || 'N/A'}</p>
            <p style="margin: 5px 0; color: #ccc;"><strong>Contact:</strong> ${contact || 'N/A'}</p>
          </div>
          <p style="margin-top: 40px; font-size: 12px; color: #666; letter-spacing: 2px; text-transform: uppercase;">
            Pure. Crisp. Cold.<br/>
            Born in Nigatola.
          </p>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email', details: (error as Error).message },
      { status: 500 }
    );
  }
}

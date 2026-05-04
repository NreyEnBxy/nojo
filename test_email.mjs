import nodemailer from 'nodemailer';

async function test() {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "contact.nuetvc@gmail.com",
        pass: "qpxvyopyrhhygujj",
      },
    });

    await transporter.verify();
    console.log("SUCCESS");
  } catch (err) {
    console.error("ERROR", err.message);
  }
}
test();

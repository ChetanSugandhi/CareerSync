import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import envConfig from '../../../config/env';

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: envConfig.smtp.host,
  port: envConfig.smtp.port,
  secure: envConfig.smtp.secure,
  auth: {
    user: envConfig.smtp.user,
    pass: envConfig.smtp.pass,
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { to, subject, body } = req.body;

    if (!to || !subject || !body) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const mailOptions = {
      from: envConfig.smtp.from,
      to,
      subject,
      text: body,
      html: body.replace(/\n/g, '<br>'),
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Failed to send email:', error);
    return res.status(500).json({ message: 'Failed to send email' });
  }
} 
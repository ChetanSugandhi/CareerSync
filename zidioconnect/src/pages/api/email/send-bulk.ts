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
    const emails = req.body;

    if (!Array.isArray(emails) || emails.length === 0) {
      return res.status(400).json({ message: 'Invalid email data' });
    }

    const results = await Promise.allSettled(
      emails.map(async (email) => {
        const { to, template, data } = email;
        const subject = template.subject;
        const body = template.body;

        if (!to || !subject || !body) {
          throw new Error('Missing required fields');
        }

        const mailOptions = {
          from: envConfig.smtp.from,
          to,
          subject,
          text: body,
          html: body.replace(/\n/g, '<br>'),
        };

        return transporter.sendMail(mailOptions);
      })
    );

    const successCount = results.filter(
      (result) => result.status === 'fulfilled'
    ).length;
    const failureCount = results.filter(
      (result) => result.status === 'rejected'
    ).length;

    return res.status(200).json({
      message: 'Bulk email operation completed',
      successCount,
      failureCount,
    });
  } catch (error) {
    console.error('Failed to send bulk emails:', error);
    return res.status(500).json({ message: 'Failed to send bulk emails' });
  }
} 
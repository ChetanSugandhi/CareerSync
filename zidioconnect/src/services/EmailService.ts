import { User } from '../types';
import envConfig from '../../config/env';

interface EmailTemplate {
  subject: string;
  body: string;
}

interface EmailData {
  to: string;
  template: EmailTemplate;
  data?: Record<string, any>;
}

class EmailService {
  private static instance: EmailService;
  private templates: Map<string, EmailTemplate>;

  private constructor() {
    this.templates = new Map();
    this.initializeTemplates();
  }

  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  private initializeTemplates() {
    // Application Status Templates
    this.templates.set('application_received', {
      subject: 'Application Received - {jobTitle}',
      body: `
        Dear {candidateName},

        Thank you for applying to the {jobTitle} position at {companyName}. We have received your application and will review it shortly.

        Best regards,
        {companyName} Team
      `,
    });

    this.templates.set('application_shortlisted', {
      subject: 'Application Shortlisted - {jobTitle}',
      body: `
        Dear {candidateName},

        Congratulations! Your application for the {jobTitle} position at {companyName} has been shortlisted. 
        We would like to schedule an interview with you.

        Best regards,
        {companyName} Team
      `,
    });

    this.templates.set('application_rejected', {
      subject: 'Application Status Update - {jobTitle}',
      body: `
        Dear {candidateName},

        Thank you for your interest in the {jobTitle} position at {companyName}. 
        After careful consideration, we have decided to move forward with other candidates.

        We wish you the best in your job search.

        Best regards,
        {companyName} Team
      `,
    });

    // Interview Templates
    this.templates.set('interview_scheduled', {
      subject: 'Interview Scheduled - {jobTitle}',
      body: `
        Dear {candidateName},

        Your interview for the {jobTitle} position has been scheduled for {interviewDate} at {interviewTime}.
        
        Interview Details:
        Type: {interviewType}
        {locationOrLink}
        
        Please confirm your attendance by clicking the link below:
        {confirmationLink}

        Best regards,
        {companyName} Team
      `,
    });

    this.templates.set('interview_reminder', {
      subject: 'Interview Reminder - {jobTitle}',
      body: `
        Dear {candidateName},

        This is a reminder that your interview for the {jobTitle} position is scheduled for tomorrow at {interviewTime}.
        
        Interview Details:
        Type: {interviewType}
        {locationOrLink}

        Best regards,
        {companyName} Team
      `,
    });

    // Job Templates
    this.templates.set('job_posted', {
      subject: 'New Job Posted - {jobTitle}',
      body: `
        Dear {userName},

        A new job matching your preferences has been posted:

        Position: {jobTitle}
        Company: {companyName}
        Location: {location}
        Type: {jobType}

        Click here to view the job: {jobLink}

        Best regards,
        ZIDIOConnect Team
      `,
    });

    // System Templates
    this.templates.set('welcome', {
      subject: 'Welcome to ZIDIOConnect',
      body: `
        Dear {userName},

        Welcome to ZIDIOConnect! We're excited to have you join our platform.

        To get started:
        1. Complete your profile
        2. Upload your resume
        3. Browse available jobs

        If you have any questions, feel free to contact our support team.

        Best regards,
        ZIDIOConnect Team
      `,
    });

    this.templates.set('password_reset', {
      subject: 'Password Reset Request',
      body: `
        Dear {userName},

        We received a request to reset your password. Click the link below to reset your password:

        {resetLink}

        If you didn't request this, please ignore this email.

        Best regards,
        ZIDIOConnect Team
      `,
    });
  }

  private replacePlaceholders(template: string, data: Record<string, any>): string {
    return template.replace(/\{(\w+)\}/g, (match, key) => data[key] || match);
  }

  public async sendEmail(emailData: EmailData): Promise<boolean> {
    try {
      const template = this.templates.get(emailData.template.subject);
      if (!template) {
        throw new Error(`Email template not found: ${emailData.template.subject}`);
      }

      const subject = this.replacePlaceholders(template.subject, emailData.data || {});
      const body = this.replacePlaceholders(template.body, emailData.data || {});

      const response = await fetch(`${envConfig.api.baseUrl}/api/email/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: emailData.to,
          subject,
          body,
        }),
      });

      return response.ok;
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    }
  }

  public async sendBulkEmails(emails: EmailData[]): Promise<boolean> {
    try {
      const response = await fetch(`${envConfig.api.baseUrl}/api/email/send-bulk`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emails),
      });

      return response.ok;
    } catch (error) {
      console.error('Failed to send bulk emails:', error);
      return false;
    }
  }

  public async sendApplicationStatusEmail(
    user: User,
    jobTitle: string,
    companyName: string,
    status: 'received' | 'shortlisted' | 'rejected'
  ): Promise<boolean> {
    const templateKey = `application_${status}`;
    const template = this.templates.get(templateKey);

    if (!template) {
      throw new Error(`Email template not found: ${templateKey}`);
    }

    return this.sendEmail({
      to: user.email,
      template,
      data: {
        candidateName: `${user.firstName} ${user.lastName}`,
        jobTitle,
        companyName,
      },
    });
  }

  public async sendInterviewEmail(
    user: User,
    jobTitle: string,
    companyName: string,
    interviewData: {
      date: Date;
      time: string;
      type: 'online' | 'onsite';
      locationOrLink: string;
      confirmationLink?: string;
    }
  ): Promise<boolean> {
    const template = this.templates.get('interview_scheduled');

    if (!template) {
      throw new Error('Interview email template not found');
    }

    return this.sendEmail({
      to: user.email,
      template,
      data: {
        candidateName: `${user.firstName} ${user.lastName}`,
        jobTitle,
        companyName,
        interviewDate: interviewData.date.toLocaleDateString(),
        interviewTime: interviewData.time,
        interviewType: interviewData.type,
        locationOrLink: interviewData.locationOrLink,
        confirmationLink: interviewData.confirmationLink,
      },
    });
  }

  public async sendJobAlertEmail(
    user: User,
    jobData: {
      title: string;
      company: string;
      location: string;
      type: string;
      link: string;
    }
  ): Promise<boolean> {
    const template = this.templates.get('job_posted');

    if (!template) {
      throw new Error('Job alert email template not found');
    }

    return this.sendEmail({
      to: user.email,
      template,
      data: {
        userName: `${user.firstName} ${user.lastName}`,
        jobTitle: jobData.title,
        companyName: jobData.company,
        location: jobData.location,
        jobType: jobData.type,
        jobLink: jobData.link,
      },
    });
  }
}

export default EmailService; 
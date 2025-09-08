import { Process, Processor } from '@nestjs/bull';
import type { Job } from 'bull';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Processor('message-queue')
export class MessageProcessor {
  constructor(private configService: ConfigService) {}
  @Process('my-job')
  async handleSendMessage(job: Job<{ text: string }>) {
    console.log('Processing job:', job.data);
  }

  @Process('send-email')
  async handleSendEmail(job: Job<{ email: string }>) {
    const { email } = job.data;
    console.log(`📧 Sending email to: ${email}`);
    
    if (!this.configService.get('SMTP_USER') || !this.configService.get('SMTP_PASS')) {
      console.error('❌ SMTP credentials not configured');
      throw new Error('SMTP credentials not configured');
    }

    const port = Number(this.configService.get('SMTP_PORT'));
    const secure = this.configService.get('SMTP_SECURE') === 'true';
    const rejectUnauthorized = this.configService.get('SMTP_TLS_REJECT_UNAUTHORIZED') === 'true';

    const transport = nodemailer.createTransport({
      host: this.configService.get('SMTP_HOST'),
      port,
      secure,
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASS'),
      },
      tls: {
        rejectUnauthorized,
      },
    });
    

    const mailOptions = {
      from: this.configService.get('MAIL_FROM') || 'noreply@example.com',
      to: email,
      subject: 'Test Email',
      text: 'This is a test email from your queue service',
      html: '<p>This is a test email from your queue service</p>'
    };

    try {
      const info = await transport.sendMail(mailOptions);
      console.log(`✅ Email sent to: ${email}`, info.messageId);
      return { success: true, email, messageId: info.messageId };
    } catch (error) {
      console.error('❌ Failed to send email:', error);
      throw error; // This will mark the job as failed in the queue
    }
  }
}
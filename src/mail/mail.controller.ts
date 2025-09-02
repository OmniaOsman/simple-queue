import { Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { Body } from '@nestjs/common';

@Controller('mail')
export class MailController {
    constructor(private mailService: MailService) {}

    @Post('send')
    async sendMailToUser(@Body() body: { email: string }) {
        await this.mailService.sendMailToUser(body.email);
    }
}

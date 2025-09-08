import { Injectable } from '@nestjs/common';
import { MessageService } from 'src/message/message.service';

@Injectable()
export class MailService {
    constructor(
        private messageService: MessageService
    ) {}

    async sendMailToUser(email: string) {
        await this.messageService.addEmailToBroker(email);
        console.log(`📤 Job added to queue for: ${email}`);
        return { success: true, email };
      }
}

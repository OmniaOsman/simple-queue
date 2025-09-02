import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MessageModule } from 'src/message/message.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'message-queue',
    }),
    MessageModule,
  ],
  providers: [MailService],
  controllers: [MailController],
  exports: [MailService],
})
export class MailModule {}

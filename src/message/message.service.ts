import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import type { Queue } from 'bull';

@Injectable()
export class MessageService {
  constructor(@InjectQueue('message-queue') private queue: Queue) {}

  async addEmailToBroker(email: string) {
    await this.queue.add('send-email', { email });
  }

  getQueue(): Queue {
    return this.queue;
  }
}
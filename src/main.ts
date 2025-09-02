import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { Queue } from 'bull';
import { ExpressAdapter as BullBoardExpressAdapter } from '@bull-board/express';
import { ExpressAdapter } from '@nestjs/platform-express';

import express from 'express';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
    { cors: true }
  );

  const bullBoardAdapter = new BullBoardExpressAdapter();
  bullBoardAdapter.setBasePath('/admin/queues');

  // Get the queue instance directly from the Queue injection token
  const queue = app.get<Queue>('BullQueue_message-queue');

  // Create the Bull board with the queue
  createBullBoard({
    queues: [new BullAdapter(queue)],
    serverAdapter: bullBoardAdapter,
  });

  server.use('/admin/queues', bullBoardAdapter.getRouter());

  await app.init();
  await app.listen(3000);

  console.log(`🚀 App running at: http://localhost:3000`);
  console.log(`📊 Bull Board at: http://localhost:3000/admin/queues`);
}

bootstrap().catch(err => {
  console.error('Failed to start the application:', err);
  process.exit(1);
});

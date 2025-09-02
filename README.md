# Simple Queue Service

A lightweight job queue system built with NestJS and Bull for handling background tasks, specifically designed for email processing.

## Features

- 🔄 Asynchronous job processing with Bull queue
- 📧 Email job queuing system
- 🚀 Built with NestJS for scalable architecture
- 📊 Queue monitoring with Bull Board
- 🔒 TypeScript support for better development experience

## Tech Stack

- **Backend**: NestJS
- **Queue**: Bull (Redis-based)
- **Email**: Nodemailer
- **Monitoring**: Bull Board
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js (v14+)
- Redis server
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
3. Copy `.env.example` to `.env` and configure your environment variables
4. Start Redis server
5. Start the application:
```ts
npm run start:dev
```

### Usage

To add a job to the queue, use the following endpoint:
```ts
POST: /mail/send
{
  "email": "user@example.com"
}
```

### Monitoring

You can access the Bull Board at `http://localhost:3000/admin/queues`

### Presentation for the job queue
https://www.canva.com/design/DAGxunkMpig/e4j8BmbcbwDdHAljeZU_DA/edit?utm_content=DAGxunkMpig&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton

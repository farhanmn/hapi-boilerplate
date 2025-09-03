// src/rabbit/consumer.ts
import amqp from 'amqplib';

const RABBITMQ_URL = 'amqp://localhost';

export const startConsumer = async (queue: string) => {
  const connection = await amqp.connect(RABBITMQ_URL);
  const channel = await connection.createChannel();

  await channel.assertQueue(queue, { durable: true });

  console.log(`📥 Waiting for messages in queue [${queue}]...`);

  await channel.consume(queue, (msg) => {
    if (msg) {
      const data = JSON.parse(msg.content.toString());
      console.log(`✅ Message received from [${queue}]:`, data);

      // Acknowledge
      channel.ack(msg);
    }
  });
};

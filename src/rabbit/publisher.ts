import amqp from 'amqplib';

const RABBITMQ_URL = 'amqp://localhost';

export const publishToQueue = async (queue: string, message: any) => {
  const connection = await amqp.connect(RABBITMQ_URL);
  const channel = await connection.createChannel();

  await channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
    persistent: true
  });

  console.log(`✅ Message sent to queue [${queue}]:`, message);

  // Optional: close connection (or reuse in production)
  setTimeout(() => {
    connection.close();
  }, 500);
};

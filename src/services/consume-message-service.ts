import * as amqp from 'amqplib/callback_api';
import dotenv from 'dotenv';

const envFile =
  process.env.NODE_ENV === 'local'
    ? '.env.local'
    : process.env.NODE_ENV === 'development'
    ? '.env.dev'
    : '.env.local';
dotenv.config({ path: envFile });

const AMQP_URL = process.env.AMQP_URL || 'amqp://rabbitmq-manager.local:5672';
const QUEUE_NAME = 'loginUserQueue';

const userCache = new Map<string, any>();

export const consumeMessages = async () => {
  try {
    const connection: amqp.Connection = await new Promise((resolve, reject) => {
      amqp.connect(AMQP_URL, (err, connection) => {
        if (err) reject(err);
        else resolve(connection);
      });
    });

    const channel: amqp.Channel = await new Promise((resolve, reject) => {
      connection.createChannel((err, channel) => {
        if (err) reject(err);
        else resolve(channel);
      });
    });

    await new Promise<void>((resolve, reject) => {
      channel.assertQueue(
        QUEUE_NAME,
        {
          durable: true,
          arguments: { 'x-queue-type': 'quorum' },
        },
        (err, ok) => {
          if (err) reject(err);
          else resolve();
        },
      );
    });

    console.log(`[*] Waiting for messages in ${QUEUE_NAME}. To exit press CTRL+C`);

    channel.consume(
      QUEUE_NAME,
      (msg) => {
        if (msg !== null) {
          const messageContent = msg.content.toString();
          const message = JSON.parse(messageContent);

          console.log(' [x] Received %s', message);

          // Save the entire message payload to the cache using userId as the key
          if (message.user && message.user.userId) {
            userCache.set(message.user.userId.toString(), message);
          }

          // Acknowledge the message
          console.log(userCache)
          channel.ack(msg);
        }
      },
      { noAck: false },
    );
  } catch (error) {
    console.error('Error consuming message:', error);
  }
};

// consumeMessages();
// export { userCache };

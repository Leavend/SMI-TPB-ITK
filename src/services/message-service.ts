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
const EXCHANGE_NAME = 'auth_service_exchange';
const QUEUE_NAME = 'loginUserQueue';
const ROUTING_KEY = 'auth_service_login_user';

export const sendMessage = async (messages: any) => {
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
      channel.assertExchange(EXCHANGE_NAME, 'direct', { durable: true }, (err, ok) => {
        if (err) reject(err);
        else resolve();
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

    await new Promise<void>((resolve, reject) => {
      channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, ROUTING_KEY, {}, (err, ok) => {
        if (err) reject(err);
        else resolve();
      });
    });

    channel.publish(EXCHANGE_NAME, ROUTING_KEY, Buffer.from(JSON.stringify(messages)));
    console.log(' [x] Sent %s', messages);

    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

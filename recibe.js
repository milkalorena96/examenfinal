const amqp = require('amqplib');

async function consumeMessages() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queue = 'mensaje_cola';

  await channel.assertQueue(queue, { durable: false });

  console.log('En espera...');

  channel.consume(queue, async (message) => {
    await new Promise(resolve => setTimeout(resolve, 10000));

    console.log('Nuevo mensaje: ', message.content.toString());

    channel.ack(message);
  }, { noAck: false });
}

consumeMessages().catch(console.error);
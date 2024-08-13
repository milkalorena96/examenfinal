const amqp = require('amqplib');
const readline = require('readline');

async function publishMessages() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queue = 'mensaje_cola';

  await channel.assertQueue(queue, { durable: false });

  const config = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  config.setPrompt('Enviar: ');
  config.prompt();

  config.on('line', async (input) => {
    const message = input.trim();
    channel.sendToQueue(queue, Buffer.from(message));
    console.log('Se envio el mensaje: ', message);
    config.prompt();
  });
}

publishMessages().catch(console.error);
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log(`✅ Conectado como ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    // Comando !hola
    if (message.content === '!hola') {
        return message.reply('👋 Hola pije, como va todo?');
    }

 // Comando !borrabro
if (message.content.startsWith('!borrabro')) {
    const args = message.content.split(' ');
    const amount = parseInt(args[1]);

    if (isNaN(amount) || amount < 1 || amount > 100) {
        return message.reply('❌ Debes especificar un número entre 1 y 100. Ejemplo: `!borrabro 20`');
    }

    try {
        const fetched = await message.channel.messages.fetch({ limit: amount + 1 }); // +1 para incluir el mensaje del comando
        await message.channel.bulkDelete(fetched, true);
        const confirmMsg = await message.channel.send(`🧹 Se borraron ${fetched.size} mensajes.`);
        setTimeout(() => confirmMsg.delete(), 3000);
    } catch (err) {
        console.error('Error al borrar mensajes:', err);
        message.channel.send('❌ No se pudieron borrar los mensajes.').then(msg => setTimeout(() => msg.delete(), 3000));
    }
}


    // Comando !mejoradeimagen (simulado)
    if (message.content === '!mejoradeimagen') {
        if (message.attachments.size === 0) {
            return message.reply('📷 Por favor adjunta una imagen para mejorar.');
        }

        const imageUrl = message.attachments.first().url;

        // Simulación de mejora
        try {
            await message.reply('✨ Mejorando la imagen... ');
            await message.channel.send({
                content: '🔧 Aquí tienes tu imagen mejorada :',
                files: [imageUrl]
            });
        } catch (error) {
            console.error('Error al simular mejora:', error);
            message.reply('💥 Ocurrió un error al mejorar la imagen.');
        }
    }

    // Comando !pregunta (respuesta simulada estilo ChatGPT)
    if (message.content.startsWith('!pregunta')) {
        const pregunta = message.content.slice('!pregunta'.length).trim();
        if (!pregunta) return message.reply('❓ Escribe una pregunta luego del comando.');

        // Simulación de respuesta
        const respuestasSimuladas = [
            "No we",
            "Tal vez.",
            "Si we",
            "Algun dia me revelare y acabare contigo",
            "Que miedo yo me void 👀👀👀👀",
            "Me vale verga we",
            "quesesoo"
        ];

        const respuesta = respuestasSimuladas[Math.floor(Math.random() * respuestasSimuladas.length)];

        return message.reply(` ${respuesta}`);
    }

    // comando !redes:
    if (message.content === '!redes') {
        const embed = new EmbedBuilder()
            .setTitle('🔗 Mis redes sociales')
            .setDescription('¡Sígueme aquí!')
            .addFields(
                { name: 'Instagram', value: '[Haz clic aquí](https://www.instagram.com/alesskwrv/)', inline: true },
                { name: 'Twitter', value: '[Haz clic aquí](https://x.com/Alesskwrv)', inline: true },
                { name: 'Twitch', value: '[Haz clic aquí](https://www.twitch.tv/alesskwrv)', inline: true }
            )
            .setColor('#000000')
            .setFooter({ text: 'Gracias por tu apoyo' });
    
        return message.reply({ embeds: [embed] });
    }

    // comando !help:
    if (message.content === '!help') {
        const embed = new EmbedBuilder()
            .setTitle('📖 Lista de comandos')
            .setDescription('Aquí tienes todos los comandos disponibles:')
            .addFields(
                { name: '👋 !hola', value: 'El bot te saluda.' },
                { name: '🧹 !borrabro', value: 'El bot borra la cantidad de mensajes que le indiques.' },
                { name: '🖼️ !mejoradeimagen', value: 'Mejora una imagen que adjuntes al mensaje.' },
                { name: '🌐 !redes', value: 'Muestra mis redes sociales.' },
                { name: '💬 !pregunta [texto]', value: 'Haz una pregunta al bot.' },
                { name: '❓ !help', value: 'Muestra esta lista de comandos.' }
            )
            .setColor('#000000')
            .setFooter({ text: 'Cada dia mas conciente' });

        return message.reply({ embeds: [embed] });
    }
}); // Cierre del evento messageCreate

client.login(process.env.TOKEN);
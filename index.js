const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { chatWithGpt } = require('./controllers/wa');

const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('WhatsApp Ready!');
});

client.on('message', async (msg) => {
    if (
        msg.id.participant.includes("6281317415455") ||
        msg.id.participant.includes("6281319700216") ||
        msg.id.participant.includes("62895324832330") ||
        msg.id.participant.includes("62881080253410")
    ) {
        let messageWa = msg.body;

        if (
            messageWa.includes("Devo AI")   ||
            messageWa.includes("Ikram AI")  ||
            messageWa.includes("Sheren AI") ||
            messageWa.includes("Diana AI")
        ) {
            try {
                const response = await chatWithGpt(messageWa);
                msg.reply(response);
            } catch (error) {
                console.error("Gagal membalas pesan:", error);
                msg.reply("Maaf, terjadi kesalahan dalam memproses pesan.");
            }
        }
    }
});

client.initialize();

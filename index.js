const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const { chatWithGpt } = require('./controllers/wa');

// Opsi: Menyimpan sesi secara otomatis menggunakan LocalAuth (lebih stabil)
const client = new Client({
    authStrategy: new LocalAuth({ clientId: "my-bot" }), // Folder `.wwebjs_auth`
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', qr => {
    console.log('Scan QR Code di bawah ini:');
    qrcode.generate(qr, { small: true });
});

client.on('authenticated', () => {
    console.log('🔐 Authenticated!');
});

client.on('auth_failure', msg => {
    console.error('❌ Auth failure:', msg);
});

client.on('ready', () => {
    console.log('✅ WhatsApp Ready!');
});

client.on('message', async (msg) => {
    const allowedNumbers = [
        "6281317415455",
        "6281319700216",
        "62895324832330",
        "62881080253410"
    ];

    const messageWa = msg.body;
    const sender = msg.id.participant || msg.from;

    if (allowedNumbers.some(num => sender.includes(num))) {
        if (
            messageWa.toLowerCase().includes("devo ai")   ||
            messageWa.toLowerCase().includes("ikram ai")  ||
            messageWa.toLowerCase().includes("sheren ai") ||
            messageWa.toLowerCase().includes("diana ai")
        ) {
            try {
                const response = await chatWithGpt(messageWa);
                await msg.reply(response);
            } catch (error) {
                console.error("Gagal membalas pesan:", error);
                msg.reply("Maaf, terjadi kesalahan dalam memproses pesan.");
            }
        }
    }
});

client.initialize();
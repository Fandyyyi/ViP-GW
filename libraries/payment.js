const paymentx = {
        key: {
            remoteJid: '0@s.whatsapp.net',
            fromMe: false,
            participant: '0@s.whatsapp.net'
        },
        message: {
            requestPaymentMessage: {
                currencyCodeIso4217: "USD",
                amount1000: 999999999,
                requestFrom: '0@s.whatsapp.net',
                noteMessage: {
                    extendedTextMessage: {
                        text: "⛶ NotCore-/-Ai",
                        expiration_time: Date.now() * 9999
                    }
                },
                amount: {
                    value: 999999999,
                    offset: 1000,
                    currencyCode: "USD"
                }
            }
        }
    };
    
module.exports = { paymentx };
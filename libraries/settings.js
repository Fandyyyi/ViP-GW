const fs = require('fs');
const chalk = require('chalk');

/** bot **/
global.prefix = ["", "!", ".", ",", "🐤", "🗿"];
global.owner = ['6283186767760'] 
global.wm = 'NotCore-/Ai' 
global.baileys = '@qwerty-xcv/baileys'

/** sticker watermark **/
global.packname = 'www.kizxtzy.tech'
global.author = 'Fandi.XpL'

/** reply **/
global.mess = {
    owner: 'Only Owner Access',
    premium: 'Only Premium Access',
    botz: 'Only Botz Access',
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update ${__filename}`))
    delete require.cache[file]
    require(file)
})
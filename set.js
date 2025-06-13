const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNk94MEJxcWpxc3dSYWNyVzhCOURZdGN2YVdId0pxbnZRcjI2Qm1sNUprRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUYyREZJN2NpY2c3cG50MU5kRFZNWjBsc0U3RVR3OGFEaXJYSlArMVBsRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1THFUSCtoVXBBZHRRZVRUOFJXaFRwOVNFTG9KeHdoT0dxbXRlcjhiSzA0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhaTcySUIzL0JROGNUKzBpRlZ5T1hXcUF2aTQyV3VEUGxaZFZvbld6aFdnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndIL3piaDJNa2ZyamdiK2V4OGk5LzMzaXVZcjlqelhOTjcvc0VPVURkM009In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkhwWk9rS3loWWFrMHpYNnJkSGV4TUp0em1NeE5YbCs4R3A4NE9QWGpUanc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUUxL0I2N1NoOWJsQ2ZwMm1hYVNjRVZkOUVaVWJTenNLRW5uT2grS0dFTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVk1qaXdEbDI2bjM4SisvaklKQllBK0FNQWNKZnpNZk5ZK21xaUcvaWN6Zz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVFaE9iSm1qSHlaaGYwREVKK0x0R0JTeHM0OVpSYlY1VWNja2l0YStyNzZOWjFoQ3crcEtrSTVUdGcvWDFqdksvMkEvS29pa0hoTjNKS3lCL1k1R2dBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTcwLCJhZHZTZWNyZXRLZXkiOiJzV0JnSkxTRHo2aHg0b0NUbm16NGlQN09id3EwVVRYbkZaZUxHQXBLTDVBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiIxSXJPaWd3TVR6VzJkdGZkWmJyR1R3IiwicGhvbmVJZCI6ImIxNTdiMzNjLTI1MzUtNGI2OC1iNWE3LTAxZGI5NmI3NGE3NyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVSlN3TnpvUWFsd3k5S0RWRVJNcEdhaTYvekU9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU3ZUQkk2YXJScGxjNFJ2YTNoSmRZcnh4Y3RnPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkFCQ0QxMjM0IiwibWUiOnsiaWQiOiIyMzQ4MTM5NTk4OTg1OjYzQHMud2hhdHNhcHAubmV0IiwibGlkIjoiNzcyNjY2NDYyNDk1NTg6NjNAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPV0s4YmNCRUtMaHI4SUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJQcWwzdzM4cXRjUGQ4Q05IVXpGRTFqM0NlMjJLUmExV3FWdVB1REZwUXhvPSIsImFjY291bnRTaWduYXR1cmUiOiJzSWwyNDNDL1BCaURzWUlwaVd6dDh3UVQxd1EvMkpTdWpTUS9tNDVMbTRDWHg3V09Nem43SENuY1lxQVpvUWJhS1JDdHo5SWhja2pnWUtwZVZlSnpBZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiY1IxOUpZY0J3VUdSeUk5Kzc5ZWgxOHJMb0YrZHNIanV4YVhYS0U0NzhxVjR2UUhyaTkrMTNpcG84c3NmRDZnelZlbXRrc21SVlZ3YUp6d2wwRGQ3aWc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ4MTM5NTk4OTg1OjYzQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlQ2cGQ4Ti9LclhEM2ZBalIxTXhSTlk5d250dGlrV3RWcWxiajdneGFVTWEifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBVUlDQT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0OTgwNzI4MCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFBWkkifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Him",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2348139598985",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",       
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || "yes",                     
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Him-MD',
    URL : process.env.BOT_MENU_LINKS || 'https://i.ibb.co/mChCjFPL/ad76194e124ff34e.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

var CryptoJS = require("crypto-js");

// Encrypt
function encrypt(token){
    return CryptoJS.AES.encrypt(token,"u8xADGKbPeShVmYq3t6v9y$B").toString();
}

// Decrypt
function decrypt(token){
    var bytes  = CryptoJS.AES.decrypt(token,"u8xADGKbPeShVmYq3t6v9y$B");
    return bytes.toString(CryptoJS.enc.Utf8);
}

export default {encrypt,decrypt}

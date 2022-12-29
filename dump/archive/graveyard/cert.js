
const fs = require('fs')

try{
    let key_ssl = fs.readFileSync(`${__dirname}/security/ctf2/key.pem`)
    let cert_ssl = fs.readFileSync(`${__dirname}/security/ctf2/cert.pem`)
    if(key_ssl && cert_ssl){
        vvrs["ssl_content"] = {
            key : key_ssl, 
            cert : cert_ssl,
            passphrase: 'Hansen94'
        } 
    }else{throw new error("key and certificate is not valid || not initialized")}
}catch(err){console.log(err)}
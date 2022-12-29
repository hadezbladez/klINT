

// const config = rootRequire('/____application/libs/DB_configParameter');
const __c = global.GSDAM;
const reqs = __c.func.requiring('util', 'mysql');

const util = reqs.util; const mysql = reqs.mysql
const pool = mysql.createPool(__c.confParam.dbConfig )//config.dbConfig

pool.getConnection((err, connection) => {// Ping database untuk memeriksa kesalahan.

    let stg = __filename.replace(__dirname, "")
    if (err) {switch(err.code){
        case "PROTOCOL_CONNECTION_LOST" : console.error(`${stg}{()} >> Koneksi database ditutup.`); break;
        case "ER_CON_COUNT_ERROR" : console.error(`${stg}{()} >> Basis data memiliki terlalu banyak koneksi.`); break;
        case "ECONNREFUSED" : console.error(`${stg}{()} >> Koneksi database ditolak.`); break;
    } }
    else{console.log(`${stg}{()} >> Koneksi Database sukses`)}//i dont think we need this

    if (connection) connection.release()
    return
})

pool.query = util.promisify(pool.query)
module.exports = pool;






















// Promisify for Node.js async/await. this is testing the database
/*
using promisify style
https://masteringjs.io/tutorials/node/promisify
https://stackoverflow.com/questions/34628305/using-promises-with-fs-readfile-in-a-loop

did you still remember about using return await new Promise() thingy?

*/
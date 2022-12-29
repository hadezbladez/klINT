

let smple = {
    resp : function(log = String, statuscode, msg, data, res){
        let jsondata = {status:statuscode, message:msg, data:data, }
        if(log){console.log(log)}
        return res.status(statuscode).json(jsondata);
    }
}

let ojc = {
    mysql : function(){
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

            if (connection) {connection.release()}
            return
        })

        pool.query = util.promisify(pool.query)
        return pool;
    },
    pgsql : function(){
        /* this plugin is really damning
        https://www.npmjs.com/package/postgres

        it cant be injected... until using unsafe
        we dont get a way to check the connection database

        consider using npm >> pg?
        https://github.com/brianc/node-postgres


        */
        const __c = global.GSDAM;
        const reqs = __c.func.requiring('util', 'postgres');
        const util = reqs.util
        const pgsql = reqs.postgres

        let sql_dummy;

        switch(global.GSDAM.confParam.nodeEnv){
            case "production": 
            sql_dummy = pgsql('postgres://username:password@host:port/database', {
                host                 : global.GSDAM.confParam.dbConfig.host,
                port                 : global.GSDAM.confParam.dbConfig.port,
                database             : global.GSDAM.confParam.dbConfig.database,
                username             : global.GSDAM.confParam.dbConfig.username, 
                password             : global.GSDAM.confParam.dbConfig.password, 
                ssl                  : {
                    rejectUnauthorized: false
                },
                max                  : 10,
                idle_timeout         : 8,
                connect_timeout      : 30, 
            })
            break;
            case "development": 
            sql_dummy = pgsql('postgres://username:password@host:port/database', {
                host                 : global.GSDAM.confParam.dbConfig.host,
                port                 : global.GSDAM.confParam.dbConfig.port,
                database             : global.GSDAM.confParam.dbConfig.database,
                username             : global.GSDAM.confParam.dbConfig.username, 
                password             : global.GSDAM.confParam.dbConfig.password, 
                max                  : 10,
                idle_timeout         : 8,
                connect_timeout      : 30, 
            })
            break;
            default : break;
        }

        const sql = sql_dummy
        return sql;
    },
    respon :{
        ok : function(msg,data,res){return smple.resp(false, 200, msg, data, res) },
        err400 : function(msg,data,res){return smple.resp('=====>  opps error 400: ' + msg, 400, msg, data, res) },
        err500 : function(msg,data,res){return smple.resp('=====>  opps error 500: ' + msg, 500, msg, data, res) },
    },
}

module.exports = {
    _init : function(dbChoice = String){
        this.modeldb = ojc[dbChoice]
        this.respon = ojc.respon
    }
}
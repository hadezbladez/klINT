


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



module.exports = sql;
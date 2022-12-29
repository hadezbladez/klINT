

////----core content
let __gsdam;

/**///constant
let ____trackSetup = {}
let ____wordCode = {// _wc || wordcode

    currentProjectPath : "null",

    appSetup : "/app/core/AppContenxt",//they are on @/zuck/graveyard
    webRoute : "/app/WebRoute",
    gsdamSetup : "/app/GSDAM",
    dotenv_setup : "/app/.env",

    usefulFunc : "/app/utility/usefulFunc",
    respon : "/app/utility/respon",
    dbConn_mysql : "/app/utility/dbConn_mysql",
    // dbConn_pgsql : "/app/utility/dbConn_pgsql",

    front_webpage : "/concept/views",
    front_public : "/concept/public",
    back_endmodel : "/concept/models"
}
let ____func = {//_func -- this place will be have so many utilities probably from other files too..
    compare_2String : function(s1, s2){
        if(s1 && s2){return null}
        else if(s1 || s2){
            if(s1){return s1;} else if(s2){return s2;}
        } else{return null;}
    },
    valPort_point : function(valPort = '3000'){//Normalize a port into a number, string, or false.
        if(isNaN(parseInt(valPort, 10) ) ){return valPort}// named pipe
        else if(parseInt(valPort, 10) >= 0 ){return parseInt(valPort, 10) }// normal port number
        else {return false}
    },
    errCheckPath : function(flname, drname, err){
        if(flname == null || drname == null){}
        else{}
    },

    ppFolder : function(name){let pathFolder = `${____wordCode.currentProjectPath}${name}`;return pathFolder;},
    rootRequire : function(name){return require(this.ppFolder(name) );},
    powerful_ppFolder : {},

    _ttime : {
        in_sec : function(tm_sec){return tm_sec * 1000;},
        in_minute : function(tm_min){return this.in_sec(60 * tm_min);},
        in_hour : function(tm_hr){return this.in_minute(60 * tm_hr);}
    },

    commandCheck : function(){//this thing are for checking the environment starting up content but it is not used for now
        let command = [];
        process.argv.forEach(function(val, index, array){//we need to detect -p stuff
            console.log("process " + index + " : " + val)
            command.push(val)
        })
    
        return command;
    },
}

/**///dead new constant
let _vrt = {
    _GSDAM : null, ____trackSetup : {},

    //content to the GSDAM
    ____wordCode : {
        stgpath : {
            currentProjectPath : "null",
            ////cores
            // appSetup :          "/app/core/AppContenxt",//they are on @/zuck/graveyard
            webRoute :          "/app/WebRoute",
            gsdamSetup :        "/app/components/GSDAM",
            dotenv_setup :      "/.env",
            ////concepts
            front_webpage :     "/concept/views",
            front_public :      "/concept/public",
            back_endmodel :     "/concept/models",
            ////utilities || many of it goes to the utilib
            dbConn :            "/app/utility/dbConn",              //unused
            usefulFunc :        "/app/utility/usefulFunc",          //unused
            // respon :            "/app/utility/respon",           //unused
            // dbConn_mysql :      "/app/utility/dbConn_mysql",     //unused
            // dbConn_pgsql :      "/app/utility/dbConn_pgsql",     //unused

        },
    
    },
    ____func : {
        compare_2String : function(s1, s2){
            if(s1 && s2){return null}
            else if(s1 || s2){
                if(s1){return s1;} else if(s2){return s2;}
            } else{return null;}
        },
        valPort_point : function(valPort = '3000'){//Normalize a port into a number, string, or false.
            if(isNaN(parseInt(valPort, 10) ) ){return valPort}// named pipe
            else if(parseInt(valPort, 10) >= 0 ){return parseInt(valPort, 10) }// normal port number
            else {return false}
        },
        errCheckPath : function(flname, drname, err){
            if(flname == null || drname == null){}
            else{}
        },
    
        powerful_ppFolder : {},
        ppFolder : function(name){let pathFolder = `${_vrt.____wordCode.stgpath.currentProjectPath}${name}`;return pathFolder;},
        rootRequire : function(name){return require(this.ppFolder(name) );},
        requiring : function(...names){
            let content = {}
    
            for(let name of names){content[name] = require(name); }
            return content;
        },
    
        _ttime : {
            in_sec : function(tm_sec){return tm_sec * 1000;},
            in_minute : function(tm_min){return this.in_sec(60 * tm_min);},
            in_hour : function(tm_hr){return this.in_minute(60 * tm_hr);}
        },
    
        commandCheck : function(){//this thing are for checking the environment starting up content but it is not used for now
            let command = [];
            process.argv.forEach(function(val, index, array){//we need to detect -p stuff
                console.log("process " + index + " : " + val)
                command.push(val)
            })
        
            return command;
        },
    
    
    },

    ____packlib : [//<< why i drop it using array? maybe they want to add more specific one?
        {//how to use this> go to thisProject@/dump/archive/graveyard/setupjsfile.js
            loadingInfo : {
                pathNamePrefix_dirStg : "$currentProject",
                pathNameWord_dirStg : ["/app/utility"],
                pathNameSuffix_fileStg : null,
                fileMasses : "allin",
                showNull : true,
                info : "collect .js file into contentDataMass(cdm) v0.1"
            },
            cdm : null,
        }
    ],

    ____utilib:{//DEPRECATED && used 4 exact module usage
        usefulFunc :        "/app/utility/usefulFunc",
        dbConn :            "/app/utility/dbConn"
    },

};

/**/

//reactive class
class GSDAM{
    ////----variable content
    constructor(){//because we are referencing them it might be make our job a bit easier
        this._wc = ____wordCode
        this._func = ____func
        this._confParam = {}
    }

    ////----step by step initializement
    //before
    setup1_currentProjectPath(path_stg){
        if(____trackSetup.currentProjectPath){return}

        this._wc.currentProjectPath = path_stg;
        ____trackSetup.currentProjectPath = true;
    }
    setup2_dotenvConfig(){
        if(____trackSetup.dotenvConfig){return}

        let obj_dotenv = require('dotenv').config({ 
            path: ppFolder(____wordCode.dotenv_setup),
            encoding: 'utf-8'
        });
        if(obj_dotenv.error){console.log(__filename.replace(__dirname, "")); console.error(obj_dotenv.error)}
        this._confParam = {
            nodeEnv : process.env.NODE_ENV,
            dbConfig: {
                connectionLimit: 100,
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                user: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                multipleStatements: true
            },
            //we dont use this anymore
            smsServlet : {
                host: process.env.SMS_HOST,
                port: process.env.SMS_PORT,
                username: process.env.SMS_USERNAME,
                password: process.env.SMS_PASSWORD
            },
            token: process.env.TOKEN,
            jwt:process.env.JWT,
        }
        
        ____trackSetup.dotenvConfig = true;
    }
    setup3_initialize_powerful_ppFolder(){
        if(____trackSetup.initialize_powerful_ppFolder){return}
        let keys = Object.keys(this._wc)
        for(let i=0; i<keys.length; i++){
            if(i == 0){continue;} let ky = keys[i]
            this._func.powerful_ppFolder[ky] = this._func.ppFolder(this._wc[ky] )
        }
        ____trackSetup.initialize_powerful_ppFolder = true;
    }
    setup4_add2Func(){
        if(____trackSetup.add2Func){return}
        this._func.usefulFunc = this._func.rootRequire(this._wc.usefulFunc)
        ____trackSetup.add2Func = true;
    }
    setup4a_add2utilib(){
        if(_vrt.____trackSetup.add2utilib){return}
        
        let oj_utilPack = this.utilib
        for(let ky in oj_utilPack){
            try {oj_utilPack[ky] = this.func.rootRequire(oj_utilPack[ky])}
            catch (error) {console.log("Error", error) }
        }
        this.utilib = oj_utilPack

        _vrt.____trackSetup.add2utilib = true;
    }
    

    //after global
    install1_databaseConnection(){
        if(____trackSetup.databaseConnection){return}
        ____trackSetup.databaseConnection = true;

        // this._func.dbConn_pgsql = this._func.rootRequire(this._wc.dbConn_pgsql)
        this._func.dbConn_mysql = this._func.rootRequire(this._wc.dbConn_mysql)
        this._func.respon = this._func.rootRequire(this._wc.respon)
    }
    install1a_databaseConnection(dbchoice = String){//after global
        if(_vrt.____trackSetup.databaseConnection){return}
        _vrt.____trackSetup.databaseConnection = true;

        this.utilib.dbConn._init(dbchoice)
    }

    ////----getter && setter
    getSetupList(){return Object.keys(____trackSetup); }
}


////---- export content
module.exports = {
    __ALLINIT : function(){this._GSDAM.INIT(); },

    //-- singleton pattern gsdam
    _GSDAM  : {
        INIT : function(){if(!__gsdam ){this.getInstance(); } },
        getInstance : function(){if(!__gsdam){__gsdam = new GSDAM();}    return __gsdam ;}
    }
    
}

































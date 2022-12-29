

////----core content
const fs = require("fs");

let _vrt = {
    _GSDAM : null, ____trackSetup : {},

    //content to the GSDAM
    ____wordCode : {//word code might hold another content like word cut or any analogy you want to fill in
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
//this guy doesnt transported out
const contentSetups = {
    contentLoadJSFile : function(data){

        let dataReturn = null;
        const loin = data.loadingInfo;
        const dirprojname = _vrt.____wordCode.stgpath.currentProjectPath
        const ____dirprojectname = (loin.pathNamePrefix_dirStg == "$currentProject") ? dirprojname : null;
    
        switch(data.loadingInfo.fileMasses){
            case "any": break;//<< i dont know what to do in here
    
            case "allin": 
            let ojd_content = []
            for(let vpnw of loin.pathNameWord_dirStg){
                let datafFile_arrs = fs.readdirSync(____dirprojectname + vpnw)
                let processed_datafile = contentSetups.adfType_import(____dirprojectname + vpnw, datafFile_arrs, loin.showNull)
                ojd_content.push(processed_datafile)
            }
            dataReturn = ojd_content
            break;
            case "all": 
            let dataFile_arrs = fs.readdirSync(____dirprojectname + loin.pathNameWord_dirStg)
            dataReturn = contentSetups.adfType_import(____dirprojectname + loin.pathNameWord_dirStg, dataFile_arrs, loin.showNull)
            break;
    
            case "chosenByArray": dataReturn = contentSetups.adfType_import(____dirprojectname + loin.pathNameWord_dirStg, loin.pathNameSuffix_fileStg, loin.showNull); break;
            case "one": dataReturn = contentSetups.odfType_import(____dirprojectname + loin.pathNameWord_dirStg, loin.pathNameSuffix_fileStg);break;
    
        }
    
        data.cdm = dataReturn;
    },
    adfType_import : function(pathname, arrayFileData, showNull = true){
        let fileContents = {}
        for(let idx in arrayFileData){
            let stg_afd = arrayFileData[idx]
            let dojsfile = contentSetups.odfType_import(pathname, stg_afd)
            
            if(!showNull && typeof dojsfile == "string" && dojsfile.includes("(NULL)") ){continue;}
            fileContents[stg_afd.replace(".js","")] = dojsfile
        }
    
        return fileContents
    },
    odfType_import : function(pathname, filename_js){
        if(!(filename_js.includes(".js")) ){return `(NULL)NOT_JSFILE`;}
        try {
            const content = fs.statSync(`${pathname}/${filename_js}`)
            return require(`${pathname}/${filename_js.replace(".js", "")}`)
        } catch (error) {return `(NULL)${error.code}`}
    },
}


class GSDAM{//reactive class
    ////----variable content
    constructor(){//because we are referencing them it might be make our job a bit easier
        this.wc = _vrt.____wordCode
        this.func =_vrt.____func
        // this.utilib = _vrt.____utilib
        this.packlib = _vrt.____packlib
        this.confParam = {}
    }

    ////----step by step initializement
    //before
    setup1_currentProjectPath(path_stg){
        if(_vrt.____trackSetup.currentProjectPath){return}

        _vrt.____wordCode.stgpath.currentProjectPath = path_stg
        this.wc.stgpath.currentProjectPath = path_stg;
        _vrt.____trackSetup.currentProjectPath = true;
    }
    setup2_dotenvConfig(){
        if(_vrt.____trackSetup.dotenvConfig){return}

        let obj_dotenv = require('dotenv').config({ 
            path: this.func.ppFolder(this.wc.stgpath.dotenv_setup),
            encoding: 'utf-8'
        });
        if(obj_dotenv.error){console.log(__filename.replace(__dirname, "")); console.error(obj_dotenv.error)}
        this.confParam = {
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
            token: process.env.TOKEN,
            jwt:process.env.JWT,
        }
        
        _vrt.____trackSetup.dotenvConfig = true;
    }
    setup3_initialize_powerful_ppFolder(){
        if(_vrt.____trackSetup.initialize_powerful_ppFolder){return}

        let keys = Object.keys(this.wc.stgpath)
        for(let i=0; i<keys.length; i++){let ky = keys[i]
            if(i == 0){continue;} //<< 0 is currentProjectPath.
            this.func.powerful_ppFolder[ky] = this.func.ppFolder(this.wc.stgpath[ky] )
        }
        _vrt.____trackSetup.initialize_powerful_ppFolder = true;
    }
    setup4b_loadPacklib(){
        if(_vrt.____trackSetup.loadPacklib){return}

        for(let idx in this.packlib){
            contentSetups.contentLoadJSFile(this.packlib[idx] )
        }

        _vrt.____trackSetup.loadPacklib = true;
    }
    
    install1b_databaseConnection(dbchoice = String){//after global
        if(_vrt.____trackSetup.databaseConnection){return}
        _vrt.____trackSetup.databaseConnection = true;

        this.packlib[0].cdm[0].dbConn._init(dbchoice)
    }


    ////----getter && setter
    getSetupList(){return Object.keys(_vrt.____trackSetup); }


    ////----DEPRECATED
    setup4_add2Func(){
        if(_vrt.____trackSetup.add2Func){return}
        this.func.usefulFunc = this.func.rootRequire(this.wc.stgpath.usefulFunc)
        _vrt.____trackSetup.add2Func = true;
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
    install1_databaseConnection(dbChoice = String){
        if(_vrt.____trackSetup.databaseConnection){return}
        _vrt.____trackSetup.databaseConnection = true;

        switch(dbChoice){
            case "mysql": this.func.dbConn_mysql = this.func.rootRequire(this.wc.stgpath.dbConn_mysql); break;
            case "pgsql": this.func.dbConn_pgsql = this.func.rootRequire(this.wc.stgpath.dbConn_pgsql); break;
        }
        
        this.func.respon = this.func.rootRequire(this.wc.stgpath.respon)
    }
    install1a_databaseConnection(dbchoice = String){
        if(_vrt.____trackSetup.databaseConnection){return}
        _vrt.____trackSetup.databaseConnection = true;

        this.utilib.dbConn._init(dbchoice)
    }
}


////---- export content
module.exports = {//-- singleton pattern gsdam
    ALLINIT : function(){this.GSDAM.getInstance(); },
    GSDAM  : {getInstance : function(){
        if(!_vrt._GSDAM){_vrt._GSDAM = new GSDAM();}    
        return _vrt._GSDAM ;
    } }
}

































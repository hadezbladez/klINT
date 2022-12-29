let first_wc = {
    appSetup : "/____application/AppSetup",
    webRoute : "/____application/WebRoute",
    usefulFunc : "/____application/helper/usefulFunc",

    dbConn : "/____application/libs/dbConn",
    respon : "/____application/libs/respon",

    front_webpage : "/____ff_webpage",
    front_public : "/____ff_public",
    back_endmodel : "/____bb_models"
}



////----old style = class stuff

module.exports = {
    GSDAM : class{
        constructor(projectPath_stg){
            this._wc = first_wc
            this._wc.projectPath_stg = projectPath_stg
        }
    },
};


////----new style = Singleton pattern with enclosing scope

class GSDAM{
    ////----variable content
    //_wc = {} //word code
    constructor(){
        this._wc = first_wc
    }

    ////----getter and setter
    setCurrentProjectPath(path_stg){
        if(this._wc && !this._wc.projectPath_stg){this._wc.projectPath_stg = path_stg;}
    }
}

module.exports = {
    GSDAM : (function(){//-- Singleton pattern || enclosing scope
        let instance
        function createInstance(){instance = new GSDAM();}
        let obj = {
            getInstance : function(){
                if(!instance){createInstance();}
                return instance;
            } 
        }
        return obj;
    })(),
}



////---- new unused thing
let __ALL_Instance = {};
let bcb_instance = {// bcb = build class builder
    gsdam : function(__selfKeyReference){ 
        let useStg = ____func.compare_2String(__selfKeyReference, arguments.callee.name);
        __ALL_Instance[useStg] = new GSDAM()
    }
}
let name_instance = Object.keys(bcb_instance)

module.exports = {
    __ALLINIT : function(){
        this._GSDAM.INIT();
    },

    ////---- All of [Singleton pattern]
    _GSDAM  : {
        INIT : function(){if(!__ALL_Instance[name_instance[0] ] ){this.getInstance(); } },
        getInstance : function(){
            if(!__ALL_Instance[name_instance[0] ] ){bcb_instance[name_instance[0] ] (); }    
            return __ALL_Instance[name_instance[0] ] ;
        }
    }
    
}

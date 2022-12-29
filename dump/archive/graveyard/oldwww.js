let appvars = {server : null, port : null}
let is_content = {//is = initialize and setup
    core :{
        initializeGlobal_forSetup : function(){
            global.ppFolder = function(name){return `${__dirname}${name}`;}
            global.rootRequire = function(name){return require(ppFolder(name));}
        },
        initializeGlobal_forApp : function(){
            let gsdamSetup = rootRequire("/app/GSDAM")
            gsdamSetup.__ALLINIT();
            gsdamSetup._GSDAM.getInstance().setup1_currentProjectPath(__dirname)
            gsdamSetup._GSDAM.getInstance().setup2_dotenvConfig();
            gsdamSetup._GSDAM.getInstance().setup3_initialize_powerful_ppFolder();
            gsdamSetup._GSDAM.getInstance().setup4_add2Func();
    
            global.GSDAM = gsdamSetup._GSDAM.getInstance()
        },
        initializeCondition_forApp : function(){
            appvars.port = global.GSDAM._func.valPort_point(process.env.PORT || "3000")
            global.GSDAM.install1_databaseConnection();
        },
        
        createApp_asInitializedCondition : function(){
            const createError = require('http-errors'); const express = require('express'); //const path = require('path');
            const cookieParser = require('cookie-parser'); const session = require('express-session'); const logger = require('morgan');
            const expressLayouts = require('express-ejs-layouts');          const cors = require("cors");

            const gsdam = global.GSDAM; //using global.GSDAM
            const appCC = express();
    
            let cf_app = {
                inited : false,
                _objSession :{key: 'user_sid', secret: '1the2quick3brown4fox5jumps6over7lazy8dog9', 
                    resave: true, saveUninitialized: true, rolling: true, 
                    cookie: {expires: gsdam._func._ttime.in_hour(24) }
                },
                ppgg :{
                    ___errorOut_page404 : function(req, res, next) {next(createError(404));  },
                    ___errorOut_page : function(err, req, res, next) {
                        let errFix = (req.app.get('env') === 'development') ? err : {}
                        res.locals = {message : err.message,error : errFix}
                        res.status(err.status || 500); 
                        res.render('error/err_pgdev');
                    },
                    ___sessioning : function(req, res, next){
                        let check_userContent = req.cookies.user_sid && !req.session.user
                        if (check_userContent) {res.clearCookie('user_sid');}
                        next();
                    }
                },
            }
            let cf_core = {
                use_cors : function(){appCC.use(  cors({origin: "http://localhost:8081" })  ); },//still an example
                use_renderEngine : function(useLayout_content){
                    /*
                    // renderPage
                    https://stackoverflow.com/questions/17911228/how-do-i-use-html-as-the-view-engine-in-express

                    // about express-ejs-layout
                    https://www.npmjs.com/package/express-ejs-layouts
                    
                    */
                    if(useLayout_content){
                        appCC.use(expressLayouts)
                        appCC.set('layout', "./layout-core/default_layout")
                        appCC.set("layout extractScripts", true)
                    }
                    appCC.set('views', gsdam._func.powerful_ppFolder.front_webpage); //ppFolder(pfc.front_webpage)
                    appCC.set('view engine', 'ejs');

                    appCC.use(express.static(gsdam._func.powerful_ppFolder.front_public ));//ppFolder(pfc.front_public)
                },
                setup_packageDebug : function(){
                    appCC.use(express.json() );
                    appCC.use(express.urlencoded({ extended: false })  );
    
                    appCC.use(logger('dev') ); 
                    appCC.use(cookieParser() ); 
                },
                setup_sessionAndRoute : function(useModel = true){//starting landing-page @ "/"
                    let rw = require(gsdam._func.powerful_ppFolder.webRoute);
                    rw.init(express, useModel)
    
                    appCC.use(session(cf_app._objSession));
                    appCC.use(function(req, res, next){cf_app.ppgg.___sessioning(req, res, next) } );
                    appCC.use('/', rw.getRouter() );//rootRequire(pfc.webRoute)
                },
                setup_errorHandler : function(){
                    appCC.use((req, res, next)=>{cf_app.ppgg.___errorOut_page404(req, res, next)} );
                    appCC.use((err, req, res, next)=>{cf_app.ppgg.___errorOut_page(err, req, res, next)} );
                }
            }
    
            let _app = {
                setupInitialize_appInstances : function(useModel){
                    if(cf_app.inited){return;}
                    cf_app.inited = true;
                    
                    cf_core.use_renderEngine(true);
                    cf_core.setup_packageDebug();
                    cf_core.setup_sessionAndRoute(useModel);
                    cf_core.setup_errorHandler();
                },
                get_appInstances : function(){if(!cf_app.inited){return null;}  return appCC;}
            };

            let useModel = false;
            for(let vr of global.GSDAM.getSetupList() ){if(vr == "databaseConnection"){useModel = true}}
            _app.setupInitialize_appInstances(useModel);
            appvars.app = _app.get_appInstances()
    
        },
        checkAndGet_keyCert_forHTTPS : function(){
            const fs = require('fs')
            try{//working usage
                let key_ssl = fs.readFileSync(`${__dirname}/security/ctf1/cert.key`)
                let pem_ssl = fs.readFileSync(`${__dirname}/security/ctf1/cert.pem`)
                if(key_ssl && pem_ssl){appvars["ssl_content"] = {key : key_ssl, cert : pem_ssl,}  }
                else{throw new error("key and certificate is not valid || not initialized")}
            }catch(err){console.log(err)}
        },
        createServer_basedOnSetupApp : function(){
            appvars.app.set('port',appvars.port); // vvrs.app.disable('etag');

            if(appvars.ssl_content){
                const https = require('https');
                appvars.app.use((req, res, next)=>{
                    if (req.header('x-forwarded-proto') !== 'https') {res.redirect(`https://${req.header('host')}${req.url}`);}
                    else {next();}
                })
                appvars.server = https.createServer(appvars.ssl_content,appvars.app)
            }else{
                const http = require('http');
                appvars.server = http.createServer(appvars.app)
            }
            appvars.server.on("error", (error)=>is_content.svrer_onError(error) )
            appvars.server.on("listening", ()=>is_content.svrer_onListening() )
        },
        cmdProcess_check : function(){
            //Note that Windows does not support sending Signals
            //heroku dont like this || will give an error
            
            // process.on("SIGTERM", function(){console.log("process terminate") })
            // process.on("SIGKILL", function(){console.log("process killed") })
            // process.on('exit', function(){console.log("exited") })
        },
        start_appServer : function(){
            appvars.server.listen(appvars.port); 
            console.log(`starting on port ${appvars.port}`);
        },
    },

    //server context
    svrer_onError : function(error){
        if (error.syscall !== 'listen') {throw error;}

        let port = appvars.port, bind
        if(typeof port === 'string'){bind = `Pipe ${port}`;}
        else{bind = `Port ${port}`;}
    
        switch (error.code) {
            case 'EACCES': console.error(bind + ' requires elevated privileges'); process.exit(1);break;
            case 'EADDRINUSE': console.error(bind + ' is already in use'); process.exit(1); break;
            default: throw error;
        }
    },
    svrer_onListening : function(){
        let addr = appvars.server.address(), bind; 

        if(typeof addr === 'string'){bind = `pipe ${addr}`}
        else{bind = `port ${addr.port}`}
        
        require('debug')('app:server') ('Listening on ' + bind);
    },

}

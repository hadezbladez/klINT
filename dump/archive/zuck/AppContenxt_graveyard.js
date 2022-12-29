const createError = require('http-errors'); const express = require('express'); const path = require('path');
const cookieParser = require('cookie-parser'); const session = require('express-session'); const logger = require('morgan');


//using global.GSDAM
const gsdam = global.GSDAM
const appCC = express();

let cf_app = {
    inited : false,
    _objSession :{key: 'user_sid', secret: 'thequickbrownfoxjumpsoverlazydog', 
        resave: true, saveUninitialized: true, rolling: true, cookie: {expires: gsdam._func.timing_time.in_hour(24) }
    },
    ppgg :{
        ___errorOut_page404 : function(req, res, next) {next(createError(404));  },
        ___errorOut_page : function(err, req, res, next) {
            let errFix = (req.app.get('env') === 'development') ? err : {}
            res.locals = {message : err.message,error : errFix}
            res.status(err.status || 500); res.render('errp/error');
        },
        ___sessioning : function(req, res, next){
            if (req.cookies.user_sid && !req.session.user) {res.clearCookie('user_sid');}
            next();
        }
    },
}
let cf_core = {
    setup_starting : function(){
        //renderPage
        appCC.set('views', gsdam._func.powerful_ppFolder.front_webpage); //ppFolder(pfc.front_webpage)
        appCC.set('view engine', 'ejs');

        //package
        appCC.use(logger('dev') ); 
        appCC.use(cookieParser() ); 

        //express boxing
        appCC.use(express.json() );
        appCC.use(express.urlencoded({ extended: false }));
        appCC.use(express.static(gsdam._func.powerful_ppFolder.front_public ));//ppFolder(pfc.front_public)
    },
    setup_sessionAndRoute : function(){
        let rw = require(gsdam._func.powerful_ppFolder.webRoute);
        rw.init(express)

        appCC.use(session(cf_app._objSession));
        appCC.use(function(req, res, next){ppgg.___sessioning(req, res, next) } );
        appCC.use('/', rw.getRouter() );//rootRequire(pfc.webRoute)
        
        //starting landing-page @ "/"
    },
    setup_errorHandler : function(){
        appCC.use((req, res, next)=>{cf_app.ppgg.___errorOut_page404(req, res, next)} );
        appCC.use((err, req, res, next)=>{cf_app.ppgg.___errorOut_page(err, req, res, next)} );
    }
}



module.exports = {
    setupInitialize_appInstances : function(){
        if(cf_app.inited){return;}
        cf_app.inited = true;

        cf_core.setup_starting();
        cf_core.setup_sessionAndRoute();
        cf_core.setup_errorHandler();
    },
    get_appInstances : function(){
        if(!cf_app.inited){return null;}
        return appCC
    }
};
/*
this can be on www

*/
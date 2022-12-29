
const cors = require("cors")
//using GSDAM
let pfc = global.GSDAM
let ys = pfc.packlib[0].cdm[0].usefulFunc //pfc.utilib.usefulFunc || pfc.func.usefulFunc

let vvart = {
    corsOptions : null,

    //core func
    routeContext : {
        usingModelData : function(){
            let takenModels = vvart.reqFileModel_inDir(pfc.func.powerful_ppFolder.back_endmodel);
            console.log(`${__filename.replace(__dirname, "")}{}..${arguments.callee.name}() >> useModels : true`)
    
            return takenModels
        },
        usingCORS_toPass_someWeb : function(){
            // some legacy browsers (IE11, various SmartTVs) choke on 204
            vvart.corsOptions = {
                origin: 'http://localhost:3434',
                optionsSuccessStatus: 200 
            }
        },
        usingModelList : function(...jsfilenameList){
            const pathToModel = pfc.func.powerful_ppFolder.back_endmodel;
            let objModel = {}

            for(let i=0; i<jsfilenameList.length; i++){
                let jsfilename = jsfilenameList[i]
                objModel[jsfilename] = require(`${pathToModel}/${jsfilename}`)
            }
            console.log(`${__filename.replace(__dirname, "")}{}.. >> useModels : test`)

            return objModel
        }
    },
    //other func
    reqFileModel_inDir : function(pathStg){//<<file .js keying
        let objModel = {}
        ys.fil.redir_sync(pathStg, function(fileContentPart){
            if(!!!(fileContentPart.includes(".js") ) ){return;}
            let key = fileContentPart.replace(".js", "");
            objModel[key] = require(`${pathStg}/${key}`);//<<should not be like this
        });
        return objModel;
    }
}
let sxml = {
    example : {
        pgurl : [],
        pgfunc : function(req, res, next){}
    },
    learn1 : {
        pgurl : ["/testPage", "/testPage/:test"],
        pgfunc : function(req, res, next){
            try{
                let spl = req.originalUrl.split("/")
                if(typeof spl[2] === 'undefined'){throw new Error("non-exist file page")}

                switch(spl[2]){
                    case "1": 
                    return res.render(`cc-page/lo-learn/htt${spl[2]}`, {page:`Test${spl[2]}`, menuId:`Test${spl[2]}` });
                    break;
                    case "2" : 
                    return res.render(`cc-page/lo-learn/htt${spl[2]}`, {people : [
                        {name : 'dave'},
                        {name : 'jerry'}
                    ] });
                    break;
                    default : throw new Error("non-exist file page"); break;
                }
                
            }catch(err){return res.render('cc-page/lo-learn/no', {page:'Test', menuId:'Test' });}
        }
    },
    pixelCave1 : {
        // "/pixelcave/s23corpdashboard", "/pixelcave/s28saaslanding", "/pixelcave/s29navstyle" || etc
        pgurl : ["/pixelcave/:data"],
        pgfunc : function(req, res, next){
            try{
                let spl = req.originalUrl.split("/")
                if(typeof spl[2] === 'undefined'){throw new Error("non-exist file page")}

                switch(spl[2]){
                    case "s23corpdashboard" : case "s28saaslanding" : case "s29navstyle" : case "s33cleandashboard" :
                    case "ta35authpages" : case "tb35authpages" : case "tc35authpages" : 
                    case "tzz36checkout" : case "tzz39pricing" : case "tzz41saaslanding" : case "tzz41saaslanding" : case "tzz43darkdashboard" : 
                    return res.render(`cc-page/pixelcave/${spl[2]}`, {layout : false, page:`pixelcave`, menuId:`test` });
                    break;
                    default : throw new Error("non-exist file page"); break;
                }
                
            }catch(err){return res.render('cc-page/lo-learn/no', {page:'Test', menuId:'Test' });}
        }
    },
}




let content = {//// changeable-content
    router : null,
    routingIdea1 : function(express, useModel){
        
        // vvart.routeContext.usingCORS_toPass_someWeb();//cors usage or no
        this.router = express.Router();

        ////----core function
        this.router
        .get('/*', function(req, res, next){ 
            let datePrint = (new Date()).toUTCString()
            console.log(`modified content = ${datePrint}`)
            res.setHeader('Last-Modified', datePrint);
            next(); 
        })
        //layout testing
        .get('/', (req,res,next)=>{res.render('cc-page/dashboard', {layout : false, page:'Test', menuId:'Test' }); })
        .get('/defaultlayout', (req,res,next)=>{res.render('cc-page/lo-testing/testpage', {page:'Test', menuId:'Test' });})
        .get('/custom1layout', (req,res,next)=>{
            res.render('cc-page/lo-testing/testpage', {layout : 'layout-core/custom1_layout',page:'Test', menuId:'Test' });
        })
        .get('/nolayout', (req,res,next)=>{res.render('cc-page/lo-testing/testpage', {layout : false,page:'Test', menuId:'Test' });  })
        .get('/custom2layout', (req, res, next)=>{
            res.render('cc-page/lo-testing/hejs_mo', {layout : false, page:'Test', menuId:'Test' });
        })
        
        .get("/roaming-test", (req,res,next)=>{
            res.render('cc-page/roaming/roaming-test', {layout : 'layout-core/roaming_layout',page:'Test', menuId:'Test' });
        })
        .get("/roaming-login", (req,res,next)=>{
            res.render('cc-page/roaming/roaming-login', {layout : false,page:'Test', menuId:'Test' });
        })

        .get("/db-test",(req,res,next)=>{res.render('cc-page/dbtest_post', {layout : false,page:'Test', menuId:'Test' });  })

        //when the code gets too long we will going to refactor it
        .get(sxml.learn1.pgurl, (req, res, next)=> sxml.learn1.pgfunc(req, res, next) )
        .get(sxml.pixelCave1.pgurl, (req, res, next)=> sxml.pixelCave1.pgfunc(req, res, next) )
        
        
        //model || untested
        if(!!!(useModel) ){return;}
        let Models = vvart.routeContext.usingModelData()
        this.router
        // .options("/testerPost", cors(vvart.corsOptions) )//using cors
        .post("/kl-insert", cors(vvart.corsOptions), Models.KLdb.insert )
        .post("/kl-update", cors(vvart.corsOptions), Models.KLdb.update )
        .post("/kl-delete", cors(vvart.corsOptions), Models.KLdb.delete )
        .post("/kl-read", cors(vvart.corsOptions), Models.KLdb.read )
        // .post("/kl-delete", cors(vvart.corsOptions), Models.KLdb.insert )
        // .post("/kl-read", cors(vvart.corsOptions), Models.KLdb.insert )
        
        
    }
}
module.exports = {
    init : function(express, useModel){content.routingIdea1(express, useModel)},
    getRouter : function(){return content.router}
}
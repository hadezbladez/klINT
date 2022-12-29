

const fs = require("fs")

let exmp_fd_content = {
    loadingInfo : {
        pathNamePrefix_dirStg : null, // "$currentProject", null
        pathNameWord_dirStg : null, // "/asd/dsa/sdf"
        pathNameSuffix_fileStg : null, // ["any.js", "thing.js", "you.js", "want.js"], "in_here.js"
        fileMasses : null, // "any", "allin", all", "chosenByArray", "one"
        showNull : true,
        info : "collect .js file into contentDataMass(cdm) v0.1"
    },
    cdm : null,
}

let exmp_fd1 = {
    loadingInfo : {
        pathNamePrefix_dirStg : "$currentProject",
        pathNameWord_dirStg : ["/app/utility", "/app/utility/borgen/dfd"],
        pathNameSuffix_fileStg : null,
        fileMasses : "allin",
        showNull : true,
        info : "collect .js file into contentDataMass(cdm) v0.1"
    },
    cdm : null,
}
let exmp_fd2 = {
    loadingInfo : {
        pathNamePrefix_dirStg : "$currentProject",
        pathNameWord_dirStg : "/app/utility",
        pathNameSuffix_fileStg : null,
        fileMasses : "all",
        showNull : true,
        info : "collect .js file into contentDataMass(cdm) v0.1"
    },
    cdm : null,
}
let exmp_fd3 = {
    loadingInfo : {
        pathNamePrefix_dirStg : "$currentProject",
        pathNameWord_dirStg : "/app/utility",
        pathNameSuffix_fileStg : ["ed.txt","callhello.js", "usefulFunc.js"],
        fileMasses : "chosenByArray",
        showNull : true,
        info : "collect .js file into contentDataMass(cdm) v0.1"
    },
    cdm : null,
}
let exmp_fd4 = {
    loadingInfo : {
        pathNamePrefix_dirStg : "$currentProject",
        pathNameWord_dirStg : "/app/utility",
        pathNameSuffix_fileStg : "dbConn.js",
        fileMasses : "one",
        showNull : true,
        info : "collect .js file into contentDataMass(cdm) v0.1"
    },
    cdm : null,
}


function contentLoadJSFile(data){

    let dataReturn = null;
    const loin = data.loadingInfo;
    const ____dirprojectname = (loin.pathNamePrefix_dirStg == "$currentProject") ? __dirname : null;

    switch(data.loadingInfo.fileMasses){
        case "any": 
        
        break;

        case "allin": 
        let ojd_content = []
        for(let vpnw of loin.pathNameWord_dirStg){
            let datafFile_arrs = fs.readdirSync(____dirprojectname + vpnw)
            let processed_datafile = adfType_import(____dirprojectname + vpnw, datafFile_arrs, loin.showNull)
            ojd_content.push(processed_datafile)
        }
        dataReturn = ojd_content
        break;
        case "all": 
        let dataFile_arrs = fs.readdirSync(____dirprojectname + loin.pathNameWord_dirStg)
        dataReturn = adfType_import(____dirprojectname + loin.pathNameWord_dirStg, dataFile_arrs, loin.showNull)
        break;

        case "chosenByArray": dataReturn = adfType_import(____dirprojectname + loin.pathNameWord_dirStg, loin.pathNameSuffix_fileStg, loin.showNull); break;
        case "one": dataReturn = odfType_import(____dirprojectname + loin.pathNameWord_dirStg, loin.pathNameSuffix_fileStg);break;

    }

    data.cdm = dataReturn;
}

////tree2
function adfType_import(pathname, arrayFileData, showNull = true){
    let fileContents = {}
    for(let idx in arrayFileData){
        let stg_afd = arrayFileData[idx]
        let dojsfile = odfType_import(pathname, stg_afd)
        
        if(!showNull && typeof dojsfile == "string" && dojsfile.includes("(NULL)") ){continue;}
        fileContents[stg_afd.replace(".js","")] = dojsfile
    }

    return fileContents
}
function odfType_import(pathname, filename_js){
    if(!(filename_js.includes(".js")) ){return `(NULL)NOT_JSFILE`;}
    try {
        const content = fs.statSync(`${pathname}/${filename_js}`)
        return require(`${pathname}/${filename_js.replace(".js", "")}`)
    } catch (error) {return `(NULL)${error.code}`}
}

////----main
console.log("======")
contentLoadJSFile(exmp_fd4)
console.log(exmp_fd4)

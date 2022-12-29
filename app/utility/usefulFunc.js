////----libraries
var fs = require('fs');

////----content
module.exports = {
    vr : {
        isArr : function (yv){return Array.isArray(yv);},
        isObj : function (yv){return ((typeof yv === 'object') && !isArr(yv) );},//it should is class
        isVal : function (yv){return !isObj(yv) && !isArr(yv);},
        isFunc : function (yv){return typeof zz === 'function'},
        isNon : function (yv){return yv == null},//check if it is null or undefined
    
        //this is value domain
        isNumber : function (yv){return typeof yv === 'number'},
        isString : function (yv){return typeof yv === 'string'},
        isString_hasNumber : function (myString) {return /\d/.test(myString);},
        isString_strictly : function (yv){return isString(yv) && !isJSONString(yv);},
        isJSONString : function (yv){try {JSON.parse(yv); return true} catch (error) {return false} }, //false can be an incomplete JSON
    },
    p : {
        prilog : function(any, spaces){console.log(JSON.stringify(any, null, spaces) );},
        json : {
            fullClone__ : function (oj_toBeCloned){return JSON.parse(JSON.stringify(oj_toBeCloned) );},
            refCopy__ : function (oj_toBeReferenced){return Object.assign({}, oj_toBeReferenced);}
        },
        arr:{
            uniqVal : function (arr = []){let uniqSet = new Set(arr ); return [...uniqSet] }
        }

    },
    fil : {
        wrifi_sync : function (title = String, content = String){fs.writeFileSync(title, content);},
        refi : function (thisPath_fileName = String, fh = function(){}){
            fs.readFile(thisPath_fileName, {encoding: 'utf-8'}, function(err, dataContent){fh(err, dataContent);}) 
        },
        refi_sync : function(thisPath_fileName = String){
            return fs.readFileSync(thisPath_fileName, {encoding: 'utf-8'} )
        },
        redir_sync : function(folderTest = String, whatToDo = function(fil){}){
            return fs.readdirSync(folderTest).forEach(function(fil){
                whatToDo(fil);
            });
        },
        upg1 : {
            __wrifi_sync : function(title = String, ojContent = {}, spaces = 4){
                return fs.writeFileSync(title, JSON.stringify(ojContent, null, spaces) );
            }
        }
    }
}
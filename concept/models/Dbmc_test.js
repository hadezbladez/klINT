

// const async = require("async");
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// var pfc = rootRequire("/____application/PathCheck")

const gsdam = global.GSDAM
const gsdam_dbConn = gsdam.packlib[0].cdm[0].dbConn //gsdam.utilib.dbConn
const db = gsdam_dbConn.modeldb();	//rootRequire(pfc.dbConn)
const respon = gsdam_dbConn.respon;	//rootRequire(pfc.respon) 


const context={
	data:async(req,res)=>{
		try {return await contentChecker(req.body, req, res);}
        catch (error) {return respon.err500(error.message,req.body,res) }
    },
};
module.exports = context;

async function contentChecker(d, req, res){
	console.log(req.body)

    switch (d.a) {//cmd
        case 'db_test' : {
            const q=`SELECT * FROM userkl`;
            const R=await db.query(q); const data=R;
            return respon.ok('Sukses.',data,res);
        }break;
		case 'respon_test' : {
			const data={context : "context" };
            return respon.ok('Sukses.',data,res);
        }break;
        default : throw new Error("Wrong a content"); break;
    }
}







////stuck this
//insertion
function mkStrg_colDat(var_data){
	let stg = '';//<< this causing the fucking error

	if(isArr(var_data) ){//input multi row
		let nmb1 = 0;
		let size = Object.keys(var_data[0]).length;
		stg += "(";
		for(var ky in var_data[0] ){
			stg += ky;

			if(nmb1 == size - 1){}
			else{stg += ', ';}

			nmb1++;
		}
		stg += ")";
	}
	else if(isObj(var_data) ){//input row only
		let numb = 0;
		let size = Object.keys(var_data).length;
		stg += "(";
		for(var ky in var_data){
			stg += ky;

			if(numb == size-1){}else{stg += ', '}
			numb++;
		}
		stg += ")";
	}

	return stg;
}
function mkStrg_varDat1(var_data){
	let stg = [];
	let str = [];

	if(isArr(var_data) ){//array is not yet
		let stg2 = [];
		for(let i = 0; i < var_data.length; i++){
			stg2 = [];
			for(let ky in var_data[i] ){
				stg2.push(var_data[i][ky] );
			}
			stg.push(stg2);
		}
	}
	else if(isObj(var_data) ){
		for(let ky in var_data){
			str.push(var_data[ky] )
		}
		stg = str;
	}
	return stg;
}
//updating
function mkStrg_colDat1(var_data){
	let stg = '';

	if(isArr(var_data) ){//is it like this?
		let numb = 0; let len = Object.keys(var_data[0]).length;
		for(var ky in var_data[0]){
			stg += `${ky} = ?`
			if(numb < len - 1){stg += ', '}
			numb++;
		}
	}
	else if(isObj(var_data) ){//input row only
		let numb = 0; let len = Object.keys(var_data).length;
		for(var ky in var_data){
			stg += `${ky} = ?`
			if(numb < len - 1){stg += ', '}
			numb++;
		}
	}
	return stg;
}


function isArr(yv){return Array.isArray(yv);}
function isObj(yv){return ((typeof yv === 'object') && !isArr(yv) );}//it should is class
function isVal(yv){return !isObj(yv) && !isArr(yv);}

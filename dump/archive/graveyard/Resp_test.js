const gsdam = global.GSDAM

const smple = {
    resp : function(log = String, statuscode, msg, data, res){
        let jsondata = {status:statuscode, message:msg, data:data, }
        if(log){console.log(log)}
        return res.status(statuscode).json(jsondata);
    }
}
const respon = {
    ok : function(msg,data,res){return smple.resp(false, 200, msg, data, res) },
    err400 : function(msg,data,res){return smple.resp('=====>  opps error 400: ' + msg, 400, msg, data, res) },
    err500 : function(msg,data,res){return smple.resp('=====>  opps error 500: ' + msg, 500, msg, data, res) },
}

const context={
	data:async(req,res)=>{
		try {
            const data={context : "context" };
            return respon.ok('Sukses.',data,res);
        }
        catch (error) {return respon.err500(error.message,req.body,res) }
    },
};
module.exports = context;






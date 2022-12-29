'use strict';

exports.ok=(msg,data,res)=>{
	return res.status(200).json({
		status:200,
		message:msg,
		data:data,
	});
};

exports.err400=(msg,data,res)=>{
	console.log('=====>  opps error 400: ' + msg);
	return res.status(400).json({
		status:400,
		message:msg,
		data:data,
	});
};

exports.err500=(msg,data,res)=>{
	console.log('=====>  opps error 500: ' + msg);
	return res.status(500).json({
		status:500,
		message:msg,
		data:data,
	});
};

exports.errpage=(err,data,res)=>{
    console.log('=====>  opps error (Show Page) : ' + data)

    res.status(err.status || 500); 
    res.render('errp/error');
}
exports.reqtoken_=(err,data,res)=>{//request token again
    console.log('=====>  opps error (Show Page) : ',{err, data})
    
    res.status(err.status || 500); 
    res.render('errp/reqtoken_', {error:err, data:data});
}
exports.limitaccess_=(err,data,res)=>{
    console.log('=====>  opps error (Show Page) : ',{err, data})
    res.render('errp/limitaccess', {error:err, data:data});
}

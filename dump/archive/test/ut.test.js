

const fs = require("fs")

async function rf(pathstg){
    let data = await new Promise(function(resolve, reject){
        fs.readFile(pathstg, "utf-8", function(err, data){
            if(err){reject(err)}
            resolve(data)
        })
    })
    return data
}


let pathstg = `${__dirname}/nota.txt`;

test('test readfile promise_then_catch', function(done){

    rf(pathstg).then(function(dataString){
        expect(dataString).toBe("123")
        done()
    }).catch(function(err){done(err) })


});
test('test readfile callback', function(done){
    fs.readFile(pathstg, "utf-8", function(err, dataString){
        if(err){done(err)}
        else{
            expect(dataString).toBe("123")
            done()
        }
    })

});

/*

https://jestjs.io/docs/asynchronous
https://jestjs.io/docs/tutorial-async

try to use promisify thing and test callback?

Promises returning...









*/
var express = require("express");
const { spawn } = require('child_process');

var router = express.Router();

function runPython(path, args) {
    const pyProg = spawn('python', [path].concat(args));
    return new Promise((resolve, reject) => {
        pyProg.stdout.on('data', function(data) {
            resolve(data.toString());
        });
        pyProg.stderr.on('data', (data) => {
            reject(data.toString());
        });
    });
}

async function callPython(meet){
    result = await runPython('public/python/test.py', [meet]);
    console.log(result);
    return result;
}

router.get("/", function(req, res, next) {
    console.log("It's resetting");
});

router.get("/stats_return", async function(req, res, next) {
    res.send(await callPython(req.query.meet));
});

module.exports = router;
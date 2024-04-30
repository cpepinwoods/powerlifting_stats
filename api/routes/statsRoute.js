var express = require("express");
const { spawn } = require('child_process');
var fs = require('fs');

var router = express.Router();

function runPython(path, args) {
    const pyProg = spawn('python', [path, ...args]);
    return new Promise((resolve, reject) => {
        pyProg.stdout.on('data', function(data) {
            resolve(data.toString());
        });
        pyProg.stderr.on('data', (data) => {
            reject(data.toString());
        });
    });
}

async function callPython(path, args){
    return await runPython(path, args);
}

router.get("/", function(req, res, next) {
    console.log("It's resetting");
});

router.get("/stats_return", async function(req, res, next) {
    res.send(await callPython('public/python/stats.py', [req.query.meet]));
});

router.get("/get_meets", function(req, res, next) {
    var files = fs.readdirSync('public/meets/');
    var meets = [];
    files.forEach(file => {
        meets.push(file);
    });
    res.send(meets);
});

router.get("/get_new_meet", async function(req, res, next) {
    res.send(await callPython('public/python/comp_to_csv.py', [req.query.meet]));
});

module.exports = router;
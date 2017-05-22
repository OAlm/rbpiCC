var express = require('express');
var router = express.Router();
var uws = require('uws');
var defaults = require("../defaultSettings.json");

router.get('/gstream/:method', function (req, res) {
    var id = req.query.id;

    var data = {
        proto: "gstream",
        method: req.params.method || defaults.gstream.method,
        sink: req.query.sink || defaults.gstream.sink,
        port: req.query.port || defaults.gstream.port,
        resolution: req.query.resolution || defaults.gstream.resolution,
        vf: req.query.vf || defaults.vf,
        hf: req.query.hf || defaults.hf
    };
    if (id === null) {
        res.status(422).send("id is missing");
    } else {
        global.uwsServer.broadcast(JSON.stringify(data));
        res.status(200).send("OK!");
    }
});
router.get('/wowza/:method', function (req, res, next) {
    var id = req.query.id;
    console.log(req.params.method);
    var data = {
        proto: "wowza",
        method: req.params.method || defaults.wowza.method,
        host: req.query.host || defaults.wowza.host,
        port: req.query.port || defaults.wowza.port,
        app: req.query.app || defaults.wowza.app,
        resolution: req.query.resolution || defaults.wowza.resolution,
        vf: req.query.vf || defaults.vf,
        hf: req.query.hf || defaults.hf

    };
    if (id === null) {
        res.status(422).send("id is missing");
    } else {
        if (global.uwsClientStatus.hasOwnProperty(id)) {
            global.uwsClientStatus[id].flag = false;
        } else {
            global.uwsClientStatus[id] = {flag: false, msg: "no msg"};
        }
        //global.uwsClients[id].send(JSON.stringify(data));
        //TODO check if this works as it supposed to
        global.uwsServer.clients.forEach(function (client) {
            if (client === global.uwsClients[id]) {
                console.log("same"); // Same returned, but this needs testing with multiple clients
                client.send(JSON.stringify(data));
            } else {
                console.log("different");
            }

        });

        next();
    }
}, function (req, res) {

    if(!global.uwsClientStatus[req.query.id].flag) {
        setTimeout(function(){
            if(!global.uwsClientStatus[req.query.id].flag) {
                res.status(200).send("No flag was set");
            }else{
                res.status(200).send(global.uwsClientStatus[req.query.id]);
            }
        },3000); // Delay in client response  3 seconds
    }else{
        res.status(200).send(global.uwsClientStatus[req.query.id]);
    }
});
router.get('/pies', function (req, res) {
    res.status(200).send(Object.keys(global.uwsClients));
});
module.exports = router;

var express = require('express');
var router = express.Router();
var uws = require('uws');
var defaults = require("../defaultSettings.json");
/* GET users listing. */
router.get('/test', function (req, res, next) {

    res.status(200).send("OK!");
});

router.get('/broadcast', function (req, res) {
    global.uwsServer.broadcast("BROADCAST KEKEKEK!");
    res.status(200).send("OK!");
});
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
router.get('/wowza/:method', function (req, res) {
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
        global.uwsServer.broadcast(JSON.stringify(data));
        res.status(200).send("OK!");
    }
});
module.exports = router;

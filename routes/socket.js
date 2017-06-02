/**
 * Created by nikitak on 16.5.2017.
 */
function connection(socket,req) {
    console.log(req);
    //console.log(req.connection.remoteAddress);
    // You might use location.query.access_token to authenticate or share sessions
    // or socket.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)
    socket.on('message', function (message) {
            try {
                var request = JSON.parse(message);
                if (/^\S+\w[^-!@#$%^&*()_+=?/]$/.test(request.id) && request.id.length === 16) {
                    global.uwsClients[request.id] = socket;
                    var msg;
                    if (request.error) {
                        console.log("Request Error: ", request.error);
                        msg = request.error;
                    } else if (request.status === 'rbpiIni') {
                        msg = request.status;
                    } else if (request.msg) {
                        msg = request.msg;
                    } else {
                        msg = "Holo Holo";
                        console.log("Weird request", request);
                    }
                    global.uwsClientStatus[request.id] = {flag: true, msg: msg};
                } else {
                    //TODO register ip address?? Log the false attempt for potential malicious act
                    console.log("Error, id pattern mismatch: ", request.id);
                    global.uwsClientStatus[request.id] = {flag: true, msg: "Holo Holo"};
                }
                /*console.log("Secret: ", request.secret || "No secret");
                console.log("Method: ", request.method || "No method");
                console.log("Data: ", request.data || "No data");*/
                console.log(request);
            } catch (e) {
                console.log("JSON parse Error in socket module");
                console.log("Error: ", e);
                console.log("Message: ", message);
            }
        }
    );
    //TODO check if socket does not exist anymore
    socket.send('{"status":"Transmitter Controller ini"}');
}

module.exports = connection;
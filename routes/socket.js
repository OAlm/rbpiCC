/**
 * Created by nikitak on 16.5.2017.
 */
function connection(socket) {

    console.log("socket module URL /", socket);
    // You might use location.query.access_token to authenticate or share sessions
    // or socket.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)
    socket.on('message', function (message) {
            try {
                var request = JSON.parse(message);
                if (request.error) {
                    console.log("Request Error: ", request.error);
                } else {
                    if (request.status === 'rbpiIni') {
                        if (/^\S+\w[^-!@#$%^&*()_+=?/]$/.test(request.id)&&request.id.length===16) {
                            global.uwsClients[request.id] = socket;
                            global.uwsClientStatus[request.id] = {flag:true,msg:request.status};
                        } else {
                            //TODO register ip address?? Log the false attempt for potential malicious act

                        }
                    }else if(request.msg){
                        if (/^\S+\w[^-!@#$%^&*()_+=?/]$/.test(request.id)&&request.id.length===16) {
                            global.uwsClients[request.id] = socket;
                        } else {
                            //TODO register ip address?? Log the false attempt for potential malicious act

                        }

                        global.uwsClientStatus[request.id] = {flag:true,msg:request.msg};
                    }
                }
                console.log("Secret: ",request.secret || "No secret");
                console.log("Method: ",request.method || "No method");
                console.log("Data: ",request.data || "No data");
                console.log(request);
            }
            catch
                (e) {
                console.log("JSON parse Error in socket module");
                console.log("Error: ", e);
                console.log("Message: ", message);
            }

        }
    );

    socket.send('{"server":"Socket Module"}');
}

module.exports = connection;
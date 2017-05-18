/**
 * Created by nikitak on 16.5.2017.
 */
function connection(socket){

    console.log("socket module URL /", socket);
    // You might use location.query.access_token to authenticate or share sessions
    // or socket.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)
    socket.on('message', function incoming(message) {

        try{
            var request = JSON.parse(message);
            if(request.error){
                console.log("Request Error: ", request.error);
            }
            console.log(request.secret || "No secret");
            console.log(request.method || "No method");
            console.log(request.data || "No data");
            console.log(request);
        }catch(e){
            console.log("JSON parse Error in socket module");
            console.log("Error: ", e);
            console.log("Message: ", message);
        }

    });

    socket.send('Socket Module');
};

module.exports = connection;
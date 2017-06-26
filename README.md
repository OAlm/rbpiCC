# Raspberry pi stream controller
## 1. Installation
`$ git clone git@gitlab.mw.metropolia.fi:sohjoa/rbpiCC.git`  
`$ npm install`
## 2. API

### /api/pies
 - Returns ids of connected transmitters
 
### /api/:proto/:method?id="id"
 - proto is the protocol/application to be used: wowza or gstream.
 - method is method that is to be called: start, stop or status. Defined on transmitter.
 
#### Additional parameters that interface accepts
 - Wowza
    * host - ip address of Wowza streaming engine
    * port - port number of Wowza streaming engine incoming rtsp streams
    * app - application name defined in Wowza streaming engine
    * resolution - video resolution to be transmitted by transmitter
    * vf - vertical flip of the camera true or false
    * hf - horizontal flip of the camera true or false
 - Gstreamer
    * sink - ip address of destination sink
    * port - port number of the destination sink
    * resolution - video resolution to be transmitted by transmitter
    * vf - vertical flip of the camera true or false
    * hf - horizontal flip of the camera true or false
    
  - Example:  
  `/api/wowza/start?id=0003656&host=000.000.000.000&port=80&app=myApp&resolution=10x10&vf=false&hf=true`
  
## 3. Improvements
 - There is no authentication nor authorization when accessing the http api.
 - The api can be extended to work through web sockets.  
 Meaning the connection will be `ClientSocket -> ServerSocket -> ClientSocket`  
 in addition to existing `HTTP_Client -> HTTP_ServerSocket -> ClientSocket`  
  Reason behind having HTTP_Client is the simplicity behind high level of control. 
  If more complex control is to be implemented, then socket connections are the way to go.
  
## 4. Gstreamer    
  
   To view the stream with the gstreamer:
   `gst-launch-1.0 -e -v udpsrc port=5000 ! application/x-rtp, payload=96 ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! fpsdisplaysink sync=false text-overlay=false`
    -e, --eos-on-shutdown Force the end-of-service on sources before shutting the pipeline down
    -v, --verbose  Output status information and property notifications
#remoter  

###Project setup:
Run:
```sh
npm update
```
  
###Running the toy:
1. For the test server, run, in the "server" directory:
```sh
node app_server.js
```
2. For the remoter service, run, in the root directory:
```sh
node socket_server.js
```
3. Open ```http://localhost:5000```, keep it visible 
4. Make a GET on ```http://localhost:8000/control/stop_video``` 
5. PROFIT??

###Next Steps:
* Mobile App
* Two socket.io instances on the same server
* ...

app.service('$socket', ['$rootScope', function($scope)
{
    var ws = new WebSocket("wss://localhost:8080/:443"); 
        ws.onopen = function(){
        console.log("Socket has been opened!");  
    }
    
    this.send = function(string) {
        ws.send(string)
        console.log(string)
    }
}]);


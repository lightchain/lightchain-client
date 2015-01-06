"use strict";
  app.controller('BlobCtrl', ['$rootScope', '$location', '$network', '$vaultClient', 'WebSocket', '$window',
    function ($scope, $location, $network, $vaultClient, WebSocket, $window)
  {
   
  // iframe width/height video on the login page

  var w = angular.element($window);

   $scope.submit = function() {
          
       login(this.username,  this.password)

  }



  function login(username, password){
    //$vaultClient.vaultClient.loginAndUnlock(username, password,  userBlob)//not sure what 3rd argument, device_id, is (vaultclient.js line 138)
    $vaultClient.vaultClient.login(username, password, "lightchain.co",userBlob);

    function userBlob(err, data) {
        
        console.log(data)
      $scope.userBlob = data.blob
      $scope.username = data.username

      //$scope.secret = data.secret

      console.log($scope.userBlob)
       
                    
                    
            $location.path('/wallet')
            $scope.header_hidden = true
            $scope.navbar_visible = true

                $scope.$apply();

            $scope.$on('$routeChangeSuccess', function () { $scope.stopSpin() })
    };//end blob_function()


  }//end login()


}])

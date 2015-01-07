  "use strict"; 

  app.controller('WalletCtrl', ['$scope', '$location', 'MongoDB','$modal', '$connection_status','WebSocket', "Wallet", "WalletManager",
    function ($scope, $location, MongoDB, $modal, $connection_status, WebSocket ,Wallet, WalletManager)
  {

  $scope.curWallet = WalletManager.getCurrentWallet();
  $scope.wallets = WalletManager.getWallets();
  $rootScope.curWallet = $scope.curWallet;

    var backupFile;
  $scope.currentAddress = "1Yj564jDqoB6L7hg5ETYKhqRsB65WrWPB";
  $scope.isActive = true;
  var fileClicked = false;
  setTimeout(function() {
    var el = document.getElementById("first");
    angular.element(el).triggerHandler("click");
    },0);
    
  $connection_status.check();

  /**
   * Add a currency
   */
  $scope.create = function (ROR)
  {
    var lightchain = {
      currency: "Credit",
      incomeRate: ROR
    };
    // Add an element
    $scope.userBlob.unshift("/lightchain", lightchain);

    MongoDB.collection($scope.userBlob.data.account_id);

    var wallet = {type: "contract", currency: lightchain.currency, taxRate: lightchain.incomeRate}

    new MongoDB(wallet).$save().then(function (data) {console.log(data);});
    $connection_status.connect();
  };
  

    /**
     * Remove currency
     *
     * @param index
     */
     
     
    $scope.remove = function (currency) {
      
      // Update blob
      $scope.userBlob.unset('/lightchain_blob');
      
      
      // remove from MongoDB
      MongoDB.collection($scope.userBlob.data.account_id);
                  
        MongoDB.query({type: "contract"}).then(function(data){
                    
          var temp = data;
          var id;
          id = temp[0]._id;
          
          MongoDB.remove_one(id);

        })
      
      $connection_status.disconnect();
    }      
      
      
      MongoDB.collection($scope.userBlob.data.account_id)
      
      MongoDB.query({ type: "safety_net" }).then(function(data){
            var temp = data;
            $scope.safety_net = data[0].total_pathway;

      });
    
      MongoDB.query({ type: "lightchain_blob" }).then(function(data){

      $scope.total_amount = data[0].total_amount;

      });
      
      /***
      updateBalance will work properly but only 30 seconds later since it is a callback.
      ***/
      var updateBalance = function() {
        $scope.curWallet.updateBalance();
        //setTimeout(function() {
          $scope.Balance = $rootScope.Balance = $scope.curWallet.getBalance();
          console.log("Balance " + $scope.Balance);
        //}, 1000);
      };
      updateBalance();
      setInterval(updateBalance, 30000);
      
      
      /***
      Helper function for download
      should be created into module
      ***/
        function download(filename, data) {
        try {
          var a = document.createElement("a");
          a.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(data));
          a.setAttribute("download", filename);
          a.click();
        } catch(e) {
          console.log("download failed " + e);
        }
        
        };
      
      /***
      Controller to back up current wallet
      View location is view\partials\main.html
      File download name is the wallet's name
      JSON is used to format wallet data
      ***/
        $scope.backup = function() {
        var _success = function(password) {
          try {
          var _password = password || Security.get("password");
          var data = Encryption.encrypt(JSON.stringify($scope.curWallet.getAllAddresses()), _password);
          var fileName = $scope.curWallet.getName();
          download(fileName+".json", data); 
          } catch(e) {
            console.log("backup failed " + e);
          }
        };
       /* var checkPassword = {
          check : Security.get("password"),
          success : _success,
          fail : function() {
            modals.open("modalpassword", {
              "message":"Please input password",
              "databaseName":"password",
              "objectName":"password"
            }, _success);
          }
        };*/
        //Security.check(checkPassword,"password","password");
      };

      /***
      Controller to import a wallet that was previously backed up
      View location is view\partials\main.html
      Only imports when file is properly opened
      ***/
        $scope.import = function() {
        var _success = function() {
          var el = document.getElementById("fileUpload");
          angular.element(el).trigger("click");
          var f = document.getElementById("file").files[0];
          if(!f) {
            return;
          }
          var r = new FileReader();
          r.onload = function(e){
            backupFile = e.target.result;
            console.log(backupFile)
            $scope.fileLoaded = true;
          } 
          r.readAsText(f);
        };
        var checkPassword = {
          success : _success,
          fail : function() {
            modals.open("modalpassword", {
              "message":"Please input password",
              "databaseName":"password",
              "objectName":"password"
            }, _success);
          }
        };
        //Security.check(checkPassword,"password","password");      
        };
      
      /***
      Controller to generate new address
      View location is view\partials\main.html
      Address generated will show QR code on html
      Address will be stored in current wallet and walletmanager
      will update.
      ***/
      $scope.generateAddress = function() {
        var _success = function(passphrase) {
          var _passphrase = passphrase ;//|| Security.get("password");
          $scope.currentAddress = $scope.curWallet.generatePublicAddress(_passphrase);
          WalletManager.updateCurrent();
        };
       /* var checkPassword = {
          check : Security.get("password"),
          success : _success,
          fail : function() {
            modals.open("modalpassword", {
              "message":"Please input password",
              "databaseName":"password",
              "objectName":"password"
            }, _success);
          }
        };
        Security.check(checkPassword,"password","password");*/
        };

      /***
      Controller to add a new wallet name after what user typed
      View location is view\partials\sidemenu.html
      WalletManager adds the newly created wallet
      scope.wallets updates list
      WalletManager is called to return current wallet in case user had no wallets to auto-select currently created wallet
      ***/
      $scope.generateWallet = function(WalletName) {
        if(!WalletName || WalletName.length == 0) {
          throw new Error("Improper Wallet Name");
        } else {
          WalletManager.addWallet(new Wallet(WalletName));
          $scope.wallets = WalletManager.getWallets();
          $rootScope.curWallet = $scope.curWallet = WalletManager.getCurrentWallet();
        }
      };

      /***
      Controller to select current wallet in sidemenu
      View location is view\partials\sidemenu.html
      WalletManager,scope.curWallet, and rootScope.curWallet
      are all set to the selected wallet
      ***/
      $scope.select = function(walletRef) {
        if(!walletRef) {
          throw new Error("Undefined Wallet");
        }
        WalletManager.setWalletR(walletRef);
        $rootScope.curWallet = $scope.curWallet = walletRef;
      };

  
  }]);



'use strict';

  app.controller('SettingsController', ['$scope', '$rootScope','WalletManager','LocalStorage',
    function ($scope, $rootScope,WalletManager,LocalStorage)
  {
function SettingsController($scope, $rootScope,WalletManager,LocalStorage){
	
    $scope.pageClass = 'page-settings';
    var storage = LocalStorage;
    $scope.currenciesList;
	$scope.showWallets = false;
    $scope.currencies = [
        {ID: '0', name: "USD" , base: '1' },
        {ID: '1',name: "EUR" , base: '2' }
    ];
    $scope.currentCurrency = {
        "ID": "0",
        "name": "USD",
        "base": "1",
    };
	$scope.wallets = WalletManager.getWallets();

    $scope.passwordChangedSubmit = function() {
      // replace with hasher algorithm sha256 or 3?
        var passDigest = CryptoJS.AES.encrypt("hello",$scope.currentpassword).toString();
        storage.get("security",function(result){
        if(passDigest!== result["security"]["passwordDigest"])
        {
            console.log("false")
            return false; 
        }
        else
        {
            if ($scope.newPassword === $scope.newPasswordConfirm) 
            {
                var walletName = WalletManager.getCurrentWallet();
                console.log(walletName)
                storage.save( "security", "passwordDigest", newPassword);
            }
        }
      
      });
    }

     /*export All wallet*/
    function download(filename, data) {
        var a = document.createElement('a');
        a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
        a.setAttribute('download', filename);
        a.click();
    }

    $scope.backup= function(password){
        var data =  WalletManager.getAddresses();
        var fileName = WalletManager.getCurrentWallet().Name;
        download('Decentral.json', sjcl.encrypt(password, JSON.stringify(data), {ks: 256, ts: 128})); 
    }

    //wallet buttons
    $scope.importWallet = function() {

        var f = document.getElementById('file').files[0];
        if(!f)
        {
            return;
        }

        r = new FileReader();
        r.onload = function(e){
            backupFile = e.target.result;
            console.log(backupFile)
            $scope.fileLoaded = true;
        } 
        r.readAsText(f);
    }
    var unlockImport= function(){
         // modals.password();
        var data;
        // decrypt
        try {
            data = sjcl.decrypt($scope.unlockpassword, backupFile);
        } catch(e) {
            $scope.error = "Bad password: "+e.message;
            return;
        }
        //parse and store in DecenstralStorage

    }


    //Delete current wallet
    $scope.removeWallet = function(walletRef) {
		WalletManager.removeWalletR(walletRef);
		$scope.wallets = WalletManager.getWallets();
		console.log($scope.wallets);
    }
    //check boxes
    $scope.convert = function() {
        console.log("convert")
    }
    $scope.showbalance = function() {
        console.log("balance")
    }
     $scope.trade = function() {
        console.log("trade")
    }
     $scope.coinjoin = function() {
        console.log("coinjoin")
    }   
    
}//End Controller
}]);

  
'use strict';
app.factory("Blockchaininfo", ["$resource", "$window", "$http", function($resource, $window, $http) {

  var baseUrl = "https://blockchain.info";

  var resource = $resource(baseUrl + "/", {}, {
            multiAddr: {
                method: "GET",
                url: baseUrl + '/multiaddr?active=:addresses',
                params: {
                    addresses: "@addresses"
                }
            },
            getBlockCount: {
                method: "GET",
                isArray: false,
                url: baseUrl + "/latestblock",
            },
            getTx: {
                method: "GET",
                isArray: false,
                url: baseUrl + "/rawtx/:txHash",
                params: {
                    txHash: "@txHash"
                }
            },
            getUnspent: {
                method: "GET",
                isArray: false,
                url: baseUrl + "unspent?active=:addresses",
                params:{ 
                  addresses: "@addresses"
                }
            },
            pushTx: {
                method: "POST",
                isArray: false,
                url: baseUrl + "pushtx",
                params: {
                    post_data: "@post_data"
                }
            }

        });


}])

'use strict';

app.service( "Bitcoin", function() {

this.generateTestnetAddress = function() {
	var privKey = new bitcore.PrivateKey.fromRandom('testnet');
	var address = privKey.toAddress();
	return address
}

this.generateP2SHMultisig = function(publickey1 , publickey2, publickey3) {
	// Build a 2-of-3 address from public keys
	var P2SHAddress = new bitcore.Address([publicKey1, publicKey2, publicKey3], 2);
}

this.createTransaction = function() {
	var transaction = new Transaction()
    .from(utxos)          // Feed information about what unspend outputs one can use
    .to(address, amount)  // Add an output with the given amount of satoshis
    .change(address)      // Sets up a change address where the rest of the funds will go
    .sign(privkeySet);    // Signs all the inputs it can
}

this.connectToNetwork = function() {
	var peer = new Peer('5.9.85.34');
	peer.on('inv', function(message) {
	  // new invetory
	});
	peer.connect();
}

this.initiateScript = function() {
	
}

this.buildDataOnBlockchain = function(script) {
	return script.buildDataOut("hello");
}


});

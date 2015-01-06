'use strict';

app.service( "Bitcoin", function() {

function generateTestnetAddress() {
	var privKey = new bitcore.PrivateKey.fromRandom('testnet');
	var address = privKey.toAddress();
	return address
}

function generateP2SHMultisig(publickey1 , publickey2, publickey3) {
	// Build a 2-of-3 address from public keys
	var P2SHAddress = new bitcore.Address([publicKey1, publicKey2, publicKey3], 2);
}

function createTransaction() {
	var transaction = new Transaction()
    .from(utxos)          // Feed information about what unspend outputs one can use
    .to(address, amount)  // Add an output with the given amount of satoshis
    .change(address)      // Sets up a change address where the rest of the funds will go
    .sign(privkeySet)     // Signs all the inputs it can
}

function connectToNetwork() {
	var peer = new Peer('5.9.85.34');
	peer.on('inv', function(message) {
	  // new invetory
	});
	peer.connect();
}

function initiateScript() {
	
}

function buildDataOnBlockchain(script) {
	return script.buildDataOut("hello");
}


});

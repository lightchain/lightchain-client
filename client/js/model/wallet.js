"use strict";
app.factory("Wallet",["Blockchaininfo","LocalStorage",function(Blockchaininfo,LocalStorage){


	var Wallet = function(Name) {
		var self = this;
		this.Assets=[];
		this.Name=Name;
		this.Addresses=[];
		this.Book=[];
		this.Txs=[];
		this.peerBook={};
		this.Balance=0;
		this.CurrentAddress='';
		this.privatekey;
		this.storage= LocalStorage;
		this.blockchain=Blockchaininfo;
		this.Txfee =10000;

		this.initialize=function(wallet)
		{
			this.Assets = wallet.Assets;
			this.Addresses=wallet.Addresses;
			this.Txs=wallet.Txs;
			this.Balance=wallet.Balance;
			this.CurrentAddress=wallet.CurrentAddress;
			this.privatekey=wallet.privatekey;
			//this.storage=wallet.storage;
			this.blockchain=wallet.blockchain;
			this.Txfee =wallet.Txfee;
		};

		this.getName = function() {
			return this.Name;
		};

		this.addAsset = function(asset) {
			this.Assets.push(asset);
		};

		this.getAllAssets = function() {
			return this.Assets;
		};

		this.addAddress = function(address) {
			this.Addresses.push(address);
		};

		this.getAddress = function(ind) {
			return this.Addresses[ind];
		};
		
		this.getCurrentAddress = function(){
			return CurrentAddress;
		};

		this.setCurrentAddress = function(hash){
			CurrentAddress = hash;
		};

		this.getAllTransactions = function() {
			return this.Txs;
		};

		this.addTransaction = function(transaction) {
			this.Txs.push(transaction);
		};

		this.getAllAddresses = function(){
			return this.Addresses;
		};

		this.getBook = function() {
			return this.Book;
		};

		this.setBalance = function(balance){
			this.Balance = balance;
		};

		this.getBalance = function() {
			return this.Balance;
		};

}
return Wallet;
}]);//end factory

let hmac = require("crypto").createHmac;
let	https = require('https');

function coinspot(key, secret) {
  	let self = this;
  	self.key = key;
  	self.secret = secret;

	let request = function(path, pdata, callback) {
		let nonce = new Date().getTime();

		let postdata = pdata || {};
		postdata.nonce = nonce;

		let stringmessage = JSON.stringify(postdata);
		let signedMessage = new hmac("sha512", self.secret);

		signedMessage.update(stringmessage);

		let sign = signedMessage.digest('hex');

		let options = {
			rejectUnauthorized: true,
			method: 'POST',
			host: 'www.coinspot.com.au',
			port: 443,
			path: path,
			headers: {
				'Content-Type': 'application/json',
				'sign': sign,
				'key': self.key
			}
		};

		let req = https.request(options, (resp) => {
			let data = '';
			resp.on('data', function(chunk){
				data += chunk;
			});
			resp.on('end', function(chunk){
				callback(null, data);
			});
		}).on("error", function(e){
			callback(e, data);
		});

		req.write(stringmessage);
		req.end();
	}

	self.sendcoin = function(cointype, amount, address, callback) {
		request('/api/my/coin/send', {cointype:cointype, amount:amount, address:address}, callback);
	}

	self.coindeposit = function(cointype, callback) {
		request('/api/my/coin/deposit', {cointype:cointype}, callback);
	}

	self.quotebuy = function(cointype, amount, callback) {
		request('/api/quote/buy', {cointype:cointype, amount:amount}, callback);
	}

	self.quotesell = function(cointype, amount, callback) {
		request('/api/quote/sell', {cointype:cointype, amount:amount}, callback);
	}

	self.balances = function(callback) {
		request('/api/my/balances', {}, callback);
	}

	self.orders = function(cointype, callback) {
		request('/api/orders', {cointype:cointype}, callback);
	}

	self.myorders = function(callback) {
		request('/api/my/orders', {}, callback);
	}

	self.spot = function(callback) {
		request('/api/spot', {}, callback);
	}

	self.buy = function(cointype, amount, rate, callback) {
		let data = {cointype:cointype, amount:amount, rate: rate}
		request('/api/my/buy', data, callback);
	}

	self.sell = function(cointype, amount, rate, callback) {
		let data = {cointype:cointype, amount:amount, rate: rate}
		request('/api/my/sell', data, callback);
	}

	self.cancelsell = function(id, callback) {
		let data = {id:id}
		request('/api/my/sell/cancel', data, callback);
	}

	self.transactionsHistory = function(startdate, enddate, callback){
		request('/api/ro/my/transactions', {startdate:startdate, enddate:enddate}, callback);
	  }
}

module.exports = coinspot;
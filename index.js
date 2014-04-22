var https = require('https');
var url = require('url');

var shortdiary = function(username, password){
	var username = username;
	var password = password;
	var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");

	var api = 'https://shortdiary.me/api/v1/';


	var request = function(method, path, query, callback){
		var options = url.parse(api+path);
		options.method = method;
		options.path += url.format({'query': query});
		//options.auth = username + ':' + password;
		options.headers = {
			'Accept': 'application/json',
			"Authorization" : auth

		}
		https.request(options, function(res){
			var data = '';
			res.on('data', function(chunk){
				data += chunk;
			});

			res.on('end', function(){
				callback(JSON.parse(data));
			});
		}).end();
	};

	var noop = function(){};

	// GET Requests
	var get = function(path, query, callback){
		request('GET', path, query, callback);
	};

	// POST Requests
	var post = function(path, query, callback){
		request('POST', path, query, callback);
	};

	this.posts = {};

	this.posts.list = function(callback){
		get('posts/', noop, callback);
	};
}

module.exports = shortdiary;
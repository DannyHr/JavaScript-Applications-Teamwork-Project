var app = app || {};

var ajaxRequester = (function() {
	
	function makeGetRequest(url, headers){
		return makeRequest('GET', url, null, headers);
	}
	
	function makePostRequest(url, data, headers){
		return makeRequest('POST', url, data, headers);
	}
	
	function makePutRequest(url, data, headers){
		return makeRequest('PUT', url, data, headers);
	}
	
	function makeDeleteRequest(url, headers){
		return makeRequest('DELETE', url, null, headers);
	}
	
	function makeRequest(method, url, data, headers){
		var queue = Q.defer();
		
		$.ajax({
			url: url,
			method: method,
			data: JSON.stringify(data) || undefined,
			headers: headers,
			success: function (data) {
				queue.resolve(data);
			},
			error: function (data) {
				queue.reject(data);
			}
		});
		
		return queue.promise;
	}
	
	return {
		get: makeGetRequest,
		post: makePostRequest,
		put: makePutRequest,
		delete: makeDeleteRequest
	}
})();

app.ajaxRequester = ajaxRequester;
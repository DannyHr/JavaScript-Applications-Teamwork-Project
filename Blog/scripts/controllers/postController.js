var app = app || {};

app.postController = (function () {
	function PostController(model, viewBag, authorizer) {
		this._model = model;
		this._viewBag = viewBag;
		this._authorizer = authorizer;
	}

	PostController.prototype.addPost = function (data) {
		this._model.addPost(data)
			.then(
				function (response) {
					console.log("Successfully added post");
				},
				function (error) {
					console.error("Couldn't add post");
				}
			).done();
	};

	PostController.prototype.showPostPageById = function (selector, postId) {
		var _this = this;
		this._model.getPostById(postId)
			.then(function (response) {
					console.log("Successfully got post by id");
					_this._viewBag.showPostPageById(selector, response);
				},
				function (error) {
					console.error("Couldn't get post by id");
				}
			).done();
	};

	//PostController.prototype.getAllPosts = function () {
	//	this._model.getAllPosts()
	//		.then(function (response) {
	//				console.log("Successfully got all posts");
	//				var result = [];
	//				response.forEach(function (element) {
	//					//result.push(new Post(element.title, element.content, element._kmd.ect))
	//				});
	//				return result;//TODO FIX THIS (should call viewer)
	//			},
	//			function (error) {
	//				console.error("Couldn't get all posts");
	//			}
	//		);
	//};

	PostController.prototype.showLastPost = function (selector) {
		var _this = this;
		this._model.getLastPost()
			.then(
				function (response) {
					console.log("Successfully got last post");
					var lastPost = response[0];

					_this._viewBag.showLastPost(selector, lastPost);
				},
				function (error) {
					console.error("Couldn't get last post");
				}
			);
	};

	return PostController;
})();
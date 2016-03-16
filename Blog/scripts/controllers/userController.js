var app = app || {};

app.userController = (function () {
	function UserController(model, viewBag, authorizer) {
		this._model = model;
		this._viewBag = viewBag;
		this._authorizer = authorizer;
	}

	UserController.prototype.login = function (data) {
		var _this = this;
		this._model.login(data)
			.then(function (response) {
					console.log("Successful login");
					_this._authorizer.setSessionToken(response._kmd.authtoken);
					_this._authorizer.setUsername(response.username);
					_this._authorizer.setUserId(response._id);

					//TODO: need some fix
					$('#login').children().first().remove();
					$('#login').children().first().text('Log out');

					Sammy(function () {
						this.trigger('redirectUrl', {url: '#/'})
					})
				},
				function (error) {
					console.error("Unsuccessful login");
				}
			).done();
	};

	UserController.prototype.register = function (data) {
		var _this = this;
		this._model.register(data)
			.then(
				function (response) {
					console.log("Successful register");
					_this._authorizer.setSessionToken(response._kmd.authtoken);
					_this._authorizer.setUsername(response.username);
					_this._authorizer.setUserId(response._id);

					Sammy(function () {
						this.trigger('redirectUrl', {url: '#/'})
					})
				},
				function (error) {
					console.error("Unsuccessful register!");
				}
			).done();
	};

	UserController.prototype.editProfile = function () {
		//TODO: IMPLEMENT ME
	};

	UserController.prototype.getById = function (id) {
		//var _this = this;
		this._model.getById(id)
			.then(
				function (response) {
					console.log("Successful get user by id");
					console.log(response); // TODO: implement logic
				},
				function (error) {
					console.error("Unsuccessful getting user by id!");
				}
			).done();
	};

	UserController.prototype.getCurrentUserData = function () {
		this._model.getCurrentUserData();
	};

	UserController.prototype.logout = function () {
		var _this = this;
		this._model.logout()
			.then(
				function (response) {
					console.log("Successful logout");
					_this._authorizer.clearStorage();
				},
				function (error) {
					console.error("Unsuccessful logout!");
				}
			).done();
	};

	UserController.prototype.showLoginPage = function (selector) {
		this._viewBag.showLoginPage(selector);
	};

	UserController.prototype.showRegisterPage = function (selector) {
		this._viewBag.showRegisterPage(selector);
	};

	return UserController;
})();
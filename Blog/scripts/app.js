var app = app || {};

(function () {
	app.router = Sammy(function () {
		var selector = '#main-container';

		var requester = new app.ajaxRequester();
		var authorizer = new app.authorizer('kid_-19uDdP4y-', '0fe0766a2dd747639ab970bf02ee732b');

		var userModel = new app.userModel(requester, authorizer);
		var postModel = new app.postModel(requester, authorizer);

		var userView = new app.userViews();
		var postView = new app.postViews();

		var userController = new app.userController(userModel, userView, authorizer);
		var postController = new app.postController(postModel, postView, authorizer);

		this.get('#/', function () {
			postController.showLastPost(selector);
		});

		this.bind('login', function (e, data) {
			userController.login(data);
		});

		this.bind('register', function (e, data) {
			userController.register(data);
		});

		this.bind('redirectUrl', function (e, data) {
			this.redirect(data.url);
		});

		this.get('#/login', function () {
			userController.showLoginPage(selector);
		});

		this.get('#/register', function () {
			userController.showRegisterPage(selector);
		});

		this.get('#/post', function () {
			$('#main-container').empty();
			var urlQueryVars = app.helpers.getUrlVars();

			postController.showPostPageById(selector, urlQueryVars['id']);
		});
	});

	app.router.run('#/');
}());

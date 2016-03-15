var app = app || {};

(function () {
	app.router = Sammy(function () {
		this.get('#/', function () {
			$.get('templates/main-page.html', function (template) {
				app.data.posts.getLastPost().then(function (lastPost) {

					var outputHtml = Mustache.render(template, lastPost);
					$('#main-container').html(outputHtml);
				}, function (error) {
					console.error(error)
				});

				//app.data.posts.getAllPosts().then(function (allPosts) {
				//	var obj = {"posts":allPosts};
				//	var outputHtml = Mustache.render(template, obj);
				//	$('#main-container').html(outputHtml);
				//
				//}, function (error) {
				//	console.error(error)
				//});
			});
		});

		this.bind('redirectURL', function (e, data) {
			this.redirect(data.url);
		});

		this.get('#/login', function () {
			// showLoginMenu(selector);
			$('#main-container').empty().load('templates/login.html', null, function () {
				$('#login-button').on('click', function () {
					var username = $('#login-username').val();
					var password = $('#login-password').val();
					app.data.users.login(username, password);
					app.router.trigger('redirectURL', {url: '#/'});
				});
			});
		});

		this.get('#/register', function () {
			$('#main-container').empty().load('templates/register.html', null, function () {
				$('#register-button').on('click', function () {
					var username = $('#reg-username').val();
					var password = $('#reg-password').val();
					var name = $('#reg-name').val();
					var about = $('#reg-about').val();
					var gender = $('input[name=gender-radio]:checked').val();
					app.data.users.register(username, password, name, about, gender, 1);
				})
			});
		});

		this.get('#/post', function () {
			$('#main-container').empty();
			var urlQueryVars = app.helpers.getUrlVars();

			//urlQueryVars.forEach(function (item) {
			//	console.log(item + ' -> ' + urlQueryVars[item]);
			//})

			app.data.posts.getPostById(urlQueryVars['id'])
				.then(function (response) {
					$('#main-container').text(response.content);
				}).done();

		});
	});

	app.router.run('#/');
}());

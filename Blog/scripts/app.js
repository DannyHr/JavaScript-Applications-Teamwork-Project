var app = app || {};

(function () {
	app.router = Sammy(function () {
		this.get('#/', function () {

		});

		this.get('#/login', function () {

		});

		this.get('#/register', function () {
			$('#main-container').empty().load('templates/register.html');

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

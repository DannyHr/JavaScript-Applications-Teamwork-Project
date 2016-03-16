var app = app || {};

app.userViews = (function () {
	function UserViews() {
	}

	UserViews.prototype.showLoginPage = function (selector) {
		$.get('templates/login.html', function (templ) {
			$(selector).html(templ);
			$('#login-button').on('click', function () {
				var username = $('#login-username').val(),
					password = $('#login-password').val();

				Sammy(function () {
					this.trigger('login', {username: username, password: password});
					this.trigger('redirectUrl', {url: '#/'});

				});
			});

			$('#register-button').on('click', function () {
				Sammy(function () {
					this.trigger('redirectUrl', {url: '#/register'});

				});
			});
		});
	};

	UserViews.prototype.showRegisterPage = function (selector) {
		$.get('templates/register.html', function (templ) {
			$(selector).html(templ);
			$('#register-button').on('click', function (e) {
				var username = $('#reg-username').val(),
					password = $('#reg-password').val(),
					name = $('#reg-name').val(),
					about = $('#reg-about').val(),
					gender = $('input[name="gender-radio"]:checked').val();


				Sammy(function () {
					this.trigger('register', {
						username: username,
						password: password,
						name: name,
						about: about,
						gender: gender,
						permission_level: 0
					});
				})
			})

			$('#login-button').on('click', function (e) {
				Sammy(function () {
					this.trigger('redirectUrl', {url: '#/login'});
				})
			})
		})
	};

	UserViews.prototype.showAddNewPost = function(selector){
		$.get('templates/add-post.html', function (templ) {
			$(selector).prepend(templ);
			$('#add-post').on('click', function(e){
				Sammy(function(){
					this.trigger('redirectUrl', {url:'#/addPost'})
				})
			})
		})
	};

	return UserViews;
})();

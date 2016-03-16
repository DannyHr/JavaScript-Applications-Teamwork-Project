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
					this.trigger('redirectURL', {url: '#/'});

				});
			});
		});
	};

	UserViews.prototype.showRegisterPage = function (selector) {
		$.get('templates/register.html', function (templ) {
			$(selector).html(templ);
			$('#register').on('click', function (e) {
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
						permissionLevel: 0
					});
				})
			})
		})
	};

	return UserViews;
})();

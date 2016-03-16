var app = app || {};

app.postViews = (function () {
	function PostViews() {
	}

	PostViews.prototype.showLastPost = function (selector, lastPost) {
		$.get('templates/post.html', function (template) {
			var outputHtml = Mustache.render(template, lastPost);
			$(selector).html(outputHtml);
		});
	};

	//PostViews.prototype.showRegisterPage = function (selector) {
	//	$.get('templates/register.html', function (templ) {
	//		$(selector).html(templ);
	//		$('#register').on('click', function (e) {
	//			var username = $('#reg-username').val(),
	//				password = $('#reg-password').val(),
	//				name = $('#reg-name').val(),
	//				about = $('#reg-about').val(),
	//				gender = $('input[name="gender-radio"]:checked').val();
	//
	//
	//			Sammy(function () {
	//				this.trigger('register', {
	//					username: username,
	//					password: password,
	//					name: name,
	//					about: about,
	//					gender: gender,
	//					permissionLevel: 0
	//				});
	//			})
	//		})
	//	})
	//};

	return PostViews;
})();

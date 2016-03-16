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

	PostViews.prototype.showPostPageById = function (selector, post) {
		$.get('templates/post.html', function (template) {
			var outputHtml = Mustache.render(template, post);
			$(selector).html(outputHtml);
		});
	};

	return PostViews;
})();

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

	PostViews.prototype.showAllPostsTitles = function (selector, posts) {
		$.get('templates/all-posts.html', function (template) {
			var data = {posts: posts};
			var outputHtml = Mustache.render(template, data);
			$(selector).html(outputHtml);
		});
	};

	return PostViews;
})();

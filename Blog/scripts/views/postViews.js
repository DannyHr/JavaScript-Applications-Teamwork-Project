var app = app || {};

app.postViews = (function () {
	function PostViews() {
	}

	PostViews.prototype.showLastPost = function (selector, lastPost) {
		$.get('templates/home-page-post.html', function (template) {
			var data = {
				'title': lastPost.title,
				'content': lastPost.content,
				'date': lastPost._kmd.lmt,
				'id': lastPost._id
			};
			var outputHtml = Mustache.render(template, data);
			$(selector).html(outputHtml);
		});
	};

	PostViews.prototype.showPostPageById = function (selector, post) {
		$.get('templates/post.html', function (template) {
			var comments = [];
			post[1].forEach(function (comment) {
				var currentComment = {
					'author': comment.author,
					'date': comment._kmd.ect,
					'content': comment.content
				};

				comments.push(currentComment);
			});

			var data = {
				'title': post[0].title,
				'content': post[0].content,
				'date': post[0]._kmd.lmt,
				'comments': comments
			};

			var outputHtml = Mustache.render(template, data);
			$(selector).html(outputHtml);
		});
	};

	PostViews.prototype.showAllPosts = function (selector, posts) {
		$.get('templates/all-posts.html', function (template) {
			var data = {posts: posts};
			var outputHtml = Mustache.render(template, data);
			$(selector).html(outputHtml);
		});
	};

	return PostViews;
})();

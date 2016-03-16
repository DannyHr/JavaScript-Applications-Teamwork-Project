var app = app || {};

var data = (function () {
    var appId = 'kid_-19uDdP4y-';
    var appSecret = '0fe0766a2dd747639ab970bf02ee732b';

    var credentials = (function () {
        function getHeaders(contentType, useSession) {
            var headers = {};

            if (contentType) {
                headers['Content-Type'] = 'application/json';
            }

            if (useSession) {
                headers['Authorization'] = 'Kinvey ' + getSessionToken();
            }
            else {
                headers['Authorization'] = 'Basic ' + btoa(appId + ':' + appSecret);
            }

            return headers;
        }

        function getGuestHeaders(contentType, useSession) {
            var headers = {};

            if (contentType) {
                headers['Content-Type'] = 'application/json';
            }

            if (useSession) {
                headers['Authorization'] = 'Kinvey ' + getSessionToken();
            }
            else {
                headers['Authorization'] = 'Basic ' + btoa(appId + ':' + appSecret);
            }

            return {
                'Authorization': 'Basic ' + btoa('guest:guest'),
                'Content-Type': 'application/json'
            };
        }

        function getSessionToken() {
            return sessionStorage.getItem('sessionToken');
        }

        function setSessionToken(sessionToken) {
            sessionStorage.setItem('sessionToken', sessionToken);
        }

        function getUserId() {
            return sessionStorage.getItem('userId');
        }

        function setUserId(userId) {
            sessionStorage.setItem('userId', userId);
        }

        function getUsername() {
            return sessionStorage.getItem('username');
        }

        function setUsername(username) {
            sessionStorage.setItem('username', username);
        }

        function clearStorage() {
            sessionStorage.clear();
        }

        return {
            getHeaders: getHeaders,
            getGuestHeaders: getGuestHeaders,
            getSessionToken: getSessionToken,
            setSessionToken: setSessionToken,
            getUserId: getUserId,
            setUserId: setUserId,
            getUsername: getUsername,
            setUsername: setUsername,
            clearStorage: clearStorage
        }
    })();

    var users = (function () {
       // console.log(credentials.getUsername());
       // if (credentials.getUsername() != 'admin') {
            function login(username, password) {
                var data = {
                    'username': username,
                    'password': password
                };

                return app.ajaxRequester.post("https://baas.kinvey.com/user/" + appId + "/login", data, credentials.getHeaders(true))
                    .then(
                        function (response) {
                            console.log("Success");
                            credentials.setSessionToken(response._kmd.authtoken);
                            credentials.setUsername(response.username);
                            credentials.setUserId(response._id);
                            /*TODO: need some fix*/
                            $('#login').children().first().remove();
                            $('#login').children().first().text('Log out');

                        },
                        function (error) {
                            console.error("Unsuccessful login!");
                        }
                    );
            }

        function register(username, password, fullName, aboutInfo, gender, permission_level) {
            var data = {
                'username': username,
                'password': password,
                'name': fullName,
                'about': aboutInfo,
                'gender': gender,
                'permission_level': permission_level
            };

            return app.ajaxRequester.post("https://baas.kinvey.com/user/" + appId, data, credentials.getHeaders(true))
                .then(
                    function (response) {
                        console.log("Success");
                    },
                    function (error) {
                        console.error("Unsuccessful register!");
                    }
                );
        }

        function editProfile() {
            //TODO: IMPLEMENT ME
        }

        function getById(id) {
            return app.ajaxRequester.get("https://baas.kinvey.com/user/" + appId + "/" + id, credentials.getHeaders(true, true))
                .then(
                    function (response) {
                        console.log("Success");
                        console.log(response); // TODO: implement logic
                    },
                    function (error) {
                        console.error("Unsuccessful getting info!");
                    }
                );
        }

        function getCurrentUserData() {
            return getById(credentials.getUserId());
        }

        function logout() {
            return app.ajaxRequester.post("https://baas.kinvey.com/user/" + appId + "/_logout", null, credentials.getHeaders(false, true))
                .then(
                    function (response) {
                        console.log("Success");
                        credentials.clearStorage();
                    },
                    function (error) {
                        console.error("Unsuccessfully logged out!");
                    }
                );
        }

        return {
            login: login,
            register: register,
            editProfile: editProfile,
            getById: getById,
            getCurrentUserData: getCurrentUserData,
            logout: logout
        }

    })();

    var posts = (function () {

        function addPost(postContent) {
            var data = {
                'content': postContent
            };

            return app.ajaxRequester.post("https://baas.kinvey.com/appdata/" + appId + "/Posts", data, credentials.getHeaders(true, true))
                .then(
                    function (response) {
                        console.log("Success");
                    },
                    function (error) {
                        console.error("Couldn't add post");
                    }
                );
        }

        function getPostById(id) {
            return app.ajaxRequester.get("https://baas.kinvey.com/appdata/" + appId + "/Posts/" + id, credentials.getGuestHeaders())
                .then(
                    function (response) {
                        console.log("Success");
                        return response;
                    },
                    function (error) {
                        console.error("Couldn't get post by id");
                    }
                );
        }

        function getAllPosts() {
            return app.ajaxRequester.get("https://baas.kinvey.com/appdata/" + appId + "/Posts?sort={\"_kmd.ect\":-1}", credentials.getGuestHeaders())
                .then(
                    function (response) {
                        var result = [];
                        response.forEach(function (element) {
                            result.push(new Post(element.title, element.content, element._kmd.ect))
                        });
                        return result;
                    },
                    function (error) {
                        console.error("Couldn't get all posts");
                    }
                );
        }

        function getLastPost() {
            return app.ajaxRequester.get("https://baas.kinvey.com/appdata/" + appId + "/Posts?sort={\"_kmd.ect\":-1}&limit=1", credentials.getGuestHeaders())
                .then(
                    function (response) {
                        var lastPost = response[0];
                        return new Post(lastPost.title, lastPost.content, lastPost._kmd.ect);
                    },
                    function (error) {
                        console.error("Couldn't get last post");
                    }
                );
        }

        return {
            addPost: addPost,
            getPostById: getPostById,
            getAllPosts: getAllPosts,
            getLastPost: getLastPost
        }
    })();

    return {
        users: users,
        posts: posts
    }
})();

app.data = data;
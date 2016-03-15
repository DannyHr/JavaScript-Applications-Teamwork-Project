var app = app || {};

var data = (function() {

    var credentials = (function() {

        function getHeaders(contentType, useSession) {
            var headers = {};

            if(contentType){
                headers['Content-Type'] = 'application/json';
            }

            if(useSession){
                headers['Authorization'] = 'Kinvey ' + getSessionToken();
            }
            else{
                headers['Authorization'] = 'Basic a2lkX1pKamljSUc2Q2U6ZGJlYWJhMTFlM2M5NDQxMDgzZTUyMzU5ODMzMzk2ZDc=';
            }

            return headers;
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

        return{
            getHeaders : getHeaders,
            getSessionToken: getSessionToken,
            setSessionToken: setSessionToken,
            getUserId: getUserId,
            setUserId: setUserId,
            getUsername: getUsername,
            setUsername: setUsername,
            clearStorage: clearStorage
        }

    })();

    var users = (function() {
        function login(username, password) {
            var data = {
                'username': username,
                'password': password
            };

            return app.ajaxRequester.post("https://baas.kinvey.com/user/kid_-19uDdP4y-/login", data, credentials.getHeaders(true))
                .then(
                    function(response) {
                        console.log("Success");
                        credentials.setSessionToken(response._kmd.authtoken);
                        credentials.setUsername(response.username);
                        credentials.setUserId(response._id);
                    },
                    function(response) {
                        console.log("Successful login");
                    }
                );
        }

        function register(username, password, fullName, aboutInfo, gender, picture) {
            var data = {
                'username': username,
                'password': password,
                'name': fullName,
                'about': aboutInfo,
                'gender': gender,
                'picture': picture
            };

            return app.ajaxRequester.post("https://baas.kinvey.com/user/kid_bkNWhYc_JW", data, credentials.getHeaders(true))
                .then(
                    function(response){
                        console.log("Success");
                    },
                    function(response){
                        console.log("potato");
                    }
                );
        }

        function editProfile() {
            //TODO: IMPLEMENT ME
        }

        function getById(id) {
            return app.ajaxRequester.get("https://baas.kinvey.com/user/kid_bkNWhYc_JW/" + id, credentials.getHeaders(true, true))
                .then(
                    function(response){
                        console.log("Success");
                    },
                    function(response){
                        console.log("potato");
                    }
                );
        }

        function getCurrentUserData() {
            return getById(credentials.getUserId());
        }

        function logout() {
            return app.ajaxRequester.post("https://baas.kinvey.com/user/kid_bkNWhYc_JW/_logout", null, credentials.getHeaders(false, true))
                .then(
                    function(response){
                        console.log("Success");
                        credentials.clearStorage();
                    },
                    function(response){
                        console.log("Unsuccessfully logged out!");
                    }
                );
        }

        return{
            login: login,
            register: register,
            editProfile: editProfile,
            getById: getById,
            getCurrentUserData: getCurrentUserData,
            logout: logout
        }

    })();

    var posts = (function() {

        function addPost(postContent){
            var data = {
                'content': postContent,
            };

            return app.ajaxRequester.post("https://baas.kinvey.com/appdata/kid_bkNWhYc_JW/posts", data, credentials.getHeaders(true, true))
                .then(
                    function(response){
                        console.log("Success");
                    },
                    function(response){
                        console.log("potato");
                    }
                );
        }

        function getPostById(id){
            return app.ajaxRequester.get("https://baas.kinvey.com/appdata/kid_bkNWhYc_JW/posts" + id, null, credentials.getHeaders(true, true))
                .then(
                    function(response){
                        console.log("Success");
                        console.log(response);
                    },
                    function(response){
                        console.log("potato");
                    }
                );
        }

        function getAllPosts(){
            return app.ajaxRequester.get("https://baas.kinvey.com/appdata/kid_bkNWhYc_JW/posts", credentials.getHeaders(true, true))
                .then(
                    function(response){
                        console.log("Success");
                        console.log(response);
                    },
                    function(response){
                        console.log("potato");
                    }
                );
        }

        return {
            addPost: addPost,
            getPostById: getPostById,
            getAllPosts: getAllPosts
        }

    })();

    return {
        users: users,
        posts: posts
    }
})();

app.data = data;
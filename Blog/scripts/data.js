var app = app || {};

var data = (function() {

    var appId = 'kid_-19uDdP4y-';
    var appSecret = '0fe0766a2dd747639ab970bf02ee732b';

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
                headers['Authorization'] = 'Basic ' + btoa(appId + ':' + appSecret);
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

            return app.ajaxRequester.post("https://baas.kinvey.com/user/" + appId + "/login", data, credentials.getHeaders(true))
                .then(
                    function(response) {
                        console.log("Success");
                        credentials.setSessionToken(response._kmd.authtoken);
                        credentials.setUsername(response.username);
                        credentials.setUserId(response._id);
                    },
                    function(response) {
                        console.log("Unsuccessful login!");
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
                    function(response){
                        console.log("Success");
                    },
                    function(response){
                        console.log("Unsuccessful register!");
                    }
                );
        }

        function editProfile() {
            //TODO: IMPLEMENT ME
        }

        function getById(id) {
            return app.ajaxRequester.get("https://baas.kinvey.com/user/" + appId + "/" + id, credentials.getHeaders(true, true))
                .then(
                    function(response){
                        console.log("Success");
                        console.log(response); // TODO: implement logic
                    },
                    function(response){
                        console.log("Unsuccessful getting info!");
                    }
                );
        }

        function getCurrentUserData() {
            return getById(credentials.getUserId());
        }

        function logout() {
            return app.ajaxRequester.post("https://baas.kinvey.com/user/" + appId + "/_logout", null, credentials.getHeaders(false, true))
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

            return app.ajaxRequester.post("https://baas.kinvey.com/appdata/" + appId + "/Posts", data, credentials.getHeaders(true, true))
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
            return app.ajaxRequester.get("https://baas.kinvey.com/appdata/" + appId + "/Posts/" + id, null, credentials.getHeaders(true, true))
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
            return app.ajaxRequester.get("https://baas.kinvey.com/appdata/" + appId + "/Posts", credentials.getHeaders(true, true))
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
var app = app || {};

(function () {
    app.router = Sammy(function () {
        this.get('#/', function () {
            showHomeMenu(selector);
        });

        this.get('#/login', function () {
           // showLoginMenu(selector);
            $('#main-container').empty().load('templates/login.html', null, function () {
                $('#login-button').on('click', function () {
                    var username = $('#login-username').val();
                    var password = $('#login-password').val();
                    app.data.users.login(username,password);
                    $('#main-container').empty().load('index.html');//TODO: need fix
                });
             //
            });
        });

        this.get('#/register', function () {
            $('#main-container').empty().load('templates/register.html', null, function () {
                $('#register-button').on('click', function () {
                    var username = $('#reg-username').val();
                    var password = $('#reg-password').val();
                    var name = $('#reg-name').val();
                    var about = $('#reg-about').val();
                    var gender = $('input[name=gender-radio]:checked').val();
                    app.data.users.register(username,password,name,about,gender,1);
                })
            });

        });

        this.get('#/students', function () {
            showStudents(selector);
        });
    });

    app.router.run('#/');
}());

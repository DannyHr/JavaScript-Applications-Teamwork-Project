var app = app || {};

(function () {
    app.router = Sammy(function () {
        this.get('#/', function () {
            showHomeMenu(selector);
        });

        this.get('#/login', function () {
            showLoginMenu(selector);
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

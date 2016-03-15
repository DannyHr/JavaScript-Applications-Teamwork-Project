var app = app || {};

(function() {
    app.router = Sammy(function () {
        this.get('#/', function() {
            showHomeMenu(selector);
        });

        this.get('#/login', function() {
            showLoginMenu(selector);
        });

        this.get('#/register', function() {
            $('#main-container').empty().load('templates/register.html');

        });

        this.get('#/students', function() {
            showStudents(selector);
        });
    });

    app.router.run('#/');
}());

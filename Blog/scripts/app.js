var app = app || {};

(function() {
    app.router = Sammy(function () {
        var selector = '#wrapper';

        this.get('#/', function() {
            showHomeMenu(selector);
        });

        this.get('#/login', function() {
            showLoginMenu(selector);
        });

        this.get('#/register', function() {
            $('main').empty().load('templates/register.html');

        });

        this.get('#/students', function() {
            showStudents(selector);
        });
    });

    app.router.run('#/');
}());

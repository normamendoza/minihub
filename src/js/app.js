var  App= {
    version:"{{VERSION}}"
}

/**
 * Enrutador de la aplicación
 */
var app = angular.module('pwfApp', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        }).when('/minihub', {
            templateUrl: 'views/minihub.html',
            controller: 'UserController'
        });
});

/**
 * Variable compartida entre los controladores. se utiliza para añadir
 * elementos a la lista de personas.
 */
app.factory('Shared', function () {
    return {
        user : null
    };
});

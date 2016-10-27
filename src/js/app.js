var  App= {
    version:"{{VERSION}}"
}

/**
 * Enrutador de la aplicación
 */
var app = angular.module('pwfApp', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'login.html',
            controller: 'loginController'
        }).when('/minihub/', {
            templateUrl: 'index.html'});
});

var meses = ['Jan', 'Feb', 'Mar', 'Apr','May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
app.controller('UserController', ['$scope', '$http', function($scope, $http) {
      $scope.username = '';
      $scope.user = null;
      $scope.lista = [];
      $scope.joinedDate = null;
	  var auth = btoa("normamendoza" + ":" + "Norma_93");
      $http.get("https://api.github.com/user", {headers: { Authorization: "Basic " + auth }}).then(
              function (response){
                  $scope.user = response.data;
                  var created = new Date(response.data.created_at);
                  $scope.joinedDate = created.getDay() + " " + meses[created.getMonth()] + " " + created.getFullYear();
              }
      );
      $scope.buscar = function() {
        var username = $scope.username.trim()!= ''? $scope.username : $scope.user.login;
        $http.get("https://api.github.com/users/"+username, {headers: { Authorization: "Basic " + auth }}).then(
              function (response){
                $http.get("https://api.github.com/users/"+username+"/repos", {headers: { Authorization: "Basic " + auth }}).then(
                  function (response){
                    angular.copy(response.data,$scope.lista);
                });
        }, function (error){
			if (error.status == '404'){
               console.log("Usuario no encontrado");
            }
        });
      }
}]);

/**
 * Variable compartida entre los controladores. se utiliza para añadir
 * elementos a la lista de personas.
 */
app.factory('Shared', function () {
    return {
        list: [],
        contacto : {}
    };
});

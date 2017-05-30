app.controller('LoginController', ['$scope', '$http', 'Shared', '$location', function($scope, $http, Shared, $location) {
      if (Shared.user != null){
           $location.path('/minihub');
           return;
      }
      $scope.error = null;
      $scope.login = function() {
        var auth = btoa($scope.username + ":" + $scope.password);
        $http.get("https://api.github.com/user", {headers: { Authorization: "Basic " + auth }}).then(
              function (response){
                Shared.user = response.data;
                Shared.username = $scope.username;
                Shared.password = $scope.password;
                $scope.error = null;
                $location.path('/minihub');
              }, function (error){
		  if (error.status == '404'){
                    console.log("Usuario no encontrado");
                    $scope.error = "Usuario o contraseña incorrectos";
          }else {
 					$scope.error = "Error al obtener datos del usuario";
          }
             });
      }
}]);

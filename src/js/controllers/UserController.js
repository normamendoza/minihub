var meses = ['Jan', 'Feb', 'Mar', 'Apr','May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
app.controller('UserController', ['$scope', '$http', 'Shared', '$location', function($scope, $http, Shared, $location) {
      if (Shared.user == null){
           $location.path('/login');
           return;
      }
      $scope.username = '';
      $scope.user = Shared.user;
      $scope.lista = [];
      $scope.error = ""; 
      
      var created = new Date($scope.user.created_at);
      $scope.joinedDate = created.getDay() + " " + meses[created.getMonth()] + " " + created.getFullYear();
      
      var auth = btoa(Shared.username + ":" + Shared.password);

      $scope.buscar = function() {
        var username = $scope.username.trim()!= ''? $scope.username : Shared.username;
        $http.get("https://api.github.com/users/"+username, {headers: { Authorization: "Basic " + auth }}).then(
              function (response){
                angular.copy(response.data,$scope.user);
                var created = new Date($scope.user.created_at);
                $scope.joinedDate = created.getDay() + " " + meses[created.getMonth()] + " " + created.getFullYear();
                $http.get("https://api.github.com/users/"+username+"/repos", {headers: { Authorization: "Basic " + auth }}).then(
                  function (response){
                    angular.copy(response.data,$scope.lista);
                    $scope.error = response.data.length > 0 ? null : "El usuario no posee ningún repositorio";
                });
        }, function (error){
            if (error.status == '404'){
               $scope.error = "No existe el usuario";
               angular.copy({},$scope.lista);
            }
        });
      }
}]);

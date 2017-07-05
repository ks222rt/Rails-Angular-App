angular.module('myApp')
    .controller('loginController', loginController);

loginController.$inject = ['$scope', '$sessionStorage', '$state', 'LoginFactory'];

function loginController($scope, $sessionStorage, $state, LoginFactory){

    /*
        Calls the LoginFactory to try to login
    */
    $scope.loginUser = function(){
        LoginFactory.tryToLogin($scope.login)
            .success(function(data){
                $sessionStorage.token = {data};
                $sessionStorage.isLoggedIn = true;

                $scope.getUser();
            })
    };

    /*
        Gets the user who´s logging in
    */
    $scope.getUser = function(){
        LoginFactory.getUserByUsername()
            .success(function(data){
                $sessionStorage.user = {data};
                $state.go('all');
            })
    }
};

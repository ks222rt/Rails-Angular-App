angular.module('myApp')
    .controller('NavigationController', NavigationController);

NavigationController.$inject = ['$scope', '$sessionStorage'];

function NavigationController($scope, $sessionStorage){

    /*
        returns the sessionStorage.isLoggedIn.
        Either false or true
    */
    $scope.isLoggedIn = function(){
        return $sessionStorage.isLoggedIn;
    };
}

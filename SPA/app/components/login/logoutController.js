angular.module('myApp')
    .controller('logoutController', logoutController);

logoutController.$inject = ['$scope', '$sessionStorage', '$state', 'LoginFactory'];

function logoutController($scope, $sessionStorage, $state, LoginFactory){
    $sessionStorage.isLoggedIn = false;
    delete $sessionStorage.token;
    delete $sessionStorage.user;
    $state.go('all');
};

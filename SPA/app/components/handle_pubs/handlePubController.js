angular.module('myApp')
    .controller('handlePubController', HandlePubController);

HandlePubController.$inject = ['$scope', '$location','$sessionStorage', '$window', 'events', 'HomeFactory'];

function HandlePubController($scope, $location, $sessionStorage, $window, events, HomeFactory){
    $scope.event = events.data.events;

    /*
        Sends the user to the page to edit a pub
    */
    $scope.editPub = function(id){
        $location.path('/edit_pub/' + id);
    }

    /*
        First displays a confirm window and if the user press yes..
        .. then the pub is deleted, else nothing happens.
    */
    $scope.deletePub = function(id){
        if(confirm('Are you sure you want to remove this pub?')){
            HomeFactory.deleteEvent(id, $sessionStorage.token.data.auth_token)
                .success(function(data){
                    $window.location.reload();
                });
        }
    }
};

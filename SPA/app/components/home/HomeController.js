angular.module('myApp')
    .controller('HomeController', HomeController);

HomeController.$inject = ['$scope', '$sessionStorage', '$location', 'event', 'tags', 'HomeFactory'];

function HomeController($scope, $sessionStorage, $location, event, tags, HomeFactory){
    $scope.oneAtATime = true;
    $scope.event = event.data.events;
    $scope.tags = tags.data.tags;
    $scope.title = 'Pubs';
    $scope.HomeCtrl = true;

    /*
        Sorts all pubs in order: Descending or Ascending
    */
    $scope.SortByOrder = function(order){
        HomeFactory.getEventsInOrder(order).success(function(data){
            $scope.event = data.events;
        });
    };

    /*
        Sends the user to the page to sort on tags
    */
    $scope.SortByTags = function(id){
        $location.path('/tag/' + id.id);
    };

};

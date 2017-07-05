angular.module('myApp')
    .controller('EventQuery', EventQuery);

EventQuery.$inject = ['$scope', '$rootScope', '$location', 'events', 'tags'];

function EventQuery($scope, $location, $rootScope, events, tags){
    $scope.oneAtATime = true;
    $scope.event = events.data.events;
    $scope.tags = tags.data.tags;
    $scope.title = 'Pubs in ' + events.data.events[0].city;

};

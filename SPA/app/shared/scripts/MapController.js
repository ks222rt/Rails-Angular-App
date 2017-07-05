angular.module('myApp')
    .controller('MapController', MapController);

MapController.$inject = ['$scope'];

function MapController($scope, NgMap){
    var vm = this;
    vm.oneEvent = {};
    vm.event = $scope.event;

    /*
        When the map is loaded to the page this function will be triggered and sets the map
    */
    $scope.$on('mapInitialized', function(evt, map){
        vm.map = map;
    });

    /*
        Shows the info window on the map
    */
    vm.showDetail = function(e, events){
        vm.oneEvent = events;
        vm.map.showInfoWindow('map-iw', events);
    }
}

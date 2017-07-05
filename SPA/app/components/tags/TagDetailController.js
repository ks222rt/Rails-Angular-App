angular.module('myApp')
    .controller('TagDetailController', TagDetailController);

TagDetailController.$inject = ['$scope', '$location', 'tags', 'tag', 'tagEvents'];

function TagDetailController($scope, $location, tags, tag, tagEvents){
    $scope.title = tag.data.tag.name;
    $scope.event = tagEvents.data.events;
    $scope.tags = tags.data.tags;
    $scope.oneAtATime = true;
    $scope.tagCtrl = true;

    /*
        Sort by tags. Takes the id and set the path with it.
        If there´s no id it will be redirected to the start page
    */
    $scope.SortByTags = function(id){
        if(id === null){
            $location.path('/');
        }
        else{
            $location.path('/tag/' + id.id);
        }
    };
};

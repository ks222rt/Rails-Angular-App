angular.module('myApp')
    .controller('TagsController', TagsController);

TagsController.$inject = ['$scope', 'tags'];

function TagsController($scope, tags){
    $scope.tags = tags.data.tags;
    $scope.title = 'All tags';
    console.log($scope.tags);
};

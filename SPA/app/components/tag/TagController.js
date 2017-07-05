angular.module('myApp')
    .controller('TagController', TagController);

TagController.$inject = ['$scope', 'tag'];

function TagController($scope, tag){
    $scope.tag = tags.data.tag;
    $scope.title = 'One tag';

    console.log(tag);

};

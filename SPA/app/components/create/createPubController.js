angular.module('myApp')
    .controller('createPubController', CreatePubController);

CreatePubController.$inject = ['$scope', '$sessionStorage', '$location', 'tags', 'HomeFactory'];

function CreatePubController($scope, $sessionStorage, $location, tags, HomeFactory){
    $scope.amountOfTags = [{id: 'tag1'}];
    $scope.tags = tags.data.tags;
    $scope.pub = {};
    $scope.pub.tags = [];

    /*
        Creates a new input field for tags
    */
    $scope.addNewTag = function(){
        var newTag = $scope.amountOfTags.length + 1;
        $scope.amountOfTags.push({'id':'tag' + newTag});
    };

    /*
        Removes a input field for tags
    */
    $scope.removeNewTag = function(){
        var lastTag = $scope.amountOfTags.length - 1;
        $scope.amountOfTags.splice(lastTag);
    };

    /*
        Gets all new tags from the select field and the input field
        Creates a new pub by calling HomeFactory.
    */
    $scope.createPub = function(){
        if($scope.pub.tagsSelect){
            for (var key in $scope.pub.tagsSelect){
                $scope.pub.tags.push({'name': $scope.pub.tagsSelect[key].name});
            }
        }

        if ($scope.pub.tagsInput) {
            for (var key in $scope.pub.tagsInput){
                $scope.pub.tags.push({'name': $scope.pub.tagsInput[key]});
            }
        }

        HomeFactory.createEvent($scope.pub, $sessionStorage.token.data.auth_token)
            .success(function(data){
                $location.path('/handle_pubs/');
            }).error(function(data){
                console.log(data);
            });
    };
};

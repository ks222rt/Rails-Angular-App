angular.module('myApp')
    .controller('editPubController', EditPubController);

EditPubController.$inject = ['$scope', '$sessionStorage', '$location', 'oneEvent', 'tags', 'HomeFactory'];

function EditPubController($scope, $sessionStorage, $location, oneEvent, tags, HomeFactory){
    $scope.pub = oneEvent.data.event;
    $scope.tags = tags.data.tags;
    $scope.amountOfTagsInPub = [];
    $scope.amountOfTags = [];
    $scope.tempPub = {};

    /*
        Check amount of tags existing in the pub
        and creates fields for them.
    */
    checkAmountOfTag = function(){
        $scope.amountOfTagsInPub.splice(0);
        for (var key in $scope.pub.tags){
            $scope.amountOfTagsInPub.push({'id':'tag' + key});
        };
    };

    /*
        If there´s a new tag from the input field or select field it will be pushed to the existing tag array.
        Then calling HomeFactory to edit the pub.
    */
    $scope.editPub = function(){
        if($scope.tempPub.tagsSelect){
            for (var key in $scope.tempPub.tagsSelect){
                $scope.pub.tags.push({'name': $scope.tempPub.tagsSelect[key].name});
            }
        }

        if ($scope.tempPub.tagsInput) {
            for (var key in $scope.tempPub.tagsInput){
                $scope.pub.tags.push({'name': $scope.tempPub.tagsInput[key]});
            }
        }

        HomeFactory.updateEvent($scope.pub, $sessionStorage.token.data.auth_token)
            .success(function(data){
                $location.path('/handle_pubs/');
            });
    };

    /*
        check if the fields arent empty in the form
    */
    $scope.checkFields = function(){
       return $scope.pub !== undefined && $scope.pub.name !== undefined && $scope.pub.address !== undefined && $scope.pub.zip_code !== undefined && $scope.pub.city !== undefined;
   };

    /*
        Adds a new input field
    */
    $scope.addNewTag = function(){
        var newTag = $scope.amountOfTags.length + 1;
        $scope.amountOfTags.push({'id':'tag' + newTag});
    };

    /*
        Remove a input field
    */
    $scope.removeNewTag = function(){
        var lastTag = $scope.amountOfTags.length - 1;
        $scope.amountOfTags.splice(lastTag);
    };

    /*
        Removes a tag from the existing tag array on the pub
    */
    $scope.removeExistingTag = function(id){
        for (var i = 0; i < $scope.pub.tags.length; i++){
            if ($scope.pub.tags[i].id === id) {
                $scope.pub.tags.splice(i, 1);
            }
        }
        checkAmountOfTag();
    };

    checkAmountOfTag();
};

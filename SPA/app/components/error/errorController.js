angular.module('myApp')
    .controller('errorController', ErrorController);

ErrorController.$inject = ['$scope', '$sessionStorage', 'errorFactory'];

function ErrorController($scope, $sessionStorage, errorFactory){
    $scope.error = false;
    $scope.alerts = [];

    /*
        Sets the error msg to display
    */
    setAlerts = function(){
        var error = errorFactory.getErrorMsg();
        if (error != undefined) {
            $scope.alert = [{ type: error.type, msg: error.msg  }];
            $scope.error = true;
        }
    }

    /*
        calls on setAlerts() if there´s an new error msg
    */
    if($sessionStorage.errorExist){
        setAlerts();
    }

    $sessionStorage.error = $scope.alerts;

    /*
        Closes the error msg
    */
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
};

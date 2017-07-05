angular.module('myApp')
    .factory('errorFactory', ErrorFactory);

ErrorFactory.$inject = ['$sessionStorage'];

function ErrorFactory($sessionStorage){
    var exports = {}

    /*
        Gets and returns a error msg from the sessionStorage
    */
    exports.getErrorMsg = function(){
        if ($sessionStorage.errorExist && $sessionStorage.error != undefined) {
            return $sessionStorage.error;
        }
        return undefined;
    }

    return exports;
}

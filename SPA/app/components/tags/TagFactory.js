angular.module('myApp')
    .factory('TagFactory', TagFactory);

function TagFactory($http, myConfig, $sessionStorage, $state){
    var exports = {};

    var config = {
        headers: {
            'Authorization': 'Token token=' + myConfig.APIKEY,
            'Content-Type': 'Application/json'
        }
    };

    /*
        Get all tags
    */
    exports.getTags = function(){
        return $http.get(myConfig.baseUrl + 'tags', config)
                .error(function(data){
                    setErrorMsg(data.error, 'danger');
                });
    };

    /*
        Get on tag based on id
    */
    exports.getOneTag = function(id){
        return $http.get(myConfig.baseUrl + 'tags/' + id, config)
                .error(function(data){
                    setErrorMsg(data.error, 'danger');
                });
    };

    /*
        Get pubs based on tag id
    */
    exports.getEventsOnTag = function(id){
        return $http.get(myConfig.baseUrl + 'tags/' + id + '/events', config)
                .error(function(data){
                    setErrorMsg(data.error, 'danger');
                });
    };

    /*
        sets error or succes msg to be shown
    */
    setErrorMsg = function(data, type){
        $sessionStorage.error.push({ type: type, msg: data});
        $sessionStorage.errorExist = true;
        $state.go('all');
    }

    return exports;
}

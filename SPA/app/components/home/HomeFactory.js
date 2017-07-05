angular.module('myApp')
    .factory('HomeFactory', HomeFactory);

function HomeFactory($http, myConfig, $sessionStorage, $state){
    var exports = {}

    var config = {
        headers: {
            'Authorization': 'Token token=' + myConfig.APIKEY,
            'Content-Type': 'Application/json',
            'authtoken': ''
        }
    };

    /*
        Get all pubs
    */
    exports.getEvents = function(){
        return $http.get(myConfig.baseUrl + 'events', config)
                    .error(function(data){
                        setErrorMsg(data.error, 'danger');
                    });
    };

    /*
        Get all pubs based on city
    */
    exports.getEventsBySearch = function(query){
        return $http.get(myConfig.baseUrl + 'events?search=' + query, config)
                    .error(function(data){
                        setErrorMsg(data.error, 'danger');
                    });
    };

    /*
        Get all pubs in order, Descending or ascending
    */
    exports.getEventsInOrder = function(query){
        return $http.get(myConfig.baseUrl + 'events?order=' + query, config)
                    .error(function(data){
                        setErrorMsg(data.error, 'danger');
                    });
    };

    /*
        Get all pubs based on creator
    */
    exports.getEventsByCreator = function(){
        return $http.get(myConfig.baseUrl + 'creators/' + $sessionStorage.user.data.creator.id + '/events', config)
                    .error(function(data){
                        setErrorMsg(data.error, 'danger');
                    });
    };

    /*
        Get pub based on pub ID
    */
    exports.getEventOnId = function(id){
        return $http.get(myConfig.baseUrl + 'events/' + id, config)
                    .error(function(data){
                        setErrorMsg(data.error, 'danger');
                    });
    };

    /*
        Creates a pub
    */
    exports.createEvent = function(pub, token){
        config.headers.authtoken = token;
        var events = {
                        event:{
                            name: pub.name,
                            address: pub.address,
                            zip_code: pub.zip_code,
                            city: pub.city,
                            tags_attributes: pub.tags
                        }
                    };

        return $http.post(myConfig.baseUrl + 'events', JSON.stringify(events), config)
                    .success(function(data){
                        // Ful kod men funkar
                        setErrorMsg('Pub added to the list', 'success')
                    })
                    .error(function(data){
                        setErrorMsg(data.error, 'danger');
                    });
    };

    /*
        Updates a pub
    */
    exports.updateEvent = function(pub, token){
        config.headers.authtoken = token;
        var events = {
                        event:{
                            name: pub.name,
                            address: pub.address,
                            zip_code: pub.zip_code,
                            city: pub.city,
                            tags_attributes: pub.tags
                        }
                    };

        return $http.put(myConfig.baseUrl + 'events/' + pub.id, JSON.stringify(events), config)
                    .success(function(data){
                        setErrorMsg(data.success, 'success');
                    })
                    .error(function(data){
                        setErrorMsg(data.error, 'danger');
                    });
    };

    /*
        Deletes a pub
    */
    exports.deleteEvent = function(id, token){
        config.headers.authtoken = token;

        return $http.delete(myConfig.baseUrl + 'events/' + id, config)
                    .success(function(data){
                        setErrorMsg(data.success, 'success');
                    })
                    .error(function(data){
                        setErrorMsg(data.error, 'danger');
                    });
    };

    /*
        Set error or success msg in sessionStorage to be shown
    */
    setErrorMsg = function(data, type){
        $sessionStorage.error.push({ type: type, msg: data});
        $sessionStorage.errorExist = true;
        $state.go('all');
    }

    return exports;
};

let request_app = angular.module('requestProviderCtrl', ['appConfigCtrl']);

/* route: /collections */
my_collections_app.controller(
    'requestCtrl',
    function($http, $scope, $window, $location) {

        $scope.response_rdy = false;
        $scope.request_error = false;

        let baseURL = new $window.URL($location.absUrl()).hash.replace('#!/', "");
        let URL = baseURL.split('/');
        let current_request = $scope.getRequest(URL);

        /* trigger the request and process the data */
        $http(current_request).then(function(response){
            $scope.response_rdy = true;

            /* COLLECTIONS */
            if (URL[0] === 'collections'){

                if (URL.length === 2){
                    $scope.collection = response.data;
                    $scope.collection['title'] = response.data['http://purl.org/dc/elements/1.1/title'];
                }
                else {
                    $scope.content_output = $scope.process_data(response.data);
                }
            }

            /* EVALUATIONS */
            else if (URL[0] === 'evaluations'){
                $scope.content_output = response.data;
                for (let evalIterator in $scope.content_output){
                    let evaluation = $scope.content_output[evalIterator];
                    evaluation['collection'] = parseFloat(evaluation['collection'].split('/').slice(-1)[0]);
                }
            }

            /* METRICS */
            else if (URL[0] === 'metrics'){
                if (URL.length === 2){
                    $scope.metric = response.data;
                }
                else {
                    $scope.content_output = response.data;
                }
            }
        },
        function(error){
            $scope.response_rdy = true;
            $scope.request_error = true;
        });



    }
);
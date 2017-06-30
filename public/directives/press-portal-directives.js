(function () {
    angular
        .module('pressPortalDirectives',[])
        .directive('backButton', backButton);

    function backButton($routeParams, $window) {
        return{
            link: linkFunction
        };
        function linkFunction(scope, element, attrs) {
            element.on('click', function() {
                $window.history.back();
                });
        }
    }
})();
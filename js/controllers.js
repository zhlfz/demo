angular.module('starter.controllers', [])
    .controller('ListCtrl', function ($scope, $timeout) {
        $scope.items = [
            { id: 1 },
            { id: 2 },
            { id: 3 },
            { id: 4 },
            { id: 5 },
            { id: 6 },
            { id: 7},
            { id: 8},
            { id: 9},
            { id: 10},
            { id: 11},
            { id: 12},
            { id: 13}
        ];

        $scope.maxList = $scope.items.length + 1;
        $scope.minList = 0;
        $scope.doRefresh = function () {
            $timeout(function () {
                $scope.items.splice(0, 0,
                    { id: $scope.minList--}
                );
                $scope.$broadcast('scroll.refreshComplete');
            }, 1000);
        };

        $scope.loadMore = function () {
            $timeout(function () {
                $scope.items.push(
                    { id: $scope.maxList++}
                );
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }, 1000);
        };

        $scope.$on('stateChangeSuccess', function () {
            $scope.loadMore();
        });
    })
    .controller('NewsCtrl', function ($scope, $timeout,$http) {
        $scope.items = [
            {
                id: 1,
                title: '1',
                image: "",
                content: "6"
            },
            {
                id: 2,
                title: '2',
                image: "",
                content: "7"
            }
        ];

        $scope.doRefresh = function () {
            $http.get('json.json').success(function(data) {
                $scope.items.splice(0, 0,
                    data.abc
                );
            });
                $scope.$broadcast('scroll.refreshComplete');
        };

        $scope.loadMore = function () {
                $scope.items.push(
                    { id: 2}
                );
                $scope.$broadcast('scroll.infiniteScrollComplete');
        };

        $scope.$on('stateChangeSuccess', function () {
            $scope.loadMore();
        });
    });

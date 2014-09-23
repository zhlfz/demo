angular.module('starter.controllers', [])
    .controller('DemoCtrl', function ($scope) {
        $scope.items = [
            {id:1,title:"列表",url:"list"},
            {id:2,title:"新闻",url:"news"}
        ];
        $scope.$on('stateChangeSuccess', function () {
        });
    })

    .controller('ListCtrl', function ($scope, $timeout) {
        $scope.items = [
            { id: 1 },
            { id: 2 },
            { id: 3 },
            { id: 4 }
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
                    data
                );
            });
                $scope.$broadcast('scroll.refreshComplete');
        };

        $scope.loadMore = function () {

            $http.get('json2.json').success(function(data) {
                $scope.items.push(
                    data
                );
            });

                $scope.$broadcast('scroll.infiniteScrollComplete');
        };

        $scope.$on('stateChangeSuccess', function () {
//            $scope.loadMore();
        });
    });

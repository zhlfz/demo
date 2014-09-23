angular.module('starter.controllers', [])
    .controller('DemoCtrl', function ($scope) {
        $scope.items = [
            {id: 1, title: "列表", url: "list"},
            {id: 2, title: "新闻", url: "news"}
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
    .controller('NewsCtrl', function ($scope, $timeout, $http) {
        $scope.imgs = [];
        $scope.news = [];
        $scope.doRefresh = function () {
            $http.get('json.json').success(function (json) {
                $scope.imgs = json.imgs.concat($scope.imgs);
                $scope.news = json.news.concat($scope.news);
            });
            $scope.$broadcast('scroll.refreshComplete');
        };

        $scope.loadMore = function () {
            $http.get('json2.json').success(function (data) {
                $scope.items.push(
                    data
                );
                $scope.moreDataCanBeLoaded = false;
            });

            $scope.$broadcast('scroll.infiniteScrollComplete');
        };

        $scope.$on('stateChangeSuccess', function () {
//            $scope.loadMore();
        });
    });

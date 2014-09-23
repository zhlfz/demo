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

/**
 * 新闻列表
 */
    .controller('NewsCtrl', function ($scope, $http) {

        $scope.imgs = []; //图片滚动新闻
        $scope.news = []; //列表新闻

        //通过Ajax获取信息
        $http.get('json.json').success(function (json) {
            $scope.imgs = json.imgs;
            $scope.news = json.news.concat($scope.news);
        });
        //开启加载更多
        $scope.moreDataCanBeLoaded = true;

        //下拉刷新事件
        $scope.doRefresh = function () {
            $http.get('json.json').success(function (json) {
                $scope.imgs = json.imgs;
                $scope.news = json.news.concat($scope.news);
                $scope.moreDataCanBeLoaded = true;
            }).error(function (data, status, headers, config) {

            });
            $scope.$broadcast('scroll.refreshComplete');

        };

        //上拉加载更多
        $scope.loadMore = function () {
            $http.get('json2.json').success(function (data) {
                $scope.items.push(
                    data
                );

                if (data == null) {
                    //如果没有更多信息，关闭加载更多
                    $scope.moreDataCanBeLoaded = false;
                }

            }).error(function (data, status, headers, config) {
                //如果请求失败，关闭加载更多
                $scope.moreDataCanBeLoaded = false;
            });
            $scope.$broadcast('scroll.infiniteScrollComplete');
        };
        $scope.$on('stateChangeSuccess', function () {
            $scope.loadMore();
        });
    })

/**
 * 新闻列表
 */
    .controller('NewsDetailCtrl', function ($scope, $stateParams, $http) {
        console.log($stateParams)
    })
;

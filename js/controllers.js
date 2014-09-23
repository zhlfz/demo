angular.module('starter.controllers', [])
    .controller('DemoCtrl', function ($scope) {
        $scope.items = [
            {id: 1, title: "列表", url: "list"},
            {id: 2, title: "新闻", url: "news"},
            {id: 3, title: "ActionSheet ", url: "actionSheet"}
            ]
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
 * 新闻内容
 */
    .controller('NewsDetailCtrl', function ($scope, $stateParams, $http) {
        $scope.id = $stateParams.id;
        $scope.news = {
            id: $scope,
            title: "我司 “临时租车信息系统”9月18日上线9月18日上线9月18日上线",
            img:"http://www.deppon.com/u/cms/cms/201407/11103526bfoq.jpg",
            date:"2014-05-20 21:00",
            content:'（编辑部讯 记者 赵亚娣）“这个外租车使用没有约车编号，没按照规定约车却报销了。”审计员A。“咦？明明是开单非上门接货的单号，怎么报销了外租车费用？”接送货管理专员B。        “这个月外租车费用有多少没报销，又有多少跨月的？”车队经理C。        “真纠结，没有外租车业务明细，怎么做分析呢？”运力管理专员D。接触过外租车的同事都知道，上述种种情景，是我们日常在进行外租车管理时经常遇到的问题。记者从运输规划部获悉，外租车以往是以现场纸质单据进行管理和报销，并未与系统上的业务运行记录相关联，规范难、取数难、管控难，是外租车运输成本管控的三大难题。为更好地对外租车进行管控，解决困扰我们的这些问题，今年3月开始，我司运输规划部联合流程支撑中心、财务、市场等部门打造了基于foss系统、财务系统、预算卡控系统集合而成的“临时租车信息系统”。据了解，该系统已于9月18日上线，共涉及17次跨部门会议，65项流程决策，139条意见征询反馈等。临时租车信息系统主要通过对外租车运输记录的标记，从foss运输明细发起对应费用报销，把原来仅以线下纸质单据为报销凭证优化为以线上系统运输记录为报销凭证，保证了财务报销的真实性，以及与业务数据的一致性。其主要功能点有：一、系统上规范报销流程。财务报销直接和业务运输明细相关联，报销费用与业务发生保持一致，规避虚报风险。二、系统上规范约车流程。营业部自行外租车前必须按流程进行系统约车操作，以约车编号作为费用报销的前置条件。三、系统上规范开单流程。上门接货开单时必须按流程进行勾选，否则非上门接货、自提货物无法报销外租车费用。四、系统上记录外租车数据明细。每一趟出车都会有运行记录和费用记录，为管理提供数据支持。悉，为保证系统的稳定性，在9月18日系统上线后，会先选择上海区域作为试点，全国推广时间将在10月9日后根据试用情况而定。运输规划部高级总监张成明表示：“临时租车信息系统的建设，改变了以往外租车管理失控的局面，弥补了流程的漏洞、建立了外租车数据库，使外租车管理透明化，对外租车管理有着重要意义。在后续的试点及推广中，我们既要做好推广培训，也要搭建好反馈平台，及时解决异常，确保系统顺利运行。”',
            attachment:"none",
            attachment_url:""
        };
    })

/**
 *
 */
    .controller('ActionSheetCtrl', function ($scope, $ionicActionSheet, $timeout) {
        $scope.show = function() {
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    { text: '<b>分享按钮</b> ' },
                    { text: '移动按钮' }
                ],
                destructiveText: '警告的文字',
                titleText: '操作，10秒自动消失',
                cancelText: '取消',
                cancel: function() {
                    // add cancel code..
                },
                buttonClicked: function(index) {
                    return true;
                }
            });

            // For example's sake, hide the sheet after two seconds
            $timeout(function() {
                hideSheet();
            }, 10000);
        };



    })
;

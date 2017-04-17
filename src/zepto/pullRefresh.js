/**
 * H5高性能下拉刷新组件
 * 
 * zepto版
 * @author tennylv
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], function () {
      return (root.returnExportsGlobal = factory());
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    root['AlloyPullRefresh'] = factory();
  }
}(this, function () {

    var AlloyPullRefresh = {
        init: function(opt){

             var dragThreshold = opt.dragThreshold || 0.3; // 临界值

             var moveCount = opt.moveCount || 200; // 位移系数

             var dragStart = null;// 开始抓取标志位

             var percentage = 0;// 拖动量的百分比

             var changeOneTimeFlag = 0;// 修改dom只执行1次标志位

             var joinRefreshFlag = null;// 进入下拉刷新状态标志位

             var refreshFlag = 0;// 下拉刷新执行是控制页面假死标志位

             var pullIcon = $('#pullIcon');// 下拉loading

             var pullText = $('#pullText');// 下拉文字dom

             var pullArrow = $('#arrowIcon');// 下拉箭头dom

             var dom = $(opt.container);


             dom.on('touchstart', function(event){


                if (refreshFlag) {
                    event.preventDefault();
                    return;
                }


                 event = event.touches[0];
                 dragStart = event.clientY;

                 dom.css('-webkit-transition', 'none');
                 pullIcon.hide();
                 pullArrow.removeClass('down');
                 pullArrow.removeClass('up');
             });
            
            dom.on('touchmove', function(event){

                if (dragStart === null) {
                    return;
                }

                if (refreshFlag) {
                    event.preventDefault();
                    return;
                }


                var target = event.touches[0];

                percentage = (dragStart - target.clientY) / window.screen.height;

                // 当且紧当scrolltop是0且往下滚动时才触发
                if (document.body.scrollTop == 0) {
                    if (percentage < 0) {
                        event.preventDefault();
                        if (!changeOneTimeFlag) {
                            pullArrow.show();
                            opt.beforePull && opt.beforePull();
                            changeOneTimeFlag = 1;

                        }

                        var translateX = -percentage*moveCount;

                        joinRefreshFlag = true;

                        if (Math.abs(percentage) > dragThreshold) {
                            pullText.text('释放刷新');
                            pullArrow.removeClass('down');
                            pullArrow.addClass('up');
                        } else {
                            pullText.text('下拉刷新');
                            pullArrow.removeClass('up');
                            pullArrow.addClass('down');
                        }


                        if (percentage > 0) {

                             dom.css('-webkit-transform', 'translate3d(0,' + translateX + 'px,0)');
                        } else {
                            dom.css('-webkit-transform', 'translate3d(0,' + translateX + 'px,0)');
                        }
                    } else {

                        if (joinRefreshFlag == null) {
                            joinRefreshFlag = false;
                        }
                    }
                } else {

                    if (joinRefreshFlag == null) {
                        joinRefreshFlag = false;
                    }
                }


            });
            dom.on('touchend', function(event){

                if (percentage === 0) {
                    return;
                }


                if (refreshFlag) {
                    event.preventDefault();
                    return;
                }


                if (Math.abs(percentage) > dragThreshold && joinRefreshFlag) {


                    opt.onRefresh && opt.onRefresh();


                    dom.css('-webkit-transition', '330ms');
                    pullText.text('正在刷新..');
                    pullIcon.show();
                    pullArrow.hide();

                    dom.css('-webkit-transform', 'translate3d(0,' + 43 + 'px,0)');

                    // 进入下拉刷新状态
                    refreshFlag = 1;


                    setTimeout(function(){

                        pullText.text('刷新成功');
                        pullIcon.hide();

                        dom.css('-webkit-transform', 'translate3d(0,0,0)');

                        setTimeout(function(){

                            opt.afterPull && opt.afterPull();
                            // 重置标志位
                            refreshFlag = 0;
                        },300);

                    },700);
                } else {

                    if (joinRefreshFlag) {
                        refreshFlag = 1;
                        dom.css('-webkit-transition', '330ms');
                        dom.css('-webkit-transform', 'translate3d(0,0,0)');
                        setTimeout(function(){
                            opt.afterPull && opt.afterPull();
                            // 重置标志位
                            refreshFlag = 0;
                        },300);
                    }

                }

                // 重置changeOneTimeFlag
                changeOneTimeFlag = 0;

                // 重置joinRefreshFlag
                joinRefreshFlag = null;

                // 重置percentage
                dragStart = null;

                // 重置percentage
                percentage = 0;
            });
        }
    };

    return AlloyPullRefresh;
}));


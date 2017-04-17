

## H5下拉刷新组件


## 特性
* 定义下拉刷新元素样式
* 下拉刷新事件回调
* 支持zepto版本和react版本

## 示例
您可以下载代码在demo文件夹中找到例子或者[在线示例](https://alloyteam.github.io/AlloyPullRefresh/demo/alloyrefresh.html)

## 使用方法

### react
```

var PullRefresh  = require('.PullRefresh/PullRefresh.jsx');

var PostListItem = React.createClass({
	render: function(){
		return (
            <div className="wrap" id="wrap">
                <PullRefresh onRefresh={this.onRefresh} container={'wrap'}/>
                <div className="scroll-content"></div>
            </div>
        )
	}
});


```
### zepto
```

<script type="text/javascript" src="../src/zepto/pullRefresh.js"></script>
<link rel="stylesheet" type="text/css" href="../src/zepto/pullRefresh.css">




<div class="tuijian-container" id="container">
  <div class="pull-down-content">
    <div id="arrowIcon"></div>
    <div id="pullIcon" class="spinner" style="display: none;"></div>
    <span id="pullText">刷新成功</span>
  </div>
  <div id="wrapper" class="wrapper ">
    <ul id="recommend-hot-list" class="ul recommend-hot-list">
        
    </ul>
  </div>
</div>



<script type="text/javascript">
	
	AlloyPullRefresh.init({
      container: '#container'
    });
</script>

```

## 配置说明
| 参数     | 类型     | 描述 | 必需 | 默认值 |
| :------------- | :------------- | :------------- | :------------- | :------------- |
| dragThreshold         | number      | 临界值 | 否 | 0.3 |
| moveCount         | number      | 位移系数 | 否 | 200 |
| beforePull         | function      | 下拉刷新触发前调用 | 否 | |
| afterPull         | function      | 下拉刷新触发后调用 | 否 |  |
| onRefresh         | function      | 下拉刷新回调方法 | 否 |  |


## License
Copyright(c) 2016-2017 AlloyTeam. Licensed under MIT license.

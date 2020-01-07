Component({
    // 组件的属性列表
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        showThis: false,
        text: '',
        showIcon: false,
        isLoading: false,
        animationData: "",
    },

    /**
     * 组件的方法列表
     */
    methods: {
        loadMore: function () {
            this.animate(35, 0);
            this.setData({
                showThis: true,
                text: '玩命加载中...',
                showIcon: true
            })
        },
        loadMoreComplete: function (message) {
            this.setData({
                text: message,
                showIcon: false
            })
            setTimeout(() => {
                this.animate(0, 500);
                this.setData({
                    // showThis: false,
                    text: '',
                    showIcon: false
                })
            }, 1000)
        },
        
        animate: function (h, t) {
            //创建动画
            var animation = wx.createAnimation({
                duration: t,
                timingFunction: "linear",
                delay: 0,
                transformOrigin: "50% 50%"
            })
            //设置动画
            animation.height(h).step();
            //导出动画数据传递给组件的animation属性。
            this.setData({
                animationData: animation.export(),
            })
        }
    }


})

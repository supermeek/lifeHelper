/**
 * 组件：带右箭头的menu
 * 带入数据 点击跳转网页
 *      [{  name: '标题', info: '', icon: 'iconfont icon-renzheng', url: '/pages/mine/about' }]
 */

Component({
    options: { styleIsolation: 'apply-shared' }, //继承父组件的style
    properties: {
        list: Array
    },

    data: {
        listData: []
    },

    ready: function () {
        this.setData({
            listData: this.properties.list
        })
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 更新数据
        updateData: function () {
            this.setData({
                listData: this.properties.list
            })
        }
    }
})
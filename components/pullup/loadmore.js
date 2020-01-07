Component({
    /**
     * 组件的属性列表
     */
    properties: {
        pageStatus: {
            type: Number,
            value: 0
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        status: 0,
    },

    ready: function(){
        this.updateData()
    },

    /**
     * 组件的方法列表
     */
    methods: {
        loadMore: function(){
            this.triggerEvent('loadMore', {})
        },

        updateData: function(value){
            if (value){
                this.setData({ status: value })
            }else{
                this.setData({ status: this.properties.pageStatus })
            }
        }
    }
})

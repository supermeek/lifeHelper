/**
 * 组件：tab菜单
 * 带入数据 list[{id:0, name:''},{id:1, name:'' }], active：默认选中当前id == active 的tab
 * 返回数据 active
 */

Component({
    properties: {
        list: {
            type: Array
        },
        active: {
            type: Number
        }
    },

    data: {
        activeIndex: null
    },

    ready: function () {
        this.setData({
            activeIndex: this.properties.active
        })
    },

    methods: {
        switchTab(e) {
            let index = e.currentTarget.dataset.index;
            if (this.data.activeIndex == index) {
                return
            }
            this.setData({
                activeIndex: index
            })
            this.triggerEvent('switchTab', { active: index })
        },

        updateData: function(value){
            if(value){
                this.setData({
                    activeIndex: value
                })
            }else{
                this.setData({
                    activeIndex: this.properties.active
                })
            }
        }
    }
})

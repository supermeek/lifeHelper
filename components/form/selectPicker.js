/**
 * 组件：带右箭头的select
 * 带入数据[{},{}]
 * select下拉选项【select:null 默认不选， 0 默认选第一个】
 * list:[
 *          { name:'标题', key:'键值', icon:'', select:0, arr:[{ id:1,label:'美国'},{id:2,label:'中国'}]}  ===> rangeKey:'label'
 *          { name: '标题', key:'键值', icon:'', select: 0, arr: ['美国', '中国'] }  ===> rangeKey:不传
 *      ]
 */

Component({
    options: { styleIsolation: 'apply-shared' }, //继承父组件的style
    behaviors: ['wx://form-field'],
    attached() {  //返回给父组件form的值 使用组件时需使用name属性
        this.setData({
            value: {}
        })
    },
    properties: {
        list: Array,
        rangeKey: String, // arr 为object数组时必传，为字符串数组时不传 （ list.arr中key的值作为选择器显示内容 ）
        isEdit: {
            type: Boolean,
            value: true
        }
    },


    data: {
        listData: []
    },

    ready: function () {
        this.setData({
            listData: this.properties.list,
            value: this.properties.list
        })
    },

    /**
     * 组件的方法列表
     */
    methods: {
        bindPickerChange: function (e) {
            let list = this.data.listData
            let current = {}
            for (let i in list) {
                if (list[i].name == e.currentTarget.dataset.name) {
                    list[i].select = parseInt(e.detail.value);
                    current = list[i]
                }
            }
            this.setData({
                listData: list,
                value: list
            })
            let detail = {
                currentChange: current,
                arr: list
            }
            this.triggerEvent('bindPickerChange', detail)
        },

        // 更新数据
        updateData: function () {
            this.setData({
                listData: this.properties.list,
                value: this.properties.list
            })
        }
    }
})
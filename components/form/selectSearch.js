/**
 * 组件：带右箭头的输入框加筛选
 * 带入数据
 * item: {name:'标题'，key:'键值',api:'接口'}
 * 返回数据 { id:'', name: ''}
 */
import util from '../../utils/util.js'
const app = getApp()

Component({
    options: { styleIsolation: 'apply-shared' }, //继承父组件的style
    behaviors: ['wx://form-field'],
    attached() {  //返回给父组件form的值 使用组件时需使用name属性
        this.setData({
            value: {}
        })
    },
    properties: {
        item: Object,
        selectKey: {
            type: String,
            value: 'name'
        }
    },

    data: {
        detail: {},
        resultList:[]
    },

    ready: function () {
        this.setData({
            detail: this.properties.item,
            value: this.properties.item.value
        })
    },

    /**
     * 组件的方法列表
     */
    methods: {

        // 终端输入中
        binInput: function (e) {
            let that = this
            let name = e.detail.value.replace(/\s*/g, '')
            let result = []
            this.setData({ ['value.exist']: null})            

            // 当输入不为空
            if (name) {
                that.getNameList(name, that.data.detail.api, (res) => {
                    for (let key in res.records) {
                        if (res.records[key].name.indexOf(name) != -1) {
                            let str = res.records[key][this.properties.selectKey].replace(name, '<span class="cyan">' + name + '</span>')
                            result.push({
                                id: res.records[key].id,
                                name: res.records[key].name,
                                address: res.records[key].address,
                                label: str
                            })
                        }
                    }
                    that.setData({ resultList: result })
                })
            } else {
                that.setData({ resultList: result })
            }
        },


        // 失去焦点 &  回车确认
        bindblur: function(e){
            let name = e.detail.value.replace(/\s*/g, '')
            if(!name){
                util.showToast('请输入终端')
                this.triggerEvent('bindSearchChange', {})
            }else {
                if (!this.data.value.exist) {
                    if (this.data.resultList.length == 0) {
                        util.showToast('请输入正确的终端')
                    }
                    setTimeout(() => {
                        if (this.data.resultList.length > 0) {
                            util.showToast('请选择终端')
                        }
                    }, 500)
                    this.triggerEvent('bindSearchChange', {})
                }
            }
        },


        // 点击筛选结果返回字段  或者使用form返回规则（select同）
        reslutClick: function(e){
            let value = e.currentTarget.dataset
            this.setData({ value: value })
            let detail = this.data.detail
            detail['value'] = value
            this.triggerEvent('bindSearchChange', detail)
            setTimeout(() => {
                this.setData({ resultList: [] })
            },250)
        },

        // 获取列表
        getNameList: function (name, api, callback) {
            let that = this
            app.service.getNameList(name, api).then((res) => {
                if (res.code == 0) {
                    if (typeof (callback) == 'function') callback(res.data)
                }
            })
        },

        // 更新数据
        updateData: function () {
            this.setData({
                detail: this.properties.item,
                value: this.properties.item.value
            })
        }
    }
})
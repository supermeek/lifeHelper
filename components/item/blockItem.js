/**
 * 组件：块状列表item
 * 带入数据 
 *    url:'' 跳转网页链接
 *    id：'' item的id
 *    name:'' 主标题
 *    month:'' 主标题后的绿色副标题
 *    status:'' item状态
 *    statusText:'' 右上角状态显示文字{text:'',color:''}
 *    statusBtn:'' 右下角按钮文字
 *    refuse:'' 右下角拒绝原因
 *    numText:'' 左下角显示的金额文字对象{label:'',value:''}
 *    confiemNumText:'' 右下角下角显示的金额文字对象{label:'',value:''}
 *    cardNum:'' 左下角灰色文字 || 与numText 选其一
 *    content:'' 中间内容列表 [label:'',value:'']
 * 返回数据 无
 */

Component({
    properties: {
        url: String,
        id: Number,
        name: String,
        month: String,
        status: Number,
        statusText: Object,
        statusBtn: String,
        refuse: String,
        numText: Object,
        confiemNumText: Object,
        cardNum: String,
        content: Array,
    },

    ready: function () {
    },

    data: {

    },

    methods: {

    }
})

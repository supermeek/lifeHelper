/**
 * 组件：块状列表item
 * 带入数据 
 *    id：'' item的id
 *    name:'' 主标题
 *    time:'' 时间
 *    status:'' item状态
 *    statusText:'' 右上角状态显示文字{text:'',color:''}
 *    num:'' 左下角下角金豆数量
 *    count:'' 右下角金豆数量
 * 返回数据 无
 */

Component({

    properties: {
        name: String,
        id: String,
        time: String,
        status: Number,
        statusText: Object,
        num: String,
        count: String,
    },

    data: {

    },

    methods: {

    }
})

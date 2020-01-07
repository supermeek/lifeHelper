/**
 * 组件：手机号及验证码
 * 传入数据 mobile:{}, code:{}
 * 返回数据 { mobile: '', verifyCode: ''}  
 * mobile.type == REGISTER：注册和更换手机号 / UPDATE_PWD更换密码
 */

import util from '../../utils/util'
const app = getApp()
Component({
    options: { styleIsolation: 'apply-shared' },  //继承父组件的统style
    behaviors: ['wx://form-field'],
    attached() {  //返回给父组件form的值 使用组件时需使用name属性
        this.setData({
            value: {}
        })
    },
    properties: {
        mobile: Object,   //-数据格式- {mobile:'', disabled:true, label:'',type:'UPDATE_PWD/REGISTER'}
        code: Object      //-数据格式- {code:'', disabled:true, label:''}
    },

    data: {
        isMobileNone: true,
        mobileDisabled: false,
        codeLabel: '获取验证码',
    },

    ready: function () {
        this.setData({
            ['value.mobile']: this.properties.mobile.mobile,
            ['value.verifyCode']: this.properties.code.code,
            isMobileNone: !this.properties.mobile.mobile
        })
    },

    methods: {
        sendVerifyCode: function (mobile, callback) {
            app.service.getVerifyCode(mobile, this.properties.mobile.type)
                .then(res => {
                    if (typeof (callback) == 'function') {
                        callback(res)
                    }
                })
        },

        getVerifyCode: function () {
            let that = this
            let mobile = this.data.value.mobile
            if (util.regExp.validatePhoneNumber(mobile)) {  // 验证手机号
                this.sendVerifyCode(mobile, (res) => {  //发送验证码请求
                    if (res.code == 0) {
                        that.setData({ isMobileNone: true, mobileDisabled: true })
                        let time = 59
                        var timer = setInterval(function () {
                            if (time > 0) {
                                that.setData({ codeLabel: time + 's后获取' })
                                time--
                            } else {
                                clearInterval(timer);
                                that.setData({
                                    isMobileNone: false,
                                    mobileDisabled: false,
                                    codeLabel: '获取验证码',
                                })
                            }
                        }, 1000);
                    }
                })
            } else {
                util.showToast('手机号码格式不正确', 'none')
            }
        },

        // 手机号码输入
        watchMobile: function (event) {
            if (event.detail.value) {
                this.setData({
                    isMobileNone: false
                })
            } else {
                this.setData({
                    isMobileNone: true
                })
            }
            this.setData({
                ['value.mobile']: event.detail.value
            })
            this.triggerEvent('bindInputVerify', this.data.value)
        },

        // 验证码输入
        watchCode: function (event) {
            this.setData({
                ['value.verifyCode']: event.detail.value
            })
            this.triggerEvent('bindInputVerify', this.data.value)
        }
    }
})

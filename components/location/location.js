var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk
Component({
    properties: {
        defaultAddress: {
            type: String,
            value: ''
        }
    },
    behaviors: ['wx://form-field'],
    attached() {  //返回给父组件form的值 使用组件时需使用name属性
        this.setData({
            value: ''
        })
    },
    data: {
        address: "",
        latitude: 0,//地图初次加载时的纬度坐标
        longitude: 0, //地图初次加载时的经度坐标
    },

    ready: function () {
        qqmapsdk = new QQMapWX({
            key: 'A64BZ-DBCRP-2DODX-LP6ZY-V32L6-QWFSZ'
        });
        if (this.properties.defaultAddress) {
            this.updateData()
        } else {
            this.updateData("")
        }
    },

    methods: {

        // 地图选址
        onChangeAddress: function (e) {
            var that = this;
            wx.chooseLocation({
                success: function (res) {
                    that.setData({
                        value: res.name,
                        address: res.name
                    });
                },
                fail: function (err) {
                    console.log(err)
                    wx.getSetting({
                        success: function (res) {
                            if (!res.authSetting['scope.userLocation']) {
                                wx.showModal({
                                    title: '是否授权定位功能',
                                    content: '需要获取您的定位，请确认授权，否则地图功能将无法使用',
                                    success: function (tip) {
                                        if (tip.confirm) {
                                            wx.openSetting({
                                                success: function (data) {
                                                    if (data.authSetting["scope.userLocation"] === true) {
                                                        //授权成功之后，再调用chooseLocation选择地方
                                                        that.onChangeAddress()
                                                    }
                                                }
                                            })
                                        }
                                    }
                                })
                            }
                        }
                    })
                }
            })
        },

        updateData: function (address) {
            if (address) {
                this.setData({
                    value: address,
                    address: address,
                });
            } else {
                this.setData({
                    value: this.properties.defaultAddress,
                    address: this.properties.defaultAddress,
                });
            }
        }
    }
})

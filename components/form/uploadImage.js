import util from '../../utils/util.js'
const app = getApp()
Component({

    properties: {
        images: {   //已经上传的图片
            type: String
        }, 
        count:{
            type: Number,  //限制上传个数
            value: 9
        },
        status: {  //0新增，1编辑。2查看
            type: Number,
            value: 1
        }
    },

    behaviors: ['wx://form-field'],
    attached() {  //返回给父组件form的值 使用组件时需使用name属性
        this.setData({
            value: {}
        })
    },

    data: {
        imageHttp: app.globalData.recordImageHttp,
        files: [],  //待上传的图片
        imagesList: [], //用来显示之前上传的图片
        previewImages: [],  //用于预览的图片 = onlineImages + files
        uploadImages: [],  //上传后返回的图片地址
    },

    ready: function () {
        this.updateData()
    },

    methods: {

        // 更新数据
        updateData: function(){
            if (this.properties.images.replace(/\s*/g, '')){
                let arr = this.properties.images.split(",")
                let result = []
                for (let i in arr) {
                    result.push(this.data.imageHttp + arr[i])
                }
                this.setData({
                    imagesList: arr,
                    previewImages: result,
                    files:[]
                })
            }else{
                this.setData({
                    imagesList: [],
                    previewImages: [],
                    files:[]
                })
            }
        },

        // 向父页面返回fies
        sendFiles: function(){
            let totalFiles = Array.from(new Set([...this.data.imagesList, ...this.data.files]))
            return totalFiles
        },

        // 预览图片
        previewImage: function (e) {
            var url = e.currentTarget.dataset.url
            wx.previewImage({
                current: url, // 当前显示图片的http链接
                urls: this.data.previewImages // 需要预览的图片http链接列表
            })
        },

        // 选择图片
        chooseImage: function (e) {
            var that = this;
            let length = that.data.files.length + that.data.imagesList.length
            if (length >= that.properties.count) {
                wx.showModal({
                    content: '最多可上传' + that.properties.count + '张图片',
                    showCancel: false,
                })
                return
            }
            wx.chooseImage({
                count: that.properties.count,
                sizeType: ['original', 'compressed'],  // 指定原图 / 压缩图
                sourceType: ['album', 'camera'],  // 来源相册 / 相机
                success: function (res) {  // 返回选定照片的本地文件路径列表
                    for (let key in res.tempFilePaths) {
                        var str = res.tempFilePaths[key]
                        var name = str.substr(str.lastIndexOf('.', str.lastIndexOf('.') - 1) + 1);              
                        let currentLength = that.data.files.length + that.data.imagesList.length
                        var formatImage = str.split(".")[(str.split(".")).length - 1];
                        if (formatImage != "png" && formatImage != "jpg" && formatImage != "jpeg") {
                            return wx.showToast({
                                title: '只能上传.png、.jpg、.jpep 格式',
                                icon: 'none',
                                duration: 2000,
                                mask: true,
                            })
                        }
                        if (currentLength >= that.properties.count) {
                            wx.showModal({
                                content: '最多可上传' + that.properties.count + '张图片',
                                showCancel: false,
                            })
                            return
                        }
                        that.setData({
                            files: that.data.files.concat({
                                status: 0,
                                name: name,
                                file: res.tempFilePaths[key]
                            }),
                            previewImages: that.data.previewImages.concat(res.tempFilePaths[key])
                        });

                    }
                }
            })
        },


        // 上传图片
        uploadFile: function () {
            let that = this
            return new Promise(function (resolve, reject) {
                var fileList = that.data.files
                let currentIndex = 0
                if (fileList.length <= 0){
                    let result = Array.from(new Set([...that.data.imagesList, ...that.data.uploadImages]))
                    //无需上传中照片时
                    that.triggerEvent('complateUploadImage', result)
                    return
                }
                for (let index in fileList) {
                    var upload_task = wx.uploadFile({
                        url: 'http://118.25.75.202:50020/hssl-xcx-v1.0/contractXCC/upload.do',
                        filePath: fileList[index].file,
                        name: "file",
                        header: {
                            "Content-Type": "multipart/form-data",
                            'Cookie': "SESSION=" + wx.getStorageSync('sessionId') || ''
                        },
                        formData: {
                            file: fileList[index].file,
                        },
                        success: function (res) {
                            let data = JSON.parse(res.data)
                            if (res.statusCode >= 200) {
                                fileList[index]['status'] = 101
                                that.setData({ uploadImages: that.data.uploadImages.concat(data.data) })
                                resolve()
                            } else {
                                fileList[index]['status'] = -1
                            }
                            that.setData({ files: fileList })
                        },
                        fail: function (res) {
                            fileList[index]['status'] = -1
                            that.setData({ files: fileList })
                        },
                        complete: function () {
                            currentIndex++
                            if (currentIndex == fileList.length) {
                                console.log("********哈哈哈哈现在结束了吧********")
                                // 加上原有照片
                                let result = Array.from(new Set([...that.data.imagesList, ...that.data.uploadImages]))
                                //完成后调用父方法告知
                                that.triggerEvent('complateUploadImage', result)
                            }
                        }
                    })

                    // 上传进度
                    upload_task.onProgressUpdate((res) => {
                        fileList[index]['status'] = res.progress-1
                        that.setData({
                            files: fileList
                        })
                    })
                }
            });
        },



        // 点击删除图片 (原有照片删除)
        clearOldImg: function (e) {
            var that = this
            var index = e.currentTarget.dataset.index
            util.showModal('确认删除这张照片吗', '', () => {
                var fileList = that.data.files;
                var imageList = that.data.imagesList;
                var preImgList = that.data.previewImages;
                imageList.splice(index, 1)
                preImgList.splice(index, 1)
                that.setData({
                    imagesList: imageList,
                    previewImages: preImgList,
                });
            })
        },
        // 长按删除图片 (原有照片删除)
        deleteOldImg: function (e) {
            var that = this
            var index = e.currentTarget.dataset.index
            var system = wx.getSystemInfoSync()
            var itemList = ['删除']
            var itemColor = '#FF5C5C'
            if (/android/i.test(system.platform)) {
                itemList.push('取消')
                itemColor = '#333'
            }
            wx.showActionSheet({
                itemList,
                itemColor,
                success: function (e) {
                    if (e.tapIndex == 0) { //删除
                        var fileList = that.data.files;
                        var imageList = that.data.imagesList;
                        var preImgList = that.data.previewImages;
                        imageList.splice(index, 1)
                        preImgList.splice(index, 1)
                        that.setData({
                            imagesList: imageList,
                            previewImages: preImgList,
                        });
                    }
                }
            })
        },

        // 点击删除图片 (待上传照片删除)
        clearImg: function (e) {
            var that = this
            var index = e.currentTarget.dataset.index
            util.showModal('确认删除这张照片吗', '', () => {
                var fileList = that.data.files;
                var preImgList = that.data.previewImages;
                fileList.splice(index, 1)
                preImgList.splice(index + that.data.imagesList.length, 1)
                that.setData({
                    files: fileList,
                    previewImages: preImgList,
                });
            })
        },

        // 长按删除图片 (待上传照片删除)
        deleteImg: function (e) {
            var that = this
            var index = e.currentTarget.dataset.index
            var system = wx.getSystemInfoSync()
            var itemList = ['删除']
            var itemColor = '#FF5C5C'
            if (/android/i.test(system.platform)) {
                itemList.push('取消')
                itemColor = '#333'
            }
            wx.showActionSheet({
                itemList,
                itemColor,
                success: function (e) {
                    if (e.tapIndex == 0) { //删除
                        var fileList = that.data.files;
                        var preImgList = that.data.previewImages;
                        fileList.splice(index, 1)
                        preImgList.splice(index + that.data.imagesList.length, 1)
                        that.setData({
                            files: fileList,
                            previewImages: preImgList,
                        });
                    }
                }
            })
        }
    }
})

module.exports = {

  /**
   * 双向绑定input的值
   * input 属性设置
        value="{{login.password}}"
        data-name="login.password"  //String 与value字段一致
        bindinput="bindInputValue"
  */
  bindInputValue(e) {
    console.log("***********")
    console.log(e)
    let name = e.currentTarget.dataset.name;
   
    let nameMap = {}

    if (name.indexOf('.') != -1) {

      let nameList = name.split('.')

      if (this.data[nameList[0]]) {

        nameMap[nameList[0]] = this.data[nameList[0]]

      } else {

        nameMap[nameList[0]] = {}

      }

      nameMap[nameList[0]][nameList[1]] = e.detail.value

    } else {

      nameMap[name] = e.detail.value

    }

    this.setData(nameMap)

  },


  /**
   * 清空input的值
   * 元素属性设置
   *   data-name="login.password"  //String 与所绑定清空的input的value字段一致
       bindinput="bindInputValue"
  */
  clearInputValue(e) {
    let name = e.currentTarget.dataset.name;

    let nameMap = {}

    if (name.indexOf('.') != -1) {

      let nameList = name.split('.')

      if (this.data[nameList[0]]) {

        nameMap[nameList[0]] = this.data[nameList[0]]

      } else {

        nameMap[nameList[0]] = {}

      }

      nameMap[nameList[0]][nameList[1]] = ''

    } else {

      nameMap[name] = ''

    }

    this.setData(nameMap)

  },

}

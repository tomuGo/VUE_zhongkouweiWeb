const RegbusinessRegNo =
  /(^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$)|(^\d{15}$)/

const RegPhone =
  /(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/
const RegEmail =
  /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/
const RegPwd =
  /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/
// 整数判断
const NumCheck =
  /^[0-9]*$/
// 是否是数字
const DecimalCheck =
  /^[0-9]+.?[0-9]*$/
// 6位整数，2位小数
const Decimal6And2Check =
/^(?:0|[1-9]\d{0,5})(?:\.\d{1,2})?$/

const RegPrice = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
const RegPrice2 = /^\-?\d+(\.\d{1,3})?$/

const RegMediaPrice = /^\d+(\.\d{1,3})?$/
const RegTagName = /^(?!(\d+)$)[\u4e00-\u9fff\d\-_]+$/

// 0-100之间保留两位小数
// const RegRatio = /^(\d|[1-9]\d)(\.\d{1,2})?$/
const RegRatio = /^(((\d|[1-9]\d)(\.\d{1,2})?)|100|100.0|100.00)$/
// 字母、数字、汉字
const RegPackageName = /^[A-Za-z0-9\u4e00-\u9fa5]+$/

// 字母、数字
const RegPackageNo = /^[A-Za-z0-9]+$/

/**
 * [ObjectMap]
 * 将对象中那些值为undefined、null、NaN的属性删除掉
 * @author zhoul
 * @param   {Object}  obj [处理的对象]
 * @return  {Object}  newObject [处理后的新对象]
 */
function ObjectMap (obj = {}) {
  let newObject = {}
  for (let key of Object.keys(obj)) {
    const value = obj[key]
    if (key === 'pageNumber' && parseInt(value, 10) === 1) {
      continue
    }
    // pageSize
    if (value) {
      newObject[key] = value
    }
  }

  return newObject
}

/**
 * [formartTree 将扁平化的数据格式化成一个树形结构]
 * 这里将以ID 为1的数据作为最顶层数据
 * @author   yucb
 * @date     2018-07-16
 * @param    {Array}    arr [需要处理的扁平化数组]
 * @return   {Array}        [扁平化后的树形结构，存放在数组中]
 */
function formartTree (arr = [], parentFiled = 'parentCode') {
  arr.forEach(function (item) {
    let children = arr.filter(function (item2) {
      return item2[parentFiled] === item.code
    })
    if (children.length > 0) {
      item.children = children
    }
  })
  let tree = arr.find(function (item) {
    return item.code === 1
  })
  return [tree]
}

/**
 * 设置Cookie
 * @author zhoul
 * @param {string} name 设置的Cookie属性
 * @param {string} val  设置的Cookie值
 * @param {string} path 设置的Cookie的路径
 * @param {number} date 设置的Cookie的过期时间(天数)
 */
function setCookie (name, val, path, date) {
  let oDate = new Date()
  oDate.setDate(oDate.getDate() + (date || 30))
  const sDate = ';expires=' + oDate
  const Path = ';path=' + (path || '/')
  document.cookie = name + '=' + val + sDate + Path
}

/**
 * 获取Cookie
 * @author zhoul
 * @param   {string} name 需要获取的Cookie属性
 * @return {string} 获取到的Cookie值
 */
function getCookie (name) {
  const sCookies = document.cookie
  const arr = sCookies.split('; ')
  for (let i = 0; i < arr.length; i++) {
    let arr2 = arr[i].split('=')
    if (arr2[0] === name) {
      return arr2[1]
    }
  }
}

/**
 * 删除Cookie
 * @author zhoul
 * @param {string} name 需要删除的Cookie
 */
function delCookie (name) {
  setCookie(name, '', '', -1)
}

/**
 * [ArrayFind]
 * 执行该方法让不支持数组find方法的浏览器支持
 * 当前版本的babel(v7.2.3)也不能转义
 * @author zhoul
 * @return {Object} 当前查找到的数组
 */
function ArrayFind () {
  if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
      value: function (predicate) {
        // 1. Let O be ? ToObject(this value).
        if (this == null) {
          throw new TypeError('"this" is null or not defined')
        }

        var o = Object(this)

        // 2. Let len be ? ToLength(? Get(O, "length")).
        var len = o.length >>> 0

        // 3. If IsCallable(predicate) is false, throw a TypeError exception.
        if (typeof predicate !== 'function') {
          throw new TypeError('predicate must be a function')
        }

        // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
        var thisArg = arguments[1]

        // 5. Let k be 0.
        var k = 0

        // 6. Repeat, while k < len
        while (k < len) {
          // a. Let Pk be ! ToString(k).
          // b. Let kValue be ? Get(O, Pk).
          // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
          // d. If testResult is true, return kValue.
          var kValue = o[k]
          if (predicate.call(thisArg, kValue, k, o)) {
            return kValue
          }
          // e. Increase k by 1.
          k++
        }

        // 7. Return undefined.
        return undefined
      }
    })
  }
}

/**
 * [ArrayIncludes]
 * 执行该方法让不支持数组includes方法的浏览器支持
 * 当前版本的babel(v7.2.3)也不能转义
 * @author zhoul
 * @return {Boolean} 当前元素是否包含在这个数组中
 */
function ArrayIncludes () {
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
      value: function (searchElement, fromIndex) {
        // 1. Let O be ? ToObject(this value).
        if (this == null) {
          throw new TypeError('"this" is null or not defined')
        }

        var o = Object(this)

        // 2. Let len be ? ToLength(? Get(O, "length")).
        var len = o.length >>> 0

        // 3. If len is 0, return false.
        if (len === 0) {
          return false
        }

        // 4. Let n be ? ToInteger(fromIndex).
        //    (If fromIndex is undefined, this step produces the value 0.)
        var n = fromIndex | 0

        // 5. If n ≥ 0, then
        //  a. Let k be n.
        // 6. Else n < 0,
        //  a. Let k be len + n.
        //  b. If k < 0, let k be 0.
        var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0)

        // 7. Repeat, while k < len
        while (k < len) {
          // a. Let elementK be the result of ? Get(O, ! ToString(k)).
          // b. If SameValueZero(searchElement, elementK) is true, return true.
          // c. Increase k by 1.
          // NOTE: === provides the correct "SameValueZero" comparison needed here.
          if (o[k] === searchElement) {
            return true
          }
          k++
        }

        // 8. Return false
        return false
      }
    })
  }
}

/**
 * [checkArrayEquals 检测两个数组是否完全一样 (每个元素的值是基本类型数据)]
 * @method   checkArrayEquals
 * @author zhoul
 * @date     2018-01-25
 * @param    {Array}            arr   [数组A]
 * @param    {Array}            arr2  [数组B]
 * @return   {Boolean}                [对比结果]
 */
function checkArrayEquals (arr = [], arr2 = []) {
  for (let i = 0, length = arr.length; i < length; i++) {
    let item = arr[i]
    let arr2Item = arr2[i]
    let keys = Object.keys(item)
    for (let j of keys) {
      // 不判断值为引用类型的数据
      if (typeof arr2Item[j] === 'Object' || typeof arr2Item[j] === 'Function') {
        continue
      }

      if (arr2Item[j] !== item[j]) {
        return true
      }
    }
  }

  return false
}

/**
 * [toFixed 将数值保留两位小数]
 * @method   toFixed
 * @author zhoul
 * @date     2018-01-25
 * @param    {number}            number  [数字]
 * @return   {number}                   [保留两位小数后的值]
 */
function toFixed (number) {
  if (typeof number === 'number' && !isNaN(number)) {
    return number.toFixed(2)
  }
  return number
}

export {
  // 标签名称
  RegTagName,

  // 媒体价格
  RegMediaPrice,

  // 营业执照正则
  RegbusinessRegNo,

  // 联系电话
  RegPhone,

  // 邮箱
  RegEmail,

  // 密码正则
  RegPwd,

  // 价格正则
  RegPrice,

  // 保留三位小数的正负价格
  RegPrice2,

  // 设置Cookie
  setCookie,

  // 删除Cookie
  delCookie,

  // 获取Cookie
  getCookie,

  // 数组中查找元素
  ArrayFind,

  // 判断指定元素是否包含在数组中
  ArrayIncludes,

  // 对象过滤
  ObjectMap,

  // 检测两个数组是否一样
  checkArrayEquals,

  // 检查是否是纯数字
  NumCheck,

  // 检查是否是数字
  DecimalCheck,

  // 6位整数，2位小数
  Decimal6And2Check,

  toFixed,

  // 格式化树形结构
  formartTree,

  // 0-100之间的数字，保留两位小数
  RegRatio,

  // 字母、数字、汉字
  RegPackageName,

  // 字母、数字
  RegPackageNo
}

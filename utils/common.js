var app = getApp()

function initApp(baseUrl, needUserInfo) {
  var openid = wx.getStorageSync('openid')
  var PHPSESSID = wx.getStorageSync('PHPSESSID')

  if (openid == '' || PHPSESSID == '') {
    setLogin(baseUrl, needUserInfo)
  } else {
    //小程序登录状态检查
    wx.checkSession({
      success: function() {
        //小程序登录态正常，接着检查后端PHP用户登录态
        var sessid = wx.getStorageSync('PHPSESSID')
        if (sessid == '') {
          setLogin(baseUrl, needUserInfo);
        } else {
          //判断是否已登录
          wx.request({
            url: baseUrl + 'checkLogin', //需要从后端判断用户有没有登录过
            data: {
              PHPSESSID: wx.getStorageSync('PHPSESSID') //一定要带上PHPSESSID
            },
            success: function(res) {
              if (res.data.status == 0) {
                setLogin(baseUrl, needUserInfo);
              }
            }
          })
        }
      },
      fail: function() {
        console.log('登录态过期')
        //登录态过期
        setLogin(baseUrl, needUserInfo) //重新登录
      }
    })
  }

}

function setLogin(baseUrl, needUserInfo) {
  wx.login({
    success: function(res) {
      if (res.code) { //使用小程序登录接口完成后端用户登录
        wx.request({
          url: baseUrl + 'sendSessionCode',
          data: {
            code: res.code,
            from_uid: wx.getStorageSync('from_uid')
          },
          success: function(res) {
            console.log(res)
            if (typeof res.data == "string") {
              res = JSON.parse(res.data)
            } else {
              res = res.data
            }
            //把sessid保存到缓存里
            wx.setStorageSync("PHPSESSID", res.data.PHPSESSID)
            wx.setStorageSync("openid", res.data.openid)
            wx.setStorageSync("uid", res.data.uid)

            //登录成功后判断用户是否已初始化化，如没则自动初始化化
            if (needUserInfo) {
              autoReg()
            }
          }
        })
      } else {
        console.log('获取用户登录态失败！' + res.errMsg)
      }
    }
  });

}

function autoReg() {
  //判断是否完成自动注册
  var checkReg = true
  try {
    var userInfo = wx.getStorageSync('userInfo') 
    if (!userInfo) {
      checkReg = false
    }
  } catch (e) {
    checkReg = false
  }

  if (checkReg == true) {
    return true
  }

  wx.reLaunch({
    url: '/pages/login/login'
  })

}

function shareUrl() {
  var pages = getCurrentPages() //获取加载的页面
  var currentPage = pages[pages.length - 1] //获取当前页面的对象
  var url = currentPage.route //当前页面url
  var options = currentPage.options //如果要获取url中所带的参数可以查看options

  return url + '?from_uid=' + wx.getStorageSync('uid') + urlEncode(options);
}
/** 
 * param 将要转为URL参数字符串的对象 
 * key URL参数字符串的前缀 
 * encode true/false 是否进行URL编码,默认为true 
 *  
 * return URL参数字符串 
 */
var urlEncode = function(param, key, encode) {
  if (param == null) return '';
  var paramStr = '';
  var t = typeof(param);
  if (t == 'string' || t == 'number' || t == 'boolean') {
    paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
  } else {
    for (var i in param) {
      var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
      paramStr += urlEncode(param[i], k, encode);
    }
  }
  return paramStr;
};
module.exports = {
  initApp: initApp,
  shareUrl: shareUrl
}
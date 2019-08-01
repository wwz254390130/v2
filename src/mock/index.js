import Mock from 'mockjs'
import loginAPI from './login'
import siteAPI from './site'
import usersAPI from './users'
import rolesAPI from './roles'
import permissionsAPI from './permissions'
import newsAPI from './news'
import articleAPI from './article'
import remoteSearchAPI from './remoteSearch'
import transactionAPI from './transaction'
import statisticsAPI from './statistics'

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info/, 'get', loginAPI.getUserInfo)

// 网站配置
Mock.mock(/\/site\/update/, 'post', siteAPI.update)
Mock.mock(/\/site\/detail/, 'get', siteAPI.getDetail)

// 管理员管理
Mock.mock(/\/users\/list/, 'get', usersAPI.getList)
Mock.mock(/\/users\/add/, 'post', usersAPI.add)
Mock.mock(/\/users\/update/, 'post', usersAPI.update)
Mock.mock(/\/users\/detail/, 'get', usersAPI.getDetail)

// 角色管理
Mock.mock(/\/roles\/list/, 'get', rolesAPI.getList)
Mock.mock(/\/roles\/add/, 'post', rolesAPI.add)
Mock.mock(/\/roles\/update/, 'post', rolesAPI.update)
Mock.mock(/\/roles\/detail/, 'get', rolesAPI.getDetail)

// 权限管理
Mock.mock(/\/permissions\/list/, 'get', permissionsAPI.getList)
Mock.mock(/\/permissions\/add/, 'post', permissionsAPI.add)
Mock.mock(/\/permissions\/update/, 'post', permissionsAPI.update)
Mock.mock(/\/permissions\/detail/, 'get', permissionsAPI.getDetail)

// 新闻管理
Mock.mock(/\/news\/list/, 'get', newsAPI.list)
Mock.mock(/\/news\/add/, 'post', newsAPI.add)
Mock.mock(/\/news\/update/, 'post', newsAPI.update)
Mock.mock(/\/news\/detail/, 'get', newsAPI.detail)

// 首页相关
Mock.mock(/\/statistics\/data/, 'get', statisticsAPI.getData)

// 文章相关
Mock.mock(/\/article\/list/, 'get', articleAPI.getList)
Mock.mock(/\/article\/detail/, 'get', articleAPI.getArticle)
Mock.mock(/\/article\/pv/, 'get', articleAPI.getPv)
Mock.mock(/\/article\/create/, 'post', articleAPI.createArticle)
Mock.mock(/\/article\/update/, 'post', articleAPI.updateArticle)

// 搜索相关
Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser)

// 账单相关
Mock.mock(/\/transaction\/list/, 'get', transactionAPI.getList)

/*
http://mockjs.com/examples.html
// 英文姓名
// 'name' :'@name',
// // 颜色
// 'color': '@color',
// // 英文标题
// 'title': '@title',
// // 链接
// 'url': '@url("http")',
// // 邮箱
// 'email': '@email',
// // 图片
// 'image': Random.image('200x200', '#50B347', '#FFF', 'Mock.js'),
// // 时间
// 'date': '@date("yyyy-MM-dd HH:mm:ss")',
// 'date2': '@dateTime',
// // 汉字
// 'ctitle': '@ctitle(8)',
// // 汉字姓名
// 'canme': '@cname()',
// // 地址
// 'cadd': '@province' + '@city' + '@county',
// // 手机号
// 'phone': /^1[385][1-9]\d{8}/
*/

export default Mock

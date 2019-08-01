// import Mock from 'mockjs'
import { param2Obj } from '@/utils'

/*
cfg_webname   网站名称
cfg_weburl  网站地址
cfg_webpath   网站目录
cfg_author  网站作者
cfg_generator   程序引擎
cfg_seotitle  SEO标题
cfg_keyword   关键字设置
cfg_description   网站描述
cfg_copyright   版权信息
cfg_hotline   客服热线
cfg_icp   备案编号
cfg_webswitch   启用站点
cfg_switchshow  关闭说明
cfg_upload_img_type   上传图片类型
cfg_upload_soft_type  上传软件类型
cfg_upload_media_type   上传媒体类型
cfg_max_file_size   上传文件大小
cfg_imgresize   自动缩略图
cfg_countcode   流量统计代码
cfg_qqcode  在线QQ
cfg_mysql_type  数据库类型(支持mysql和mysqli)
cfg_pagenum   每页显示记录数
cfg_timezone  服务器时区设置
cfg_mobile  自动跳转手机版
cfg_member  开启会员功能
*/

// varname varinfo vartips vargroup vartype varvalue

/* eslint-disable */
const _info = [{"siteid":"1","varname":"cfg_webname","varinfo":"\u7f51\u7ad9\u540d\u79f0","vartips":"","vargroup":"0","vartype":"string","varvalue":"PHA","orderid":"1"},{"siteid":"1","varname":"cfg_weburl","varinfo":"\u7f51\u7ad9\u5730\u5740","vartips":"","vargroup":"0","vartype":"string","varvalue":"http:\/\/local.pha.com\/","orderid":"2"},{"siteid":"1","varname":"cfg_seotitle","varinfo":"SEO\u6807\u9898","vartips":"","vargroup":"0","vartype":"string","varvalue":"PHA","orderid":"2"},{"siteid":"1","varname":"cfg_keyword","varinfo":"\u5173\u952e\u5b57\u8bbe\u7f6e","vartips":"","vargroup":"0","vartype":"string","varvalue":"PHA","orderid":"3"},{"siteid":"1","varname":"cfg_description","varinfo":"\u7f51\u7ad9\u63cf\u8ff0","vartips":"","vargroup":"0","vartype":"bstring","varvalue":"PHA","orderid":"4"},{"siteid":"1","varname":"cfg_webpath","varinfo":"\u7f51\u7ad9\u76ee\u5f55","vartips":"","vargroup":"0","vartype":"string","varvalue":"","orderid":"5"},{"siteid":"1","varname":"cfg_author","varinfo":"\u7f51\u7ad9\u4f5c\u8005","vartips":"","vargroup":"0","vartype":"string","varvalue":"","orderid":"5"},{"siteid":"1","varname":"cfg_generator","varinfo":"\u7a0b\u5e8f\u5f15\u64ce","vartips":"","vargroup":"0","vartype":"string","varvalue":"php","orderid":"6"},{"siteid":"1","varname":"cfg_copyright","varinfo":"\u7248\u6743\u4fe1\u606f","vartips":"","vargroup":"0","vartype":"bstring","varvalue":"Copyright \u00a9 2018 PH Alpha Design Ltd. All Rights Reserved.","orderid":"9"},{"siteid":"1","varname":"cfg_hotline","varinfo":"\u5ba2\u670d\u70ed\u7ebf","vartips":"","vargroup":"0","vartype":"string","varvalue":"","orderid":"10"},{"siteid":"1","varname":"cfg_icp","varinfo":"\u5907\u6848\u7f16\u53f7","vartips":"","vargroup":"0","vartype":"string","varvalue":"\u7ca4ICP\u590713063472\u53f7","orderid":"11"},{"siteid":"1","varname":"cfg_webswitch","varinfo":"\u542f\u7528\u7ad9\u70b9","vartips":"","vargroup":"0","vartype":"bool","varvalue":"Y","orderid":"12"},{"siteid":"1","varname":"cfg_switchshow","varinfo":"\u5173\u95ed\u8bf4\u660e","vartips":"","vargroup":"0","vartype":"bstring","varvalue":"\u5bf9\u4e0d\u8d77\uff0c\u7f51\u7ad9\u7ef4\u62a4\uff0c\u8bf7\u7a0d\u540e\u767b\u5f55\u3002<br \/>\u7f51\u7ad9\u7ef4\u62a4\u671f\u95f4\u5bf9\u60a8\u9020\u6210\u7684\u4e0d\u4fbf\uff0c\u8bf7\u8c05\u89e3\uff01","orderid":"13"},{"siteid":"1","varname":"cfg_upload_img_type","varinfo":"\u4e0a\u4f20\u56fe\u7247\u7c7b\u578b","vartips":"","vargroup":"1","vartype":"string","varvalue":"gif|png|jpg|bmp","orderid":"23"},{"siteid":"1","varname":"cfg_upload_soft_type","varinfo":"\u4e0a\u4f20\u8f6f\u4ef6\u7c7b\u578b","vartips":"","vargroup":"1","vartype":"string","varvalue":"zip|gz|rar|iso|doc|xls|ppt|wps|txt","orderid":"24"},{"siteid":"1","varname":"cfg_upload_media_type","varinfo":"\u4e0a\u4f20\u5a92\u4f53\u7c7b\u578b","vartips":"","vargroup":"1","vartype":"string","varvalue":"swf|flv|mpg|mp3|rm|rmvb|wmv|wma|wav","orderid":"25"},{"siteid":"1","varname":"cfg_max_file_size","varinfo":"\u4e0a\u4f20\u6587\u4ef6\u5927\u5c0f","vartips":"","vargroup":"1","vartype":"string","varvalue":"2097152","orderid":"26"},{"siteid":"1","varname":"cfg_imgresize","varinfo":"\u81ea\u52a8\u7f29\u7565\u56fe","vartips":"","vargroup":"1","vartype":"bool","varvalue":"Y","orderid":"27"},{"siteid":"1","varname":"cfg_countcode","varinfo":"\u6d41\u91cf\u7edf\u8ba1\u4ee3\u7801","vartips":"","vargroup":"1","vartype":"bstring","varvalue":"","orderid":"28"},{"siteid":"1","varname":"cfg_qqcode","varinfo":"\u5728\u7ebfQQ","vartips":"\u591a\u4e2a\u53f7\u7801\u7528\uff0c\u5206\u9694","vargroup":"1","vartype":"bstring","varvalue":"","orderid":"29"}]
/* eslint-disable */

export default {
  update: config => {
    const _data = param2Obj(config.url)

    return {
      status: 200,
      message: '数据更新成功',
      data: _data
    }
  },
  getDetail: config => {
    return {
      status: 200,
      message: '数据获取成功',
      data: _info
    }
  }
}

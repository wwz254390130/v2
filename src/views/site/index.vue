<template>
  <div class="app-container">  
    <el-form :model="postForm" :rules="rules" ref="postForm" label-width="120px">      
      <el-tabs v-model="tabActiveName" @tab-click="handleTabClick">
        <el-tab-pane label="基本设置" name="first">
          <el-row :gutter="20" v-for="item in info" v-if="item.vargroup=='0'" :key="item.varname">
            <el-col :span="16">              
              <el-form-item :label="item.varinfo">
                <el-input v-if="item.vartype=='string'" v-model="postForm[item.varname]" :placeholder="'请输入' + item.varinfo"></el-input>
                <el-input v-if="item.vartype=='bstring'" v-model="postForm[item.varname]" :placeholder="'请输入' + item.varinfo" type="textarea"></el-input>

                <!-- 特殊处理 -->
                <template v-if="item.varname=='cfg_webswitch'">
                  <el-radio v-model="webswitch" label="Y">是</el-radio>
                  <el-radio v-model="webswitch" label="N">否</el-radio>
                </template>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <div class="input-tag">{{item.vartips}}</div>
              <div class="input-tag">${{item.varname}}</div>          
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="附件设置" name="second">
          <el-row :gutter="20" v-for="item in info" v-if="item.vargroup=='1'" :key="item.varname">
            <el-col :span="16">              
              <el-form-item :label="item.varinfo">
                <el-input v-if="item.vartype=='string'" v-model="postForm[item.varname]" :placeholder="'请输入' + item.varinfo"></el-input>
                <el-input v-if="item.vartype=='bstring'" v-model="postForm[item.varname]" :placeholder="'请输入' + item.varinfo" type="textarea"></el-input>

                <!-- 特殊处理 -->
                <template v-if="item.varname=='cfg_imgresize'">
                  <el-radio v-model="imgresize" label="Y">是</el-radio>
                  <el-radio v-model="imgresize" label="N">否</el-radio>
                </template>  
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <div class="input-tag">{{item.vartips}}</div>
              <div class="input-tag">${{item.varname}}</div>              
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="增加新变量" name="add">
          <el-row :gutter="20">
            <el-col :span="16">              
              <el-form-item label="变量名称">
                <el-input v-model="addForm.varname" placeholder="请输入变量名称" maxlength="20"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <div class="input-tag">系统会自动为变量添加 '$cfg_' 前缀</div>           
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="16">              
              <el-form-item label="参数说明">
                <el-input v-model="addForm.varinfo" type="textarea" placeholder="请输入参数说明" maxlength="80"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <div class="input-tag"></div>           
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="16">              
              <el-form-item label="输入说明">
                <el-input v-model="addForm.vartips" type="textarea" placeholder="请输入输入说明" maxlength="80"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <div class="input-tag">显示在输入表单页面上</div>           
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="16">
              <el-form-item label="变量值">
                <el-input v-model="addForm.varvalue" placeholder="请输入变量值" maxlength="200"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <div class="input-tag"></div>           
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="16">
              <el-form-item label="变量类型">
                <el-radio-group v-model="addForm.vartype">
                  <el-radio v-for="item in vartype" :key="item.value" :label="item.label">{{item.name}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <div class="input-tag">选择布尔值时，需要再特别编写代码</div>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="16">
              <el-form-item label="所属组">
                <el-select v-model="addForm.vargroup" placeholder="请选择">
                  <el-option
                    v-for="item in vargroup"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <div class="input-tag"></div>
            </el-col>
          </el-row>

          <!-- <el-row :gutter="20">
            <el-col :span="16">
              <el-form-item label="多选框">
                <el-checkbox-group v-model="checkList">
                  <el-checkbox label="复选框 A"></el-checkbox>
                  <el-checkbox label="复选框 B"></el-checkbox>
                  <el-checkbox label="复选框 C"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <div class="input-tag"></div>
            </el-col>
          </el-row> -->
        </el-tab-pane>
      </el-tabs>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onCancel">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { get, update } from '@/api/site'
// import { validateURL } from '@/utils/validate'
// import { date2Number } from '@/utils/formatDate'

// 文章详情默认字段
const defaultForm = {}

export default {
  name: 'siteHome',
  data() {
    return {
      // checkList: ['复选框 A'],
      webswitch: 'Y',
      imgresize: 'Y',
      Loading: false,
      // 页面表单数据集
      postForm: Object.assign({}, defaultForm),
      // 新增变量
      addForm: {
        varname: '',
        varinfo: '',
        vartips: '',
        vargroup: '0',
        vartype: 'string',
        varvalue: ''
      },
      vartype: [{
        name: '文本',
        label: 'string'
      }, {
        name: '数字',
        label: 'number'
      }, {
        name: '布尔(Y/N)',
        label: 'bool'
      }, {
        name: '多行文本',
        label: 'bstring'
      }],
      vargroup: [{
        value: '0',
        label: '基础设置'
      }, {
        value: '1',
        label: '附件设置'
      }],
      // tab选中项
      tabActiveName: 'first',
      // 配置结果接
      info: [],
      // 校验规则 - 注意：被校验的字段必须加上prop属性
      rules: {
        name: [
          { required: true, message: '请输入网站名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    // 判断是否是编辑态并且传入id
    this.fetchData()
  },
  methods: {
    // 获取网站配置信息
    fetchData() {
      const that = this
      that.Loading = true

      get().then(response => {
        that.info = response.data || []

        that.info.forEach(item => {
          that.postForm[item.varname] = item.varvalue
          // console.log(item)

          // 特殊处理-单选项
          if (item.varname === 'cfg_webswitch') {
            that.webswitch = item.varvalue
          }

          // 特殊处理-单选项
          if (item.varname === 'cfg_imgresize') {
            that.imgresize = item.varvalue
          }
        })

        that.Loading = false
      })
    },
    // tab切换
    handleTabClick(tab, event) {
      console.log(tab, event)
    },
    onSubmit() {
      const that = this
      const postData = that.tabActiveName === 'add' ? that.addForm : that.postForm

      // 特殊处理-单选项
      that.postForm.cfg_webswitch = that.webswitch
      that.postForm.cfg_imgresize = that.imgresize

      // 特殊处理-多选
      // that.postForm.checkList = that.checkList

      // 表单校验
      // this.$refs.postForm.validate(valid => {
      //   if (valid) {
      //     this.Loading = true
      //     // this.postForm.status = 'published'

      //     // 发布时间处理
      //     // this.postForm.display_time = date2Number(this.postForm.display_time)

      //     // 发起请求
      //     // this.postData()
      //     this.$message('submit!')
      //   } else {
      //     console.log('表单校验不通过!')
      //     return false
      //   }
      // })

      update(postData).then(response => {
        console.log(response)
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.input-tag{
  line-height: 1.8;
  color: #999;
  font-size: 14px;
}
</style>


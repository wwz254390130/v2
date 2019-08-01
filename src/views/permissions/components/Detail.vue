<template>
  <div class="createPost-container">
    <el-form class="form-container" :model="postForm" :rules="rules" ref="postForm" label-width="65px">

      <sticky :className="'sub-navbar '+postForm.status">
        <template v-if="fetchSuccess">
          <el-button v-loading="loading" type="success" @click="submitForm()">{{ isEdit ? '保存' : '添加' }}
          </el-button>
        </template>
        <template v-else>
          <el-tag>发送异常错误,刷新页面,或者联系开发人员</el-tag>
        </template>
      </sticky>

      <div class="createPost-main-container">
        <el-form-item label="名称：" prop="name" required>
          <el-input placeholder="请输入权限名称，2 - 25个字符" v-model="postForm.name" :disabled="isEdit"></el-input>
        </el-form-item>

        <el-form-item label="键名：" prop="code" required>
          <el-input placeholder="请输入权限键名，如users.index，设定后不可修改！" v-model="postForm.code" :disabled="isEdit"></el-input>
        </el-form-item>

        <el-form-item label="链接：">
          <el-input placeholder="请输入权限对应的链接，如/system/users/index" v-model="postForm.link"></el-input>
        </el-form-item>

        <el-form-item label="描述：" prop="description">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入描述，不超过150字"
            v-model="postForm.description">
          </el-input>
          <span class="word-counter" v-show="contentShortLength">已输入{{contentShortLength}}个字符</span>
        </el-form-item>

        <el-form-item label="">
          <div class="form-notice">
            <p><em>提示：</em></p>
            <p>键名设置示例，如添加product栏目，首先添加product栏目的操作权限，如下：</p>
            <p>名称：<code>产品</code></p>
            <p>键名：<code>product</code></p>
            <p>链接：<code>/product/index</code>&nbsp;&nbsp;<i>（栏目权限的链接指向栏目首页，可以与列表页一致）</i></p>
            <p>描述：<code>产品栏目的描述....</code></p>
            <p>添加了product栏目的操作权限后，再添加列表、添加、修改、删除的权限，如添加product列表权限：</p>
            <p>名称：<code>产品列表</code></p>
            <p>键名：<code>product.index</code></p>
            <p>链接：<code>/product/index</code></p>
            <p>描述：<code>产品列表的描述....</code></p>
          </div>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import Sticky from '@/components/Sticky' // 粘性header组件
import { fetchPermissions, createPermissions, updatePermissions } from '@/api/permissions'

// 默认字段
const defaultForm = {
  // 名称
  name: '',
  // 键名
  code: '',
  // 链接
  link: '',
  // 描述
  description: '',
  // id
  id: ''
}

export default {
  name: 'permissionsDetail',
  components: { Sticky },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    detailId: {
      type: String,
      default: ''
    }
  },
  data() {
    // 字段校验 - 必填
    const validateRequire = (rule, value, callback) => {
      if (!value.length) {
        callback(new Error(rule.field + '为必填项'))
      } else {
        callback()
      }
    }

    return {
      // 页面表单数据集
      postForm: Object.assign({}, defaultForm),
      // 编辑——获取数据是否正确
      fetchSuccess: true,
      // 是否在请求中
      loading: false,
      // 校验规则 - 注意：被校验的字段必须加上prop属性
      rules: {
        name: [
          { validator: validateRequire, message: '名称不能为空', trigger: 'blur' },
          { min: 2, max: 25, message: '长度在 2 到 25 个字符', trigger: 'blur' }
        ],
        code: [
          { validator: validateRequire, message: '键名不能为空', trigger: 'blur' },
          { min: 2, max: 25, message: '长度在 2 到 25 个字符', trigger: 'blur' }
        ],
        description: [{ max: 250, message: '长度在不能超过250个字符', trigger: 'blur' }]
      }
    }
  },
  computed: {
    // 返回描述内容长度
    contentShortLength() {
      return this.postForm.description.length
    }
  },
  created() {
    this.fetchData({
      id: this.detailId
    })
  },
  methods: {
    // 编辑状态时，获取数据
    fetchData(query) {
      const that = this

      fetchPermissions(query).then(res => {
        that.postForm = Object.assign({}, res.data.info ? res.data.info : defaultForm)
      }).catch(err => {
        that.fetchSuccess = false
        console.log(err)
      })
    },
    // 提交数据
    submitForm() {
      console.log(this.postForm)
      // 表单校验
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          if (!this.postForm.id) {
            this.create()
          } else {
            this.update()
          }
        } else {
          console.log('表单校验不通过!')
          return false
        }
      })
    },
    // 数据提交操作
    create() {
      const that = this

      createPermissions(that.postForm).then(res => {
        that.postForm = Object.assign({}, defaultForm)

        that.$message({
          message: res.message,
          type: 'success',
          duration: 2000
        })

        that.loading = false
      }).catch(err => {
        that.loading = false
        console.log(err)
      })
    },
    // 数据更新操作
    update() {
      const that = this

      updatePermissions(that.postForm).then(res => {
        that.$notify({
          title: '成功',
          message: res.message,
          type: 'success',
          duration: 2000
        })
        that.loading = false
      }).catch(err => {
        that.loading = false
        console.log(err)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  @import "src/styles/detail.scss";

  .form-notice {
    padding: 8px 16px;
    background-color: #fff6f7;
    border-radius: 4px;
    border-left: 5px solid #fe6c6f;
    margin: 20px 0;

    p {
      font-size: 14px;
      color: #5e6d82;
      line-height: 1.5em;
    }

    em{
      font-weight: bold;
      font-style: normal;
      color: #333;
    }

    i{
      font-style: normal;
      color: #888;
    }

    code {
      display: inline-block;
      margin: 0;
      background-color: #f9fafc;
      padding: 0 4px;
      border: 1px solid #eaeefb;
      border-radius: 4px;

      color: #445368;
      font-size: 14px;
      line-height: 1.5em;
    }
  }
</style>


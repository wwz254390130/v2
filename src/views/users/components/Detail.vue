<template>
  <div class="createPost-container">
    <el-form class="form-container" :model="postForm" :rules="rules" ref="postForm" label-width="100px">
      <sticky :className="'sub-navbar '+postForm.status">
        <template v-if="fetchSuccess">
          <el-button v-loading="loading" type="success" @click="submitUsersForm()">{{ isEdit ? '保存' : '添加' }}
          </el-button>
        </template>
        <template v-else>
          <el-tag>发送异常错误,刷新页面,或者联系开发人员</el-tag>
        </template>
      </sticky>

      <div class="createPost-main-container">
        <el-form-item label="用户名：">
          <el-input placeholder="请输用户名，2 - 25个字符" v-model="postForm.username" :disabled="isEdit">
          </el-input>
        </el-form-item>

        <el-form-item label="密码：">
          <el-input placeholder="请输密码，8 - 25个字符" type="password" v-model="postForm.password">
          </el-input>
        </el-form-item>

        <el-form-item label="角色：" prop="rolesid">
          <el-radio-group v-model="postForm.rolesid">
            <el-radio v-for="(item, index) in roleArr" :label="item.id" :key="item.id">{{item.name}}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="备注：">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入备注，不超过150字"
            v-model="postForm.remark">
          </el-input>
          <span class="word-counter" v-show="contentShortLength">已输入{{contentShortLength}}个字符</span>
        </el-form-item>

        <el-form-item label="头像：">
          <Upload :fileList="postForm.avatar" :limit="1" @fileChange="imgFileChange"></Upload>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import Upload from '@/components/Upload/singleImage4'
import Sticky from '@/components/Sticky' // 粘性header组件
import { fetchUsers, createUsers, updateUsers } from '@/api/users'

// 默认字段
const defaultForm = {
  // id
  id: '',
  // 用户名
  username: '',
  // 密码
  password: '',
  // 角色
  rolesid: '',
  // 头像
  avatar: [],
  // 介绍
  remark: ''
}

export default {
  name: 'usersDetail',
  components: { Upload, Sticky },
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
  computed: {
    // 返回描述内容长度
    contentShortLength() {
      return this.postForm.remark.length
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
      // 用户角色数据集
      roleArr: [],
      // 编辑——获取数据是否正确
      fetchSuccess: true,
      // 是否在请求中
      loading: false,
      // 校验规则 - 注意：被校验的字段必须加上prop属性
      rules: {
        name: [
          { validator: validateRequire, trigger: 'blur' },
          { min: 2, max: 25, message: '长度在 2 到 25 个字符', trigger: 'blur' }
        ],
        email: [{ validator: validateRequire }],
        role_name: [{ required: true, message: '角色不能为空' }],
        password: [{ required: true, min: 8, max: 25, message: '长度在 8 到 25 个字符', trigger: 'blur' }],
        introduction: [{ min: 0, max: 250, message: '不能超过 250 个字符', trigger: 'blur' }]
      }
    }
  },
  created() {
    // 判断是否是编辑态并且传入id
    // if (this.isEdit && this.detailId) {
    //   this.fetchData({
    //     id: this.detailId
    //   })
    // } else {
    //   this.postForm = Object.assign({}, defaultForm)
    //   this.fetchRoleList()
    // }

    this.fetchData({
      id: this.detailId
    })
  },
  methods: {
    imgFileChange(val) {
      for (let i = 0, len = val.length; i < len; i++) {
        if (val[i].response) {
          val[i].name = val[i].response.data.original_name
          val[i].save_path = val[i].response.data.save_path
          val[i].url = val[i].response.data.url

          val[i].response = null
        }
      }
      this.postForm.avatar = val
    },
    // 编辑状态时，获取数据
    fetchData(query) {
      const that = this

      fetchUsers(query).then(res => {
        that.postForm = Object.assign({}, res.data.info ? res.data.info : defaultForm)
        that.roleArr = res.data.rolesArr
      }).catch(err => {
        that.fetchSuccess = false
        console.log(err)
        // that.$router.push({ path: '/system/users/index' })
      })
    },
    // 提交数据
    submitUsersForm() {
      // 表单校验
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true

          if (!this.postForm.id) {
            this.createUsersData()
          } else {
            this.updateUsersData()
          }
        } else {
          this.$message({
            message: '表单校验不通过!',
            type: 'error',
            duration: 2000
          })

          return false
        }
      })
    },
    // 数据提交操作
    createUsersData() {
      const that = this

      createUsers(that.postForm).then(res => {
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
    updateUsersData() {
      updateUsers(this.postForm).then(res => {
        this.$notify({
          title: '成功',
          message: res.message,
          type: 'success',
          duration: 2000
        })
        this.loading = false
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  @import "src/styles/detail.scss";
</style>


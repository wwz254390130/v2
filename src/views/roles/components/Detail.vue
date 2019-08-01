<template>
  <div class="createPost-container">
    <el-form class="form-container" :model="postForm" :rules="rules" ref="postForm" label-width="65px">

      <sticky :className="'sub-navbar '+postForm.status">
        <template v-if="fetchSuccess">
          <el-button v-loading="loading" type="success" @click="submitRolesForm()">{{ isEdit ? '保存' : '添加' }}
          </el-button>
        </template>
        <template v-else>
          <el-tag>发送异常错误,刷新页面,或者联系开发人员</el-tag>
        </template>
      </sticky>

      <div class="createPost-main-container">
        <el-form-item label="角色：" prop="name">
          <el-input placeholder="请输入角色名称，2 - 25个字符" v-model="postForm.name" :disabled="isEdit"></el-input>
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

        <el-form-item label="权限：">
          <el-table :data="allPermList" :border="true" style="width: 100%">
            <el-table-column prop="name" label="模块" width="100"></el-table-column>
            <el-table-column label="权限">
              <template slot-scope="scope">
                <el-checkbox-group v-model="postForm.permissions">
                  <el-checkbox v-for="(item, idx) in scope.row.list" :key="item.id" :label="item.id" @change="handleCheckedCitiesChange">{{item.name}}</el-checkbox>
                </el-checkbox-group>
              </template>
            </el-table-column>
          </el-table>

          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import Sticky from '@/components/Sticky' // 粘性header组件
import { fetchRoles, createRoles, updateRoles } from '@/api/roles'

// 默认字段
const defaultForm = {
  // 角色
  name: '',
  // 描述
  description: '',
  // 权限
  permissions: [],
  // id
  id: ''
}

export default {
  name: 'rolesDetail',
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
      // 所有权限列表数据集
      allPermList: [],
      // 所有权限列表ID值数据集
      allPermIdList: [],
      checked: null,
      // 是否在请求中
      loading: false,
      checkAll: false,
      isIndeterminate: true,
      // 校验规则 - 注意：被校验的字段必须加上prop属性
      rules: {
        name: [
          { validator: validateRequire, trigger: 'blur' },
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

      fetchRoles(query).then(res => {
        that.postForm = Object.assign({}, res.data.info ? res.data.info : defaultForm)
        that.allPermList = res.data.permissionsList

        that.allPermIdList = []

        that.allPermList.forEach(function(item) {
          item.list.forEach(function(value) {
            that.allPermIdList.push(value.id)
          })
        })
      }).catch(err => {
        that.fetchSuccess = false
        console.log(err)
      })
    },
    // 提交数据
    submitRolesForm() {
      console.log(this.postForm)
      // 表单校验
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          if (!this.postForm.id) {
            this.createRolesData()
          } else {
            this.updateRolesData()
          }
        } else {
          console.log('表单校验不通过!')
          return false
        }
      })
    },
    // 数据提交操作
    createRolesData() {
      const that = this

      createRoles(that.postForm).then(res => {
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
    updateRolesData() {
      const that = this

      updateRoles(that.postForm).then(res => {
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
    },
    // 权限-全选
    handleCheckAllChange(val) {
      this.postForm.permissions = val ? this.allPermIdList : []
      this.isIndeterminate = false
    },
    // 全选-多选框改变
    handleCheckedCitiesChange(value) {
      const that = this
      const checkedCount = that.postForm.permissions.length

      that.checkAll = checkedCount === that.allPermIdList.length
      that.isIndeterminate = checkedCount > 0 && checkedCount < that.allPermIdList.length
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  @import "src/styles/detail.scss";
</style>


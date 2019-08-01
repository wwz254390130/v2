<template>
  <div class="app-container calendar-list-container">
    <!-- 头部操作区 -->
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="权限名称" v-model="listQuery.title">
      </el-input>

      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" style="margin-left: 10px;" @click="handleFilter">搜索</el-button>

      <el-button class="filter-item" style="margin-left: 10px;" @click="handleToAdd" type="primary" icon="el-icon-edit">添加</el-button>

      <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">导出</el-button>
    </div>

    <!-- 表格 -->
    <el-table
      :key='tableKey'
      :data="list"
      v-loading="listLoading"
      element-loading-text="拼命加载中..."
      border
      fit
      highlight-current-row
      style="width: 100%">

      <el-table-column align="center" label="ID" width="60" prop="id"></el-table-column>

      <el-table-column align="center" label="名称" prop="name"></el-table-column>

      <el-table-column align="center" label="键名" prop="code"></el-table-column>

      <el-table-column align="center" label="链接" prop="link"></el-table-column>

      <el-table-column align="center" label="描述" prop="description"></el-table-column>

      <el-table-column align="center" label="创建时间" prop="createtime"></el-table-column>

      <el-table-column align="center" label="操作" class-name="small-padding fixed-width" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleToEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDel(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 页码 -->
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
// 数据接口
import { fetchPermissionsList, updatePermissions } from '@/api/permissions'
// 按钮动画特效 - 水波纹指令
import waves from '@/directive/waves'
// 工具接口
import { parseTime } from '@/utils'

export default {
  name: 'permissionsIndex',
  directives: {
    waves
  },
  data() {
    return {
      // 表格的key，改变后表格会重新渲染
      tableKey: 0,
      // 列表数据集
      list: [],
      // 列表数据总计
      total: 0,
      // 列表加载状态
      listLoading: true,
      // 列表请求条件，既给接口传递的参数
      listQuery: {
        page: 1,
        limit: 20,
        title: ''
      },
      // 是否正在导出
      downloadLoading: false
    }
  },
  filters: {
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取列表数据
    getList() {
      this.listLoading = true
      fetchPermissionsList(this.listQuery).then(res => {
        this.list = res.data
        this.total = res.total
        this.listLoading = false
      }).catch(() => {})
    },
    // 修改筛选添加后重新加载列表数据
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    // 页码修改后重新加载
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    // 页码修改后重新加载
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    // 前往添加页面
    handleToAdd() {
      this.$router.push({ path: '/system/permissions/add' })
    },
    // 前往编辑页面
    handleToEdit(row) {
      this.$router.push({ path: '/system/permissions/edit/' + row.id })
    },
    // 修改状态操作
    handleCheck(row) {
      const that = this
      const _opts = {
        id: row.id,
        type: 'check',
        checkinfo: !row.checkinfo
      }

      updatePermissions(_opts).then(res => {
        that.$notify({
          title: '成功',
          message: res.message,
          type: 'success',
          duration: 1000
        })
        // const index = that.list.indexOf(row)
        // that.list.splice(index, 1)
        // row.status = 'deleted'

        row.checkinfo = !row.checkinfo
        row.status = res.data
      }).catch(() => {})
    },
    // 删除操作
    handleDel(row) {
      const that = this
      that.$confirm('是否确认删除?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const _opts = {
          id: row.id,
          type: 'del'
        }
        updatePermissions(_opts).then(response => {
          that.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })

          that.getList()
        }).catch(() => {})
      }).catch(() => {})
    },
    // 下载导出数据
    handleDownload() {
      const that = this
      that.$confirm('将导出当前页面所显示的数据, 是否继续?', '导出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          // 要导出的字段名
          const filterVal = ['id', 'name', 'code', 'link', 'description', 'createtime']
          // 导出的字段名对应的表头
          const tHeader = ['ID', '角色', '键名', '链接', '描述', '创建时间']
          // 根据要导出的字段名格式化要导出的数据
          const data = that.formatJson(filterVal, that.list)
          // 传入三个参数（表头、数据、导出的文件名）
          excel.export_json_to_excel(tHeader, data, 'permissions-list-' + (new Date()).valueOf())
          that.downloadLoading = false
        }).catch(() => {})
      })
    },
    // 格式化数据
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          // 处理时间戳
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

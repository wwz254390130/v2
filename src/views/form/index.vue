<template>
  <div class="app-container">
    <el-form :model="postForm" :rules="rules" ref="postForm" label-width="120px">
      <el-form-item label="Activity name" prop="title">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Activity zone">
        <el-select v-model="form.region" placeholder="please select your zone">
          <el-option label="Zone one" value="shanghai"></el-option>
          <el-option label="Zone two" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Activity time">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="Pick a date" v-model="form.date1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker type="fixed-time" placeholder="Pick a time" v-model="form.date2" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="Instant delivery">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="Activity type">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="Online activities" name="type"></el-checkbox>
          <el-checkbox label="Promotion activities" name="type"></el-checkbox>
          <el-checkbox label="Offline activities" name="type"></el-checkbox>
          <el-checkbox label="Simple brand exposure" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="Resources">
        <el-radio-group v-model="form.resource">
          <el-radio label="Sponsor"></el-radio>
          <el-radio label="Venue"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Activity form">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>

      <el-form-item label="封面图:" prop="image_uri">
        <Upload :fileList="postForm.image_uri"></Upload>
      </el-form-item>

      <el-form-item style="margin-bottom: 40px;" label="产品图:" prop="pic_uri">
        <Upload :fileList="postForm.pic_uri"></Upload>
      </el-form-item>

      <el-form-item style="margin-bottom: 40px;" label="内容:" prop="content">
          <div class="editor-container">
            <tinymce :height="300" v-model="form.content"></tinymce>
          </div>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/singleImage4'
import { validateURL } from '@/utils/validate'
import { date2Number } from '@/utils/formatDate'

// 文章详情默认字段
const defaultForm = {
  status: 'draft',
  // 文章题目
  title: '',
  // 文章内容
  content: '',
  // 文章摘要
  content_short: '',
  // 文章外链
  source_uri: '',
  // 文章关键词
  keywords: '',
  // 文章封面图
  image_uri: [],
  // 文章图片
  pic_uri: [],
  // 文章外部作者
  source_name: '',
  // 发布时间
  display_time: new Date(),
  // 文章id
  id: undefined
}

export default {
  components: { Tinymce, Upload },
  data() {
    // 字段校验 - 必填
    const validateRequire = (rule, value, callback) => {
      if (!value.length) {
        callback(new Error(rule.field + '为必填项'))
      } else {
        callback()
      }
    }
    // 字段校验 - URL
    const validateSourceUri = (rule, value, callback) => {
      if (value) {
        if (validateURL(value)) {
          callback()
        } else {
          callback(new Error(rule.field + '链接填写不正确'))
        }
      } else {
        callback(new Error(rule.field + '为必填项'))
      }
    }

    return {
      // 页面表单数据集
      postForm: Object.assign({}, defaultForm),
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        content: '你好'
      },
      // 校验规则 - 注意：被校验的字段必须加上prop属性
      rules: {
        image_uri: [{ validator: validateRequire }],
        pic_uri: [{ validator: validateRequire }],
        title: [
          { validator: validateRequire, trigger: 'blur' },
          { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
        ],
        content_short: [
          { validator: validateRequire },
          { min: 5, max: 200, message: '长度在 5 到 100 个字符', trigger: 'blur' }
        ],
        content: [{ validator: validateRequire }],
        source_uri: [{ validator: validateSourceUri, trigger: 'blur' }]
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
    // }
  },
  methods: {
    onSubmit() {
      // 表单校验
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.postForm.status = 'published'

          // 发布时间处理
          this.postForm.display_time = date2Number(this.postForm.display_time)

          // 发起请求
          // this.postData()
          this.$message('submit!')
        } else {
          console.log('表单校验不通过!')
          return false
        }
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
.line{
  text-align: center;
}
</style>


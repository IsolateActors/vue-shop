<template>
  <div>
    <!-- 面包导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <el-alert
        title="添加商品信息"
        type="info"
        :closable="false"
        center
        show-icon
      >
      </el-alert>

      <!-- 进度条 -->
      <el-steps
        align-center
        :space="200"
        :active="activeIndex - 0"
        finish-status="success"
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <!-- 标签栏 form表单包裹-->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-position="top"
        class="demo-ruleForm"
      >
        <el-tabs
          :before-leave="beforeTabLeave"
          v-model="activeIndex"
          :tab-position="'left'"
          @tab-click="tabClicked"
        >
          <!-- 商品基本信息 -->
          <el-tab-pane label="基本信息" name="0">
            <el-row :gutter="40">
              <el-col :span="18">
                <el-col :span="11">
                  <el-form-item label="商品名称" prop="goods_name">
                    <el-input v-model="addForm.goods_name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="商品价格" prop="goods_price">
                    <el-input
                      v-model="addForm.goods_price"
                      type="number"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="商品重量" prop="goods_weight">
                    <el-input
                      v-model="addForm.goods_weight"
                      type="number"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="商品数量" prop="goods_number">
                    <el-input
                      v-model="addForm.goods_number"
                      type="number"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="商品分类" prop="goods_cat">
                    <el-cascader
                      v-model="addForm.goods_cat"
                      :options="cateList"
                      :props="{
                        expandTrigger: 'hover',
                        label: 'cat_name',
                        value: 'cat_id',
                        children: 'children'
                      }"
                      @change="handleCateChange"
                    ></el-cascader>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>
          </el-tab-pane>

          <!-- 商品参数 -->
          <el-tab-pane label="商品参数" name="1">
            <el-row>
              <el-col :span="12">
                <el-form-item
                  :label="item.attr_name"
                  v-for="item in manyTableData"
                  :key="item.attr_id"
                >
                  <!-- 参数 -->
                  <el-checkbox-group
                    size="mini"
                    v-model="item.select_attr_vals"
                  >
                    <el-checkbox
                      v-for="(childItem, childindex) in item.attr_vals"
                      :key="childindex"
                      :label="childItem"
                      border
                    ></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>

          <!-- 商品属性 -->
          <el-tab-pane
            :disabled="isClicltabPaneParam ? false : true"
            label="商品属性"
            name="2"
          >
            <el-row :gutter="40">
              <el-col :span="18">
                <el-col
                  :span="11"
                  v-for="item in onlyTableData"
                  :key="item.attr_id"
                >
                  <el-form-item :label="item.attr_name">
                    <el-input v-model="item.attr_vals"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>
          </el-tab-pane>

          <!-- 商品图片 -->
          <el-tab-pane
            :disabled="isClicltabPaneAttr ? false : true"
            label="商品图片"
            name="3"
          >
            <el-row>
              <el-col :span="8">
                <el-upload
                  class="upload-demo"
                  :action="uploadImg"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  list-type="picture"
                  :headers="headerObj"
                  :on-success="handleSuccess"
                  multiple
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </el-col>
            </el-row>
          </el-tab-pane>

          <!-- 商品内容 -->
          <el-tab-pane
            :disabled="isClicltabPanePic ? false : true"
            label="商品内容"
            name="4"
          >
            <el-row>
              <el-col :span="18">
                <!-- Two-way Data-Binding -->
                <quill-editor
                  ref="myQuillEditor"
                  v-model="addForm.goods_introduce"
                />

                <el-button class="add-btn" @click="addGoods" type="primary"
                  >添加商品</el-button
                >
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>

    <!-- 图片预览 -->
    <el-dialog
      title="图片预览"
      :visible.sync="previewDialogVisible"
      width="30%"
    >
      <el-image class="img-preview" :src="previewPath" lazy fit="contain">
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
    </el-dialog>
  </div>
</template>

<script>
import { uploadImg, previewImgUrl } from '../../utils/uploadConfig'
export default {
  data() {
    return {
      activeIndex: '0',
      // 添加商品表单数据对象
      addForm: {
        goods_name: '',
        // 需要转化为以，分隔的字符串
        goods_cat: [],
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        pics: [],
        attrs: [],
        goods_introduce: ''
      },
      // 验证规则
      addFormRules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 5, max: 50, message: '长度在 5 到 50 个字符', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请正确输入商品价格', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请正确输入商品数量', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请正确输入商品重量', trigger: 'blur' }
        ],
        goods_cat: [
          {
            required: true,
            message: '请选择商品分类(只能选择三级分类)',
            trigger: 'change'
          }
        ]
      },

      // 分类数据
      cateList: [],
      // 动态参数列表，选中数据为select_attr_vals
      manyTableData: [],
      // 静态属性列表
      onlyTableData: [],

      // 图片上传地址
      uploadImg: uploadImg,
      // 图片上传请求头
      headerObj: {
        Authorization: window.sessionStorage.getItem('token')
      },
      // 图片预览地址
      previewPath: '',

      // 预览图片对话框
      previewDialogVisible: false,

      // 是否点击标签，用于获取初始数据
      isClicltabPaneParam: false,
      isClicltabPaneAttr: false,
      isClicltabPanePic: false
    }
  },
  computed: {
    cateId() {
      if (this.addForm.goods_cat.length === 3) {
        return this.addForm.goods_cat[2]
      }
      return null
    }
  },
  methods: {
    // 获取商品分类列表
    async getCateList() {
      const { data: res } = await this.$axios.get('categories')

      if (res.meta.status !== 200)
        return this.$message.error('获取分类数据失败！')

      this.cateList = res.data
    },

    // 级联选中事件
    handleCateChange() {
      console.log(this.addForm.goods_cat)
      if (this.addForm.goods_cat.length !== 3) this.addForm.goods_cat = []
    },

    // 监听离开进入标签触发函数
    beforeTabLeave(activeName, oldActiveName) {
      console.log(activeName)
      console.log(typeof oldActiveName)

      if (oldActiveName === '0' && this.addForm.goods_cat.length != 3) {
        this.$message.error('请先选择商品分类！')
        return false
      }
    },

    async tabClicked() {
      // 动态参数
      if (this.activeIndex === '1') {
        // 解锁下一标签
        // 设置标签可选
        this.isClicltabPaneParam = true

        const { data: res } = await this.$axios.get(
          `categories/${this.cateId}/attributes`,
          {
            params: {
              sel: 'many'
            }
          }
        )

        if (res.meta.status !== 200)
          return this.$message.error('获取动态参数列表失败！')

        console.log(res.data)

        // 处理sku动态参数
        res.data.forEach((item) => {
          item.attr_vals =
            item.attr_vals.length === 0 ? [] : item.attr_vals.split(',')
          // 复制一份提供绑定选中的项
          item.select_attr_vals = [...item.attr_vals]
        })

        this.manyTableData = res.data
      } else if (this.activeIndex === '2') {
        // 解锁下一标签
        this.isClicltabPaneAttr = true
        const { data: res } = await this.$axios.get(
          `categories/${this.cateId}/attributes`,
          {
            params: {
              sel: 'only'
            }
          }
        )

        if (res.meta.status !== 200)
          return this.$message.error('获取静态属性列表失败！')

        console.log(res.data)
        this.onlyTableData = res.data
      } else if (this.activeIndex === '3') {
        // 解锁下一标签
        this.isClicltabPanePic = true
      }
    },

    // 点击预览
    handlePreview(file) {
      console.log(file)

      this.previewPath = previewImgUrl + file.response.data.tmp_path
      // this.previewPath = file.response.data.url
      // 显示对话框
      this.previewDialogVisible = true
    },

    // 图片被移除
    handleRemove(file) {
      console.log(file)
      //获取删除图片路劲
      const filePath = file.response.data.tmp_path
      // 找到pics中的索引值
      const index = this.addForm.pics.findIndex((x) => x.pic == filePath)

      // splice移除pics数组中得值
      this.addForm.pics.splice(index, 1)
      console.log(this.addForm)
    },

    // 图片上传成功
    handleSuccess(response) {
      console.log(response)

      const picInfo = { pic: response.data.tmp_path }
      this.addForm.pics.push(picInfo)
      console.log(this.addForm)
    },

    // 添加商品
    addGoods() {
      this.$refs.addFormRef.validate(async (vilid) => {
        if (!vilid) return this.$message.error('请填写必要的表单项！')

        // 添加,深拷贝一份副本
        let addFormCopy = JSON.parse(JSON.stringify(this.addForm))
        console.log(addFormCopy)
        addFormCopy.goods_cat = this.addForm.goods_cat.join(',')

        // 处理动态参数，manyTableData中选中的数据为select_attr_vals
        this.manyTableData.forEach((item) => {
          const newAttrVal = {
            attr_id: item.attr_id,
            attr_value: item.select_attr_vals.join(',')
          }
          addFormCopy.attrs.push(newAttrVal)
        })

        // 处理静态属性
        this.onlyTableData.forEach((item) => {
          const newAttrVal = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals
          }
          addFormCopy.attrs.push(newAttrVal)
        })

        console.log(addFormCopy)
        // 发起请求
        const { data: res } = await this.$axios.post('goods', addFormCopy)

        if (res.meta.status !== 201) return this.$message.error(res.meta.msg)

        this.$message.success(res.meta.msg)
        this.$router.push('/goods')
      })
    }
  },
  created() {
    this.getCateList()
  }
}
</script>

<style lang="scss" scoped>
.el-checkbox:nth-child(1) {
  margin-left: 10px !important;
}

.img-preview {
  width: 100%;
}
.add-btn {
  margin-top: 15px;
}
</style>

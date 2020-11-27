<template>
  <div>
    <!-- 面包导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="showAddCateDialog">
            添加分类
          </el-button>
        </el-col>
      </el-row>

      <!-- 表格 -->
      <tree-table
        class="tree-table"
        index-text="#"
        :data="catelist"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        :show-index="true"
        :border="true"
      >
        <!-- 是否有效 -->
        <template v-slot:isok="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.cat_deleted === false"
            style="color: #67C23A"
          ></i>
          <i class="el-icon-error" v-else style="color: #F56C6C"></i>
        </template>

        <!-- 排序 -->
        <template v-slot:sort="scope">
          <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag
            size="mini"
            type="success"
            v-else-if="scope.row.cat_level === 1"
            >二级</el-tag
          >
          <el-tag size="mini" type="warning" v-else>三级</el-tag>
        </template>

        <!-- 操作 -->
        <template v-slot:opt="">
          <el-button type="primary" size="mini" icon="el-icon-edit"
            >编辑</el-button
          >
          <el-button type="danger" size="mini" icon="el-icon-delete"
            >删除</el-button
          >
        </template>
      </tree-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="paramsObj.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="paramsObj.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 添加分类对话框 -->
    <el-dialog
      title="添加分类"
      :visible.sync="addCateDialogVisible"
      width="50%"
      @close="addCateDialogClosed"
    >
      <!-- 表单 -->
      <el-form
        :model="addCateForm"
        :rules="addCateRules"
        ref="addCateFormRef"
        label-width="100px"
      >
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <el-cascader
            v-model="selectKeys"
            :options="parentCateList"
            :props="cascaderProps"
            @change="parentCateChange"
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>
      <!-- 底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 商品分类列表
      catelist: [],

      // 查询参数
      paramsObj: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },

      //   总数
      total: 0,

      // 表格规则
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name',
          minWidth: '155px'
        },
        {
          label: '是否有效',
          type: 'template',
          template: 'isok'
        },
        {
          label: '排序',
          type: 'template',
          template: 'sort'
        },
        {
          label: '操作',
          type: 'template',
          template: 'opt',
          minWidth: '185px'
        }
      ],

      // 添加分类对话框
      addCateDialogVisible: false,

      // 添加分类得表单对象
      addCateForm: {
        // 父级分类
        cat_pid: 0,
        cat_name: '',
        // 分类层级	不能为空，0表示一级分类；1表示二级分类；2表示三级分类
        cat_level: 0
      },

      // 添加分类得验证规则
      addCateRules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ]
      },

      // 父级分类列表
      parentCateList: [],
      // 指定级联选择器的配置项
      cascaderProps: {
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
        checkStrictly: true
      },

      // 级联选中的值
      selectKeys: []
    }
  },
  methods: {
    async getCateList() {
      const { data: res } = await this.$axios.get('/categories', {
        params: this.paramsObj
      })

      console.log(res)
      if (res.meta.status !== 200) return this.$message.error('获取分类失败！')

      this.catelist = res.data.result
      this.total = res.data.total
    },

    // 监听pagesize变化
    handleSizeChange(newSize) {
      this.paramsObj.pagesize = newSize
      this.paramsObj.pagenum = 1
      this.getCateList()
    },

    // 监听pagenum变化
    handleCurrentChange(newPageNum) {
      this.paramsObj.pagenum = newPageNum
      this.getCateList()
    },

    // 显示添加分类对话框
    showAddCateDialog() {
      // 获取父级分类
      this.getParentCateList()
      this.addCateDialogVisible = true
    },

    // 获取父级分类列表
    async getParentCateList() {
      const { data: res } = await this.$axios.get('/categories', {
        params: { type: 2 }
      })

      if (res.meta.status !== 200)
        return this.$message.error('获取父级分类失败!')

      console.log(res.data)
      this.parentCateList = res.data
    },

    // 选中的父级分类事件
    parentCateChange(value) {
      console.log(value)
      console.log(this.selectKeys)
      // selectKeys长度大于0则为有选中
      if (this.selectKeys.length > 0) {
        // 获取父级分类id,取最后一项即为父级id
        this.addCateForm.cat_pid = this.selectKeys[this.selectKeys.length - 1]
        // 设为第几级分类
        this.addCateForm.cat_level = this.selectKeys.length
      } else {
        this.addCateForm.cat_pid = 0
        this.addCateForm.cat_level = 0
      }
    },

    // 添加分类
    addCate() {
      console.log(this.addCateForm)
      this.$refs.addCateFormRef.validate(async (valid) => {
        if (!valid) return

        const { data: res } = await this.$axios.post(
          '/categories',
          this.addCateForm
        )

        if (res.meta.status !== 201) return this.$message.error('创建失败!')

        this.$message.success('创建成功!')
        this.getCateList()
        this.addCateDialogVisible = false
      })
    },

    // 关闭对话框清空数据
    addCateDialogClosed() {
      this.$refs.addCateFormRef.resetFields()
      // 注意其他项也需要重置
      this.selectKeys = []
      this.addCateForm.cat_pid = 0
      this.addCateForm.cat_level = 0
    }
  },
  created() {
    this.getCateList()
  }
}
</script>

<style lang="scss" scoped>
.tree-table {
  margin-top: 15px;
}
</style>

<template>
  <div>
    <!-- 面包导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区 -->
    <el-card>
      <!-- 警告 -->
      <el-alert
        title="注意:只允许为第三级分类设置相应参数!"
        type="warning"
        :closable="false"
        show-icon
      >
      </el-alert>

      <!-- 选择商品分类的级联选择框 -->
      <el-row class="cat-opt">
        <el-col>
          <span>选择商品分类: </span>

          <!-- 选择商品分类的级联选择框 -->
          <el-cascader
            v-model="selectCateKeys"
            :options="cateList"
            :props="cateProps"
            @change="selectCateChange"
          ></el-cascader>
        </el-col>
      </el-row>

      <!-- tabs标签页 -->
      <el-tabs v-model="activeName" @tab-click="tabClick">
        <el-tab-pane label="动态参数" name="many">
          <el-button
            type="primary"
            size="mini"
            :disabled="btnIsDisabled"
            @click="addDialogVisible = true"
            >添加参数</el-button
          >
          <!-- 动态参数表格 -->
          <el-table :data="manyTableData" border stripe>
            <!-- 展开行 -->
            <el-table-column type="expand">
              <!-- 展开行 -->
              <template v-slot="scope">
                <el-tag
                  v-for="(item, index) in scope.row.attr_vals"
                  :key="index"
                  closable
                  @close="removeAttrVal(index, scope.row)"
                  >{{ item }}</el-tag
                >

                <!-- 输入文本 -->
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>

            <el-table-column type="index"></el-table-column>
            <el-table-column
              label="参数名称"
              prop="attr_name"
            ></el-table-column>
            <el-table-column label="操作">
              <template v-slot="scope">
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-edit"
                  @click="editDialog(scope.row.attr_id)"
                  >编辑</el-button
                >
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-edit"
                  @click="removeParams(scope.row.attr_id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-button
            type="primary"
            size="mini"
            :disabled="btnIsDisabled"
            @click="addDialogVisible = true"
            >添加属性</el-button
          >

          <!-- 静态属性表格 -->
          <el-table :data="onlyTableData" border stripe>
            <!-- 展开行 -->
            <el-table-column type="expand">
              <!-- 展开行 -->
              <template v-slot="scope">
                <el-tag
                  v-for="(item, index) in scope.row.attr_vals"
                  :key="index"
                  closable
                  @close="removeAttrVal(index, scope.row)"
                  >{{ item }}</el-tag
                >

                <!-- 输入文本 -->
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>

            <el-table-column type="index"></el-table-column>
            <el-table-column
              label="属性名称"
              prop="attr_name"
            ></el-table-column>
            <el-table-column label="操作">
              <template v-slot="scope">
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-edit"
                  @click="editDialog(scope.row.attr_id)"
                  >编辑</el-button
                >
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-edit"
                  @click="removeParams(scope.row.attr_id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!-- 添加参数对话框 -->
    <el-dialog
      :title="'添加' + titleText"
      :visible.sync="addDialogVisible"
      width="30%"
      @close="addFormClosed"
    >
      <el-form
        :model="addForm"
        :rules="addRules"
        ref="addFormRef"
        label-width="100px"
      >
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="addForm.attr_name"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addParams">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改参数对话框 -->
    <el-dialog
      :title="'修改' + titleText"
      :visible.sync="editDialogVisible"
      width="30%"
      @close="editFormClosed"
    >
      <el-form
        :model="editForm"
        :rules="addRules"
        ref="editFormRef"
        label-width="100px"
      >
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="editForm.attr_name"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editParams">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cateList: [],

      //   级联配置对象
      cateProps: {
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },

      //   选中商品分类数组
      selectCateKeys: [],

      //   被激活的tab标签页
      activeName: 'many',

      //   表格数据
      manyTableData: [],
      onlyTableData: [],

      //   控制对话框显示隐藏
      addDialogVisible: false,

      //   添加表单
      addForm: {
        attr_name: '',
        attr_sel: '',
        attr_vals: ''
      },

      //   验证规则
      addRules: {
        attr_name: [
          {
            required: true,
            message: `请输入需要添加的名称`,
            trigger: 'blur'
          },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ]
      },

      // 控制对话框显示隐藏
      editDialogVisible: false,
      //   修改表单
      editForm: {},

      //   文本框和输入框切换显示
      inputVisible: false,
      //   输入框值
      inputValue: ''
    }
  },
  computed: {
    //   按钮是否需要被禁用,禁用true, 否则false
    btnIsDisabled() {
      if (this.selectCateKeys.length !== 3) return true

      return false
    },

    // 选中三级分类Id
    cateId() {
      if (this.selectCateKeys.length !== 3) return null

      return this.selectCateKeys[2]
    },

    //动态计算对话框的标题文本
    titleText() {
      if (this.activeName == 'many') {
        return '动态参数'
      }
      return '静态属性'
    }
  },
  methods: {
    async getCateList() {
      const { data: res } = await this.$axios.get('/categories')
      if (res.meta.status !== 200)
        return this.$message.error('获取分类列表失败!')
      this.cateList = res.data
      console.log(res.data)
    },

    // 级联选择框选中变化时
    selectCateChange() {
      //   console.log(this.selectCateKeys)
      //   证明不是选中三级分类
      if (this.selectCateKeys.length !== 3) {
        this.selectCateKeys = []
        // 重置数据列表
        this.manyTableData = []
        this.onlyTableData = []
        return
      }

      //   选中三级分类
      console.log(this.selectCateKeys)
      this.getParamsData()
    },

    // 标签页选中事件
    tabClick() {
      console.log(this.activeName)
      this.getParamsData()
    },

    // 获取参数
    async getParamsData() {
      //   所选分类id和当前面板获取对应数据
      const { data: res } = await this.$axios.get(
        `/categories/${this.cateId}/attributes`,
        {
          params: { sel: this.activeName }
        }
      )

      if (res.meta.status !== 200)
        return this.$message.error('获取参数列表失败!')

      console.log(res.data)
      //   分割字符串变为数组
      res.data.forEach((item) => {
        item.attr_vals = item.attr_vals ? item.attr_vals.split(',') : []
        // 为与其他项区分开来,为每项添加独立项
        // 按钮输入框的切换显示
        item.inputVisible = false
        // 输入框内容
        item.inputValue = ''
      })

      if (this.activeName === 'many') {
        this.manyTableData = res.data
      } else {
        this.onlyTableData = res.data
      }
    },

    // 添加对话框关闭时
    addFormClosed() {
      this.$refs.addFormRef.resetFields()
    },

    // 添加参数
    addParams() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return

        const { data: res } = await this.$axios.post(
          `categories/${this.cateId}/attributes`,
          {
            attr_name: this.addForm.attr_name,
            attr_sel: this.activeName
          }
        )

        if (res.meta.status !== 201)
          return this.$message.error(`添加${this.titleText}失败!`)

        this.$message.success(`添加${this.titleText}成功!`)
        this.getParamsData()
        this.addDialogVisible = false
      })
    },

    // 修改对话框关闭时
    editFormClosed() {
      this.$refs.editFormRef.resetFields()
    },

    // 编辑按钮触发事件
    async editDialog(id) {
      const { data: res } = await this.$axios.get(
        `categories/${this.cateId}/attributes/${id}`,
        {
          params: {
            attr_sel: this.activeName
          }
        }
      )

      if (res.meta.status !== 200)
        return this.$message.error(`获取${this.titleText}失败!`)

      this.editForm = res.data
      this.editDialogVisible = true
    },

    // 修改参数
    editParams() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return

        const { data: res } = await this.$axios.put(
          `categories/${this.cateId}/attributes/${this.editForm.attr_id}`,
          {
            attr_name: this.editForm.attr_name,
            attr_sel: this.activeName,
            attr_vals: this.editForm.attr_vals
          }
        )

        if (res.meta.status !== 200)
          return this.$message.error(`修改${this.titleText}失败!`)

        this.$message.success(`修改${this.titleText}成功!`)
        this.getParamsData()
        this.editDialogVisible = false
      })
    },

    // 删除
    removeParams(id) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data: res } = await this.$axios.delete(
            `categories/${this.cateId}/attributes/${id}`
          )

          if (res.meta.status !== 200) return this.$message.error('删除失败!')

          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getParamsData()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    // 输入框触发事件
    async handleInputConfirm(row) {
      console.log('ok')
      if (row.inputValue.trim().length === 0) {
        row.inputValue = ''
        row.inputVisible = false
        return
      }
      // 拷贝数组并添加输入值,不影响原来的数组对象
      //   浅拷贝,返回新数组
      // 拷贝数组有多种 [].concat() array.slice()  Array.from(array1); JSON.parse(JSON.stringify(array1));
      let newAttrVals = [...row.attr_vals]
      newAttrVals.push(row.inputValue.trim())

      //   发起请求保存到数据库
      const { data: res } = await this.$axios.put(
        `categories/${this.cateId}/attributes/${row.attr_id}`,
        {
          attr_name: row.attr_name,
          attr_sel: row.attr_sel,
          attr_vals: newAttrVals.join(',')
        }
      )

      if (res.meta.status !== 200) {
        return this.$message.error('添加失败!')
      }

      this.$message.success('添加成功!')
      //   输入了内容则添加到数组中
      row.attr_vals.push(row.inputValue.trim())
      row.inputValue = ''
      row.inputVisible = false
    },

    // 按下按钮切换输入框
    showInput(row) {
      row.inputVisible = true
      //   自动获得焦点
      //   nextTick当页面元素被重新渲染之后才执行回调函数
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    // 删除展开行标签
    async removeAttrVal(index, row) {
      // 复制新数组不影响旧数组
      let newArr = row.attr_vals.slice()
      // 删除
      newArr.splice(index, 1)

      const { data: res } = await this.$axios.put(
        `categories/${this.cateId}/attributes/${row.attr_id}`,
        {
          attr_name: row.attr_name,
          attr_sel: row.attr_sel,
          attr_vals: newArr.join(',')
        }
      )

      if (res.meta.status !== 200) {
        return this.$message.error('删除失败!')
      }

      this.$message.success('删除成功!')
      //   输入了内容则添加到数组中
      row.attr_vals.splice(index, 1)
    }
  },
  created() {
    this.getCateList()
  }
}
</script>

<style lang="scss" scoped>
.cat-opt {
  margin: 15px 0;
  font-size: 16px;

  .el-cascader {
    margin-left: 10px;
  }
}

.el-tag {
  margin: 5px;
}
.input-new-tag {
  width: 120px;
}
</style>

<template>
  <div>
    <!-- 面包导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card class="box-card">
      <!-- 添加角色 -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="addRoleDialogVisible = true"
            >添加角色</el-button
          >
        </el-col>
      </el-row>
      <!-- 表格区 -->
      <el-table :data="roleList" border stripe>
        <!-- 展开列 -->
        <el-table-column type="expand" label="">
          <template v-slot="scope">
            <!-- 一级 -->
            <el-row
              :class="['bdbottom', index1 == 0 ? 'bdtop' : '', 'vcenter']"
              v-for="(item1, index1) in scope.row.children"
              :key="item1.id"
            >
              <el-col :span="5">
                <el-tag
                  size="mini"
                  closable
                  @close="romoveRightsById(scope.row, item1.id)"
                  >{{ item1.authName }}</el-tag
                >
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 二级 -->
              <el-col :span="19">
                <el-row
                  v-for="(item2, index2) in item1.children"
                  :key="item2.id"
                  :class="[index2 == 0 ? '' : 'bdtop', 'vcenter']"
                >
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      size="mini"
                      closable
                      @close="romoveRightsById(scope.row, item2.id)"
                      >{{ item2.authName }}</el-tag
                    >
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 三级 -->
                  <el-col :span="18">
                    <el-tag
                      type="warning"
                      size="mini"
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      closable
                      @close="romoveRightsById(scope.row, item3.id)"
                      >{{ item3.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称"> </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
        <el-table-column label="操作" width="300px">
          <template v-slot="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="showEditRoleDialog(scope.row.id)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="removeRoleById(scope.row.id)"
              >删除</el-button
            >
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-setting"
              @click="showSetRightDialog(scope.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 分配权限对话框  -->
    <el-dialog
      title="分配权限"
      :visible.sync="setRightDialogVisible"
      width="50%"
      @close="setRightsDialogClosed"
    >
      <!-- 权限树 -->
      <el-tree
        :data="rightslist"
        :props="treeProps"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="defKey"
        ref="treeRef"
      ></el-tree>

      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加角色对话框 -->
    <el-dialog
      title="添加角色"
      :visible.sync="addRoleDialogVisible"
      width="50%"
      @closed="addRoleDialogClosed"
    >
      <!-- 内容主体 -->
      <el-form
        :model="addRoleForm"
        :rules="addRoleFormRules"
        ref="addRoleFormRef"
        label-width="70px"
      >
        <el-form-item label="角色名" prop="roleName">
          <el-input v-model="addRoleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addRoleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑对话框 -->
    <el-dialog
      title="修改角色"
      :visible.sync="editRoleDialogVisible"
      width="50%"
      @closed="editRoleDialogClosed"
    >
      <!-- 内容主体 -->
      <el-form
        :model="editRoleForm"
        :rules="addRoleFormRules"
        ref="editRoleFormRef"
        label-width="70px"
      >
        <el-form-item label="角色名" prop="roleName">
          <el-input v-model="editRoleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editRoleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roleList: [],
      //   分配权限对话框
      setRightDialogVisible: false,
      //   权限数据
      rightslist: [],
      //   权限树
      treeProps: {
        children: 'children',
        label: 'authName'
      },
      //   默认展开选中的节点的 key 的数组
      defKey: [],
      // 当前分配角色id
      currentRoleId: '',

      // 添加角色对话框
      addRoleDialogVisible: false,

      // 添加角色表单
      addRoleForm: {
        roleName: '',
        roleDesc: ''
      },
      addRoleFormRules: {
        roleName: [
          { required: true, message: '请输入角色名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        roleDesc: [
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ]
      },

      // 编辑角色对话框
      editRoleDialogVisible: false,

      // 修改角色
      editRoleForm: {}
    }
  },
  methods: {
    async getRoleList() {
      const { data: res } = await this.$axios.get('/roles')
      if (res.meta.status !== 200)
        return this.$message.error('获取角色列表失败！')

      this.roleList = res.data
      console.log(this.roleList)
    },

    // 关闭添加角色对话框初始化
    addRoleDialogClosed() {
      this.$refs.addRoleFormRef.resetFields()
    },

    // 添加角色
    addRole() {
      this.$refs.addRoleFormRef.validate(async (valid) => {
        if (!valid) return
        // 发起请求
        const { data: res } = await this.$axios.post('/roles', this.addRoleForm)
        console.log(res)
        if (res.meta.status !== 201) {
          return this.$message.error('创建角色失败!')
        }
        this.addRoleDialogVisible = false
        this.getRoleList()
        this.$message.success('创建角色成功!')
      })
    },

    // 打开编辑角色对话框
    async showEditRoleDialog(id) {
      const { data: res } = await this.$axios.get(`/roles/${id}`)

      if (res.meta.status !== 200)
        return this.$message.error('查询角色信息失败！')
      console.log(res.data)
      this.editRoleForm = res.data
      this.editRoleDialogVisible = true
    },

    // 关闭修改角色对话框初始化
    editRoleDialogClosed() {
      this.$refs.editRoleFormRef.resetFields()
    },

    // 保存编辑角色
    editRole() {
      this.$refs.editRoleFormRef.validate(async (valid) => {
        if (!valid) return
        // 发起修改请求
        const { data: res } = await this.$axios.put(
          `/roles/${this.editRoleForm.roleId}`,
          {
            roleName: this.editRoleForm.roleName,
            roleDesc: this.editRoleForm.roleDesc
          }
        )

        if (res.meta.status !== 200) {
          return this.$message.error('更新角色失败！')
        }

        // 关闭对话框
        this.editRoleDialogVisible = false
        // 刷新列表数据
        this.getRoleList()
        // 提示修改成功
        this.$message.success('更新角色成功！')
      })
    },

    // 删除角色信息
    removeRoleById(id) {
      console.log(id)
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data: res } = await this.$axios.delete(`/roles/${id}`)
          if (res.meta.status !== 200) return this.message.error('删除失败！')
          this.getRoleList()

          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    // 根据id删除相应权限
    romoveRightsById(role, rightsId) {
      this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data: res } = await this.$axios.delete(
            `roles/${role.id}/rights/${rightsId}`
          )
          console.log(res)
          if (res.meta.status !== 200) return this.$message.error('删除失败!')

          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          // 从返回数据赋值，不重新刷新
          role.children = res.data
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    // 分配权限对话框
    async showSetRightDialog(role) {
      // 保存当前id
      this.currentRoleId = role.id
      // 获取树状权限列表
      const { data: res } = await this.$axios.get('/rights/tree')
      console.log(res)
      if (res.meta.status !== 200)
        return this.$message.error('获取权限数据失败！')

      this.rightslist = res.data
      // 递归遍历角色三级权限获取id
      this.getLeafKeys(role, this.defKey)
      console.log(this.defKey)
      this.setRightDialogVisible = true
    },

    // 递归遍历得到三级权限
    getLeafKeys(node, arr) {
      // 判断是否为三级节点
      if (!node.children) {
        // 是
        return arr.push(node.id)
      }

      node.children.forEach((item) => {
        this.getLeafKeys(item, arr)
      })
    },

    // 关闭权限按钮初始化
    setRightsDialogClosed() {
      this.defKey = []
    },

    // 分配权限
    async allotRights() {
      const keys = [
        ...this.$refs.treeRef.getHalfCheckedKeys(),
        ...this.$refs.treeRef.getCheckedKeys()
      ]
      console.log(keys)
      let idStr = keys.join(',')
      const { data: res } = await this.$axios.post(
        `roles/${this.currentRoleId}/rights`,
        {
          rids: idStr
        }
      )

      if (res.meta.status !== 200) return this.$message.error('分配权限失败！')

      this.$message.success('分配权限成功！')

      this.getRoleList()
      // 关闭对话框
      this.setRightDialogVisible = false
    }
  },
  created() {
    this.getRoleList()
  }
}
</script>

<style lang="scss" scoped>
.el-tag {
  margin: 7px;
}

.bdtop {
  border-top: 1px solid #eee;
}

.bdbottom {
  border-bottom: 1px solid #eee;
}

// 垂直居中
.vcenter {
  display: flex;
  align-items: center;
}
</style>

<template>
  <div>
    <!-- 面包导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card class="box-card">
      <!-- 表格区 -->
      <el-table :data="rightsList" border stripe>
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="authName" label="权限名称"> </el-table-column>
        <el-table-column prop="path" label="路径"> </el-table-column>
        <el-table-column prop="level" label="等级">
          <template v-slot="scoped">
            <el-tag v-if="scoped.row.level == 0">一级</el-tag>
            <el-tag type="success" v-else-if="scoped.row.level == 1"
              >二级</el-tag
            >
            <el-tag type="warning" v-else>三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rightsList: []
    }
  },
  methods: {
    async getRightsList() {
      const { data: res } = await this.$axios.get('/rights/list')
      if (res.meta.status !== 200)
        return this.$message.error('获取权限列表失败！')

      this.rightsList = res.data
      console.log(res)
    }
  },
  created() {
    this.getRightsList()
  }
}
</script>

<style></style>

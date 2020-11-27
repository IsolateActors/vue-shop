<template>
  <div>
    <!-- 面包导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card class="box-card">
      <!-- 搜索区 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            class="input-with-select"
            clearable
            @change="search"
            v-model="queryInfo.query"
          >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="goAddPage">添加商品</el-button>
        </el-col>
      </el-row>

      <!-- 表格区 -->
      <el-table :data="goodslist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称"></el-table-column>
        <el-table-column
          prop="goods_price"
          label="商品价格(元)"
          width="110px"
        ></el-table-column>
        <el-table-column
          prop="goods_weight"
          label="商品重量"
          width="80px"
        ></el-table-column>
        <el-table-column prop="add_time" label="创建时间" width="160px">
          <template v-slot="scope">
            {{ (scope.row.add_time * 1000) | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="130px">
          <template v-slot="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="removeById(scope.row.goods_id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 查询商品列表
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },

      // 商品列表
      goodslist: [],
      // 总条数
      total: 0
    }
  },
  methods: {
    async getGoodList() {
      const { data: res } = await this.$axios.get('goods', {
        params: this.queryInfo
      })

      if (res.meta.status !== 200)
        return this.$message.error('获取商品列表失败！')

      this.goodslist = res.data.goods
      this.total = res.data.total
      console.log(this.goodslist)
    },

    // 分页大小
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.pagenum = 1
      this.getGoodList()
    },

    // 选中的页
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getGoodList()
    },

    // 搜索
    search() {
      this.queryInfo.pagenum = 1
      this.getGoodList()
    },

    // 删除
    removeById(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data: res } = await this.$axios.delete(`goods/${id}`)

          if (res.meta.status !== 200) return this.$message.error('删除失败！')
          this.getGoodList()
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

    goAddPage() {
      this.$router.push('/goods/add')
    }
  },

  created() {
    this.getGoodList()
  }
}
</script>

<style lang="scss" scoped></style>

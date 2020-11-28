<template>
  <div>
    <!-- 面包导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
      <div id="main" style="width: 600px;height:400px;"></div>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  data() {
    return {
      Reports: {},
      options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    }
  },
  methods: {
    async getReports() {
      const { data: res } = await this.$axios.get('reports/type/1')

      console.log(res)
      if (res.meta.status !== 200) return this.$message.error('获取报表失败！')

      this.Reports = res.data
      console.log(1111)
    },
    // 深度合并对象
    deepObjectMerge(FirstOBJ, SecondOBJ) {
      for (var key in SecondOBJ) {
        FirstOBJ[key] =
          FirstOBJ[key] && FirstOBJ[key].toString() === '[object Object]'
            ? this.deepObjectMerge(FirstOBJ[key], SecondOBJ[key])
            : (FirstOBJ[key] = SecondOBJ[key])
      }
      return FirstOBJ
    }
  },
  created() {
    // console.log(4444)
    // this.getReports()
  },
  // 渲染完成后才能初始化
  async mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'))
    await this.getReports()

    // 组合数据 深合并
    const reportData = this.deepObjectMerge(this.Reports, this.options)
    console.log(reportData)
    // console.log(55555555)
    // 绘制图表
    myChart.setOption(reportData)
  }
}
</script>

<style></style>

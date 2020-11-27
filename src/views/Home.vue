<template>
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header>
      <div class="logo">
        <img src="../assets/logo.png" alt="" />
        <span @click="goHome">电商后台管理</span>
      </div>
      <el-button icon="el-icon-switch-button" size="mini" round @click="logout"
        >退出</el-button
      >
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-btn" @click="toggleCollapse">
          <i class="el-icon-s-fold"></i>
        </div>
        <!-- 菜单 -->
        <el-menu
          class="el-menu-vertical-demo"
          active-text-color="#87ceeb"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menulist"
            :key="item.id"
          >
            <template slot="title">
              <i :class="iconObj[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavState('/' + subItem.path)"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- 内容 -->
      <el-main>
        <!-- 路由占位 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menulist: [],
      iconObj: {
        '125': 'el-icon-s-custom',
        '103': 'el-icon-unlock',
        '101': 'el-icon-s-goods',
        '102': 'el-icon-s-order',
        '145': 'el-icon-s-platform'
      },
      // 是否折叠
      isCollapse: false,
      // 当前选中的侧边栏状态
      activePath: ''
    }
  },
  created() {
    this.getMenuList()

    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList() {
      const { data: res } = await this.$axios.get('/menus')
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error(res.meta.message)
      this.menulist = res.data
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    goHome() {
      this.activePath = ''
      if (this.$route.path !== '/welcome') {
        this.$router.replace('/home')
      }
    },
    saveNavState(activePath) {
      this.activePath = activePath
      window.sessionStorage.setItem('activePath', activePath)
    }
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: skyblue;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 20px;
  padding-left: 0;

  .logo {
    height: 80%;
    display: flex;
    align-items: center;

    img {
      height: 100%;
    }
    span {
      margin-left: 15px;
      cursor: pointer;
    }
  }
}

.el-aside {
  background-color: #d3dce6;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #e9eef3;
}

.toggle-btn {
  font-size: 15px;
  line-height: 24px;
  color: #000;
  text-align: center;
  cursor: pointer;
}
</style>

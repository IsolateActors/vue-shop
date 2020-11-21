<template>
  <div class="login-container">
    <div class="login-box">
      <!-- 头像 -->
      <div class="avatar-box">
        <img src="@/assets/logo.png" alt="" />
      </div>

      <!-- 表单 -->
      <el-form
        ref="resetLoginRef"
        :rules="rules"
        :model="loginForm"
        class="form-content"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            show-password
          ></el-input>
        </el-form-item>

        <el-form-item class="btns">
          <el-button type="primary" plain round @click="login">登录</el-button>
          <el-button type="info" plain round @click="resetLoginForm"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 表单信息
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 校验规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  methods: {
    resetLoginForm() {
      this.$refs.resetLoginRef.resetFields()
    },
    login() {
      this.$refs.resetLoginRef.validate(async (valid) => {
        console.log(valid)
        if (!valid) return
        const { data: res } = await this.$axios.post('login', this.loginForm)
        console.log(res)
        if (res.meta.status !== 200)
          return this.$message({
            message: '登录失败！',
            type: 'error'
          })
        this.$message.success('登录成功！')
        sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  background-color: skyblue;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: relative;

    .avatar-box {
      width: 130px;
      height: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px skyblue;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
    }

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }

    .form-content {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 20px;
      // box-sizing: border-box;
    }

    .btns {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>

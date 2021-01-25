<template>
  <el-form :model="login" :rules="rules" ref="login" class="login">
    <img class="login__logo" src="../../assets/logo.png" />
    <h3 class="login__title">系统登录</h3>
    <el-form-item prop="username">
      <el-input
        v-model="login.username"
        prefix-icon="el-icon-user"
        placeholder="请输入帐号"
      />
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="login.password"
        prefix-icon="el-icon-lock"
        placeholder="请输入密码"
        show-password
      />
    </el-form-item>
    <el-form-item v-show="isLogin">
      <el-button @click="onLogin" type="primary" class="login__submit"
        >登录</el-button
      >
    </el-form-item>
    <el-form-item v-show="!isLogin">
      <el-button @click="onRegister" type="primary" class="login__submit"
        >注册</el-button
      >
    </el-form-item>
    <el-form-item style="text-align:right;">
      <el-switch v-model="isLogin" active-text="登陆" inactive-text="注册">
      </el-switch>
    </el-form-item>
  </el-form>
</template>

<script>
import user from "@/api/user";
export default {
  data() {
    return {
      isLogin: true,
      login: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入帐号",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    async onLogin() {
      if (await this.$refs.login.validate()) {
        const res = await this.$store.dispatch("login", this.login);
        this.$message({
          message: res.message,
          type: res.code === 0 ? "success" : "error"
        });
        if (res.code === 0) {
          this.$router.replace("/home");
        }
      }
    },
    async onRegister() {
      if (await this.$refs.login.validate()) {
        const res = await user.register(this.login);
        this.$message({
          message: res.message,
          type: res.code === 0 ? "success" : "error"
        });
        if (res.code === 0) {
          this.isLogin = true;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 420px;
  margin: 0 auto;
  padding-top: 140px;
}
.login__logo {
  display: block;
  height: 40px;
  margin: 0 auto;
}
.login__title {
  line-height: 60px;
  font-size: 18px;
  font-weight: normal;
  border-bottom: 1px solid #eee;
}
.login__submit {
  width: 100%;
}
</style>

<template>
  <div class="login-container">
    <div class="form-container">
      <h2>用户登录</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-item">
          <label>账号：</label>
          <input type="text" v-model="loginId" />
        </div>
        <div class="form-item">
          <label>密码：</label>
          <input
            type="password"
            autocomplete="new-password"
            v-model="loginPwd"
          />
        </div>
        <div class="form-item">
          <label></label>
          <button :disabled="loading">
            {{ loading ? "loading..." : "登录" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      loginId: "",
      loginPwd: "",
    };
  },
  computed: mapState("loginUser", ["loading"]), //vuex辅助函数,
  methods: {
    async handleSubmit() {
      const resp = await this.$store.dispatch("loginUser/login", {
        loginId: this.loginId,
        loginPwd: this.loginPwd,
      });
      if (resp) {
        const returnUrl = this.$route.query.returnUrl || "/";
        this.$router.push(returnUrl).catch((err) => {
          console.log(err);
        });
      } else {
        alert("账号密码错误");
      }
    },
  },
};
</script>
<style scoped lang="less">
@import "~@/styles/mixin.less";
@import "~@/styles/var.less";
.login-container {
  width: 100%;
  height: 100%;
  background-image: url("~@/assets/login.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.form-container {
  width: 500px;
  height: 400px;
  background: rgba(180, 179, 179,.5);
  .self-center(relative);
  top: 40%;
h2{
  color: rgb(19, 18, 18);
  text-align: center;
  padding-top: 40px;
}
  form {
    .self-center();
  }
}
.form-item {
  margin: 1em auto;
  width: 300px;
  display: flex;
  align-items: center;
}
.form-item input {
  height: 26px;
  font-size: 14px;
  flex: 1 1 auto;
}
.form-item label {
  width: 70px;
}
.form-item button {
  flex: 1 1 auto;
  background: #50936c;
  border: none;
  outline: none;
  color: #fff;
  border-radius: 5px;
  height: 35px;
  font-size: 16px;
}
</style>

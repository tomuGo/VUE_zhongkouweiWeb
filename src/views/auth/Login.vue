<template>
  <div class="row">
    <div class="col-md-4 col-md-offset-4 floating-box">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">请登录</h3>
        </div>

        <div class="panel-body" data-validator-form>
          <div class="form-group">

            <label class="control-label">用户名</label><span style="color: red"> * </span>
            <input v-model.trim="username" v-validator.required="{ title: '用户名' }" type="text" class="form-control" placeholder="用户名/邮箱">
          </div>
          <div class="form-group">
            <label class="control-label">密码</label><span style="color: red"> * </span>
            <input v-model.trim="password" id="password" v-validator.required="{ title: '密码' }" type="password" class="form-control" placeholder="请填写密码">
          </div>
          <br>
          <button @click="login" type="submit" class="btn btn-lg btn-success btn-block">
            <i class="fa fa-btn fa-sign-in"></i> 登录
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from '@/plugins/axios'
  import {setCookie} from '@/utils/util'
export default {
  name: 'Login',
  data() {
    return {
      username: '', // 用户名
      password: '', // 密码
    }
  },
  methods: {
    login(e) {
      this.$nextTick(() => {
        const target = e.target.type === 'submit' ? e.target : e.target.parentElement
        if (target.canSubmit) {
          this.submit()
        }
      })
    },
    submit() {
      axios.get(`/api/login`, {params: {account: this.username, password: this.password}}).then((data) => {
        setCookie('token', data.headers.token);
        this.$store.dispatch('login', data.data);
      });
    }
  }
}
</script>

<style scoped>

</style>

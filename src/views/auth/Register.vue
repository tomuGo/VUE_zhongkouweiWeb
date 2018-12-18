<template>
  <div class="row">
    <div class="col-md-4 col-md-offset-4 floating-box">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">请注册</h3>
        </div>
        <div class="panel-body" data-validator-form>
          <div class="form-group">
            <label class="control-label">用户名</label><span style="color: red"> * </span>
            <input v-model.trim="username"
                   v-validator:input.required="{ regex: /^[\w\u4e00-\u9fa5]+$/, error: '用户名只能由汉字/数字/字母/下划线/中划线组成' }"
                   type="text" class="form-control" placeholder="请填写用户名">
          </div>
          <div class="form-group">
            <label class="control-label">邮箱（用于找回密码）</label>
            <input v-model.trim="email"
                   v-validator:input="{ regex: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, error: '邮箱不符合格式' }"
                   type="text" class="form-control">
          </div>
          <div class="form-group">
            <label class="control-label">密码</label><span style="color: red"> * </span>
            <input id="password" v-model.trim="password"
                   v-validator.required="{ regex: /^\w{6,16}$/, error: '密码要求 6 ~ 16 个单词字符' }" type="password"
                   class="form-control" placeholder="请填写密码">
          </div>
          <div class="form-group">
            <label class="control-label">确认密码</label><span style="color: red"> * </span>
            <input v-model.trim="cpassword" v-validator.required="{ target: '#password' }" type="password"
                   class="form-control" placeholder="请填写确认密码">
          </div>
          <button type="submit" class="btn btn-lg btn-success btn-block" @click="register">
            <i class="fa fa-btn fa-sign-in"></i> 注册
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from '@/plugins/axios'

  export default {
    name: 'Register',
    data() {
      return {
        username: '',
        email: '',
        password: '',
        cpassword: '',
      }
    },
    methods: {
      register(e) {
        this.$nextTick(() => {
          const target = e.target.type === 'submit' ? e.target : e.target.parentElement

          if (target.canSubmit) {
            this.submit()
          }
        })
      },
      submit() {
        let userInfo = {
          username: this.username,
          email: this.email,
          password: this.password
        };
        axios.post("/api/user", userInfo).then(() => {
          axios.get(`/api/login`, {params: {account: this.username, password: this.password}}).then((data) => {
            this.$store.dispatch('login', data.data);
          });
        });
      }
    }
  }
</script>

<style scoped>
</style>

<template>
  <div class="row">
    <div class="col-md-4 col-md-offset-4 floating-box">
    <Message :show.sync="msgShow" :type="msgType" :msg="msg"/>
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">请注册</h3>
        </div>

        <div class="panel-body" data-validator-form>
          <div class="form-group">
            <label class="control-label">用户名</label><span style="color: red"> * </span>
            <input v-model.trim="username" v-validator:input.required="{ regex: /^[a-zA-Z]+\w*\s?\w*$/, error: '用户名要求以字母开头的单词字符' }" type="text" class="form-control" placeholder="请填写用户名">
          </div>
          <div class="form-group">
            <label class="control-label">邮箱（用于找回密码）</label>
            <input v-model.trim="email" v-validator:input.required="{ regex: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, error: '邮箱不符合格式' }" type="text" class="form-control">
          </div>
          <div class="form-group">
            <label class="control-label">密码</label>
            <input id="password" v-model.trim="password" v-validator.required="{ regex: /^\w{6,16}$/, error: '密码要求 6 ~ 16 个单词字符' }" type="password" class="form-control" placeholder="请填写密码">
          </div>
          <div class="form-group">
            <label class="control-label">确认密码</label>
            <input v-model.trim="cpassword" v-validator.required="{ target: '#password' }" type="password" class="form-control" placeholder="请填写确认密码">
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
import createCaptcha from '@/utils/createCaptcha'
import ls from '@/utils/localStorage'

export default {
  name: 'Register',
  data() {
    return {

      username: '', // 用户名
      email: '',
      password: '', // 密码
      cpassword: '', // 确认密码

    }
  },
  created() {

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

        const user = {
          name: this.username,
          password: this.password,
          avatar: `https://api.adorable.io/avatars/200/${this.username}.png`
        }

        const localUser = this.$store.state.user

        if (localUser) {
          if (localUser.name === user.name) {
            this.showMsg('用户名已存在')
          } else {
            this.login(user)
          }
        } else {
          this.login(user)
        }

    },
    login(user) {
      this.$store.dispatch('login', user)
      this.showMsg('注册成功', 'success')
    },
    showMsg(msg, type = 'warning') {
      this.msg = msg
      this.msgType = type
      this.msgShow = false

      this.$nextTick(() => {
        this.msgShow = true
      })
    }
  }
}
</script>

<style scoped>
.thumbnail { width: 170px; margin-top: 10px; cursor: pointer;}
.thumbnail .captcha { height: 46px; background: #E1E6E8;}
.captcha { font-size: 24px; font-weight: bold; user-select: none;}
</style>

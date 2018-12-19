<template>
  <div class="col-md-9 left-col">
    <div class="panel panel-default padding-md">
        <div class="panel-body">
            <h2><i class="fa fa-lock"></i> 修改密码</h2>
        <hr>
        <div class="form-horizontal" data-validator-form>
          <div class="form-group">
            <label class="col-sm-2 control-label">原 密 码</label>
            <div class="col-sm-6">
              <input v-model.trim="oldPassword" id="password" v-validator.required="{ regex: /^\w{3,16}$/, error: '密码要求 6 ~ 16 个单词字符' }" type="password" class="form-control" placeholder="请填写原密码">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">新 密 码</label>
            <div class="col-sm-6">
              <input v-model.trim="newPassword" id="newPassword" v-validator.required="{ regex: /^\w{6,16}$/, error: '密码要求 6 ~ 16 个单词字符' }" type="password" class="form-control" placeholder="填写新密码">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">确认新密码</label>
            <div class="col-sm-6">
              <input v-model.trim="cobyNewPassword" v-validator.required="{ title: '确认密码', target: '#newPassword' }" type="password" class="form-control" placeholder="确认新密码">
            </div>
          </div>

          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-6">
              <button type="submit" class="btn btn-primary" @click="updatePassword">修改</button>
            </div>
          </div>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from '@/plugins/axios'
import {mapState} from 'vuex'
export default {
  name: 'EditPassword',
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      cobyNewPassword:''

    }
  },
  computed: {
    ...mapState([
      'user'
    ])
  },
  methods: {
    updatePassword(e) {
      let RegisterUser = {
        userId: this.user.userId,
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
      };
      this.$nextTick(() => {
        console.log(this.user.userId)
        if (e.target.canSubmit) {
            axios.put(`/api/users/updatePassword`,RegisterUser).then(()=>{
              this.$router.push({ path:'/'+this.user.userId});
            })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>

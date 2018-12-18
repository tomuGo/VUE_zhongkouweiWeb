<template>
  <div class="col-md-9 left-col">
    <div class="panel panel-default padding-md" >
        <div class="panel-body">
            <h2><i class="fa fa-cog"></i> 编辑个人资料</h2>
        <hr>
        <div class="form-horizontal" data-validator-form :data="user">
          <div class="form-group">
            <label class="col-sm-2 control-label">用户名</label>
            <div class="col-sm-6">
              <input v-model.trim="userInfo.username" v-validator:input.required="{ title: '用户名', regex: /^[\w\u4e00-\u9fa5]+$/, error: '用户名只能由汉字/数字/字母/下划线/中划线组成' }" type="text" class="form-control">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">邮箱（用于找回密码）</label>
            <div class="col-sm-6">
            <input v-model.trim="userInfo.email"
                   v-validator:input="{ regex: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, error: '邮箱不符合格式' }"
                   type="text" class="form-control">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">性别</label>
            <div class="col-sm-6">
              <select v-model="userInfo.sex" class="form-control">
                <option value="">未选择</option>
                <option value=1 >男</option>
                <option value=0 >女</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">个人简介</label>
            <div class="col-sm-6">
              <textarea v-model.trim="userInfo.introduction" type="text" class="form-control"></textarea>
            </div>
          </div>

          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-6">
              <button type="submit" class="btn btn-primary" @click="updateUserInfo">修改</button>
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
  name: 'EditProfile',
  data() {
    return {
      userInfo:''
    }
  },
  computed: {
    ...mapState([
      'user'
    ])
  },
  created(){
    this.userInfo=this.user;
  },
  methods: {
    updateUserInfo(e) {
      this.$nextTick(() => {
        if (e.target.canSubmit && this.user.userId) {
          axios.put('/api/users/'+this.user.userId,this.userInfo).then(()=>{
            // 跳转到个人中心
            this.$router.push({ path:'/'+this.user.userId});
          });
        }
      })
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div class="navbar-right">
    <ul v-if="auth" class="nav navbar-nav github-login">
      <li>
        <a v-dropdown href="javascript:;">
          <i class="fa fa-plus text-md"></i>
        </a>
        <ul class="dropdown-menu">
          <li>
            <router-link to="/articles/create">
              <i class="fa fa-paint-brush text-md"></i>
              创作文章
            </router-link>
          </li>
        </ul>
      </li>
      <li>
        <a v-dropdown href="javascript:;">
          <span v-if="user">
            <img v-if="user.avatar" :src="user.avatar" class="avatar-topnav">
            <span v-if="user.username">{{ user.username }}</span>
          </span>
          <span v-else>who am I</span>
          <span class="caret"></span>
        </a>
        <ul class="dropdown-menu">
          <li v-if="user">
            <router-link :to="`/${user.userId}`">
              <i class="fa fa-list-ul text-md i-middle"></i>
              个人专栏
            </router-link>
          </li>
          <li>
            <router-link to="/users/${user.userId}/edit">
              <i class="fa fa-cog text-md i-middle"></i>
              编辑资料
            </router-link>
          </li>
          <li><a href="#" @click="logout"><i class="fa fa-sign-out text-md"></i>退出</a></li>
        </ul>
      </li>
    </ul>
    <div v-else class="nav navbar-nav github-login">
      <router-link to="/auth/login" class="btn btn-default login-btn">
        <i class="fa fa-user"></i> 登 陆
      </router-link>
      <router-link to="/auth/register" class="btn btn-default login-btn">
        <i class="fa fa-user-plus"></i> 注 册
      </router-link>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import axios from '@/plugins/axios'
  import {setCookie, getCookie} from '@/utils/util'

  export default {
    name: 'TheEntry',
    names: '',
    computed: {
      ...mapState([
        'auth',
        'user'
      ])
    },
    /*data() {
      return {auth: getCookie("userName")}
    },*/
    methods: {
      logout() {
        this.$swal({
          text: '你确定要退出吗?',
          confirmButtonText: '退出'
        }).then((res) => {
          if (res.value) {
            axios.get("/api/logout").then(
              this.$store.dispatch('logout')
            );
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>

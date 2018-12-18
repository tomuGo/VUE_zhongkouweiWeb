<template>
  <footer class="footer">
    <div class="container">
      <div class="row footer-top">
        <div class="col-lg-offset-7">
          <div class="col-sm-1 col-lg-1 ">
            <a :href="codeUrl" target="_blank">
              <img :src="githubImg" class="image">
            </a>
          </div>
          <div class="col-sm-1 col-lg-1"></div>
          <div class="col-sm-1 col-lg-1 ">
            <a :href="xinlangUrl" target="_blank">
              <img :src="weibo" class="image">
            </a>
          </div>
          <div class="col-sm-1 col-lg-1"></div>
          <div class="col-sm-1 col-lg-1 ">
            <a :href="codeUrl" target="_blank">
              <img :src="email" class="image">
            </a>
          </div>
        </div>
    </div>
    </div>
  </footer>
</template>

<script>
import title from '@/directives/title'
export default {
  name: 'TheFooter',
  directives: {
    title
  },
  data() {
    return {
      description: '源码地址',
      title: '点击查看源码',
      githubImg:require("@/assets/gitHub.png"),
      codeUrl:'https://github.com/tomuGo',
      xinlangUrl:'https://weibo.com/5514320708/profile?rightmod=1&wvr=6&mod=personinfo&is_all=1',
      author:'@qiushui',
      email:require("@/assets/email.png"),
      weibo:require("@/assets/xinlangblog.png")
    }
  }
}
</script>

<style scoped>
a:hover, a:focus { color: #e27575; transition: color .15s;}
.image{height: 30px}
</style>

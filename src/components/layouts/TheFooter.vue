<template>
  <footer class="footer">
    <div class="container">
      <div class="col-sm-1 col-lg-1 col-lg-offset-5" >
        <p class="padding-top-xsm">{{description}}</p>
        <a :href="codeUrl" target="_blank">
          <img :src="githubImg" v-title="title"/>
        </a>
      </div>
      <div class="col-sm-3 col-lg-3 col-lg-offset-8">
        <p class="padding-top-xsm">{{author}}</p>
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
      githubImg:'@/assets/gitHub.png',
      codeUrl:'https://github.com/tomuGo',
      author:'@qiushui'
    }
  }
}
</script>

<style scoped>
a:hover, a:focus { color: #e27575; transition: color .15s;}
</style>

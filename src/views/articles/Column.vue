<template>
  <div class="blog-container">
    <div class="blog-pages">
      <!-- 用于渲染『文章列表』和『文章内容』 -->
      <router-view/>

      <div class="col-md-3 main-col pull-left">
        <div class="panel panel-default corner-radius">
          <div class="panel-body text-center topic-author-box blog-info">
            <div class="image blog-cover">
              <router-link :to="`/${userInfo.username}`">
                <img :src="require('@/assets/face/'+this.userInfo.picUrl+'.png')" class="avatar-112 avatar img-thumbnail">
              </router-link>
            </div>
            <div class="blog-name">
              <h4>
                <router-link :to="`/${userInfo.username}`">{{ userInfo.username }}</router-link>
              </h4>
            </div>
            <hr>
            <!--<router-link :to="`/${userInfo.name}`">
              <li class="list-group-item"><i class="text-md fa fa-list-ul"></i> 专栏文章（{{ articleNum }}）</li>
            </router-link>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from '@/plugins/axios'
export default {
  name: 'Column',
  data() {
    return {
      userId:'',
      userInfo:'',
      articles: [] //  对应用户文章
    }
  },
  computed: {
    ...mapState([
      'user'
    ]),
    articleNum() {
      return this.articles.length
    }
  },
  created() {
    this.userId = this.$route.params.userId;
    if(this.userId){
      this.getUserInfo(this.userId);
    }
  },

  methods: {
    getUserInfo(userId){
      axios.get('/api/users/'+userId).then((res)=>{
        this.userInfo=res.data;
      })
    },
  }
}
</script>

<style scoped>
.blog-container { margin-top: 20px;}
</style>

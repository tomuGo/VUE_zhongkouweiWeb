<template>
  <div>
    <div class="col-md-9 topics-index main-col">
      <div class="panel panel-default">
        <div class="panel-heading">
          <!--<div class="navbar-header" >
            <el-menu  text-color="blue" active-text-color="red" class="el-menu-demo" mode="horizontal" :router="true">
              <el-menu-item  v-for="(item) in filters" :key="item.name"  :index= "item.path" >{{item.name}}</el-menu-item>
            </el-menu>
          </div>-->

          <ul class="list-inline topic-filter">
            <li v-for="item in filters">
                <el-button autofocus round type="info" icon="el-icon-menu" size="medium" @click="getBlogs(item.blogType)" v-title="item.title">{{ item.name }}</el-button>
            </li>
          </ul>
          <div class="clearfix"></div>
        </div>

        <div class="panel-body remove-padding-horizontal">
          <ul class="list-group row topic-list">
            <li v-for="article in articles" :key="article.blogId" class="list-group-item">
              <router-link :to="`/blogs/${article.blogId}`" tag="div" class="reply_count_area hidden-xs pull-right">
                <div class="count_set">
                  <span class="count_of_votes" title="投票数">{{ article.likeUsers ? article.likeUsers.length : 0 }}</span>
                  <span class="count_seperator">/</span>
                  <span class="count_of_replies" title="回复数">{{ article.comments ? article.comments.length : 0 }}</span>
                  <span class="count_seperator">|</span>
                  <abbr class="timeago">{{ article.createTime | time('yyyy-MM-DD hh:mm:ss') }}</abbr>
                </div>
              </router-link>
             <router-link :to="`/${article.uname}`" tag="div" class="avatar pull-left">
               <img :src="article.uavatar" class="media-object img-thumbnail avatar avatar-middle">
             </router-link>
              <router-link :to="`/articles/${article.blogId}/content`" tag="div" class="infos">
                <div class="media-heading">
                  {{ article.blogName }}
                </div>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="panel-footer text-right remove-padding-horizontal pager-footer">
          <el-pagination
            background
            layout="total, prev, pager, next, jumper"
            @current-change="getBlogs"
            :page-size="pageSize"
            :page-count="currentPage"
            :total="total">
          </el-pagination>
        </div>
      </div>
   </div>
   <TheSidebar/>
  </div>
</template>

<script>
import axios from '@/plugins/axios'
import TheSidebar from '@/components/layouts/TheSidebar'

export default {
  name: 'Home',
  components: {
    // 局部注册 TheSidebar
    TheSidebar
  },
  data() {
    return {
      msg: '',
      msgType: '',
      msgShow: false,
      articles: [],
      filter: 'default',
      filters: [
        { type: 'success', name: '电影', title: '电影',blogType:1},
        { type: 'info', name: '漫画', title: '漫画',blogType:2},
        { type: 'warning', name: '加精', title: '只看极品',blogType:4},
        { type: 'danger', name: '随便聊聊', title: '%￥#@！（*',blogType:3}
      ],
      total: 0, // 文章总数
      pageSize: 20, // 每页条数
      currentPage:1
    }
  },
  mounted:function () {
    this.getBlogs(1);
  },
  methods: {
    getBlogs(blogType){
      axios.get("/blog/blog",{params: {pageNumber: this.currentPage-1, pageSize: this.pageSize,blogType:blogType}}).then((res)=>{
        this.articles=res.content;
        this.total=res.totalElements;
      });
    }
  }
}
</script>

<style scoped>

</style>

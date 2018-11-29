<template>
  <div>
    <div class="col-md-9 topics-index main-col">
      <div class="panel panel-default">
        <div class="panel-heading">
          <ul class="list-inline topic-filter">
            <li v-for="item in filters">
              <router-link v-title="item.title" style="font-size: large" :to='`/topics?blogType=${item.blogType}`'>{{ item.name }}</router-link>
            </li>
          </ul>
          <div class="clearfix"></div>
        </div>

        <div class="panel-body remove-padding-horizontal">
          <ul class="list-group row topic-list">
            <li v-for="(article,index) in articles" :key="article.blogId" class="list-group-item" >
              <router-link :to="`/blogs/${article.blogId}`" tag="div" class="reply_count_area hidden-xs pull-right">
                <div class="count_set">
                  <abbr class="timeago">{{ article.createTime | time('yyyy-MM-DD hh:mm:ss') }}</abbr>
                </div>
              </router-link>
             <router-link :to="`/${article.uname}`" tag="div" class="avatar pull-left">
               <img :src="'https://api.adorable.io/avatars/200/Karen'+index" class="media-object img-thumbnail avatar avatar-middle">
             </router-link>
              <router-link :to="`/blogs/${article.blogId}`" tag="div" class="infos">
                <div class="media-heading ">
                  <el-badge v-if="article.boutique===1" value="精" class="item">
                    {{ article.blogName }}
                  </el-badge>
                  <span v-else>{{ article.blogName }}</span>
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
            :page-count="pageNumber"
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
      pageNumber:0
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getBlogs(to.query.blogType)
    })
  },
  mounted:function () {
    this.getBlogs(1);
  },
  watch: {
    '$route'(to) {
      this.getBlogs(to.query.blogType)
    }
  },
  methods: {
    getBlogs(blogType){
      axios.get("/blog/blog",{params: {pageNumber: this.pageNumber, pageSize: this.pageSize,blogType:blogType}}).then((res)=>{
        this.articles=res.resultObject.content;
        this.total=res.resultObject.totalElements;
      });
    }
  }
}
</script>

<style scoped>
.color{background-color: #afd9ee}
.colorS{background-color:#06b3b4}
</style>

<template>
  <div class="panel panel-default list-panel search-results">
    <div class="panel-heading">
      <h3 class="panel-title">
        <i class="fa fa-search"></i>
        关于 “<span class="highlight">{{ keyword }}</span>” 的搜索结果, 共 {{ articles.length }} 条
      </h3>
    </div>
    <div class="panel-body">
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
      <div v-if="articles" class="empty-block">
        没有任何数据~~
      </div>
    </div>
  </div>
</template>

<script>
  import axios from '@/plugins/axios'
export default {
  name: 'Search',
  data() {
    return {
      keyword: '', // 关键字
      articles: [] ,// 搜索结果
      total: 0, // 文章总数
      pageSize: 20, // 每页条数
      pageNumber:0
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 确认渲染该组件的对应路由时，获取搜索结果
      vm.getArticlesByKeyword(to.query.q)
    })
  },
  // 当前路由改变，该组件被复用时，获取搜索结果
  beforeRouteUpdate(to, from, next) {
    this.getArticlesByKeyword(to.query.q)
    next()
  },
  // 离开该组件的对应路由时，清空搜索值
  beforeRouteLeave(to, from, next) {
    this.$store.commit('UPDATE_SEARCH_VALUE', '')
    next()
  },
  methods: {
     getArticlesByKeyword(keyword) {
       axios.get("/blog/blog", {
         params: {
           pageNumber: this.pageNumber,
           pageSize: this.pageSize,
           blogName: keyword
         }
       }).then((res) => {
         this.articles = res.resultObject.content;
         this.total = res.resultObject.totalElements;
       });
    }
  }
}
</script>

<style scoped>
.result a:hover, .result a:focus { color: #d6514d; transition: color .15s ease;}
.panel-title .btn { margin-left: 5px;}
</style>

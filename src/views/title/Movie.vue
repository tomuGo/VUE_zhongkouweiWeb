<template>
  <div>
    <div class="col-md-9 topics-index main-col">
      <div class="panel panel-default">
        <div class="panel-heading">
         <ul class="list-inline topic-filter">
            <li v-for="item in filters">
                      <router-link v-title="item.title" :class="{ active: filter === item.filter }" :to="`/topics?filter=${item.filter}`">{{ item.name }}</router-link>
            </li>
          </ul>
          <div class="clearfix"></div>
        </div>

        <div class="panel-body remove-padding-horizontal">
          <ul class="list-group row topic-list">
            <li v-for="article in articles" :key="article.articleId" class="list-group-item">
              <router-link :to="`/articles/${article.articleId}/content`" tag="div" class="reply_count_area hidden-xs pull-right">
                <div class="count_set">
                  <span class="count_of_votes" title="投票数">{{ article.likeUsers ? article.likeUsers.length : 0 }}</span>
                  <span class="count_seperator">/</span>
                  <span class="count_of_replies" title="回复数">{{ article.comments ? article.comments.length : 0 }}</span>
                  <span class="count_seperator">|</span>
                  <abbr class="timeago">{{ article.date | moment('from') }}</abbr>
                </div>
              </router-link>
             <router-link :to="`/${article.uname}`" tag="div" class="avatar pull-left">
               <img :src="article.uavatar" class="media-object img-thumbnail avatar avatar-middle">
             </router-link>
              <router-link :to="`/articles/${article.articleId}/content`" tag="div" class="infos">
                <div class="media-heading">
                  {{ article.title }}
                </div>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="panel-footer text-right remove-padding-horizontal pager-footer">
          <Pagination :currentPage="currentPage" :total="total" :pageSize="pageSize" :onPageChange="changePage" />
        </div>
      </div>
   </div>
   <TheSidebar/>
  </div>
</template>

<script>
import TheSidebar from '@/components/layouts/TheSidebar'
import axios from '@/plugins/axios'
export default {
  name: 'Home',
  components: {
    // 局部注册 TheSidebar
    TheSidebar
  },
  data() {
    return {
      articles: [],
      filter: 'default',
      filters: [
        { blogType:'1A',filter: 'default', name: '欧美', title: 'ARE U OK ?'},
        { blogType:'1B',filter: 'excellent', name: '日韩泰', title: '雅蠛蝶'},
        { blogType:'1C',filter: 'vote', name: '大陆', title: '①'},
        { blogType:'1D',filter: 'noreply', name: '其他', title: '￥#*·~f'},
      ],
      total: 0, // 文章总数
      pageSize: 20, // 每页条数
    }
  },
  beforeRouteEnter (to, from, next) {
    axios.get(`/blog/blog`,{params: {blogType: '1A',pageNumber:1,pageSize:20}}).then((res) => {
      this.articles=res
    })
  },
  methods: {

    setDataByFilter(filter = 'default') {
      // 每页条数
      const pageSize = this.pageSize
      // 当前页
      const currentPage = this.currentPage
      // 过滤后的所有文章
      const allArticles = this.$store.getters.getArticlesByFilter(filter)

      this.filter = filter
      // 文章总数
      this.total = allArticles.length
      // 当前页的文章
      this.articles = allArticles.slice(pageSize * (currentPage - 1), pageSize * currentPage)
    },
    // 回调，组件的当前页改变时调用
    changePage(page) {
      // 在查询参数中混入 page，并跳转到该地址
      // 混入部分等价于 Object.assign({}, this.$route.query, { page: page })
      this.$router.push({ query: { ...this.$route.query, page } })
    }
  }
}
</script>

<style scoped>

</style>

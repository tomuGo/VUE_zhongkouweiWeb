<template>
  <div class="col-md-9 left-col pull-right">
    <div class="panel article-body content-body">
      <h1 class="text-center">{{ blog.blogName }}</h1>
      <div class="article-meta text-center">
        <i class="fa fa-clock-o"></i>
        <abbr style="color: #0000cc">{{ blog.createTime | time('yyyy-MM-DD hh:mm:ss') }}</abbr>
      </div>
      <div class="entry-content">
        <div class="content-body entry-content panel-body ">
          <div v-for="section in sections" >
            <div class="markdown-body" >
              {{section.content | simpleMarkDown}}
            </div>
            <span style="color: #1EBC30">
              作者：{{section.userId}}
            </span><br>
            <span style="color:darkgreen">{{section.createDate | time('yyyy-MM-DD hh:mm:ss')}}</span><br>
            <span>- - - - - - - - - - - - - - -</span>
          </div>

          <!--<div v-if="false" class="panel-footer operate">
            <div class="actions">
              <a @click="deleteArticle" class="admin" href="javascript:;"><i class="fa fa-trash-o"></i></a>
              <a @click="editArticle" class="admin" href="javascript:;"><i class="fa fa-pencil-square-o"></i></a>
            </div>
          </div>-->
        </div>
      </div>
    </div>
    <!--<div class="votes-container panel panel-default padding-md">
      <div class="panel-body vote-box text-center">
        <div class="btn-group">
          <a @click="like" href="javascript:;" class="vote btn btn-primary popover-with-html" :class="likeClass">
            <i class="fa fa-thumbs-up"></i> {{ likeClass ? '已赞' : '点赞' }}
          </a>
          <div class="or"></div>
          <button @click="showQrcode = true" class="btn btn-success"><i class="fa fa-heart"></i> 打赏</button>
        </div>
        <div class="voted-users">
          <div class="user-lists">
          <span v-for="likeUser in likeUsers">
            &lt;!&ndash; 点赞用户是当前用户时，加上类 animated 和 swing 以显示一个特别的动画  &ndash;&gt;
            <router-link :to="`/${likeUser.uname}`" :src="likeUser.uavatar" tag="img" class="img-thumbnail avatar avatar-middle" :class="{ 'animated swing' : likeUser.uid === 1 }"></router-link>
          </span>
          </div>
          <div v-if="!likeUsers.length" class="vote-hint">成为第一个点赞的人吧 😄</div>
        </div>
      </div>
    </div>-->
    <!--<Modal :show.sync="showQrcode" class="text-center">
      <div v-if="user" slot="blogName">
        <img :src="user.avatar" class="img-thumbnail avatar" width="48">
      </div>
      <div>
        <p class="text-md">如果你想学习更多前端的知识，VuejsCaff.com 是个不错的开始</p>
        <div class="payment-qrcode inline-block">
          <h5>扫一扫打开 VuejsCaff.com</h5>
          <p>
            <qrcode-vue value="https://vuejscaff.com/" :size="160"></qrcode-vue>
          </p>
        </div>
      </div>
      <div slot="footer">
        <div class="text-center">祝你学习愉快 :)</div>
      </div>
    </Modal>-->
    <div class="replies panel panel-default list-panel replies-index">
      <div class="panel-heading">
        <div class="total">
          楼层数量: <b>{{ blog.sections }}</b>
        </div>
      </div>
    </div>
    <div id="reply-box" class="reply-box form box-block">
      <div class="form-group comment-editor">
        <textarea v-if="true" id="editor"></textarea>
        <textarea v-else disabled class="form-control" placeholder="需要登录后才能发表评论." style="height:172px"></textarea>
      </div>
      <div class="form-group reply-post-submit">
        <button id="reply-btn" :disabled="!isAuth" @click="save" class="btn btn-primary">
          {{ commentId ? '保存编辑' : '回复' }}
        </button>
        <span v-show="commentId" class="help-inline btn-cancel" style="cursor:pointer"
              >取消编辑</span>
        <span v-show="!commentId" class="help-inline">Ctrl+Enter</span>
      </div>
      <div v-show="commentHtml" id="preview-box" class="box preview markdown-body" v-html="commentHtml"></div>
    </div>
  </div>
</template>

<script>
  import SimpleMDE from 'simplemde'
  import hljs from 'highlight.js'
  import emoji from 'node-emoji'
  import {mapState} from 'vuex'
  import axios from '@/plugins/axios'

  export default {
    name: 'Content',
    components: {
    },
    data() {
      return {
        blogId:'',
        blog: '',
        sections: [],
        blogName: '',
        content: '', // 文章内容
        date: '', // 文章创建时间
        uid: 1,// 用户 ID
        likeUsers: [], // 点赞用户列表
        likeClass: '', // 点赞样式
        showQrcode: false, // 是否显示打赏弹窗
        commentHtml: '', // 评论 HTML
        comments: [], // 评论列表
        commentId: undefined, // 评论 ID

      }
    },
    computed: {
      ...mapState([
        'isAuth',
        'user'
      ])
    },
    created() {
      this.blogId = this.$route.params.blogId;

      if (this.blogId) {
        this.getBlog(this.blogId);
      }
    },
    mounted() {
      if (this.isAuth) {
        window.hljs = hljs

        const simplemde = new SimpleMDE({
          element: document.querySelector('#editor'),
          placeholder: '请使用 Markdown 格式书写 ;-)，代码片段黏贴时请注意使用高亮语法。',
          spellChecker: false,
          autoDownloadFontAwesome: false,
          // 不显示工具栏
          toolbar: false,
          // 不显示状态栏
          status: false,
          renderingConfig: {
            codeSyntaxHighlighting: true
          }
        })

        // 内容改变监听
        simplemde.codemirror.on('change', () => {
          // 更新 commentMarkdown 为编辑器的内容
          this.commentMarkdown = simplemde.value();
          // 更新 commentHtml，我们先替换原内容中的 emoji 标识，然后使用 markdown 方法将内容转成 HTML
          this.commentHtml = simplemde.markdown(emoji.emojify(this.commentMarkdown, name => name))
        });

        // 按键松开监听
        simplemde.codemirror.on('keyup', (codemirror, event) => {
          // 使用 Ctrl+Enter 时提交评论
          if (event.ctrlKey && event.keyCode === 13) {
            this.comment()
          }else if (this.commentId && event.keyCode === 27) { // 存在 commentId，且按下 Esc 键时
            // 取消编辑评论
            this.cancelEditComment()
          }
        })

        // 将编辑器添加到当前实例
        this.simplemde = simplemde
      }
    },
    methods: {
      getBlog(blogId){
        axios.get(`/blog/blog/` + this.blogId).then((res) => {
          this.blog = res.resultObject.blog;
          this.blogContent = res.resultObject.blogContent;
          this.sections = res.resultObject.blogContent.sections;
          this.blogName = res.resultObject.blog.blogName;
        })
      },
      save() {
        let section = {
          content: this.commentMarkdown
        }
        // 编辑器的内容不为空时
        console.log("dqw"+this.commentMarkdown)
        if (this.commentMarkdown && this.commentMarkdown.trim() !== '') {
          axios.post('/blog/blog/'+this.blogId+'/addSection',section).then((res)=>{
            this.simplemde.value('');
              this.getBlog(this.blogId)
          })
        }
      }
    }
  }
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active { transition: opacity .5s;}
  .fade-enter, .fade-leave-to { opacity: 0;}
</style>

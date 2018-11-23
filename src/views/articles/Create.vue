<template>
  <div class="blog-container">
    <div class="blog-pages">
      <div class="col-md-12 panel">
        <div class="panel-body">
         <h2 class="text-center">创作文章</h2>
          <hr>
          <div data-validator-form>
            <div class="form-group">
              <input v-model.trim="titleName" v-validator.required="{ title: '标题' }" type="text" class="form-control" placeholder="请填写标题">
            </div>
            <div class="form-group">
              <label class="control-label">类型</label><span style="color: red"> * </span>
              <el-radio-group v-model="blogType" >
                <el-radio-button :label=1 >电影</el-radio-button>
                <el-radio-button :label=2 >漫画</el-radio-button>
                <el-radio-button :label=3 >随便聊聊</el-radio-button>
              </el-radio-group>
            </div>
            <div class="form-group">
              <textarea id="editor"></textarea>
            </div>
            <br>
            <div class="form-group">
              <button class="btn btn-primary" type="submit" @click="createBlog">发 布</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SimpleMDE from 'simplemde'
import hljs from 'highlight.js'
import axios from '@/plugins/axios'

window.hljs = hljs

export default {
  name: 'Create',
  data() {
    return {
      titleName: '', // 文章标题
      content: '', // 文章内容
      blogType:2,
    }
  },

  mounted() {
    const simplemde = new SimpleMDE({
      element: document.querySelector('#editor'),
      placeholder: '请使用 Markdown 格式书写 ;-)，代码片段黏贴时请注意使用高亮语法。',
      spellChecker: false,
      autoDownloadFontAwesome: false,
      autosave: {
        enabled: true,
        uniqueId: 'vuejs-essential'
      },
      renderingConfig: {
        codeSyntaxHighlighting: true
      }
    })

    simplemde.codemirror.on('change', () => {
      this.content = simplemde.value()
    });

    this.simplemde = simplemde
  },
  methods: {
    createBlog(e) {
      this.$nextTick(() => {
        const target = e.target.type === 'submit' ? e.target : e.target.parentElement
        if (target.canSubmit&&this.content!=null && this.content.trim()!='') {
          this.submit()
        }
      })
    },
    submit(){
      if(this.content!=null && this.content.trim()!=''){
        let addBlog={
          blogName:this.titleName,
          blogType:this.blogType,
          content:this.content
        };
        axios.post('/blog/blog',addBlog).then(()=>{
          this.$router.push({name:'Home',params:{blogType:this.blogType}})
        })
      }else {
        //todo
        alert("qe")
      }

    }
  }
}
</script>

<style scoped>
.blog-container { max-width: 980px; margin: 0 auto; margin-top: 20px;}
textarea { height: 200px; }
</style>

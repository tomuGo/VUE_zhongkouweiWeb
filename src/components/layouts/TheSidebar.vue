<template>
  <div class="col-md-3 side-bar">
    <div class="panel panel-default corner-radius sidebar-resources">
      <div class="panel-heading text-center">
        <h3 class="panel-title">推荐</h3>
      </div>
      <div class="panel-body">
        <Slider :slides="slides">
          <template slot-scope="{ currentSlide }">
            <a :href="currentSlide.link" target="_blank">
              <img :alt="currentSlide.title" :title="currentSlide.title" :src="currentSlide.img">
            </a>
          </template>
        </Slider>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      slides: [
        {
          title: '123',
          img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3943735061,2261504406&fm=27&gp=0.jpg',
          link: '/'
        },
        {
          title: '2321',
          img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=484287204,2032345091&fm=111&gp=0.jpg',
          link: '/'
        },
        {
          title: '42312',
          img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2017820637,3454915194&fm=27&gp=0.jpg',
          link: '/'
        }
      ]
    }
  }
}
</script>

<style scoped>
.carousel-inner img {display:block;margin:auto;line-height:1;width:70%;border:1px solid #ddd;box-shadow:0 0 10px #ccc;-moz-box-shadow:0 0 10px #ccc;-webkit-box-shadow:0 0 10px #ccc;}
</style>

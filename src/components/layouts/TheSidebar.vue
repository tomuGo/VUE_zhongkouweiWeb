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
          img: 'http://img1.imgtn.bdimg.com/it/u=3688350399,4275313700&fm=26&gp=0.jpg',
          link: '/'
        },
        {
          title: '2321',
          img: 'https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=8162d6465482b2b7b89f3fc401accb0a/d009b3de9c82d158ec9917f38d0a19d8bc3e425c.jpg',
          link: '/'
        },
        {
          title: '42312',
          img: 'https://ss0.baidu.com/-Po3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=57945c6810950a7b6a3548c43ad0625c/c8ea15ce36d3d539ad9c089d3787e950342ab0ce.jpg',
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

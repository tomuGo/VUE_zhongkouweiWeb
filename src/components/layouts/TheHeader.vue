<template>
  <div class="navbar navbar-default topnav">
    <div class="container">
      <div class="navbar-header col-sm-4 col-lg-4" >
        <router-link to="/" >
          <img :src="logo.src" style="height: 50px">
        </router-link>
      </div>
      <div class="navbar-header col-sm-4 col-lg-4">
        <SearchInput/>
      </div>
      <div class="col-sm-4 col-lg-4 col-md-4">
        <TheEntry/>
      </div>

      <!--<div id="top-navbar-collapse" :class="['collapse', 'navbar-collapse', { in: showCollapsedNav },'col-sm-1 col-lg-1']">
        <div>
          <SearchInput/>
          <TheEntry/>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>

import TheEntry from '@/components/layouts/TheEntry'

import SearchInput from '@/components/layouts/SearchInput'
import List from "../../views/articles/List";

export default {
  name: 'TheHeader',
  components:{
    List,
    TheEntry,
    SearchInput
  },
  data() {
    return {
      titles: [
        {title: 'movie', name: '电影', path: '/movie'},
        {title: 'cartoon', name: '漫画',path: '/cartoon'},
        {title: 'roast', name: '吐槽',path: '/roast'}
      ],
      activeNavIndex: 0,
      showCollapsedNav: false,
      logo: {
        src: require("@/assets/zhongkouweiLogo.png"),
      },
    }
  }

}
</script>

<style scoped>
.navbar-default .navbar-nav > .active > a { background: rgba(0,0,0,.03);}
</style>

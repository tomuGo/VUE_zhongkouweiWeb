<template>
  <div class="navbar navbar-default topnav">
    <div class="container">
      <div class="navbar-header" >
        <el-menu  text-color="blue" active-text-color="red" class="el-menu-demo" mode="horizontal" :router="true">
            <el-menu-item  v-for="(item) in titles" :key="item.name" :route="item.path" :index= "item.path" >{{item.name}}</el-menu-item>
        </el-menu>
      </div>

      <div id="top-navbar-collapse" :class="['collapse', 'navbar-collapse', { in: showCollapsedNav }]">
        <div class="navbar-right">
          <SearchInput/>
          <TheEntry/>
        </div>
      </div>
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
      showCollapsedNav: false
    }
  }

}
</script>

<style scoped>
.navbar-default .navbar-nav > .active > a { background: rgba(0,0,0,.03);}
</style>

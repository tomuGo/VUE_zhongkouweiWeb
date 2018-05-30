<template>
  <div class="navbar-form navbar-left hidden-sm">
    <div class="form-group">
      <input
        v-model.trim="searchValue"
        type="text"
        class="form-control search-input mac-style"
        placeholder="搜索"
        @keyup.enter="search"
        @input="updateSearchValue"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchInput',
  data() {
    return {
      searchValue: '' // 搜索值
    }
  },
  computed: {
    searchValue: {
      get() {
        return this.$store.state.searchValue
      },
      set(newValue) {
        this.searchValue = newValue
      }
    }
  },
  methods: {
    search() {
      const value = this.searchValue

      if (value !== '') {
        this.$router.push({ name: 'Search', query: { q: value } })
      }
    },
    updateSearchValue() {
      this.$store.commit('UPDATE_SEARCH_VALUE', this.searchValue)
    }
  }
}
</script>

<style scoped>
.search-input { background-image: url(https://vuejscaffcdn.phphub.org/assets/images/icon-search.png)}
</style>

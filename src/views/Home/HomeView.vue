<template>
  <div class="home-view">
      <nav-bar/>
      <!--<router-view :key='"path"+$route.fullPath'/>-->
      <router-view/>
      <footer-bar/>
  </div>
</template>

<script>
import NavBar from '@/components/Navigation/NavBar.vue'
import FooterBar from '@/components/Navigation/FooterBar.vue'
export default {
  components: { NavBar, FooterBar },
  beforeRouteEnter(to,from,next) {
    if (to.name=="home") {
      next('/now_playing/1')
    }
    next()
  }
}
</script>

<style>

</style>
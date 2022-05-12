<template>
  <div class="home-view">
      <nav-bar/>
      <router-view :key='"path"+$route.fullPath'/>
      <footer-bar/>
  </div>
</template>

<script>
import NavBar from '@/components/Navigation/NavBar.vue'
import FooterBar from '@/components/Navigation/FooterBar.vue'
export default {
  components: { NavBar, FooterBar },
  mounted() {
    
  }
}
</script>

<style>

</style>
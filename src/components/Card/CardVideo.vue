<template>
  <div class="card-video">
      <iframe allowfullscreen style='width:100%;height:100%' :src="'https://www.youtube.com/embed/'+video.key+'?autoplay=0'" frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
    props:{
        video:Object
    }
}
</script>

<style>
.card-video {
    height: 200px;
}
</style>
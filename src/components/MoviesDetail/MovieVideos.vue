<template>
  <div class="movie-videos">
      <div style='padding:5px 0' class="container">
        <div style='fontSize:22px;borderBottom:5px solid var(--bs-teal);width:90%;margin:0 auto' class='center'>MEDIA <span style='marginLeft:5px;fontSize:16px;color:green' class='center'><ion-icon style='marginRight:5px;fontSize:8px' name="ellipse"></ion-icon> {{videos.length}}</span></div>
        <div v-if='videos.length>0' class="mv-videos">
          <carousel :responsive="{0:{items:1},528:{items:2},792:{items:3},1056:{items:4}}" style='position:relative' :autoHeight="true" :dots="false" :autoplay="false" :nav="false" :items=4 >
            <template slot="prev"><span class="prev"><ion-icon onMouseOut='this.style.fontSize="30px"' onMouseOver='this.style.fontSize="32px"' style='zIndex:50;fontSize:30px;position:absolute;left:0;top:50%;transform:translateY(-50%);cursor:pointer;color:orangered' class='previous-icon' name="chevron-back-circle-outline"></ion-icon></span></template>
              <card-video v-for='video in videos' :key='video.id' :video='video'/>
            <template slot="next"><span class="next"><ion-icon onMouseOut='this.style.fontSize="30px"' onMouseOver='this.style.fontSize="32px"' style='zIndex:50;fontSize:30px;position:absolute;right:0;top:50%;transform:translateY(-50%);cursor:pointer;color:orangered' class='next-icon' name="chevron-forward-circle-outline"></ion-icon></span></template>
          </carousel>
        </div>
      </div>
  </div>
</template>

<script>
import carousel from 'vue-owl-carousel'
import CardVideo from '../Card/CardVideo.vue'
export default {
  components:{carousel,CardVideo},
  props:{
    videos:Array
  }
}
</script>

<style>
.movie-videos {
  background-color:var(--bs-light);
}
</style>
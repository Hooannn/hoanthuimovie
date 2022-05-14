<template>
  <div class="movie-cast">
      <div style='padding:5px 0' class="container">
        <div style='fontSize:22px;borderBottom:5px solid var(--bs-teal);width:90%;margin:0 auto' class='center'>CAST <span style='marginLeft:5px;fontSize:16px;color:green' class='center'><ion-icon style='marginRight:5px;fontSize:8px' name="ellipse"></ion-icon> {{cast.length}}</span></div>
        <div v-if='cast.length>0' class="mc-casts">
          <carousel :responsive="{0:{items:1},528:{items:2},792:{items:3},1056:{items:4},1320:{items:5}}" style='position:relative' :autoHeight="true" :dots="false" :autoplay="false" :nav="false" :items=5 >
            <template slot="prev"><span class="prev"><ion-icon onMouseOut='this.style.fontSize="30px"' onMouseOver='this.style.fontSize="32px"' style='zIndex:50;fontSize:30px;position:absolute;left:0;top:50%;transform:translateY(-50%);cursor:pointer;color:orangered' class='previous-icon' name="chevron-back-circle-outline"></ion-icon></span></template>
            <card-person v-for='p in cast' :key='p.cast_id' :cast='p'/>
            <template slot="next"><span class="next"><ion-icon onMouseOut='this.style.fontSize="30px"' onMouseOver='this.style.fontSize="32px"' style='zIndex:50;fontSize:30px;position:absolute;right:0;top:50%;transform:translateY(-50%);cursor:pointer;color:orangered' class='next-icon' name="chevron-forward-circle-outline"></ion-icon></span></template>
          </carousel>
        </div>
      </div>
  </div>
</template>

<script>
import carousel from 'vue-owl-carousel'
import CardPerson from '../Card/CardPerson.vue'
export default {
  components:{carousel, CardPerson},
  props:{
    cast:Array
  }
}
</script>

<style>
.movie-cast {
  background-color:var(--bs-light);
}
</style>
<template>
  <div class="movie-crew">
      <div style='padding:5px 0' class="container">
        <div style='fontSize:22px;borderBottom:5px solid var(--bs-teal);width:100px' class='center'>CREW <span style='marginLeft:5px;fontSize:16px;color:green' class='center'><ion-icon style='marginRight:5px;fontSize:8px' name="ellipse"></ion-icon> {{crew.length}}</span></div>
        <div v-if='crew.length>0' class="mc-crews">
          <carousel style='position:relative' :autoHeight="true" :dots="false" :autoplay="false" :nav="false" :items=5 >
            <template slot="prev"><span class="prev"><ion-icon onMouseOut='this.style.fontSize="30px"' onMouseOver='this.style.fontSize="32px"' style='zIndex:50;fontSize:30px;position:absolute;left:0;top:50%;transform:translateY(-50%);cursor:pointer;color:orangered' class='previous-icon' name="chevron-back-circle-outline"></ion-icon></span></template>
            <card-person :type="'crew'" v-for='p in crew' :key='"crew"+p.id+p.job' :cast='p'/>
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
    crew:Array,
  }
}
</script>

<style>
.movie-crew {
  background-color:var(--bs-light);
}
</style>
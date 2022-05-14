<template>
  <div class="movies-credit">
      <div style='color:var(--orange);fontSize:17px;margin:5px 0'>KNOWN FOR</div>
      <div v-if='movies.length>0'>
        <carousel :responsive="{0:{items:1},320:{items:2},992:{items:3},1200:{items:4}}" style='position:relative' :autoHeight="true" :dots="false" :autoplay="false" :nav="false" :items=4 >
            <template slot="prev"><span class="prev"><ion-icon onMouseOut='this.style.fontSize="30px"' onMouseOver='this.style.fontSize="32px"' style='zIndex:50;fontSize:30px;position:absolute;left:0;top:50%;transform:translateY(-50%);cursor:pointer;color:orangered' class='previous-icon' name="chevron-back-circle-outline"></ion-icon></span></template>
              <div @click='viewMovie(movie.id)' v-for='(movie,index) in movies' :key='"mcm"+index' class="mc-movie">
                <img style='width:100%;height:100%;objectFit:cover;transition:.3s linear' :src="'https://image.tmdb.org/t/p/w300'+movie.poster_path" alt="Film image">
              </div>
            <template slot="next"><span class="next"><ion-icon onMouseOut='this.style.fontSize="30px"' onMouseOver='this.style.fontSize="32px"' style='zIndex:50;fontSize:30px;position:absolute;right:0;top:50%;transform:translateY(-50%);cursor:pointer;color:orangered' class='next-icon' name="chevron-forward-circle-outline"></ion-icon></span></template>
        </carousel>
      </div>
  </div>
</template>

<script>
import carousel from 'vue-owl-carousel'
export default {
    components:{carousel},
    props:{
        movies:Array
    },
    methods:{
      viewMovie(id) {
        this.$router.push({name:'movie-detail',params:{id:id}})
      }
    }
}
</script>

<style>
.movies-credit .mc-movie {
  margin:0 auto;
  width: 160px;
  height: 200px;
  background-color: white;
  cursor: pointer;
}
.movies-credit .mc-movie:hover img {
  transform: scale(1.05);
}
</style>
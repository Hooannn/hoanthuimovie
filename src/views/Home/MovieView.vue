<template>
  <div class="movie-view">
      <movie-view-hero :movies="movies"/>
      <div style='color:white;fontSize:bolder;textShadow:0 0 3px rgba(0,0,0,0.4);fontSize:26px;borderBottom:3px solid var(--orange);maxWidth:300px;margin:25px auto' class="npv-title center">
          <span v-if='$route.params.type=="now_playing"'>NOW PLAYING</span>
          <span v-if='$route.params.type=="popular"'>POPULAR</span>
          <span v-if='$route.params.type=="top_rated"'>TOP RATED</span>
          <span v-if='$route.params.type=="upcoming"'>UPCOMING</span>
      </div>
      <div class="container">
        <movie-card v-for='movie in movies' :key='"movie"+movie.id' :movie="movie"/>
      </div>
      <div style='margin:0 auto;color:white' class="npv-page center">
        <div style='display:flex;fontSize:14px' class="npvp-fast center">
          <ion-icon @click='previousPage' onMouseOut='this.style.color="white";this.style.transform="translateX(0)"' onMouseOver='this.style.color="orange";this.style.transform="translateX(-3px)"' style='transition:.2s linear;fontSize:25px;marginRight:5px;cursor:pointer;' name="chevron-back-circle-outline"></ion-icon>
          <input @keypress.enter="fastGo" :max='totalPages' v-model='currentPage' style='padding:5px 0;outline:none;border:none;backgroundColor:rgb(255,255,255,0.1);color:white;width:30px;textAlign:center;fontSize:14px;marginRight:5px' type="number" >
          <span>/</span>
          <div style='marginLeft:5px'>{{totalPages}}</div>
          <ion-icon @click='nextPage' onMouseOut='this.style.color="white";this.style.transform="translateX(0)"' onMouseOver='this.style.color="orange";this.style.transform="translateX(3px)"' style='transition:.2s linear;fontSize:25px;marginLeft:5px;cursor:pointer' name="chevron-forward-circle-outline"></ion-icon>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import MovieCard from '@/components/General/MovieCard.vue'
import MovieViewHero from '@/components/General/MovieViewHero.vue'
export default {
  components: { MovieCard, MovieViewHero },
  data() {
    return {
      movies:[],
      currentPage:1,
      totalPages:0
    }
  },
  watch: {
    currentPage(e) {
      if (parseInt(e,10)==0 || e=='' || e==null || e==undefined) {
        this.currentPage=1
      }
    }
  },
  methods: {
    previousPage() {
      if (this.currentPage==1) {
        return
      }
      this.$router.push({name:"movie-view",params:{type:this.$route.params.type,page:parseInt(this.currentPage,10)-1}})
    },  
    nextPage() {
      if (this.currentPage==this.totalPages) {
        return
      }
      this.$router.push({name:"movie-view",params:{type:this.$route.params.type,page:parseInt(this.currentPage,10)+1}})
    },
    getMovies() {
      this.$store.dispatch('loading')
      axios.get(`https://api.themoviedb.org/3/movie/${this.$route.params.type}?api_key=${this.$store.state.app.apiKey}&language=en-US&page=${this.$route.params.page}`)
        .then((res)=>{
          this.movies=res.data.results
          this.totalPages=res.data.total_pages
          this.$store.dispatch('unload')
        })
        .catch((err)=>{
          alert(err)
          this.$store.dispatch('unload')
        })
    },
    fastGo() {
      if (this.currentPage>this.totalPages) {
        return
      }
      this.$router.push({name:"movie-view",params:{type:this.$route.params.type,page:this.currentPage}})
    }
  },
  mounted() {
    if (!document.querySelector('#app>div.home-view>#nav-bar').classList.contains('show')) {
      document.querySelector('#app>div.home-view>#nav-bar').classList.add('show')
    }
    this.currentPage=this.$route.params.page
    this.getMovies()
  }
}
</script>

<style>
.movie-view .container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}


/* responsive */

/*  */
</style>
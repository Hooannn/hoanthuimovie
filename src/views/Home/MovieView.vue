<template>
  <div class="movie-view">
      <movie-view-hero v-if='$route.params.type=="now_playing"||$route.params.type=="popular"||$route.params.type=="top_rated"||$route.params.type=="upcoming"' :movies="movies"/>
      <div style='color:white;fontSize:bolder;textShadow:0 0 3px rgba(0,0,0,0.4);fontSize:26px;borderBottom:3px solid var(--orange);maxWidth:300px;margin:25px auto;marginTop:50px' class="npv-title center">
          <span v-if='$route.params.type=="now_playing"'>NOW PLAYING</span>
          <span v-if='$route.params.type=="popular"'>POPULAR</span>
          <span v-if='$route.params.type=="top_rated"'>TOP RATED</span>
          <span v-if='$route.params.type=="upcoming"'>UPCOMING</span>
          <span v-if='$route.params.type=="search"'>RESULTS</span>
          <div>
            <span @click='$store.state.app.viewMode="list"' :class="{selected:$store.state.app.viewMode=='list'}" class='icon'><ion-icon  name="list-outline"></ion-icon></span>
            <span @click='$store.state.app.viewMode="grid"' :class="{selected:$store.state.app.viewMode=='grid'}" class='icon'><ion-icon  name="grid-outline"></ion-icon></span>
          </div>
      </div>
      <div v-if='$store.state.app.viewMode=="grid" && movies.length>0' :key='$store.state.app.viewMode+"gridview"' class="container">
        <movie-card v-for='movie in movies' :key='"movie"+movie.id' :movie="movie"/>
      </div>
      <div v-if='$store.state.app.viewMode=="list" && movies.length>0' :key='$store.state.app.viewMode+"listview"' class="container">
        <movie-list-item v-for='movie in movies' :key='"movie"+movie.id' :id="movie.id"/>
      </div>
      <div v-if='movies.length==0' class="container">
        <div style='color:white;fontWeight:lighter;'>Sorry we can't find any thing.</div>
      </div>
      <div style='margin:25px auto;color:white' class="npv-page center">
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
import MovieListItem from '@/components/General/MovieListItem.vue'
export default {
  components: { MovieCard, MovieViewHero, MovieListItem },
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
      this.$router.push({name:"movie-view",params:{type:this.$route.params.type,page:parseInt(this.currentPage,10)-1},query:{q:this.$route.query.q}})
    },  
    nextPage() {
      if (this.currentPage==this.totalPages) {
        return
      }
      this.$router.push({name:"movie-view",params:{type:this.$route.params.type,page:parseInt(this.currentPage,10)+1},query:{q:this.$route.query.q}})
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
          console.log(err)
          this.$store.dispatch('unload')
        })
    },
    getMovies_search() {
      this.$store.dispatch('loading')
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${this.$store.state.app.apiKey}&language=en-US&query=${this.$route.query.q}&page=${this.$route.params.page}&include_adult=true`)
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
    if (this.$route.params.type=='search') {
      this.getMovies_search()
    }
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
div.movie-view > div.npv-title {
  justify-content: space-between;
}
div.movie-view > div.npv-title.center > div span.icon{
  padding:0 5px;
  cursor: pointer;
  transition: .2s linear;
}
div.movie-view > div.npv-title.center > div span.icon:hover,
div.movie-view > div.npv-title.center > div span.icon.selected {
  color:orange;
}
/* responsive */

/*  */
</style>
<template>
  <div class="movie-detail-view">
      <movie-overview :backdropPath='movie.backdrop_path' :movie='movie'/>
      <movie-cast />
      <movie-crew />
      <movie-trailer/>
      <movie-recommend/>
  </div>
</template>

<script>
import axios from 'axios'
import MovieCast from '@/components/MoviesDetail/MovieCast.vue'
import MovieRecommend from '@/components/MoviesDetail/MovieRecommend.vue'
import MovieTrailer from '@/components/MoviesDetail/MovieTrailer.vue'
import MovieOverview from '@/components/MoviesDetail/MovieOverview.vue'
import MovieCrew from '@/components/MoviesDetail/MovieCrew.vue'
export default {
  components: { MovieOverview, MovieCast, MovieRecommend, MovieTrailer, MovieCrew },
    data() {
        return {
            movie:{},
            cast:[],
            crew:[]
        }
    },
    mounted() {
        if (!document.querySelector('#app>div.home-view>#nav-bar').classList.contains('show')) {
            document.querySelector('#app>div.home-view>#nav-bar').classList.add('show')
        }
        this.$store.dispatch('loading')
        axios.get(`https://api.themoviedb.org/3/movie/${this.$route.params.id}?api_key=${this.$store.state.app.apiKey}&language=en-US`)
        .then(res=>{
            this.movie=res.data
            axios.get(`https://api.themoviedb.org/3/movie/${this.$route.params.id}/credits?api_key=${this.$store.state.app.apiKey}&language=en-US`).then((res)=>{
                this.cast=res.data.cast
                this.crew=res.data.crew
                this.$store.dispatch('unload')
            }).catch(err=>{
                alert(err)
                this.$store.dispatch('unload')
            })
        })
        .catch(err=>{
            alert(err)
            this.$store.dispatch('unload')
        })
    }
}
</script>

<style>

</style>
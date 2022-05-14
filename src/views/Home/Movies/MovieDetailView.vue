<template>
  <div class="movie-detail-view">
      <movie-overview :trailer='getTrailer' :keywords='keywords' :externalID='externalID' :director='getDirector' :backdropPath='movie.backdrop_path' :movie='movie'/>
      <movie-cast :cast='cast'/>
      <movie-crew :crew='crew'/>
      <movie-videos :videos='getYoutubeVideos'/>
      <movie-recommend :recommendations='recommendations'/>
  </div>
</template>

<script>
import axios from 'axios'
import MovieCast from '@/components/MoviesDetail/MovieCast.vue'
import MovieRecommend from '@/components/MoviesDetail/MovieRecommend.vue'
import MovieVideos from '@/components/MoviesDetail/MovieVideos.vue'
import MovieOverview from '@/components/MoviesDetail/MovieOverview.vue'
import MovieCrew from '@/components/MoviesDetail/MovieCrew.vue'
export default {
  components: { MovieOverview, MovieCast, MovieRecommend, MovieVideos, MovieCrew },
    data() {
        return {
            movie:{},
            recommendations:[],
            cast:[],
            crew:[],
            externalID:{},
            keywords:[],
            videos:[],
        }
    },
    computed: {
        getYoutubeVideos() {
            return this.videos.filter(v=>v.site=="YouTube")
        },
        getDirector() {
            return this.crew.find(p=>p.job=="Director")
        },
        getTrailer() {
            return this.videos.find(v=>v.type=="Trailer")
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
                axios.get(`https://api.themoviedb.org/3/movie/${this.$route.params.id}/external_ids?api_key=${this.$store.state.app.apiKey}`).then((res)=>{
                    this.externalID=res.data
                    axios.get(`https://api.themoviedb.org/3/movie/${this.$route.params.id}/keywords?api_key=${this.$store.state.app.apiKey}`).then((res)=>{
                        this.keywords=res.data.keywords
                        axios.get(`https://api.themoviedb.org/3/movie/${this.$route.params.id}/videos?api_key=${this.$store.state.app.apiKey}&language=en-US`).then((res)=>{
                            this.videos=res.data.results
                            axios.get(`https://api.themoviedb.org/3/movie/${this.$route.params.id}/recommendations?api_key=${this.$store.state.app.apiKey}&language=en-US&page=1`).then(res=>{
                                this.recommendations=res.data.results
                                this.$store.dispatch('unload')
                            }).catch(err=>{
                                alert(err)
                                this.$store.dispatch('unload')
                            })
                        }).catch(err=>{
                            alert(err)
                            this.$store.dispatch('unload')
                        })
                    }).catch(err=>{
                        alert(err)
                        this.$store.dispatch('unload')
                    })
                }).catch(err=>{
                    alert(err)
                    this.$store.dispatch('unload')
                })
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
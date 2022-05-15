<template>
  <div class="movie-list-item">
      <div @click='$router.push({name:"movie-detail",params:{id:id}})' class="mli-poster">
          <img :src="'https://image.tmdb.org/t/p/w200'+movie.poster_path" alt="Film poster">
      </div>
      <div class="mli-information">
          <div class="mlii-title mlii-duration mlii-country">
              <div onMouseOut='this.style.color="unset"' onMouseOver='this.style.color="orangered"' style='transition:.1s linear;cursor:pointer' @click='$router.push({name:"movie-detail",params:{id:id}})' v-if='movie.release_date'>
                  {{movie.title}} <span style='color:silver;fontWeight:lighter'>({{movie.release_date.substring(0,4)}})</span>
              </div>
              <div style='display:flex,flexDirection:column;fontSize:14.5px'>
                  <span style='color:silver;fontWeight:lighter'>{{movie.runtime}} minutes</span>
                  <div>
                      <span v-for='(c,idx) in movie.production_countries' :key='idx'>{{c.iso_3166_1}} <span v-if='idx!=movie.production_countries.length-1'>, </span></span>
                  </div>
              </div>
          </div>
          <div style='color:silver;fontWeight:lighter;padding:10px 0' class="mlii-overview">
              {{movie.overview}}
          </div>
          <div class="mlii-genres mlii-userscore">
              <div class='mliig'>
                  <span @click='$router.push({name:"movie-view",params:{type:"search",page:1},query:{q:r.name}})' style='display:inline-block' v-for='(r,idx) in movie.genres' :key='idx'>{{r.name}}</span>
              </div>
              <div v-if='movie.vote_average' class='mliiu'>
                  <vue-ellipse-progress 
                    :progress="movie.vote_average*10"
                    :color="getColor"
                    emptyColor="var(--bs-secondary)"
                    emptyColorFill="transparent"                      
                    :size="80"
                    lineMode="in 10"
                    :legend="true"
                    :legendValue="movie.vote_average"
                    animation="reverse 1000 600"
                    fontColor="white"
                    :half="false"
                    fontSize="13.5px" />
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { VueEllipseProgress } from "vue-ellipse-progress";
import axios from 'axios'
export default {
    components:{VueEllipseProgress},
    props:{
        id:Number
    },
    data() {
        return {
            movie:{}
        }
    },
    computed: {
        getColor() {
            if (this.movie.vote_average>=8) {
                return 'var(--bs-green)'
            }
            else if (this.movie.vote_average>=5 && this.movie.vote_average<8) {
                return 'var(--bs-info)'
            }
            else if (this.movie.vote_average>=2.5 && this.movie.vote_average<5) {
                return 'var(--bs-warning)'
            }
            else if (this.movie.vote_average<2.5){
                return 'var(--bs-danger)'
            }
        }
    },
    mounted() {
        this.$store.dispatch('loading')
        axios.get(`https://api.themoviedb.org/3/movie/${this.id}?api_key=${this.$store.state.app.apiKey}&language=en-US`)
        .then(res=>{
            this.movie=res.data
            this.$store.dispatch('unload')
        }).catch(err=>{
            console.log(err)
            this.$store.dispatch('unload')
        })
    }
}
</script>

<style>
.movie-list-item {
    width: 100%;
    min-height: 250px;
    border-bottom: 2px solid silver;
    padding:15px 0;
    display: flex;
    color:white;
    justify-content: space-around;
}
.movie-list-item .mli-poster {
    height: 200px;
    width: 150px;
    cursor: pointer;
    overflow: hidden;
    padding:10px;
}
.movie-list-item .mli-poster img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: .2s linear;
}
.movie-list-item .mli-poster:hover img {
    transform: scale(1.05);
}
.movie-list-item .mli-information {
    width: 85%;
    display: flex;
    flex-direction: column;
}
.movie-list-item .mli-information .mlii-title,
.movie-list-item .mli-information .mlii-genres {
    display:flex;
    justify-content: space-between;
    align-items: center;
}
.movie-list-item .mli-information .mlii-genres .mliig {
    max-width: 50%;
}
.movie-list-item .mli-information .mlii-genres .mliig span {
    padding:4px 6px;
    margin:4px;
    font-size: 13.5px;
    font-weight: lighter;
    border:1px solid orange;
    color:orange;
    border-radius: 100px;
    cursor: pointer;
    transition:.2s linear;
}
.movie-list-item .mli-information .mlii-genres .mliig span:hover {
    background-color:rgb(255, 165, 0,0.3);
}

/* response */
@media only screen and (max-width: 1200px) {
    .movie-list-item .mli-information {
        width: 80%;
    }
}
@media only screen and (max-width: 992px) {
    .movie-list-item .mli-information {
        width: 75%;
    }
}
@media only screen and (max-width: 768px) {
    .movie-list-item .mli-information {
        width: 70%;
    }
}
@media only screen and (max-width: 425px) {
    .movie-list-item .mli-poster {
        margin: 0 auto;
    }
    .movie-list-item {
        flex-direction: column;
    }
    .movie-list-item .mli-information {
        width: 100%;
        max-width: 100%;
    }
    .movie-list-item .mli-information .mlii-overview {
        font-size: 14px;
    }
}
/*  */
</style>
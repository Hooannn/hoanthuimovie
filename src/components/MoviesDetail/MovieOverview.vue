<template>
  <div class="movie-overview">
      <div :key='"video"+renKey' @click='closeTrailer' class='mo-trailer center'>
        <div class='mo-trailer-container'>
          <iframe allowfullscreen id='video' style='width:100%;height:100%' :src="'https://www.youtube.com/embed/'+trailer.key+'?autoplay=0'" frameborder="0"></iframe>
        </div>
      </div>
      <img style='width:100%;height:100%;objectFit:cover' :src='"https://image.tmdb.org/t/p/w1280"+backdropPath'>
      <div class="mo-main">
        <div class="container">
          <div class="mom-poster">
            <div class="momp-social">
              <a target="_blank" :href="'https://www.facebook.com/'+externalID.facebook_id"><ion-icon class='icon' name="logo-facebook"></ion-icon></a >
              <a target="_blank" :href="'https://www.instagram.com/'+externalID.instagram_id"><ion-icon class='icon' name="logo-instagram"></ion-icon></a >
              <a target="_blank" :href="'https://www.twitter.com/'+externalID.twitter_id"><ion-icon class='icon' name="logo-twitter"></ion-icon></a >
              <a target="_blank" :href="movie.homepage"><ion-icon class='icon' name="planet-outline"></ion-icon></a >
            </div>
            <div @click='showTrailer' class="momp-expand center"><ion-icon style='marginRight:5px;fontSize:20px' name="play-outline"></ion-icon> Trailer</div>
            <img style='width:100%;height:100%;objectFit:cover;borderRadius:7px' :src="'https://image.tmdb.org/t/p/w1280'+movie.poster_path" :alt="movie.title+' poster'">
          </div>
          <div class="mom-detail">
            <div class="momd-title">{{movie.title}} <span >({{getYear}})</span></div>
            <div class="momd-tagline">{{movie.tagline}}</div>
            <div class="momd-tvma momd-duration">
              <div style='padding:3px;border:1px solid silver;fontSize:13px;borderRadius:4px;backgroundColor:rgba(255,255,255,0.2)'>TV-MA</div>
              <div style='marginLeft:5px;color:white;fontSize:14px'><ion-icon style='fontSize:8px;color:silver' name="ellipse"></ion-icon> {{movie.runtime}} minutes</div>
            </div>
            <div class="momd-genres">
              <div v-for='(genre,index) in movie.genres' :key='index' class="momdg-genre">{{genre.name}}</div>
            </div>
            <div class="momd-userscore">
              <vue-ellipse-progress 
                :progress="movie.vote_average*10"
                :color="getColor"
                emptyColor="var(--bs-secondary)"
                emptyColorFill="transparent"                      
                :size="90"
                lineMode="in 10"
                :legend="true"
                :legendValue="movie.vote_average"
                animation="reverse 1000 600"
                fontColor="white"
                :half="false"
                fontSize="15px" />
                <span style='color:whitesmoke;fontSize:14px' slot="legend-value">/ {{movie.vote_count}} reviews</span>
                <p style='color:lightblue;marginTop:5px;' slot="legend-caption">USERS SCORE</p>
            </div>
            <div class="momd-imdb">
              <div style='width:45px;height:25px;overflow:hidden;borderRadius:5px'><img style='width:100%;height:100%;objectFit:contain' src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/575px-IMDB_Logo_2016.svg.png" alt="IMDB Logo"></div>
              <span style='color:white;fontWeight:bold;marginLeft:5px'>10.0</span>
            </div>
            <div style='color:white' class='momd-moreinfo'>
              <div><span style='color:silver;fontWeight:lighter'>Status: </span><span style='fontWeight:lighter'>{{movie.status}}</span></div>
              <div><span style='color:silver;fontWeight:lighter'>Budget: </span><span style='fontWeight:lighter'>{{movie.budget|formatMoney}}</span></div>
              <div><span style='color:silver;fontWeight:lighter'>Revenue: </span><span style='fontWeight:lighter'>{{movie.revenue|formatMoney}}</span></div>
            </div>
            <div style='width:250px;display:flex;alignItems:center;justifyContent:space-between' class="momd-director"><span style='color:rgba(255,255,255,0.7);fontSize:15px;'>DIRECTOR</span> <span style='color:white;'>{{director.name.toUpperCase()}}</span></div>
            <div style='width:250px;display:flex;alignItems:center;justifyContent:space-between' class="momd-country">
              <span style='color:rgba(255,255,255,0.7);fontSize:15px;'>COUNTRY</span>
              <div>
                <span v-for='(country,index) in movie.production_countries' :key='country.iso_3166_1' style='color:white;'>{{country.iso_3166_1}} <span v-if='index!=movie.production_countries.length-1'> , </span></span>
              </div>
            </div>
            <div style='width:250px;display:flex;alignItems:center;justifyContent:space-between' class="momd-releasedate"><span style='color:rgba(255,255,255,0.7);fontSize:15px;'>RELEASE DATE</span> <span style='color:white;'>{{movie.release_date}}</span></div>
            <div class="momd-overview"><span style='color:rgba(255,255,255,0.7);fontSize:15px;'>OVERVIEW</span> <br> <span style='color:white;fontSize:14.5px;'>{{movie.overview}}</span></div>
            <div v-if='keywords.length>0' class="momd-keywords">
              <span style='color:rgba(255,255,255,0.7);fontSize:15px;'>KEYWORDS</span> 
              <div style='display:flex;flexWrap:wrap'>
                <div class='momdk-keyword' v-for='keyword in keywords' :key='keyword.id' style='color:white;'>{{keyword.name}}</div>
              </div>
            </div>
            <div class="momd-morefeatures">
              <div class="momdm-share center"><ion-icon style='color:white;fontSize:20px;marginRight:2px' name="logo-facebook"></ion-icon> Share on Facebook</div>
              <div class="momdm-item center"><ion-icon style='marginRight:2px;fontSize:16px' name="list-outline"></ion-icon> List</div>
              <div class="momdm-item center"><ion-icon style='marginRight:2px;fontSize:16px' name="bookmark-outline"></ion-icon> Watchlist</div>
              <div class="momdm-item center"><ion-icon style='marginRight:2px;fontSize:16px' name="heart-outline"></ion-icon> Favorite</div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { VueEllipseProgress } from "vue-ellipse-progress";
export default {
  components:{VueEllipseProgress},
  props:{
    movie:Object,
    backdropPath:String,
    director:Object,
    externalID:Object,
    keywords:Array,
    trailer:Object
  },
  data() {
    return {
      renKey:0,
    }
  },
  filters:{
    formatMoney(number) {
      return (number).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });
    }
  },
  computed: {
    getYear() {
      if (this.movie.release_date) {
        return this.movie.release_date.substring(0,4)
      }
    },
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
  methods:{
    showTrailer() {
      document.querySelector('.movie-overview .mo-trailer').classList.add('show')
    },
    closeTrailer(e) {
      if (e.target==document.querySelector('.movie-overview .mo-trailer')) {
        document.querySelector('.movie-overview .mo-trailer').classList.remove('show')
        this.renKey=new Date().getTime()
      }
    }
  }
}
</script>

<style>
.movie-overview {
  height: 900px;
  max-height: auto;
  width: 100%;
  position: relative;
}
.movie-overview .mo-trailer.show {
  visibility: visible;
  opacity: 1;
}
.movie-overview .mo-trailer {
  position:fixed;
  top:0;
  left:0;
  width:100vw;
  height:100vh;
  background-color:rgba(0,0,0,0.8);
  z-index:100;
  visibility: collapse;
  opacity: 0;
}
.movie-overview .mo-trailer .mo-trailer-container{
  width:720px;
  height:400px;
}

.movie-overview .mo-main {
  position: absolute;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.7);
  display: flex;
}
.movie-overview .mo-main .container {
  position: relative;
  padding-top:80px;
  display: flex;
}
.movie-overview .mo-main .mom-poster {
  width: 260px;
  height: 400px;
  cursor: pointer;
  box-shadow: 1px 1px 5px rgba(0,0,0,0.4);
  position: relative;
}
.movie-overview .mo-main .mom-poster .momp-social {
  position:absolute;
  width:100%;
  height:40px;
  top:100%;
  color:white;
  display:flex;
  align-items:center;
  justify-content:space-around;
}
.movie-overview .mo-main .mom-poster .momp-social a {
  text-decoration: none;
  color:white;
  font-size: 20px;
}
.movie-overview .mo-main .mom-poster .momp-social a .icon:hover {
  color:orange;
}
.movie-overview .mo-main .mom-poster .momp-expand {
  position: absolute;
  color:white;
  background-color:rgba(0,0,0,0.8);
  z-index: 1;
  width: 100%;
  height: 100%;
  visibility: hidden;
  opacity: 0;
  border-radius: 7px;
  transition: .2s linear;
}
.movie-overview .mo-main .mom-poster:hover .momp-expand {
  visibility: visible;
  opacity: 1;
}
.movie-overview .mo-main .mom-detail {
  margin-left: 40px;
  max-width: 70%;
  display: flex;
  flex-direction: column;
}
.movie-overview .mo-main .mom-detail .momd-title {
  color:whitesmoke;
  font-size: 26px;
}
.movie-overview .mo-main .mom-detail .momd-title span {
  font-size: 23px;
  color:silver;
}
.movie-overview .mo-main .mom-detail .momd-tagline {
  font-size: 15px;
  color:silver;
  font-style: italic;
}
.movie-overview .mo-main .mom-detail .momd-tvma.momd-duration {
  display: flex;
  color:white;
  align-items: center;
}
.movie-overview .mo-main .mom-detail .momd-genres {
  margin:15px 0;
  display: flex;
}
.movie-overview .mo-main .mom-detail .momd-genres .momdg-genre {
  color:var(--orange);
  padding:4px 8px;
  font-size: 14px;
  border:1px solid var(--orange);
  margin:4px;
  border-radius: 100px ;
  cursor: pointer;
  transition: .2s linear;
}
.movie-overview .mo-main .mom-detail .momd-genres .momdg-genre:hover {
  background-color:rgb(255, 117, 85,0.3);
}
.movie-overview .mo-main .mom-detail .momd-imdb {
  display: flex;
}
.movie-overview .mo-main .mom-detail .momd-morefeatures {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.movie-overview .mo-main .mom-detail .momd-morefeatures .momdm-share{
  cursor: pointer;
  border-radius: 3px;
  width: 170px;
  font-size: 14px;
  margin:10px 0;
  padding:5px 0;
  color:white;
  background-color: var(--bs-primary);
}
.movie-overview .mo-main .mom-detail .momd-morefeatures .momdm-share:hover {
  opacity: 0.9;
}
.movie-overview .mo-main .mom-detail .momd-morefeatures .momdm-item {
  cursor: pointer;
  border-radius: 3px;
  width: 100px;
  font-size: 14px;
  margin:10px 0;
  padding:5px 0;
  color:silver;
  border:1px solid silver;
}
.movie-overview .mo-main .mom-detail .momd-morefeatures .momdm-item:hover,.movie-overview .mo-main .mom-detail .momd-morefeatures .momdm-item.active {
  border-color: orange;
  color:orange;
}
.movie-overview .mo-main .mom-detail .momd-keywords .momdk-keyword {
  font-size: 13px;
  border-radius: 5px;
  padding:3px;
  border:1px solid silver;
  margin:3px;
  color:silver;
  font-weight: lighter;
  cursor: pointer;
}
.movie-overview .mo-main .mom-detail .momd-keywords .momdk-keyword:hover {
  background-color: rgba(255,255,255,0.3);
  text-decoration: underline;
}
.movie-overview .mo-main .mom-detail .momd-moreinfo {
  font-size: 14px;
  padding:4px;
  border:1px solid var(--bs-light);
  background-color: rgba(248, 249, 247, 0.1);
  box-shadow: 0 0 3px rgba(0,0,0,0.4);
  border-radius: 3px;
  margin:25px 0;
  width: 200px;
}
.movie-overview .mo-main .mom-detail .momd-moreinfo div {
  display: flex;
  justify-content: space-between;
}
</style>
<template>
  <carousel style='position:relative' @changed="onChanged" :autoplaySpeed=1100 :autoHeight="true" :dots="false" :autoplay="true" :nav="false" :items=1 class="movie-view-hero">
      <template slot="prev"><span class="prev"><ion-icon style=';zIndex:50;fontSize:30px' class='previous-icon' name="chevron-back-circle-outline"></ion-icon></span></template>
      <div class="movie-intro">
            <div :key='resK1' class='mi-text'>
                <h1 >{{movies[key1].title}}</h1>
                <h4 style='color:whitesmoke'>SCORE: {{movies[key1].vote_average}} </h4>
                <button @click='$router.push({name:"movie-detail",params:{id:movies[key1].id}})' class="btn btn btn-light">Check it now.</button>
            </div>
            <img v-if='movies[key1].backdrop_path!=null' class='mi-img' :src='"https://image.tmdb.org/t/p/w1280"+movies[key1].backdrop_path'>
            <img v-if='movies[key1].backdrop_path==null' class='mi-img' src='https://wallpaperaccess.com/full/1365735.jpg"'>
      </div>
      <div class="movie-intro">
            <div :key='resK2' class='mi-text'>
                <h1 >{{movies[key2].title}}</h1>
                <h4 style='color:whitesmoke'>SCORE: {{movies[key2].vote_average}} </h4>
                <button @click='$router.push({name:"movie-detail",params:{id:movies[key2].id}})' class="btn btn btn-light">Check it now.</button>
            </div>
            <img v-if='movies[key2].backdrop_path!=null' class='mi-img' :src='"https://image.tmdb.org/t/p/w1280"+movies[key2].backdrop_path'>
            <img v-if='movies[key2].backdrop_path==null' class='mi-img' src='https://wallpaperaccess.com/full/1365735.jpg"'>
      </div>
      <div class="movie-intro">
            <div :key='resK3' class='mi-text'>
                <h1 >{{movies[key3].title}}</h1>
                <h4 style='color:whitesmoke'>SCORE: {{movies[key3].vote_average}} </h4>
                <button @click='$router.push({name:"movie-detail",params:{id:movies[key3].id}})' class="btn btn btn-light">Check it now.</button>
            </div>
            <img v-if='movies[key3].backdrop_path!=null' class='mi-img' :src='"https://image.tmdb.org/t/p/w1280"+movies[key3].backdrop_path'>
            <img v-if='movies[key3].backdrop_path==null' class='mi-img' src='https://wallpaperaccess.com/full/1365735.jpg"'>
      </div>
      <div class="movie-intro">
            <div :key='resK4' class='mi-text'>
                <h1 >{{movies[key4].title}}</h1>
                <h4 style='color:whitesmoke'>SCORE: {{movies[key4].vote_average}} </h4>
                <button @click='$router.push({name:"movie-detail",params:{id:movies[key4].id}})' class="btn btn btn-light">Check it now.</button>
            </div>
            <img v-if='movies[key4].backdrop_path!=null' class='mi-img' :src='"https://image.tmdb.org/t/p/w1280"+movies[key4].backdrop_path'>
            <img v-if='movies[key4].backdrop_path==null' class='mi-img' src='https://wallpaperaccess.com/full/1365735.jpg"'>
      </div>
      <template slot="next"><span class="next"><ion-icon style='zIndex:50;fontSize:30px' class='next-icon' name="chevron-forward-circle-outline"></ion-icon></span></template>
  </carousel>
</template>

<script>
import carousel from 'vue-owl-carousel'
export default {
    components:{carousel},
    props: {
        movies:Array
    },
    data() {
        return {
            key1:0,
            key2:0,
            key3:0,
            key4:0,
            resK1:1,
            resK2:2,
            resK3:3,
            resK4:4,
        }
    },
    methods: {
        getRandomKey() {
            if (this.key1==this.key2 || this.key1==this.key3 || this.key1==this.key4 || this.key2==this.key3 || this.key2 == this.key4 || this.key3==this.key4) {
                this.key1=Math.floor(Math.random() * (Math.floor(19) - Math.ceil(0) + 1)) + Math.ceil(0);
                this.key2=Math.floor(Math.random() * (Math.floor(19) - Math.ceil(0) + 1)) + Math.ceil(0);
                this.key3=Math.floor(Math.random() * (Math.floor(19) - Math.ceil(0) + 1)) + Math.ceil(0);
                this.key4=Math.floor(Math.random() * (Math.floor(19) - Math.ceil(0) + 1)) + Math.ceil(0);
                return this.getRandomKey()
            }
            else return
            
        },
        onChanged(e) {
            this.resK1++
            this.resK2++
            this.resK3++
            this.resK4++
        },
    },
    mounted() {
        this.getRandomKey()
    }
}
</script>

<style>
.movie-view-hero {
    height: 700px;
    overflow: hidden;
    cursor:grab;
}
.movie-view-hero:hover .next-icon {
    visibility: visible;
    animation: move-right 0.5s ease-in-out forwards;
}
.movie-view-hero:hover .previous-icon {
    visibility: visible;
    animation: move-left 0.5s ease-in-out forwards;
}
.movie-view-hero .next-icon,.movie-view-hero .previous-icon{
    cursor: pointer;
    visibility: hidden;
    position:absolute;
    top:50%;
    transform:translateY(-50%);
    color:orange;
    transition:.1s linear;
}
.movie-view-hero .next-icon:hover,.movie-view-hero .previous-icon:hover {
    color:orangered;
}
.movie-view-hero .previous-icon {
    left:15px;
}
.movie-view-hero .next-icon{
    right:15px;
}
.movie-view-hero .movie-intro {
    position: relative;
    height: 100%;
}
.movie-view-hero .movie-intro img {
    height: 100%;
    object-fit: contain;
}
.movie-view-hero .movie-intro .mi-text {
    position: absolute;
    top:25%;
    left:5%;
    color:orangered;
    animation:slide-up 2s ease-in-out;
    font-family:monospace;
}
/* keyframe */
@keyframes move-left {
    0% {
        transform: translate(0,-50%);
    }   
    100% {
        transform: translate(-15px,-50%)
    }
}
@keyframes move-right {
    0% {
        transform: translate(0,-50%);
    }
    100% {
        transform: translate(15px,-50%)
    }
}
@keyframes slide-up {
    0% {
        transform: translateY(100%);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
}
/*  */

/* responsive */
@media only screen and (max-width: 1024px) {
    .movie-view-hero {
        height: unset;
        height: 500px;
    }
}

@media only screen and (max-width: 768px) {
    .movie-view-hero {
        height: unset;
        height: 430px;
    }
}

@media only screen and (max-width: 425px) {
    .movie-view-hero {
        height: unset;
        height: 240px;
    }
    .movie-view-hero .movie-intro .mi-text {
        top:35%;
    }
    .movie-view-hero .movie-intro .mi-text h1{
        font-size: 23px;
    }
    .movie-view-hero .movie-intro .mi-text h4 {
        font-size: 17px;
    }
    .movie-view-hero .movie-intro .mi-text button {
        font-size: 13px;
    }
}

@media only screen and (max-width: 375px) {
    .movie-view-hero {
        height: unset;
        height: 210px;
    }
}

@media only screen and (max-width: 320px) {
    .movie-view-hero {
        height: unset;
        height: 180px;
    }
}
/*  */
</style>
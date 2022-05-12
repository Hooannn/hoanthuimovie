<template>
  <div :style='{background:bgStyle}' class="movie-overview">
      <div  class="mo-main">
        <div class="container">
          <div class="mom-poster">
            <div class="momp-expand center"><ion-icon style='marginRight:5px;fontSize:20px' name="expand-outline"></ion-icon> Expand</div>
            <img style='width:100%;height:100%;objectFit:cover' :src="'https://image.tmdb.org/t/p/w1280'+movie.poster_path" :alt="movie.title+' poster'">
          </div>
          <div class="mom-detail">

          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  props:{
    movie:Object,
    backdropPath:String,
  },
  data() {
    return {
      load:0,
      bgStyle:`url("https://image.tmdb.org/t/p/w1280${this.backdropPath}") no-repeat center/cover`,
    }
  },
}
</script>

<style>
.movie-overview {
  height: 500px;
  width: 100%;
  position: relative;
}
.movie-overview .mo-main {
  position: absolute;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
}
.movie-overview .mo-main .mom-poster {
  margin-top: 30px;
  width: 260px;
  height: 400px;
  border-radius: 7px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 1px 1px 5px rgba(0,0,0,0.4);
  position: relative;
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
  transition: .2s linear;
}
.movie-overview .mo-main .mom-poster:hover .momp-expand {
  visibility: visible;
  opacity: 1;
}
</style>
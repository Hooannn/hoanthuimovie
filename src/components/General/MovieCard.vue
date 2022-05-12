<template>
  <div class="movie-card">
      <div class="progress">
            <div :class='{"bg-success":movie.vote_average>=8.0,"bg-info":(movie.vote_average>=5.0&&movie.vote_average<8.0),"bg-warning":(movie.vote_average>=2.5&&movie.vote_average<5.0),"bg-danger":(movie.vote_average<2.5)}' class="progress-bar" role="progressbar" :style="{width: (movie.vote_average*10)+'%'}" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                {{movie.vote_average}} ({{movie.vote_count}})
            </div>
      </div>
      <div class="mc-image">
          <div class="mc-control">
            <div class="mcc-title"><span style='textShadow:0 0 3px rgba(0,0,0,0.3);color:var(--rose);fontSize:21px;fontWeight:bolder'>{{movie.title.toUpperCase()}}</span></div>
            <button class="btn btn-sm btn-dark center"><ion-icon name="heart-outline"></ion-icon><span>FAVORITE</span></button>
            <button class="btn btn-sm btn-dark center"><ion-icon name="list-outline"></ion-icon><span>ADD TO LIST</span></button>
            <button class="btn btn-sm btn-dark center"><ion-icon name="bookmark-outline"></ion-icon><span>WATCHLIST</span></button>
            <button @click='$router.push({name:"movie-detail",params:{id:movie.id}})' class="btn btn-sm btn-dark center"><ion-icon name="eye-outline"></ion-icon><span>VIEW DETAIL</span></button>
          </div>
          <img style='width:100%;height:100%;objectFit:cover;transition:.2s linear' :src="'https://image.tmdb.org/t/p/w500'+movie.poster_path" :alt="movie.title + ' poster'">
      </div>
      <div class='mc-title center'>
          <span>{{movie.title}}</span>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        movie:Object
    }
}
</script>

<style>
.movie-card {
    width: 300px;
    height: 500px;
    margin:25px 0;
    max-height: 500px;
    cursor: pointer;
    position: relative;
}
.movie-card .mc-image {
    width: 300px;
    height: 450px;
    box-shadow: 0 0 3px rgba(0,0,0,0.5);
    position: relative;
    overflow: hidden;
}
.movie-card .mc-image:hover img{
    filter: blur(8px);
}
.movie-card .mc-title {
    color:whitesmoke;
    text-align: center;
    padding:5px 0;
}
.movie-card .mc-image:hover .mc-control {
    z-index: 1;
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}
.movie-card .mc-control {
    margin-top: 30px;
    left:0;
    height: 350px;
    justify-content: space-around;
    width: 100%;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    z-index: -1;
    opacity: 0;
    visibility: hidden;
    transform: translateY(100%);
    transition:.3s ease-in-out;
}
.movie-card .mc-control .btn {
    width: 120px;
    height: 40px;
}
.movie-card .mc-control .btn span {
    margin-left:5px;
}
</style>    
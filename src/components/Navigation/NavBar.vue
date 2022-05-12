<template>
  <div id="nav-bar" class='show'>
      <div style='height:100%' class="container">
          <div class="nb-logo">
              <img :src="logo" alt="Logo Image">
          </div>
          <div class="nb-search">
              <div @click='showSearch' class="nbs-icon center">
                  <ion-icon style='transition:.2s linear;pointerEvents:none' class='icon' name="search-outline"></ion-icon>
              </div>
              <div class="nbs-input">
                  <input @focus="onFocus" @blur="lostFocus" placeholder="Search..." type="text" >
              </div>
          </div>
          <div style='height:100%' class="nb-content">
              <div :class='{selected:$route.params.type=="now_playing"}' @click='$router.push({name:"movie-view",params:{type:"now_playing",page:1}})' class="nbc-now-playing">
                  <span>NOW PLAYING</span>
              </div>
              <div :class='{selected:$route.params.type=="popular"}' @click='$router.push({name:"movie-view",params:{type:"popular",page:1}})' class="nbc-popular">
                  <span>POPULAR</span>
              </div>
              <div :class='{selected:$route.params.type=="top_rated"}' @click='$router.push({name:"movie-view",params:{type:"top_rated",page:1}})' class="nbc-top-rate">
                  <span>TOP RATED</span>
              </div>
              <div :class='{selected:$route.params.type=="upcoming"}' @click='$router.push({name:"movie-view",params:{type:"upcoming",page:1}})' class="nbc-upcoming">
                  <span>UPCOMING</span>
              </div>
          </div>
          <div style='position:absolute;right:5px;height:100%' class="nb-account center">
              <button @click='showLogin' class="btn btn-sm btn-danger">
                  Login
              </button>
              <nav-mobile/>
          </div>
      </div>
  </div>
</template>

<script>
import logo from '@/assets/Logo/logo.png'
import NavMobile from './NavMobile.vue'
export default {
  components: { NavMobile },
    data() {
        return {
            logo:logo
        }
    },
    methods: {
        onFocus() {
            let input=document.querySelector('#nav-bar .nb-search .nbs-input input')
            let icon=document.querySelector('#nav-bar .nb-search .nbs-icon')
            input.classList.add('show')
            icon.classList.add('show')
        },
        lostFocus() {
            let input=document.querySelector('#nav-bar .nb-search .nbs-input input')
            let icon=document.querySelector('#nav-bar .nb-search .nbs-icon')
            input.classList.remove('show')
            icon.classList.remove('show')
        },
        showSearch() {
            let input=document.querySelector('#nav-bar .nb-search .nbs-input input')
            input.focus()
        },
        showLogin() {
            document.querySelector('#app>div.login-modal').classList.add('show')
        }
    }
}
</script>

<style>
#nav-bar {
    width: 100vw;
    background-color:var(--dark);
    height: 0;
    visibility: hidden;
    opacity: 0;
    position:fixed;
    top:0;
    transition: .2s linear;
    z-index: 100;
}
#nav-bar.show {
    height: 50px;
    visibility: visible;
    opacity: 1;
}
#nav-bar .container {
    display: flex;
    position: relative;
}
#nav-bar .nb-logo {
    height: 95%;
    width: 170px;
}
#nav-bar .nb-logo img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}
#nav-bar .nb-search {
    display: flex;
    height: 100%;
    align-items: center;
}
#nav-bar .nb-search .nbs-icon{
    background-color:var(--orange);
    color:white;
    width: 40px;
    height: 40px;
    border-radius: 5px;
    font-size: 20px;
    cursor: pointer;
    transition:.2s linear;
}
#nav-bar .nb-search .nbs-icon.show {
    border-radius: 5px 0 0 5px;
    pointer-events: none;
}
#nav-bar .nb-search .nbs-icon:hover {
    background-color:rgb(255, 115, 0);
}   
#nav-bar .nb-search .nbs-icon:hover .icon{
    transform: scale(1.1);
}
#nav-bar .nb-search .nbs-input input {
    width: 0;
    outline:none;
    border:none;
    color:white;
    height: 40px;
    background-color:rgba(255,255,255,0.1);
    border-radius: 0 5px 5px 0;
    padding:0;
    font-size: 14px;
    transition:.2s linear;
}
#nav-bar .nb-search .nbs-input input.show {
    padding:0 10px;
    width: 200px;   
}
#nav-bar .nb-content {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 500px;
    color:white;
    font-weight: lighter;
}
#nav-bar .nb-content div {
    cursor: pointer;
}
#nav-bar .nb-content div.selected {
    color:var(--orange);
    font-weight: normal;
}
#nav-bar .nb-content div:hover {
    color:var(--orange);
    font-weight: normal;
}

/* responsive */

@media only screen and (max-width: 768px) {
    #nav-bar .nb-content,#nav-bar .nb-account>button{
        display: none;
    }
}

/*  */
</style>
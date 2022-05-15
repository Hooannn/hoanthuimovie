<template>
  <div class="nav-mobile">
    <span @click="showNav" class="nb-icon"
      ><ion-icon style='color:white;fontSize:25px' class="ion-icon" name="menu"></ion-icon
    ></span>
    <div @click="closeNavMobile_" class="nb-cover">
      <div class="nmb-content">
        <div @click="closeNavMobile" class="nb-back center">
          <ion-icon name="arrow-back-outline"></ion-icon>
        </div>
        <div
          @click='$router.push({name:"movie-view",params:{type:"now_playing",page:1}}), closeNavMobile()'
          :class="{ selected: $route.params.type == 'now_playing' }"
          class="nb-item"
        >
          NOW PLAYING
        </div>
        <div
          @click='
            $router.push({name:"movie-view",params:{type:"popular",page:1}}),
              closeNavMobile()
          '
          :class="{ selected: $route.params.type == 'popular' }"
          class="nb-item"
        >
          POPULAR
        </div>
        <div
          @click='$router.push({name:"movie-view",params:{type:"top_rated",page:1}}), closeNavMobile()'
          :class="{ selected: $route.params.type == 'top_rated' }"
          class="nb-item"
        >
          TOP RATED
        </div>
        <div
          @click='$router.push({name:"movie-view",params:{type:"upcoming",page:1}}), closeNavMobile()'
          :class="{ selected: $route.params.type == 'upcoming' }"
          class="nb-item"
        >
          UPCOMING
        </div>
        <div
          v-if='$store.state.user.email!=null'
          class="nb-item nb-acc"
        >
          ACCOUNT
        </div>
        <div
          v-if='$store.state.user.email!=null'
          class="nb-item nb-acc"
        >
          LIST
        </div><div
          v-if='$store.state.user.email!=null'
          class="nb-item nb-acc"
        >
          WATCHLIST
        </div><div
          v-if='$store.state.user.email!=null'
          class="nb-item nb-acc"
        >
          FAVORITE
        </div>
        <div
          v-if='$store.state.user.email==null'
          @click="showLoginModal(), closeNavMobile()"
          class="nb-login"
        >
          <button style="margin: 10px auto" class="btn btn-sm btn-light">
            LOGIN
          </button>
        </div>
        
        <div
          v-if="$store.state.user.email != null"
          @click="logOut(), closeNavMobile()"
          class="nb-login"
        >
          <button style="margin: 10px auto" class="btn btn-sm btn-light">
            LOGOUT
          </button>
        </div>
        <!--
        <div class="nb-account">
          <div v-if='$store.state.user.email==null'
            class="default-account center"
          >
            <div style="fontSize: 30px" class="da-avatar center">
              <ion-icon name="person-circle"></ion-icon>
            </div>
            <div class="da-info center" style="flexDirection: column">
              <span>User</span>
            </div>
          </div>
          
          <div
          
            v-if="$store.state.user.email != null"
            class="default-account center"
          >
            <div class="da-info center" style="flexDirection: column">
              <span>{{ $store.state.user.email }}</span>
            </div>
          </div>
          
        </div>
        -->
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
export default {
    methods:{
        showLoginModal() {
            document.querySelector('#app>div.login-modal').classList.add('show')
        },
        showNav() {
            let cover=document.querySelector('#nav-bar .nav-mobile .nb-cover')
            cover.classList.toggle('show')
            let nav=document.querySelector('#nav-bar .nav-mobile .nb-cover .nmb-content')
            nav.classList.toggle('show')
        },
        closeNavMobile() {
            let cover=document.querySelector('#nav-bar .nav-mobile .nb-cover')
            let nav=document.querySelector('#nav-bar .nav-mobile .nb-cover .nmb-content')
            nav.classList.remove('show')
            setTimeout(function(){
                cover.classList.remove('show')
            },300)
        },
        closeNavMobile_(e) {
            let cover=document.querySelector('#nav-bar .nav-mobile .nb-cover')
            let nav=document.querySelector('#nav-bar .nav-mobile .nb-cover .nmb-content')
            if (e.target==cover) {
                nav.classList.remove('show')
                setTimeout(function(){
                    cover.classList.remove('show')
                },300)
            }
        },
        logOut() {
            this.$store.dispatch('loading')
            firebase.auth().signOut().then(() => {
                this.closeNavMobile()
                this.$store.state.user={}
                if (this.$route.params.type=="now_playing") {
                    setTimeout(this.$router.go(),300)
                }
                setTimeout(this.$router.push({name:"movie-view",params:{type:"now_playing",page:1}}),300)
            }).catch((error) => {
                alert(error)
                this.$store.dispatch('unload')
            });
        },
    }
};
</script>

<style>
#nav-bar .nav-mobile {
    display: none;
}
#nav-bar .nav-mobile .nb-cover.show {
    visibility: visible;
    opacity: 1;
}
#nav-bar .nav-mobile .nb-cover{
    width: 100vw;
    height: 100vh;
    background-color:rgba(0,0,0,0.5);
    position: fixed;
    top:0;
    left:0;
    visibility: hidden;
    opacity: 0;
    z-index: 15;
}
#nav-bar .nav-mobile .nb-cover .nmb-content.show {
    height: 100vh;
    width: 320px;
}
#nav-bar .nav-mobile .nb-cover .nmb-content{
    position: absolute;
    top:0;
    right: 0;
    width: 0;
    height: 0;
    background-color: #313131;
    color:white;
    z-index: 10;
    transition:.3s linear;
}
#nav-bar .nav-mobile .nb-cover .nb-back {
    cursor: pointer;
    width: 100%;
    font-size: 17px;
    padding:0 10px;
    height: 25px;
    background-color:black;
}
#nav-bar .nav-mobile .nb-cover .nb-back:hover {
    background-color:white;
    color:black;
}
#nav-bar .nav-mobile .nb-cover .nmb-content .nb-item,
#nav-bar .nav-mobile .nb-cover .nmb-content .nb-login {
    font-weight: lighter;
    font-size: 13px;
    width: 100%;
    height: 37px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding:0 10px;
}
#nav-bar .nav-mobile .nb-cover .nmb-content .nb-item.selected {
    border-left: 5px solid orange;
    background-color: rgb(0, 0, 0,0.3);
}
#nav-bar .nav-mobile .nb-cover .nmb-content .nb-account{
    background-color:rgb(255,255,255,0.3);
    position:absolute;
    bottom:0;
    left:0;
    width:100%;
    height:37px;
    font-weight: lighter;
}
#nav-bar .nav-mobile .nb-cover .nmb-content .nb-account .default-account {
    width: 100%;
    height: 100%;
}
@media only screen and (max-width: 992px) {
    #nav-bar .nav-mobile {
        display: block;
    }
}
</style>

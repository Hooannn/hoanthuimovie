<template>
  <div id="app">
    <login-modal/>
    <signup-modal/>
    <loading-view/>
    <router-view :key='$route.fullPath'/>
  </div>
</template>
<script>
import LoginModal from './components/Modal/LoginModal.vue'
import SignupModal from './components/Modal/SignupModal.vue'
import LoadingView from './LoadingView.vue'
export default {
  components: { LoadingView, LoginModal, SignupModal },
  mounted() {
    document.addEventListener("mousewheel", function(event){
      if(event.wheelDelta >= 100){
        document.querySelector('#app>div.home-view>#nav-bar').classList.add('show')
      }else{
        document.querySelector('#app>div.home-view>#nav-bar').classList.remove('show')
      }
    })
  },
  destroyed() {
    document.removeEventListener("mousewheel", function(event){
      if(event.wheelDelta >= 100){
        document.querySelector('#app>div.home-view>#nav-bar').classList.add('show')
      }else{
        document.querySelector('#app>div.home-view>#nav-bar').classList.remove('show')
      }
    })
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Lato&family=Poppins:wght@200;400&display=swap');
:root {
  --dark:#313131;
  --orange:rgb(255, 117, 85);
  --rose:#fb5252;
}
.modal-backdrop {
  background-color:rgba(0,0,0,0.4);
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type=number] {
  -moz-appearance: textfield;
}
body {
  overflow-x:hidden;
  font-family: "Poppins", sans-serif;
  box-sizing: border-box;
  padding:0;
  margin:0;
  user-select: none;
  background-color:rgb(40, 40, 40,0.8);
}
body > div.nanobar .bar {
  background:orange;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

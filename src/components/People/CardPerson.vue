<template>
  <div class="card-person">
      <div class="cp-image">
        <img v-if='cast.profile_path' style='width:100%;height:100%;objectFit:cover;transition:.3s linear' :src="'https://image.tmdb.org/t/p/w500'+cast.profile_path" :alt="cast.name + ' image'">
        <img v-if='!cast.profile_path' style='width:100%;height:100%;objectFit:cover;transform:translate(0)' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png" alt="cast image">
      </div>
      <div class="cp-name">
        <div><span class='cpn-realname' style='fontWeight:bold;fontSize:16px'>{{cast.name}}</span></div>
        <div><span style='fontWeight:lighter;fontSize:14px;color:var(--dark)'>{{cast.character}}</span></div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    cast:Object
  }
}
</script>

<style>
.card-person {
  padding:15px;
  height: 380px;
}
.card-person .cp-image{
  height: 280px;
  overflow: hidden;
  display: flex;
  align-items: center;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.3);
  cursor: pointer;
}
.card-person .cp-name {
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 70px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.3);
  cursor: pointer;
  transition:.3s linear;
}
.card-person .cp-image:hover img{
  transform: scale(1.1);
}
.card-person .cp-name:hover {
  background-color: rgb(241, 226, 198);
}
</style>
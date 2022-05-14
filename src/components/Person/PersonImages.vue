<template>
  <div class="person-images">
      <div style='color:var(--orange);fontSize:17px;margin:5px 0'>IMAGES</div>
      <div class="pi-images-container">
        <div v-for='(image,index) in images' :key='"img"+index' class="pii-image">
          <img style='width:100%;height:100%;objectFit:cover' :src="'https://image.tmdb.org/t/p/w200'+image.file_path" alt='person image'>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        images:Array
    }
}
</script>

<style>
.person-images .pi-images-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.person-images .pi-images-container .pii-image {
  width: 200px;
  height: 270px;
  margin:10px 0;
}
</style>


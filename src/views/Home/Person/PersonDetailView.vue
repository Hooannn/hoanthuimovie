<template>
  <div class="person-detail-view">
      <div class="container">
          <div class="ps-shortinfo">
              <img :src="'https://image.tmdb.org/t/p/w300'+person.profile_path" :alt="person.name+' image'">
              <div style='color:white;fontSize:17px;margin:10px 0'>PERSONAL INFO</div>
              <div v-if='person.known_for_department'>
                  <span>Known For</span>
                  <span>{{person.known_for_department}}</span>
              </div>
              <div >
                  <span>Gender</span>
                  <span>{{getGender}}</span>
              </div>
              <div v-if='person.birthday'>
                  <span>Birthday</span>
                  <span>{{person.birthday}}</span>
              </div>
              <div v-if='person.place_of_birth'>
                  <span>Place of Birth</span>
                  <span>{{person.place_of_birth}}</span>
              </div>
              <div v-if='person.also_known_as.length>0' class='pss-knownas'>
                  <span>Also known as</span>
                  <span v-for='(p,index) in person.also_known_as' :key='"paka"+index'>{{p}} </span>
              </div>
          </div>
          <div class='ps-moreinfo'>
              <div class="ps-bio">
                <div style='fontSize:24px;color:orange;fontWeight:lighter;marginBottom:15px;borderBottom:1px solid var(--bs-light)'>{{person.name}}</div>
                <div style='color:var(--orange);fontSize:17px;margin:5px 0'>BIOGRAPHY</div>
                <div>{{person.biography}}</div>
              </div>
              <movies-credit :movies='movies'/>
              <person-images :images='images'/>
          </div>
      </div>
  </div>
</template>

<script>
import store from '@/store/store'
import axios from 'axios'
import MoviesCredit from '@/components/Person/MoviesCredit.vue'
import PersonImages from '@/components/Person/PersonImages.vue'
export default {
  components: {  MoviesCredit, PersonImages },
    data() {
        return {
            person:{},
            movies:[],
            images:[],
            externalID:[]
        }
    },
    computed:{
        getGender() {
            if (this.person.gender==1) {
                return "Female"
            }
            if (this.person.gender==2) {
                return "Male"
            }
            return "Other"
        }
    },
    mounted() {
        store.dispatch('loading')
        axios.get(`https://api.themoviedb.org/3/person/${this.$route.params.id}?api_key=${store.state.app.apiKey}&language=en-US`).then(res=>{
            this.person=res.data
            axios.get(`https://api.themoviedb.org/3/person/${this.$route.params.id}/movie_credits?api_key=${store.state.app.apiKey}&language=en-US`).then(res=>{
                this.movies=res.data.cast
                axios.get(`https://api.themoviedb.org/3/person/${this.$route.params.id}/images?api_key=${store.state.app.apiKey}`).then(res=>{
                    this.images=res.data.profiles
                    axios.get(`https://api.themoviedb.org/3/person/${this.$route.params.id}/external_ids?api_key=${store.state.app.apiKey}`).then(res=>{
                        this.externalID=res.data
                        store.dispatch('unload')
                    }).catch(err=>{
                        alert(err)
                        store.dispatch('unload')
                    })
                }).catch(err=>{
                    alert(err)
                    store.dispatch('unload')
                })
            }).catch(err=>{
                alert(err)
                store.dispatch('unload')
            })
        }).catch(err=>{
            alert(err)
            store.dispatch('unload')
        })
    }
}
</script>

<style>
.person-detail-view {
    margin-top: 80px;
}
.person-detail-view .container {
    display: flex;
}
.person-detail-view .container .ps-shortinfo {
    display: flex;
    flex-direction: column;
    width: 300px;
}
.person-detail-view .container .ps-shortinfo>img {
    max-height: 400px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius:10px;
    box-shadow:0 0 2px rgba(0,0,0,0.4)
}
.person-detail-view .container .ps-shortinfo div:not(.pss-knownas) {
    display: flex;
    flex-direction: column;
}
.person-detail-view .container .ps-shortinfo div{
    margin:5px 0;
}
.person-detail-view .container .ps-shortinfo div span:first-child {
    color:whitesmoke;
    font-size: 16px;
}
.person-detail-view .container .ps-shortinfo div:not(.pss-knownas) span:last-child {
    color:silver;
    font-weight: lighter;
}
.person-detail-view .container .ps-shortinfo .pss-knownas span:not(span:first-child) {
    display: inline-block;
    padding:3px;
    margin:3px;
    border:1px solid silver;
    color:silver;
    border-radius: 4px;
    font-size: 14px;
}
.person-detail-view .container .ps-moreinfo {
    display: flex;
    flex-direction: column;
    max-width: 65%;
    margin-left: 30px;
    margin:0 auto;
}
.person-detail-view .container .ps-moreinfo .ps-bio div:last-child {
    color:silver;
    font-weight: lighter;
}

/* response */
@media only screen and (max-width: 992px) {
    .person-detail-view .container .ps-moreinfo {
        max-width: 57%;
    }
    .person-detail-view .container .ps-shortinfo {
        width: 200px;
    }
    .person-detail-view .container .ps-shortinfo>img {
        max-height: 300px;
    }
}
@media only screen and (max-width: 768px) {
    .person-detail-view .container {
        flex-direction: column;
    }
    .person-detail-view .container .ps-shortinfo {
        width: 100%;
    }
    .person-detail-view .container .ps-shortinfo>img {
        width: 300px;
        max-height: 400px;
        margin:0 auto;
    }
    .person-detail-view .container .ps-moreinfo {
        max-width: 100%;
    }
}
/*  */
</style>
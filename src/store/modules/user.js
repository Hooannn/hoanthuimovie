import db from "@/plugins/firebase"
import store from "../store"

const user = {
    state: () => ({ 
        
    }),
    mutations: { 
        
     },
    actions: {
      addList(id) {
        store.dispatch('loading')
        db.child(store.state.user.uid).child('list').push(id).then(()=>{
          store.dispatch('unload')
        }).catch(err=>{
          alert(err)
          store.dispatch('unload')
        })
      },
      addWatchlist(id) {
        store.dispatch('loading')
        db.child(store.state.user.uid).child('watchlist').push(id).then(()=>{
          store.dispatch('unload')
        }).catch(err=>{
          alert(err)
          store.dispatch('unload')
        })
      },
      addFavorite(id) {
        store.dispatch('loading')
        db.child(store.state.user.uid).child('favorite').push(id).then(()=>{
          store.dispatch('unload')
        }).catch(err=>{
          alert(err)
          store.dispatch('unload')
        })
      },
    },
    getters: { 
        
    }
  }
export default user
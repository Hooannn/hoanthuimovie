const app = {
    state: () => ({ 
        apiKey:'8f6404b00f28edf5b407334b8c89500c'
    }),
    mutations: { 
        
     },
    actions: {
      loading() {
        let loader=document.querySelector('#app > div.loading-view')
        loader.classList.add('show')
      },
      unload() {
        let loader=document.querySelector('#app > div.loading-view')
        loader.classList.remove('show')
      },
      
    },
    getters: { 
        
    }
  }
export default app
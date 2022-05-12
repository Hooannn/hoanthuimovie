<template>
  <div class="footer-bar">
          <div class="top-footer">
              <div class="tf-content">
                <div class="tf-store">
                    <div style='display:flex'>
                        <img style='width:165px;height:50px' :src="icon">
                    </div>
                    <div>
                        <span><strong>Phone:</strong> 07070101010</span>
                    </div>
                    <div>
                        <span><strong>Email:</strong> hoanthuifilm@gmail.com</span>
                    </div>
                    <div>
                        <span style='fontSize:20px;margin:0px 5px;'><ion-icon onMouseOut='this.style.color="unset"' onMouseOver='this.style.color="orange"' style='cursor:pointer;transition:.2s linear' name="logo-facebook"></ion-icon></span>
                        <span style='fontSize:20px;margin:0px 5px;'><ion-icon onMouseOut='this.style.color="unset"' onMouseOver='this.style.color="orange"' style='cursor:pointer;transition:.2s linear' name="logo-twitter"></ion-icon></span>
                        <span style='fontSize:20px;margin:0px 5px;'><ion-icon onMouseOut='this.style.color="unset"' onMouseOver='this.style.color="orange"' style='cursor:pointer;transition:.2s linear' name="logo-pinterest"></ion-icon></span>
                        <span style='fontSize:20px;margin:0px 5px;'><ion-icon onMouseOut='this.style.color="unset"' onMouseOver='this.style.color="orange"' style='cursor:pointer;transition:.2s linear' name="logo-instagram"></ion-icon></span>
                    </div>
                </div>
                <div class="tf-information">
                    <h5>INFORMATION</h5>
                    <span @click='goNP'>Now Playing</span>
                    <span @click='goPlar'>Popular</span>
                    <span @click='goTR'>Top Rated</span>
                    <span @click='goUp'>Upcoming</span>
                </div>
                <div class="tf-newsletter">
                    <h5>NEWSLETTER</h5>
                    <input v-model='email' style='outline:none;width:220px' type="email" placeholder="Enter your mail...">
                    <span style='color:red;fontSize:13.5px;'>{{err}}</span>
                    <button @click='send' style='width:60px;margin:5px;' class="btn btn-sm btn-dark">SEND</button>
                </div>
              </div>
          </div>
          <div class="bottom-footer">
              <div class="bf-content">
                  <div class="bf-copyright">
                    <span style='color:white'><i class="fas fa-copyright"></i> CopyRight 2022 <span style='color:orange;fontWeight:bolder'>hoanthui Film Research</span></span>
                  </div>
                  
                  <div style='width:100px;display:flex;justifyContent:space-between;alignItems:center' class="bf-supported">
                    <span class='center' style='color:#5a96ff;fontSize:24px'><ion-icon name="logo-ionic"></ion-icon></span>
                    <span class='center' style='color:rgb(66, 184, 131);fontSize:24px'><ion-icon name="logo-vue"></ion-icon></span>
                    <span><img style='width:24px;height:24px' src="https://imgkub.com/images/2022/05/12/tmdb.png"></span>
                  </div>
              </div>
          </div>
  </div>
</template>

<script>
import logo from '@/assets/Logo/logo.png'
export default {
    data() {
        return {
            icon:logo,
            email:'',
            err:''
        }
    },
    watch: {
        email(e) {
            if (e.trim()!='' && e!=null) {
                this.err=''
            }
        }
    },
    methods: {
        send() {
            if (this.email.trim()=='' || this.email==null) {
                this.err='Your email is empty.'
                return
            }
            else {
                this.$bvModal.msgBoxOk('Thanks you. Check your email regularly to get news information.', {
                        title: 'Success',
                        size: 'sm',
                        buttonSize: 'sm',
                        okVariant: 'success',
                        headerClass: 'p-2 border-bottom-0',
                        footerClass: 'p-2 border-top-0',
                        centered: true
                })
                this.email=''
            }
        },
        goNP() {
            if (this.$route.params.type=="now_playing") {
                document.documentElement.scrollTop=0
                return
            }
            this.$router.push({name:"movie-view",params:{type:'now_playing',page:1}})
        },
        goPlar() {
            if (this.$route.params.type=="popular") {
                document.documentElement.scrollTop=0
                return
            }
            this.$router.push({name:"movie-view",params:{type:'popular',page:1}})
        },
        goTR() {
            if (this.$route.params.type=="top_rated") {
                document.documentElement.scrollTop=0
                return
            }
            this.$router.push({name:"movie-view",params:{type:'top_rated',page:1}})
        },
        goUp() {
            if (this.$route.params.type=="upcoming") {
                document.documentElement.scrollTop=0
                return
            }
            this.$router.push({name:"movie-view",params:{type:'upcoming',page:1}})
        },
    }
}
</script>

<style>
.footer-bar {
    width: 100vw;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 3px rgba(0,0,0,0.5);
}
.footer-bar .top-footer .tf-content,.footer-bar .bottom-footer .bf-content {
    width: 1280px;
    margin:0 auto;
}
.footer-bar .top-footer .tf-content {
    display: flex;
    justify-content: space-between;
}
.footer-bar .top-footer .tf-content .tf-store,.footer-bar .top-footer .tf-content .tf-information,.footer-bar .top-footer .tf-content .tf-newsletter {
    width: 30%;
    display: flex;
    flex-direction: column;
}
.footer-bar .top-footer .tf-content .tf-information span {
    cursor: pointer;
    transition: .2s linear;
}
.footer-bar .top-footer .tf-content .tf-information span:hover {
    color:orange;
}
.footer-bar .top-footer .tf-content .tf-store>div {
    padding:5px;
}
.footer-bar .top-footer .tf-content .tf-information * {
    padding:5px
}
.footer-bar .top-footer .tf-content .tf-newsletter * {
    padding:5px
}
.footer-bar .top-footer .tf-content .tf-newsletter input {
    border:none;
    border:1px solid gainsboro;
}
.footer-bar .top-footer .tf-content .tf-newsletter input:focus {
    border-color:orange;
}
.footer-bar .top-footer {
    background-color:whitesmoke;
    padding:10px 0;
}
.footer-bar .bottom-footer {
    padding:10px 0;
    background-color:black;
}
.footer-bar .bottom-footer .bf-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
/*  */
@media only screen and (max-width: 1280px) {
    .footer-bar .top-footer .tf-content,.footer-bar .bottom-footer .bf-content {
        width: 1190px;
        margin:0 auto;
    }
}
@media only screen and (max-width: 1190px) {
    .footer-bar .top-footer .tf-content,.footer-bar .bottom-footer .bf-content {
        width: 768px;
        margin:0 auto;
    }
}
@media only screen and (max-width: 768px) {
    .footer-bar .top-footer .tf-content,.footer-bar .bottom-footer .bf-content {
        flex-direction: column;
        align-items: center;
        width: 100%;
    }
    .footer-bar .top-footer .tf-content .tf-information,.footer-bar .top-footer .tf-content .tf-newsletter {
        margin-top: 10px;
    }
    .footer-bar .top-footer .tf-content .tf-store,.footer-bar .top-footer .tf-content .tf-information,.footer-bar .top-footer .tf-content .tf-newsletter {
        width: 100%;
        display: flex;
        align-items: center;
    }
}
</style>
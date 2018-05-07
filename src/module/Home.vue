<template>
  <div class="wrapper">
    <NavBar class="g-navBar"
            :user-name="username"
            @loginOff="username=''"
            @loginIn="loginIn"></NavBar>
    <CoursesSlider class="g-coursesSlider"
                   @storyGo="storyGo"
                   @loaderCancel="loaderCancel"
    ></CoursesSlider>
  </div>
</template>

<script>
  import ajax from "../assets/js/ajax"
  import NavBar from "../components/NavBar.vue"
  import CoursesSlider from "../components/CoursesSlider.vue"
export default {
  components:{
    NavBar,
    CoursesSlider
  },
  data () {
    return {
      uid:'',
      username:''
    }
  },
  created(){
    this.checkUserStatus();
  },
  methods:{
    checkUserStatus(){
      let that = this;
      ajax.get('/isLogin.action')
        .then(res=>{
          if(res.status === 200){
            that.$root.uid = that.uid = res.uid;
            that.username = res.username;
          }
        })
        .catch(()=>{
//          alert('未知错误')
          var res = {
            "status":200,
            "username":"userAdmin",
            "uid":123
          }
          if(res.status === 200){
            that.$root.uid = that.uid = res.uid;
            that.username = res.username;
          }
        });
    },
    loginIn(data){
      let that = this;
      ajax.post('/login.action',data)
        .then(res=>{
          if(res.status === 200){
            that.uid = res.uid;
            that.username = res.username;
          }else{
            let msg = '';
            switch (res.status){
              case 404:
                msg = '用户名或密码错误';
                break;
              case 401:
                msg = '用户被冻结，请联系管理员';
                break;
              default:
                msg = '未知错误';
            }
            alert(msg);
          }
        })
        .catch(()=>{
//          alert('未知错误')
          that.uid = 123;
          that.username = 'test';
        })
    },
    storyGo(sid){
      let that = this;
      ajax.get('/getUserStoryAccess.action',{uid:that.uid,sid})
        .then(res=>{
          if(res.acc === 1){
            this.$emit('changePage',{path:'story',query:{sid}});
          }else{
            alert('无权限')
          }
        })
        .catch(()=>{
//          alert('未知错误')
          this.$emit('changePage',{path:'story',query:{sid:123}});
        });
    },
    loaderCancel(){
      this.$emit('loaderCancel');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-width: 30rem;
}
  .g-navBar{
    flex-shrink: 0;
  }
  .g-coursesSlider{
    flex: 1;
  }
</style>

<template>
  <div class="wrapper" :style="{backgroundColor:backColor}">
    <div class="g-container"
         :style="{backgroundImage:`url(${backMap})`,
                  width: 1920*mapScale+'px',
                  height: 1080*mapScale+'px',
                  boxShadow: `0 0 30px 15px ${backColor} inset`}">
      <a v-for="(le, index) in list"
         :key="index"
         class="u-lesson"
         :href="`/xxx?lesson_id=${le.id}`"
         :style="{left:le.x*mapScale+'px',
                  top:le.y*mapScale+'px',
                  transform:`translate(-50%, -100%) translateY(-8px) scale(${mapScale})`}">
        <div class="u-box">{{le.name}}
          <div class="u-row"></div>
          <div :class="['u-flag',{'pass':currLesson>index+1}]">{{index+1}}</div>
        </div>
      </a>
    </div>
    <div class="u-back">
      <div class="u-btn" @click="back"></div>
    </div>
  </div>
</template>

<script>
  var winH = window.innerHeight || 0;
  var winW = window.innerWidth || 0;
  import ajax from "../assets/js/ajax"
export default {
  components:{
  },
  data () {
    return {
      sid:'',
      list:[],
      currLesson:0,
      backMap:'',
      backColor:'#333',
      mapScale:1
    }
  },
  created(){
    this.sid = this.$route.query.sid || '';
    if(this.sid){
      this.fetchDate(this.sid);
    }else{
      this.$router.replace('/')
    }
    this.resetScale()
  },
  mounted(){
    window.onresize = () => {
      this.resetScale()
    }
  },
  methods:{
    loaderCancel(){
      this.$emit('loaderCancel');
    },
    fetchDate(sid){
      ajax.get('/story.action',{sid})
        .then(res=>{
          this.list = res.list || [];
          this.currLesson = res.curr_lesson;
          this.backMap = res.backMap;
          this.backColor = res.backColor;
          this.loaderCancel();
        })
        .catch(()=>{
          alert('获取课程列表失败，请稍后再试。');
        })
    },
    back(){
      this.$emit('pageGo',-1);
    },
    resetScale(){
      winH = window.innerHeight || 0;
      winW = window.innerWidth || 0;
      if(winH===0) return;
      var winS = winW/winH;
      if(winS >= 1920/1080){
        this.mapScale = winH/1080;
      }else{
        this.mapScale = winW/1920;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
  .g-container{
    position: relative;
    top:50%;
    transform: translateY(-50%);
    width: 38.4rem;
    height: 21.6rem;
    margin: 0 auto;
    background-repeat: no-repeat;
    background-size: contain;
    box-shadow: 0 0 30px 15px #333 inset;
  }
  .u-lesson{
    position: absolute;
    left: -9999px;
    top: -9999px;
    transform: translate(-50%,-100%) translateY(-8px);
    transform-origin: 50% 100%;
    text-decoration: none;
    color: #000;
    .u-box{
      position: relative;
      min-width: 3rem;
      height: 1.6rem;
      box-sizing: border-box;
      border-radius: 18px;
      background: #fff;
      line-height: 1rem;
      font-size: 0.6rem;
      padding: 0.3rem 0.5rem;
      z-index: 9;
      text-align: center;
      white-space: nowrap;
      &:hover{
        box-shadow: 0 0 20px #c89b01;
      }
    }
    .u-row{
      position: absolute;
      z-index: -1;
      height: 0.6rem;
      width: 0.6rem;
      left: 50%;
      bottom: -2px;
      transform: translateX(-50%) rotateZ(45deg);
      background: #fff;
    }
    .u-flag{
      position: absolute;
      left: -0.4rem;
      top: 50%;
      transform: translateY(-50%);
      height: 0.8rem;
      width: 0.8rem;
      border-radius: 0.8rem;
      background-color: #FFC501;
      color: #fff;
      line-height: 0.8rem;
      text-align: center;
      font-size: 0.5rem;
      font-weight: bold;

      &.pass{
        line-height:0;
        font-size:0;
        overflow:hidden;
        background: url(../assets/imgs/button_class_finished_left_default.png) no-repeat;
        background-size: cover;
      }
    }
  }
  .u-back{
    position: fixed;
    bottom: 0;
    right: 0;
    height: 3.34rem;
    width: 3.8rem;
    background-image: url(../assets/imgs/page_side.png);
    background-size: contain;

    .u-btn{
      position: absolute;
      bottom: 0.4rem;
      right: 0.4rem;
      height: 1.2rem;
      width: 1.2rem;
      background-image: url(../assets/imgs/back.png);
      background-size: cover;
      border-radius: 1.2rem;
      cursor: pointer;

      &:hover{
        box-shadow: 0 0 20px #ffcc29;
      }

      &:active{
        box-shadow: 0 0 20px #d29d18;
      }
    }
  }

</style>

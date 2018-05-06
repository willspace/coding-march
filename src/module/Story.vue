<template>
  <div class="wrapper">
    <div class="g-container" style="">
      <a v-for="(le, index) in list"
         :key="index"
         class="u-lesson"
         :href="`/xxx?lesson_id=${le.id}`"
         :style="{left:le.x+'px',top:le.y+'px'}">
        <div class="u-box">{{le.name}}
          <div class="u-row"></div>
          <div :class="['u-flag',{'pass':currLesson>index+1}]">{{index+1}}</div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
  import ajax from "../assets/js/ajax"
export default {
  components:{
  },
  data () {
    return {
      sid:'',
      list:[],
      currLesson:0
    }
  },
  created(){
    this.sid = this.$route.query.sid || '';
    if(this.sid){
      this.fetchDate(this.sid);
    }else{
      this.$router.replace('/')
    }
  },
  mounted(){
    this.loaderCancel();
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
        })
        .catch(()=>{
          alert('获取课程列表失败，请稍后再试。');
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-width: 38.4rem;
  min-height: 21.6rem;
  background-color: #333;
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
    background-image: url(../assets/imgs/background_map.png)
  }
  .u-lesson{
    position: absolute;
    left: -9999px;
    top: -9999px;
    transform: translate(-50%,-100%) translateY(-8px);
    text-decoration: none;
    color: #000;
    .u-box{
      position: relative;
      min-width: 4rem;
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

</style>

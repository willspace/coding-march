<template>
  <div class="wrapper">
    <div class="c-container">
      <div :class="['f-change',changeAnim]">
        <div v-for="(s, index) in list" :key="index" :class="['g-story',{'pre':index===1,'next':index===2}]" :style="{backgroundImage: `url(${s.storyMapPath})`}">
        <div class="u-banner">
          <div class="g-container">
            <img class="u-story-info" :src="s.storyIntroPath">
            <div class="u-story-video">
              <img class="img-story-video" :src="s.storyPicPath">
              <template  v-if="index===0">
              <video ref="video" controls v-show="videoPlay">
                <source :src="s.storyVideoPath" type="video/mp4">
                您的浏览器不支持 HTML5 video 标签。
              </video>
              </template>
              <div class="btn-start" v-if="!videoPlay" @click="videoStart"></div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div class="g-action">
        <span v-if="storyList.length>1">
          <div class="btn left" @click="nextStory(-1)"></div>
          <div class="btn right" @click="nextStory(1)"></div>
        </span>
        <div class="btn goin" v-if="storyList.length>0" @click="goIn"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import ajax from "../assets/js/ajax"
export default {
  props:{},
  data() {
    return {
      videoPlay: false,
      index: 0,
      changeAnim: '',
      storyList: []
    }
  },
  computed:{
    list(){
      let _end = this.storyList.length-1,
          _cur = this.index,
      _before,_next;
      if(_end < 1) return this.storyList;
      if(_cur === 0){
        _before = _end;
        _next = 1
      }else if(_cur === _end){
        _before = _cur - 1;
        _next = 0;
      }else{
        _before = _cur - 1;
        _next = _cur + 1;
      }
      this.currentStoryId = this.storyList[_cur].id;
      return [this.storyList[_cur],this.storyList[_before], this.storyList[_next]];
    }
  },
  created(){
    this.fetchStoryList();
  },
  methods:{
    fetchStoryList(){
      ajax.get('/storyList.action')
        .then(res=>{
          if(typeof res === 'object' && res.length>0){
            this.storyList = res;
            this.$emit('loaderCancel');
          }
        })
    },
    goIn(){
      let sid = this.currentStoryId;
      this.$emit('storyGo',sid);
    },
    nextStory(_plus=1){
      let that = this;
      if(this.anmiLock) return;
      this.anmiLock = true;
      this.videoPause(0);
      this.changeAnim = _plus === -1?'pre':'next';
      setTimeout(()=> {
        let l = that.storyList.length;
        if(l>=2) {
          that.index = (l+that.index+_plus) % l;
        }
        that.anmiLock = false;
        that.changeAnim = '';
      },1000)
    },
    videoStart(){
      let video = this.$refs.video[0];
      video && video.play();
      this.videoPlay = true;
    },
    videoPause(_s){
      this.videoPlay = false;
      if(_s===0){
        let video = this.$refs.video[0];
        video && video.pause();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  ::-webkit-scrollbar {display:none}
  .wrapper{
    position: relative;
    overflow-y: scroll;
  }
  .c-container{
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 700px;
    min-width: 33rem;
    overflow: hidden;
  }
  .f-change{
    width: 100%;
    height: 100%;
    &.pre{
      animation:preKF 1s ease forwards;
    }
    @keyframes preKF {
      100%{transform: translateX(100%)}
    }
    &.next{
      animation:nextKF 1s ease forwards;
    }
    @keyframes nextKF {
      100%{transform: translateX(-100%)}
    }
  }
  .g-story{
    position: absolute;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    &.pre{
      transform: translateX(-100%);
    }
    &.next{
      transform: translateX(100%);
    }
    .u-banner{
      position: relative;
      top:50%;
      transform: translateY(-50%);
      width: 100%;
      height: 8rem;
      background-color: rgba(255,255,255,0.7);

      .g-container{
        height: 100%;
        width: 32rem;
        margin: 0 auto;
      }

      .u-story-info{
        height: 7rem;
        margin-top: 0.5rem;
      }
      .u-story-video{
        position: relative;
        height: 11.7rem;
        width: 20.8rem;
        transform: translateY(-1.9rem);
        border-radius: 20px;
        box-shadow: 0 0 20px rgba(0,0,0,.3);
        float: right;
        overflow: hidden;

        .img-story-video{
          height: 11.7rem;
          width: 20.8rem;
        }
        video{
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }
        .btn-start{
          position: absolute;
          height: 3rem;
          width: 3rem;
          border-radius: 3rem;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
          background: url(../assets/imgs/button_vedio_default.png) no-repeat;
          background-size: contain;
          cursor: pointer;

          &:hover{
            box-shadow: 0 0 20px rgba(0,0,0,.6);
          }
        }
      }
    }
  }
  .g-action{
    position: absolute;
    z-index: 100;
    height: 1.8rem;
    width: 100%;
    top:50%;
    transform: translateY(-50%);
    pointer-events:none;

    .btn{
      position: absolute;
      height: 1.8rem;
      width: 1.8rem;
      background: #ccc;
      border-radius: 100%;
      cursor: pointer;
      pointer-events: auto;
      background-size: cover;
      background-repeat: no-repeat;

      &:hover{
        box-shadow: 0 0 20px #ffcc29;
      }
      &:active{
        box-shadow: 0 0 20px #dabb24;
      }

      &.left{
        left: 50px;
        background-image: url(../assets/imgs/button_left.png);
      }
      &.right{
        right: 50px;
        background-image: url(../assets/imgs/button_right.png);
      }
      &.goin{
        top: 8rem;
        width: 6.5rem;
        height: 1.5rem;
        right: 250px;
        border-radius: 1.5rem;
        background-image: url(../assets/imgs/button_enter_default.png);
      }
    }
  }
</style>

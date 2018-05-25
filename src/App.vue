<template>
  <div class="g-wrapper"
       :class="['f-changePage',changeAnim]">
    <router-view @changePage="changePage"
                 @pageGo="pageGo"
                 @loaderCancel="loaderCancel"/>
    <div :class="['g-loading',changeAnim]" v-if="loading">
      <div class="loader-inner">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      changeAnim:'',
      loading: true
    }
  },
  methods:{
    changePage(conf){
      this.changeAnim = 'up';
      this.loading = true;
      setTimeout(()=>{
        this.$router.push(conf);
        this.changeAnimPre = this.changeAnim;
        this.changeAnim = '';
      },1000);
    },
    pageGo(size){
      switch (this.changeAnimPre){
        case 'up':
          this.changeAnim = 'down';
      }
      this.loading = true;
      setTimeout(()=>{
        this.$router.go(size);
        this.changeAnim = '';
      },this.changeAnim?1000:0);
    },
    loaderCancel(){
      setTimeout(()=>this.loading = false,500);
    }
  }
}
</script>
<style lang="scss">
  *{
    user-select: none;
  }
  body{
    background-color: #f6f6f6;
    height: 100%;
  }
  html{
    font-size: 42px;
    height: 100%;
  }
  .g-wrapper{
    height: 100%;
  }
  .g-loading{
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 999;
    background: #C9EFFF;

    &.up{
      transform: translateY(100%);
    }
    &.down{
      transform: translateY(-100%);
    }
    .loader-inner {
      bottom: 0;
      left: 0;
      margin: auto;
      position: absolute;
      right: 0;
      top: 0;
      height: 5.5rem;
      width: 5.5rem;
      background-image: url(assets/imgs/loading.gif);
      background-size: contain;
    }
  }
  .f-changePage{
    &.up{
      animation:upKF 1s ease forwards;
    }
    @keyframes upKF {
      100%{transform: translateY(-100%)}
    }
    &.down{
      animation:downKF 1s ease forwards;
    }
    @keyframes downKF {
      100%{transform: translateY(100%)}
    }
  }
</style>

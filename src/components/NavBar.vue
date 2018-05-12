<template>
  <div>
    <div class="wrapper">
      <div class="container">
        <span class="logo"></span>
        <div class="u-connect">
          <img src="../assets/imgs/icon_phone.png" class="i-phone">
          <span class="f-has-qr">
            <img src="../assets/imgs/icon_Wechat.png" class="i-wechat">
            <div class="u-qrcode">
              <img src="https://id.163.com/gj/pub/res/images/qrcode.png" alt="">
              <i class="i-row"></i>
            </div>
          </span>
          <span class="f-has-qr">
            <img src="../assets/imgs/icon_QQ.png" class="i-qq">
            <div class="u-qrcode">
              <img src="https://id.163.com/gj/pub/res/images/qrcode.png" alt="">
              <i class="i-row"></i>
            </div>
          </span>
        </div>
      </div>
    </div>
    <div class="g-ub">
      <UserBoard class="u-userboard"
                 v-if="!userName"
                 :user-name="userName"
                 @loginOff="loginOff"
                 @loginIn="loginIn"></UserBoard>
    </div>
  </div>

</template>

<script>
  import UserBoard from './UserBoard.vue'
export default {
  components:{
    UserBoard
  },
  props:{
    userName:{default:''}
  },
  data() {
    return {}
  },
  methods:{
    loginOff(){
      this.$emit('loginOff')
    },
    loginIn(e){
      this.$emit('loginIn',e)
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrapper{
    position: relative;
    z-index: 100;
    height: 1.8rem;
    background-color: #fff;
    box-shadow: 0rem 0rem 0.2rem 0rem rgba(199, 199, 199, 1);
  }
  .container{
    position: relative;
    width: 33rem;
    height: 100%;
    background-color: #fff;
    margin: 0 auto;
  }
  .logo{
    position: absolute;
    top: 0.35rem;
    width: 4rem;
    height: 1.2rem;
    background: url(../assets/imgs/logo.png) no-repeat;
    background-size: cover;
  }
  .u-connect{
    position: absolute;
    top: 0.7rem;
    right: 0;
    width: 7rem;
    height: 1rem;

    &>img, .f-has-qr>img{
      float: right;
      margin-left: 0.6rem;
      height: 0.75rem;

      &.i-wechat, &.i-qq{
        margin-top: 0.15rem;
        height: 0.54rem;
        cursor: pointer;
      }
    }
    .f-has-qr{
      display: inline-block;
      vertical-align: super;
      position: relative;

      .u-qrcode{
        position: absolute;
        display: none;
        top: 1rem;
        left: -1.15rem;
        height: 4rem;
        width: 4rem;
        border-radius: 4px;
        box-shadow: 0px 0px 10px #666;
        .i-row{
          position: absolute;
          z-index: 1;
          height: 0.5rem;
          width: 0.5rem;
          left: 2rem;
          top: -4px;
          transform: translateX(-50%) rotateZ(45deg);
          background: #fff;
          box-shadow: 0px 0px 10px #666;
        }
        img{
          position: absolute;
          z-index: 2;
          width: 100%;
          border-radius: 10px;
        }
      }
      @keyframes qrcodeShowKF{0%{opacity:0;transform:scale(0.5,0.5);}
        50%{opacity:1;transform:scale(1.1,1.1);}
        100%{opacity:1;}
      }
      &:hover{
        .u-qrcode{
          display: block;
          animation:qrcodeShowKF 0.5s ease;
        }
      }
    }
  }
  .g-ub{
    width: 33rem;
    margin: 0 auto;
  }
  /* 用户板 */
  .u-userboard{
    position: absolute;
    top: 1.8rem;
    z-index: 11;
    box-shadow: 0rem 0rem 0.2rem 0rem rgba(199, 199, 199, 1);
  }
</style>

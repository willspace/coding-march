<template>
  <div class="wrapper">
    <div class="u-login-box">
      <template v-if="userName">
        <div class="user-box">
          欢迎你，<strong>{{userName}}</strong>
        </div>
      </template>
      <template v-else>
        <div class="col left">
          <label for="username">用户名</label>
          <input id="username" ref="username" placeholder="单行输入" type="text">
        </div>
        <div class="col right">
          <label for="pwd">密码</label>
          <input id="pwd" ref="pwd" placeholder="单行输入" type="password">
        </div>
      </template>
      <div class="u-btns">
        <template v-if="userName">
          <button class="i-btn" @click="loginOff">退出</button>
        </template>
        <template v-else>
          <button class="i-btn" @click="loginIn">登录</button>
          <button class="i-btn" type="reset">重置</button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    userName:{default:''}
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    loginOff(){
      this.$emit('loginOff')
    },
    loginIn(){
      var data={};
      data.user_name = this.$refs.username.value;
      data.psd = this.$refs.pwd.value;
      this.$emit('loginIn',data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.wrapper {
  width: 8.6rem;
  height: 3.4rem;
  padding: 0.36rem;
  box-sizing: border-box;
  background: #fff;
  border-radius:0 0 25px 25px;
}
  .u-login-box{
    width: 100%;
    height: 100%;
    background: rgb(240,240,240);
    border-radius: 20px;
    .user-box{
      height: 1.6rem;
      font-size: 0.5rem;
      padding: 0.3rem 0.3rem 0.3rem 0.6rem;
      line-height: 1rem;
      box-sizing: border-box;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .col{
      width: 50%;
      font-size: 0.4rem;
      text-align: center;
      label{
        display: inline-block;
        line-height: 1rem;
        font-weight: bold;
      }
      input{
        display: inline-block;
        height: 0.6rem;
        width: 3.2rem;
        border: none;
        border-radius: 4px;
        text-indent: 0.8em;
      }
    }
    .left{
      float: left;
    }
    .right{
      float: right;
    }
    .u-btns{
      height: 1rem;
      clear: both;
      .i-btn{
        float: right;
        height: 0.6rem;
        border: none;
        border-radius: 10px;
        margin: 8px 0.3rem 0 0;
        padding: 0 12px;
        background: #FFC501;
        color: #fff;
        cursor: pointer;

        &:hover{
          background: #ffe116;
          color: #96840d;
        }
        &:active{
          background: #FFC501;
        }
        &:focus{
          outline: none;
        }
      }
    }
  }
</style>

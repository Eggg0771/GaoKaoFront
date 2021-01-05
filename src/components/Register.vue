<template>
  <form class="form" name="Register_form" id="Register_form" method="post">
    <h3 style="text-align: center;margin: 1px">Register</h3>
    ID number:<br/>
    <label style="text-align: center">
      <input class="input" v-on:click="idEdit=true" v-model="ID" placeholder="ID number"/>
    </label>
    <span v-if="!ID&&idEdit" style="color: red"><br/>ID number shouldn't be none!</span>
    <span style="color: red; display: none"><br/>ID number is not legal</span>
    <br/>identifying code:<br/>
    <label style="text-align: center">
      <input class="input" v-on:click="identifyingEdit=1" v-model="identifying" placeholder="identifying code"/>
    </label>
    <span v-if="!identifying&&identifyingEdit" style="color: red"><br/>identifying code shouldn't be none!</span>
    <br/>password:<br/>
    <label style="text-align: center">
      <input type="password" class="input" v-on:click="passwordEdit=true" v-model="password" placeholder="password"/>
    </label>
    <span v-if="!password&&passwordEdit" style="color: red"><br/>password shouldn't be none!</span>
    <br/>confirm password:<br/>
    <label style="text-align: center">
      <input type="password" class="input" v-on:click="confirmPasswordEdit=true" v-model="confirmPassword" placeholder="confirm password"/>
    </label>
    <span v-if="!confirmPassword&&confirmPasswordEdit" style="color: red"><br/>confirm password shouldn't be none!</span>
    <span v-if="password!==confirmPassword&&confirmPasswordEdit&&passwordEdit" style="color: red">
        <br/>two passwords are not the same
    </span>
    <br/>
    <router-link to="/login">Return back to login page</router-link>
    <input v-bind:disabled="!submitAble" v-bind:class="{ableButton:submitAble,disabledButton:!submitAble}" type="submit" v-on:click="reg" value="Register">
    <br/>
  </form>
</template>

<script>
import axios from 'axios'
const instance = axios.create({
  baseURL:'',
  timeout: 5000
});
export default {
  name: "Register",
  data(){
    return{
      ID: "",
      identifying:"",
      password: "",
      confirmPassword: "",
      idEdit: false,
      identifyingEdit:false,
      passwordEdit: false,
      confirmPasswordEdit: false,
    }
  },
  computed:{
    submitAble: function (){
      return this.password===this.confirmPassword&&this.password&&this.confirmPassword&&this.ID;
    }
  },
  methods:{
    submit: function (){
      const ID=this.ID;
      //let obj = this;
      window.console.log(ID)
      instance({
        url:'/login',method:"post",
        data: {
          "ID": this.ID,
          "identifying": this.identifying,
          "password" : this.password
        }
      }).then(function (response) {
        window.console.log(response)
        // if (response.data !== null) {
        //   alert('注册成功');
        //   obj.$router.push({ path: `/login` });
        // }
        // else {
        //   alert('登录失败，用户名或密码错误');
        // }
      })
    }
  }
}
</script>

<style scoped>
.form{
  line-height: 40px;
  width: 400px;
  height: auto;
  background-color: ghostwhite;
  font-size: 15px;
  margin: 40px auto 0;
  padding: 20px;
  border: 2px solid black;
}
.ableButton{
  background-color: #007bff;
  color: #fff;
  font-weight: 400;
  font-size: .86em;
  border-radius: .3rem;
  width: 320px;
  height: 3em;
  margin-bottom: 1.2em;
  //margin-left: 40px;
  margin-right: 1em;
}
.disabledButton{
  background-color: #adcdef;
  color: #fff;
  font-weight: 400;
  font-size: .86em;
  border-radius: .3rem;
  width: 320px;
  height: 3em;
  margin-bottom: 1.2em;
  //margin-left: 40px;
  margin-right: 1em;
}
.input{
  width: 360px;
  height: 3em;
  margin: 0;
}
</style>
<template>
  <div class="form" id="login_form">
    <h3 style="text-align: center;margin: 1px">Please login the system</h3>
    ID number:<br/>
    <label style="text-align: center">
      <input class="input" v-on:click="idEdit=1" v-model="ID" placeholder="ID number"/>
    </label>
    <span v-if="!ID&&idEdit" style="color: red">ID number shouldn't be none!</span>
    <br/>password:<br/>
    <label style="text-align: center">
      <input class="input" type="password" v-on:click="passwordEdit=1" v-model="password" placeholder="password"/>
    </label>
    <span v-if="!password&&passwordEdit" style="color: red">password shouldn't be none!</span>
    <br/>
    <router-link to="/register">Register and set password</router-link>
    <button v-bind:disabled="!submitAble" v-bind:class="{ableButton:submitAble,disabledButton:!submitAble}" v-on:click="submit">login</button>
    <span style="color: red; display: none;margin: 0"><br/>the username or password is wrong</span>
  </div>
</template>

<script>
import axios from 'axios'
const instance = axios.create({
  baseURL:'',
  timeout: 5000
});
export default {
  name: "Login",
  data(){
    return{
      ID:"",
      password:"",
      idEdit:0,
      passwordEdit:0
    }
  },
  computed:{
    submitAble: function (){
      return this.password&&this.ID;
    }
  },
  methods:{
    // submit: function (){
    //   // let identify=0;
    //   // instance({
    //   //   url:'',method:"get"
    //   // }).then(res=>{
    //   //       identify=res.data.identify;
    //   //     })
    //   // if(identify===1)
    //   this.$router.push({ path: `/Student` }); // -> /user/123
    //   // else
    //   //   this.$router.push({ path: `/404` });
    // }

    submit: function (){
      const ID=this.ID;
      let obj = this;
      window.console.log(ID)
      instance({
        url:'/login',method:"get",
        params: {
          idcard: this.ID,
          password:this.password
        }
      })
          // axios.get('student/login?idcard='+this.ID+'&password='+this.password)
          .then(function (response) {
            // window.console.log(response)
            if (response.data !== null) {
              let id = response.data.identify;
              if (id === 0) {
                obj.$router.push({ path: `/student/${ID}`});
              }
              else if (id === 1) {
                obj.$router.push({ path: `/university/${ID}` }); // -> /user/123
              }
              else if(id===2){
                obj.$router.push({ path: `/institute` });
              }
            }
            else {
              alert('登录失败，用户名或密码错误');
            }
          }).catch(error=>window.alert(error))
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
<template>
  <form id="major" style="background-color: white;margin: 20px;padding: 20px;text-align: left">
    <h2>Major Management</h2>
    <div>
      <li v-for="(major,index) in majors" v-bind:key="index" style="margin: 10px">
        {{ major }} <button type="button" v-on:click='majors.splice(index, 1)'>delete</button>
      </li>
      <label style="margin: 10px">
        Set a new major: <input type="text" v-model="newMajor"/>.
        <input type="button" v-on:click="majors.push({name:newMajor})" value="add"/>
      </label><br/>
    </div>
  </form>
</template>

<script>
  import axios from 'axios';
export default {
  name: "universityMajor",
  data(){
    return{
      newMajor:"",
      majors:[]
    }
  },
  beforeMount() {
    axios.get('/university/getMajors',{
      params:{
        idcode:this.$route.params.id
      }
    }).then(res=>this.majors=res.data.major)
            .catch(error=>window.alert(error))
  }
}
</script>

<style scoped>

</style>
<template>
  <form style="background-color: white;margin: 20px;padding: 20px;text-align: left">
    <h2>Grade Upload</h2>
    <input class="style_file_content" accept=".csv" type="file" id="grade"/>
    <input type="submit" value="Submit" v-on:click="submit"/>
  </form>
</template>

<script>
export default {
  name: "examGrade",
  data(){
    return{

    }
  },
  methods:{
    submit:function (){

    }
  }
}
</script>

<style scoped>

</style>
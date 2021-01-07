<template>
  <form id="examineeManagement" style="background-color: white;margin: 20px;padding: 20px;text-align: left">
    <h2>Examinee Management</h2>
    <div style="margin: 10px;padding: 10px;border: outset 5px">
      <h4>Upload Examinees List (.csv file)</h4>
      <input class="style_file_content" accept=".csv" type="file" id="examineeList"/>
      <input type="submit" value="Submit" v-on:click="submit"/>
      <br/><br/><h4>Single Examinee Management </h4>
      Examinee ID:<label><input type="text" v-model="examineeID"/></label>.
      <input type="button" v-on:click="addExaminee" value="add"/>
      <input type="button" v-on:click="delExaminee" value="delete"/>
    </div>
  </form>

</template>

<script>
export default {
  name: "examManage",
  data(){
    return{
      examineeID:""
    }
  },
  methods:{
    addExaminee:function () {
      if(confirm("Sure to add this examinee?")===true){
        alert("Add successfully");
      }
    },
    delExaminee:function () {
      if(confirm("Sure to delete this examinee?")===true){
        alert("Delete successfully");
      }
    }
  }
}
</script>

<style scoped>

</style>
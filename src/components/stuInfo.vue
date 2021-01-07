<template>
  <form style="background-color:white;margin: 20px;padding: 20px;text-align: left">
    <h2>Personal Information</h2>
    <div style="margin: 10px;padding: 10px">
      Name:{{name}}<br/>
      ID:{{id}}
    </div>
    <div v-if="isGrade" style="margin: 10px;padding: 10px;border: double green">
      <h3>Score</h3>
      <table class="table">
        <tr>
          <th>Chinese</th>
          <th>Math</th>
          <th>English</th>
          <th>Integration</th>
          <th>Total</th>
        </tr>
        <tbody>
        <tr>
          <td>{{scores.chinese}}</td>
          <td>{{scores.math}}</td>
          <td>{{scores.english}}</td>
          <td>{{scores.integration}}</td>
          <td>{{scores.chinese+scores.math+scores.english+scores.integration}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-if="isSubmit" style="margin: 10px;padding: 10px">
      <h3>Aspirations</h3>
      <span>
            University:{{aspirations.university}}<br/>
            Major:{{aspirations.major}}
        </span>
    </div>
  </form>
</template>

<script>
import axios from 'axios'
const instance = axios.create({
  baseURL:'',
  timeout: 5000
});
export default {
  name: "stuInfo",
  data() {
    return {
      name: "",
      id: "",
      isGrade: true,
      scores: {
        chinese: -1,
        math: -1,
        english: -1,
        integration: -1
      },
      isSubmit:true,
      aspirations: {}
    }
  },

  beforeMount() {
    this.id=this.$route.params.id
    let obj = this;
    //alert("Yeah")
    instance.get('/student',{
      params:{
        idcard:this.id
      }
    }).then(function (res){
      window.console.log(res);
      obj.name=res.data.name;
      obj.id=res.data.idcard;
      // this.isGrade=res.data.isGrade;
      obj.scores= {
        chinese:res.data.chinese,
        math:res.data.math,
        english:res.data.english,
        integration:res.data.integration
      };
      obj.isSubmit=res.data.state;
      if(res.data.university!==null) {
        obj.aspirations = {
          university: res.data.university.name == null ? null : res.data.university.name,
          major: res.data.majorName == null ? null : res.data.majorName
        }
      }else
        obj.aspirations = {
          university: null,
          major: null
        }
    })
        .catch(error=>window.console.log(error))
  }

}
</script>

<style scoped>
table.table {
  font-family: verdana,arial,sans-serif;
  font-size:11px;
  color:#333333;
  border-width: 1px;
  border-color: #a9c6c9;
  border-collapse: collapse;
//margin: 0 auto;
}
table.table th {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #a9c6c9;
}
table.table td {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #a9c6c9;
}
.table tr:nth-child(odd){
  background-color:#d4e3e5;
}
.table tr:nth-child(even){
  background-color:#c3dde0;
}
.button{
  background-color: darkorange;
  color: #fff;
  font-weight: 400;
  font-size: .86em;
  border-radius: .3rem;
  width: 100px;
  height: 30px;
  margin: 10px;
}
</style>
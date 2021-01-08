<template>
  <form id="view" style="background-color: white;margin: 20px;padding: 20px;text-align: left">
    <h2>University List</h2>
    <table class="table1">
      <tr>
        <th style="width: 100px">ID code</th>
        <th style="width: 400px">Name</th>
      </tr>
      <tbody>
      <tr v-for="(university,index) in universities" v-bind:key="index" v-on:click="chosenUniversity=university">
        <td style="width: 100px">{{university.id}}</td>
        <td style="width: 400px">{{university.name}}</td>
      </tr>
      </tbody>
    </table>
    <div v-if="chosenUniversity&&universities">
    <h2>Matriculation of {{ chosenUniversity.name }}</h2>
    <table class="table2">
      <tr>
        <th style="width: 50px">Name</th>
        <th style="width: 110px">ID code</th>
        <th style="width: 100px">Chinese Score</th>
        <th style="width: 80px">Math Score</th>
        <th style="width: 100px">English Score</th>
        <th style="width: 120px">Integration Score</th>
        <th style="width: 80px">Total Score</th>
        <th style="width: 100px">Major</th>
        <th style="width: 30px">State</th>
      </tr>
      <tbody>
      <tr v-for="(student,index) in students" v-bind:key="index">
        <td>{{student.name}}</td>
        <td>{{student.id}}</td>
        <td>{{student.scores.chinese}}</td>
        <td>{{student.scores.math}}</td>
        <td>{{student.scores.english}}</td>
        <td>{{student.scores.integration}}</td>
        <td>{{student.scores.chinese+student.scores.math+student.scores.english+student.scores.integration}}</td>
        <td>{{student.major}}</td>
        <td v-bind:class="{gray0:student.state==='TBD',red0:student.state==='Rejected',green0:student.state==='Accepted'}">{{student.state}}</td>
      </tr>
      </tbody>
    </table></div>
    <button v-on:click="mat">Matriculate</button>
  </form>

</template>

<script>
import axios from "axios";

export default {
name: "examUniversity",
  data(){
  return{
    universities:[],
    chosenUniversity:undefined,
    students:[
      {name:"Li Hua", major:"computer science", state:"Accepted", id:"000000000000000000",
        scores: {
          chinese:150,
          math:150,
          english:150,
          integration:300
        }},
      {name:"Li Lei", major:"physics", state:"Rejected", id:"111111111111111111",
        scores: {
          chinese:0,
          math:0,
          english:0,
          integration:0
        }}
    ]
  }
  },
beforeMount() {
  this.id=this.$route.params.id
  let obj = this;
  //alert("Yeah")
  axios.get('/university/get')
      .then(function (res){
        obj.universities=[];
        for(let i=0;i<res.data.length;i++){
          obj.universities.push({id:res.data[i].idcode,name:res.data[i].name})
        }
      })
      .catch(error=>window.alert(error))
},
  methods:{
    mat:function () {
      axios.get('/admitted').then(res=>window.console.log(res)).catch(error=>alert(error))
    }
  },
  watch:{
    chosenUniversity:function (val){
      let obj=this;
      axios.get('/university/getStudents',{
        params:{idcode:val.id}
      }).then(function (res) {
        window.console.log(res);
        obj.students=[];
        for(let i=0;i<res.data.length;i++){
          let state;
          if(res.data[i].universityandmajor===0)
            state='TBD';
          else
            state='Accepted';
          obj.students.push({
            name:res.data[i].name,
            major:res.data[i].majorName,
            state:state,
            id:res.data[i].idcard,
            scores:{
              chinese:res.data[i].chinese,
              math:res.data[i].math,
              english:res.data[i].english,
              integration:res.data[i].integration
            }
          })
        }
      }).catch(error=>alert(error))
    }
  }
}
</script>

<style scoped>
table.table1 {
  font-family: verdana,arial,sans-serif;
  font-size:11px;
  color:#333333;
  border-width: 1px;
  border-color: #a9c6c9;
  border-collapse: collapse;
//margin: 0 auto;
}
table.table1 th {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #a9c6c9;
}
table.table1 td {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #a9c6c9;
}
.table1 tr:nth-child(odd){
  background-color:#d4e3e5;
}
.table1 tr:nth-child(even){
  background-color:#c3dde0;
}
table.table2 {
  font-family: verdana,arial,sans-serif;
  font-size:11px;
  color:#333333;
  border-width: 1px;
  border-color: darkorange;
  border-collapse: collapse;
//margin: 0 auto;
}
table.table2 th {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: darkorange;
  background-color: orange;
}
table.table2 td {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: darkorange;
}
.table2 tr:nth-child(odd){
  background-color: #fab89f;
}
.table2 tr:nth-child(even){
  background-color: #fadcd0;
}
.gray0{
  color: gray;
}
.red0{
  color: red;
}
.green0{
  color: green;
}
</style>
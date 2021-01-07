<template>
  <form id="matriculation" style="background-color: white;margin: 20px;padding: 20px;text-align: left">
    <h2>Student List</h2>
    <table class="table">
      <tr>
        <th style="width: 70px">Name</th>
        <th style="width: 100px">ID code</th>
        <th style="width: 70px">Chinese Score</th>
        <th style="width: 70px">Math Score</th>
        <th style="width: 70px">English Score</th>
        <th style="width: 70px">Integration Score</th>
        <th style="width: 70px">Total Score</th>
        <th style="width: 150px">Major</th>
        <th style="width: 30px">State</th>
<!--        <th style="width: 100px">Option</th>-->
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
<!--        <td>-->
<!--          <input class="button2" type="button" value="Matriculate" v-on:click="student.state='Accepted'"/>-->
<!--          <input class="button2" type="button" value="Reject" v-on:click="student.state='Rejected'"/>-->
<!--        </td>-->
      </tr>
      </tbody>
    </table>
<!--    <input class="button2" type="submit" value="Submit" v-on:click="submit">-->
  </form>

</template>

<script>
export default {
name: "universityStu",
  data(){
    return{
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
  methods:{
    submit:function () {
      if(confirm("Sure to submit matriculation list?")===true){
        for(let i=0;i< this.students.length;i++){
          if(this.students[i].state==='TBD'){
            alert("Undisposed student exist!")
          }
        }
      }
    }
  }
}
</script>

<style scoped>
table.table {
  font-family: verdana,arial,sans-serif;
  font-size:11px;
  color:#333333;
  border-width: 1px;
  border-color: darkorange;
  border-collapse: collapse;
//margin: 0 auto;
}
table.table th {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: darkorange;
  background-color: orange;
}
table.table td {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: darkorange;
}
.table tr:nth-child(odd){
  background-color: #fab89f;
}
.table tr:nth-child(even){
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
.button2{
  background-color: lightsalmon;
  color: black;
  font-weight: 400;
  font-size: .86em;
  border-radius: .3rem;
  width: 100px;
  height: 30px;
  margin: 5px;
}
</style>
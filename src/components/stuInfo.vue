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
      <span v-for="(aspiration,index) in aspirations" v-bind:key="index">
            <h4>Aspiration {{aspiration.id}}</h4>
            University:{{aspiration.university}}<br/>
            Major:{{aspiration.major}}
        </span>
    </div>
  </form>
</template>

<script>
export default {
  name: "stuInfo",
  data() {
    return {
      name: "Li Hua",
      id: "000000000000000000",
      isGrade: true,
      scores: {
        chinese: 150,
        math: 150,
        english: 150,
        integration: 300

      },
      isSubmit:true,
      aspirations:[
        {id:1,university:"Tsinghua University",major:"physics"},
        {id:2,university:"Peking University",major:"literature"},
        {id:3,university:"Southern University of Science and Technology",major: "computer science and technology"},
        {id:4,university:undefined,major: undefined},
        {id:5,aspiration5:undefined,major: undefined}
      ]
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
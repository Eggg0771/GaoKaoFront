<template>
  <form style="background-color: white;margin: 20px;padding: 20px;text-align: left">

    <table>
      <h2>University List</h2>
      <tr><td style="width: 60%">
        <table class="table">
          <tr>
            <th style="width: 100px">ID code</th>
            <th style="width: 400px">Name</th>
            <th style="width: 100px">Province</th>
            <th style="width: 100px">City</th>
          </tr>
          <tbody>
          <tr v-for="(university,index) in universities" v-on:click="chosenUniversity=university" v-bind:key="index">
            <td>{{university.id}}</td>
            <td>{{university.name}}</td>
            <td>{{university.province}}</td>
            <td>{{university.city}}</td>
          </tr>
          </tbody>
        </table>
      </td><td v-if="chosenUniversity">
        <div style="margin: 10px;padding: 10px;background-color: gold">
          <h4>Majors of {{chosenUniversity.name}}</h4>
          <li v-for="(major,index) in chosenUniversity.majors" v-bind:key="index">
            {{ major.name }}
          </li></div>
      </td></tr></table>
    <div v-if="isRelease===1" style="background-color: gold;margin: 10px;padding: 10px">
      <h2>Aspiration Selection</h2>
      <table class="table1">
      <tr v-for="index in [1,2,3,4,5]" v-bind:key="index">
        <td>
        <h4>Aspiration {{ index }}</h4>
        Please choose a university and a major:
        <label>
          <select v-model="aspirations[index-1]" style="width: 200px">
            <option :value=undefined>Please choose your aspiration</option>
            <option v-for="(university,index) in universities" v-bind:key="index" :value="university">{{university.id}}</option>
          </select>
        </label>
        <label>
          <select v-if="aspirations[index-1]" v-model="majors[index-1]" style="width: 200px">
            <option :selected="true" :value=undefined>Please choose your major</option>
            <option v-for="(major,index) in aspirations[index-1].majors" v-bind:key="index" :value="major.name">{{major.name}}</option>
          </select>
        </label><br/>
        <span v-if="aspirations[index-1]">Your first aspiration is {{aspirations[index-1].name}} {{majors[index-1]}}</span>
        </td></tr></table>
      <input class="button" type="submit" value="Save" v-on:click="save">
      <input class="button" type="submit" value="Submit" v-on:click="submit">
    </div>
  </form>

</template>

<script>
export default {
name: "Aspiration",
  data(){
  return{
    isRelease:1,
    aspirations:[{id:10001,name:"Peking University",province:null,city:"Beijing",
      majors:[
        {name: "physics"},
        {name: "mathematics"},
        {name: "chemistry"},
        {name: "biology"},
        {name: "computer science"}
      ]}],
    majors:["computer science"],
    universities:[
      {id:10001,name:"Peking University",province:null,city:"Beijing",
        majors:[
          {name: "physics"},
          {name: "mathematics"},
          {name: "chemistry"},
          {name: "biology"},
          {name: "computer science"}
        ]},
      {id:10002,name:"Renmin University of China",province:null,city:"Beijing",
        majors:[
          {name: "physics"},
          {name: "mathematics"},
          {name: "chemistry"},
          {name: "biology"},
          {name: "computer science"}
        ]},
      {id:10003,name:"Tsinghua University",province:null,city:"Beijing",
        majors:[
          {name: "physics"},
          {name: "mathematics"},
          {name: "chemistry"},
          {name: "biology"},
          {name: "computer science"}
        ]},
      {id:14325,name:"Southern University of Science and Technology",province:"Guangdong",city:"Shenzhen",
        majors:[
          {name: "physics"},
          {name: "mathematics"},
          {name: "chemistry"},
          {name: "biology"},
          {name: "computer science"}
        ]}
    ],
    chosenUniversity:undefined
  }
  },
  methods:{
    save:function () {
      alert("Save successfully!")
    },
    submit:function () {
      if(confirm("Sure to submit your aspirations?\nWhich will seal and couldn't be changed anymore.")===true){
        this.isRelease=2;
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

table.table1 td {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: orange;
}
.table1 tr:nth-child(odd){
   background-color: #f8f09a;
 }
.table1 tr:nth-child(even){
  background-color: #f6eb73;
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
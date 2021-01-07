<template>
  <form style="background-color: white;margin: 20px;padding: 20px;text-align: left">

    <table>
      <h2>University List</h2>
      <tr><td style="width: 60%">
        <table class="table">
          <tr>
            <th style="width: 100px">ID code</th>
            <th style="width: 400px">Name</th>
          </tr>
          <tbody>
          <tr v-for="(university,index) in universities" v-on:click="chosenUniversity=university" v-bind:key="index">
            <td>{{university.id}}</td>
            <td>{{university.name}}</td>
          </tr>
          </tbody>
        </table>
      </td><td v-if="chosenUniversity">
        <div style="margin: 10px;padding: 10px;background-color: gold">
          <h4>Majors of {{chosenUniversity.name}}</h4>
          <li v-for="(major,index) in chosenMajor" v-bind:key="index">
            {{ major }}
          </li></div>
      </td></tr></table>
    <div v-if="isRelease===0" style="background-color: gold;margin: 10px;padding: 10px">
      <h2>Aspiration Selection</h2>
      <table class="table1">
      <tr>
        <td>
        <h4>Aspiration {{ index }}</h4>
        Please choose a university and a major:
        <label>
          <select v-model="aspirations" style="width: 200px">
            <option :selected="true" :value=undefined>Please choose your aspiration</option>
            <option v-for="(university,index) in universities" v-bind:key="index" :value="university">{{university.id}}</option>
          </select>
        </label>
        <label>
          <select v-if="aspirations" v-model="majors" style="width: 200px">
            <option :selected="true" :value=undefined>Please choose your major</option>
            <option v-for="(major,index) in selectedMajor" v-bind:key="index" :value="major">{{major}}</option>
          </select>
        </label><br/>
        <span v-if="aspirations">Your first aspiration is {{aspirations.name}} {{majors}}</span>
        </td></tr></table>
      <input class="button" type="submit" value="Save" v-on:click="save">
      <input class="button" type="submit" value="Submit" v-on:click="submit">
    </div>
  </form>

</template>

<script>
import axios from "axios";
export default {
name: "Aspiration",
  data(){
  return{
    id:"",
    isRelease:0,
    aspirations:undefined,
    selectedMajor:[],
    majors:undefined,
    universities:[
      {id:10001,name:"Peking University"},
      {id:10002,name:"Renmin University of China"},
      {id:10003,name:"Tsinghua University"},
      {id:14325,name:"Southern University of Science and Technology"}
    ],
    chosenUniversity:undefined,
    chosenMajor:[]
  }
  },
  methods:{
    save:function () {
      if(this.aspirations===undefined||this.majors===undefined)
        alert("You haven't chosen your aspiration yet.")
      else {
        axios.get('/student/save', {
          params: {
            idcard: this.id,
            idcode: this.aspirations.id,
            name:this.majors
          }
        }).then(function (res) {
          if (res.data === true)
            alert("Save successfully!")
        })
            .catch(error => alert(error))
      }
    },
    submit:function () {
      if(confirm("Sure to submit your aspirations?\nWhich will seal and couldn't be changed anymore.")===true){
        axios.get('/student/submit',{
          params:{
            idcard: this.id,
            idcode: this.aspirations.id,
            name:this.majors
          }
        }).then(res=>res)
            .catch(error=>alert(error))
      }
    }
  },
  beforeMount() {
    this.id=this.$route.params.id
    let obj = this;
    //alert("Yeah")
    axios.get('/university/get')
        .then(function (res){
        window.console.log(res);
        obj.universities=[];
        for(let i=0;i<res.data.length;i++){
          obj.universities.push({id:res.data[i].idcode,name:res.data[i].name})
        }
    })
        .catch(error=>window.alert(error))
    axios.get('/student',{
      params:{idcard:this.id}
    }).then(function (res) {
      window.console.log(res);
      obj.isRelease=res.data.state;
        obj.aspirations={
          id:res.data.university.idcode==null?null:res.data.university.idcode,
          name:res.data.university.name==null?null:res.data.university.name
        }
        obj.majors=res.data.majorName==null?null:res.data.majorName
    })
  },
  watch:{
    aspirations:function (val) {
      axios.get('/university/getMajors',{
        params:{
          idcode:val.id
        }
      }).then(res=>this.selectedMajor=res.data.major)
      .catch(error=>alert(error))
    },
    chosenUniversity:function (val) {
      axios.get('/university/getMajors',{
        params:{
          idcode:val.id
        }
      }).then(res=>this.chosenMajor=res.data.major)
          .catch(error=>alert(error))
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
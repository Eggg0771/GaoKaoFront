import Vue from 'vue';
import Router from 'vue-router';
import Login from "@/components/Login";
import Register from "@/components/Register";
import Student from "@/components/Student";
import stuInfo from "@/components/stuInfo";
import stuAspiration from "@/components/stuAspiration";
import universityMajor from "@/components/universityMajor";
import universityStu from "@/components/universityStu";
import University from "@/components/University";
import ExamInstitute from "@/components/ExamInstitute";
import examUniversity from "@/components/examUniversity";
import examManage from "@/components/examManage";
import examGrade from "@/components/examGrade";


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path:'/login',
      name:'Login',
      component: Login,
      alias: '/'
    },
    {
      path:'/register',
      name:'Register',
      component: Register
    },
    {
      path: '/student',
      component: Student,
      children: [
        {
          path: '/student',
          redirect: '/student/info',
        },
        {
          path: '/student/info',
          component: stuInfo,
        },
        {
          path: '/student/aspirate',
          component: stuAspiration,
        }
      ]
    },
    {
      path: '/university/:id',
      component: University,
      children: [
        {
          path: '/university/:id',
          redirect: '/university/:id/major',
        },
        {
          path: '/university/:id/major',
          component: universityMajor,
        },
        {
          path: '/university/:id/student',
          component: universityStu,
        }
      ]
    },
    {
      path: '/institute',
      component: ExamInstitute,
      children: [
        {
          path: '/institute',
          redirect: '/institute/university',
        },
        {
          path: '/institute/university',
          component: examUniversity,
        },
        {
          path: '/institute/examinee',
          component: examManage,
        },
        {
          path: '/institute/grading',
          component: examGrade,
        }
      ]
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
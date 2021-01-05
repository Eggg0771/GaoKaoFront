<template>
  <div class="flexible-content">
    <!--Navbar-->
    <mdb-navbar class="flexible-navbar white" light position="top" scrolling>
      <mdb-navbar-brand
      >NECC System</mdb-navbar-brand
      >
      <mdb-navbar-toggler>
        <mdb-navbar-nav right>
          <router-link :to="'/login'">
            <mdb-list-group-item
            >Exit</mdb-list-group-item
            >
          </router-link>
        </mdb-navbar-nav>
      </mdb-navbar-toggler>
    </mdb-navbar>

    <!--/.Navbar-->
    <!-- Sidebar -->
    <div class="sidebar-fixed position-fixed">
      <br/><h2>Hi, {{ID}}</h2>
      <mdb-list-group class="list-group-flush">
        <router-link :to="'/student'+'/info'" @click.native="activeItem = 1">
          <mdb-list-group-item
              :action="true"
              :class="activeItem === 1 && 'active'"
          ><mdb-icon icon="user" class="mr-3" />Information
          </mdb-list-group-item>
        </router-link>
        <router-link :to="'/student'+'/aspirate'" @click.native="activeItem = 2">
          <mdb-list-group-item
              :action="true"
              :class="activeItem === 2 && 'active'"
          ><mdb-icon icon="map" class="mr-3" />Aspiration</mdb-list-group-item
          >
        </router-link>
      </mdb-list-group>
    </div>
    <!-- /Sidebar  -->
    <main>
      <div class="mt-5 p-5">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
import {
  mdbNavbar,
  mdbNavbarBrand,
  mdbNavbarNav,
  mdbNavbarToggler,
  mdbIcon,
  mdbListGroup,
  mdbListGroupItem,
  waves
} from "mdbvue";

export default {
  name: "Student",
  components: {
    mdbNavbar,
    mdbNavbarBrand,
    mdbNavbarNav,
    mdbNavbarToggler,
    mdbListGroup,
    mdbListGroupItem,
    mdbIcon
  },
  data() {
    return {
      activeItem: 1,
    };
  },
  computed: {
    ID(){
      return this.$route.params.id;
    }
  },
  beforeMount() {

  },
  mixins: [waves]
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap");
.navbar-light .navbar-brand {
  margin-left: 15px;
  color: #2196f3 !important;
  font-weight: bolder;
}
</style>

<style scoped>
main {
  background-color: #ededee;
}

.flexible-content {
  transition: padding-left 0.3s;
  padding-left: 270px;
}

.flexible-navbar {
  transition: padding-left 0.5s;
  padding-left: 270px;
}

.sidebar-fixed {
  left: 0;
  top: 0;
  height: 100vh;
  width: 270px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  z-index: 1050;
  background-color: #fff;
  padding: 1.5rem;
  padding-top: 0;
}

.sidebar-fixed .logo-wrapper img {
  width: 100%;
  padding: 2.5rem;
}

.sidebar-fixed .list-group-item {
  display: block !important;
  transition: background-color 0.3s;
}

.sidebar-fixed .list-group .active {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  border-radius: 5px;
}

@media (max-width: 1199.98px) {
  .sidebar-fixed {
    display: none;
  }
  .flexible-content {
    padding-left: 0;
  }
  .flexible-navbar {
    padding-left: 10px;
  }
}
</style>

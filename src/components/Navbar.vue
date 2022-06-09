<template>
  <div class="navbar">
    <nav class="nav-extended light-blue darken-1">
      <div class="nav-content">
        <router-link :to="{ name: 'Index' }">
          <span class="nav-title" style="font-family: cursive"
            >Buat Catatan</span
          >
        </router-link>
        <a
          href=""
          class="btn-floating btn-large halfway-fab blue-grey darken-2"
        >
          <router-link :to="{ name: 'AddData' }">
            <i class="material-icons">add</i>
          </router-link>
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {};
  },
};
</script>
<style>
.navbar {
  margin-top: -60px;
}
</style>
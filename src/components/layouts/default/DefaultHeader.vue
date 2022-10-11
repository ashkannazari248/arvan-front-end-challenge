<script setup lang="ts">

</script>

<template>
  <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
    <a class="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#">Company name</a>
    <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-toggle="collapse"
            data-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <RouterLink class="navbar-nav px-3 py-1 text-decoration-none" id="logout" to="/logout">Logout</RouterLink>

  </nav>
</template>


<style scoped lang="scss">
.navbar-brand{
  font-size: 22px;
}



#logout {
  color: var(--dark-sky-blue);
  border: 1px solid var(--dark-sky-blue);
  border-radius: 6px;
  margin: 0 15px;
}
</style>


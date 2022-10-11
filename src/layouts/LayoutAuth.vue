<script setup lang="ts">

</script>

<template>
  <div class="container d-flex">
    <div class="col-12 justify-content-center align-self-center">
      <div id="layout_auth" class="align-middle col-lg-4 col-md-6 col-sm-8 col-12 mx-auto my-auto border border-secondary rounded p-3">
        <slot/>
      </div>
    </div>
  </div>
</template>


<style scoped>
.container {
  min-height: 100vh !important;
}

#layout_auth {
  background-color: var(--silver) !important;
}

</style>




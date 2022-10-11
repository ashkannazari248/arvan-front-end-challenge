<script setup lang="ts">

</script>

<template>
  <table class="table AppTable">
    <thead>
    <slot name="thead"/>
    </thead>
    <tbody>
    <slot name="tbody"/>
    </tbody>
  </table>
</template>


<style scoped lang="scss">
.AppTable {
  thead {
    background-color: var(--silver);
  }
  tr {
    line-height: min(40px);
  }
}

</style>


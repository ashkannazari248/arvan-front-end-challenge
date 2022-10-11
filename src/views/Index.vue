<script setup lang="ts">
import {useRouter} from "vue-router";

const router=useRouter()
</script>

<template>
  <main>
    <ul class="list-unstyled p-0 d-flex flex-row flex-wrap"><li class="p-0 m-0" v-for="route in router.options.routes"><RouterLink class="btn btn-primary m-3"  :to="route.path">{{route.name}}</RouterLink></li></ul>
  </main>
</template>

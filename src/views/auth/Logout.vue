<script setup lang="ts">
import {useStorageStore} from '@/composables/storage/Storage.store'
import {onMounted} from "vue";
onMounted(()=> {
  const Storage = useStorageStore()
  Storage.removeCookie('cookieToken')
  Storage.removeCookie('cookieToken')
})

</script>

<template>
</template>


<style scoped>

</style>


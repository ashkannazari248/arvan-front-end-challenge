<script setup lang="ts">

import DefaultHeader from "@/components/layouts/default/DefaultHeader.vue";
import DefaultSidebar from "@/components/layouts/default/DefaultSidebar.vue";
import {computed} from "vue";
import {useAuthStore} from "@/composables/auth/Auth.store";
const AuthStore = useAuthStore()
const user = computed(()=> AuthStore.getUser)

</script>
<template>
  <DefaultHeader/>
  <div class="container-fluid">
    <div class="row">
      <DefaultSidebar/>
      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
        <div v-if="$attrs.header"
             class="pt-3 pb-2 mb-3">
          <h1 class="page-header" v-html="$attrs.header"/> <h3 v-if="user && user.username">welcome {{user.username}}</h3>
        </div>
        <slot/>
      </main>
    </div>
  </div>
</template>


<style scoped lang="scss">
.page-header {
  font-size: 40px;
}
</style>
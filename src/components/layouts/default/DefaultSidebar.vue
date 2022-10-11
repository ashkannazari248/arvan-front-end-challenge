<script setup lang="ts">
import {useRoute} from "vue-router";

const route=useRoute()
</script>

<template>
  <nav id="sidebarMenu" class="col-md-3 col-lg-2 p-0 d-md-block sidebar collapse">
    <div class="sidebar-sticky pt-3">


      <h6 class="sidebar-heading align-items-center ps-1 mt-4 mb-2 ">
        <span>Articles</span>
      </h6>
      <ul class="nav flex-column mb-2">
        <li class="nav-item">
          <RouterLink
              :class="['nav-link',{'router-link-active router-link-exact-active':route.name==='articles-page' || route.name==='articles'}]"
              :to="{name:'articles'}" v-text="`Posts`"/>
        </li>
        <li class="nav-item">
          <RouterLink exact class="nav-link" :to="{name:'article-create'}" v-text="`Create Post`"/>
        </li>

      </ul>
    </div>
  </nav>
</template>


<style scoped lang="scss">
.navbar-brand, .sidebar-heading {
  font-size: 22px;
}

.nav-link {
  font-size: 18px;
}

#sidebarMenu {
  background-color: var(--blue);
  min-height: calc(100vh - 42px);

  * {
    color: #ffffff
  }

  a.router-link-active {
    background-color: rgba(255, 255, 255, 0.15)
  }
}

</style>


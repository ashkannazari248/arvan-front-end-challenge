<script setup lang="ts">
import {useRoute} from "vue-router";
import {usePagination} from "@/composable/usePagination";
const pagination=usePagination()

const route = useRoute();
interface Props{
  pageNumber?:number,
  pageCount:number,
  routeName:string,
}
const props = withDefaults(defineProps<Props>(),{
  pageNumber:1
})

const goTo = (page: Number) => {
  if(page===1){
    delete route.params.pageNumber
    return {...route,name:props.routeName}
  }
  return {name:props.routeName+'-page', params: {...route.params, pageNumber: page}}
}



</script>

<template>
  <nav v-if="props.pageCount>0" aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li v-if="pagination.page.value > 1" class="page-item">
        <RouterLink class="page-link" :to="goTo(props.pageNumber-1)" aria-label="Previous">
          <span aria-hidden="true" v-text="`<`"/>
        </RouterLink>
      </li>
      <li v-for="n in props.pageCount" :key="'page'+n"
          class="page-item">
        <span v-if="(n-props.pageNumber===4||props.pageNumber-n===4 ) && n!==1 && n!==props.pageCount" class="page-link">...</span>
        <RouterLink v-else class="page-link" :class="{active:props.pageNumber===n}" :active="props.pageNumber===n" :to="goTo(n)" exact>
          {{ n }}
        </RouterLink>
      </li>
      <li v-if="pagination.page.value  < props.pageCount"  class="page-item">
        <RouterLink class="page-link" :to="goTo(props.pageNumber+1)"
                    aria-label="Next">
          <span aria-hidden="true" v-text="`>`"/>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>


<style lang="scss" scoped>
a {
  color: var(--charcoal-grey);
  font-size: 16px;
}

.page-item {
  width: 40px !important;
  height: 40px !important;
  border-color: #dddddd;
}


</style>


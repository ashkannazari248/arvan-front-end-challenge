<script setup lang="ts">
import AppTable from "@/components/AppTable.vue";
import LayoutDefault from "@/layouts/LayoutDefault.vue";
import AppPagination from "@/components/AppPagination.vue";
import {ref} from "vue";
import {usePagination} from "@/composables/usePagination";
import {useToast} from "@/composables/toast/useToast";
import {ToastEnum} from "@/composables/toast/Toast.interface";
import AppModal from "@/components/AppModal.vue";

const {showToast} = useToast();
const deleteArticle = () => {
  showToast({message: 'Article deleted successfully', type: ToastEnum.success})
  showDeleteModal.value=false
}
const pagination = usePagination()
const pageCount = ref(5)
const showDeleteModal = ref(false)
</script>

<template>
  <LayoutDefault header="All Posts">
    <AppTable>
      <template #thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Author</th>
          <th>Tags</th>
          <th>Export</th>
          <th class="text-end pe-5">Created</th>
        </tr>
      </template>
      <template #tbody>
        <tr v-for="n in 10" :key="n">
          <th v-text="n"/>
          <td>Article title</td>
          <td>@author_username</td>
          <td>list of tags</td>
          <td>First 20 words of article body</td>
          <td class="text-end ">
            <span class="mx-2">June 11 ,2019</span>
            <div class="btn-group mx-2">
              <button type="button" class="btn btn-info dropdown-toggle " data-bs-toggle="dropdown"
                      aria-expanded="false">
                <span class="pe-3">...</span>
              </button>
              <ul class="dropdown-menu">
                <li>
                  <button class="dropdown-item" >Edit</button>
                </li>
                <li>
                  <hr class="dropdown-divider">
                </li>
                <li>
                  <button class="dropdown-item" @click="showDeleteModal=true">Delete</button>
                </li>
              </ul>
            </div>
          </td>
        </tr>
      </template>

    </AppTable>
    <AppPagination v-model:pageNumber="pagination.page.value" routeName="articles" :pageCount="pageCount"/>
    <AppModal title="Delete Article" v-model="showDeleteModal">
      <template #body>
        <p>Are yoy sure to delete Article?</p>
      </template>
      <template #footer>
        <button class="btn px-4 border bg-transparent" @click="showDeleteModal=false">No</button>
        <button class="btn px-4 btn-danger" @click="deleteArticle()">Yes</button>
      </template>
    </AppModal>
  </LayoutDefault>
</template>


<style scoped lang="scss">

</style>


<script setup lang="ts">

import LayoutDefault from "@/layouts/LayoutDefault.vue";
import {useRoute} from "vue-router";
import {computed, reactive} from "vue";
import AppTextInput from "@/components/AppTextInput.vue";
import {Form} from "vee-validate";
import * as Yup from "yup";

import {ToastEnum} from "@/composables/toast/Toast.interface";
import {useToast} from "@/composables/toast/useToast";
import AppCheckboxList from "@/components/AppCheckboxList.vue";
import * as yup from "yup";

const route = useRoute()
const {showToast} = useToast();

const edit = computed(() => route.name === 'article-edit')
const header = computed(() => edit.value ? 'Edit Article' : 'New Article')

const tagSchema = Yup.object().shape({
  tag: Yup.string().min(2).required().label("Tags"),

})
const schema = Yup.object().shape({
  title: Yup.string().min(2).required().label("Title"),
  description: Yup.string().min(2).required().label("Description"),
  body: Yup.string().min(2).required().label("Body"),
  tags: yup.array().min(1).required().label("Tags"),
});

const data = reactive({
  selected: [],
  tags: [
    {label: 'Tag', value: 'Tag1', checked: false, id: 1},
    {label: 'Tag', value: 'Tag2', checked: false, id: 2},
    {label: 'Tag', value: 'Tag3', checked: false, id: 3},
    {label: 'Tag', value: 'Tag4', checked: false, id: 4},
    {label: 'Tag', value: 'Tag5', checked: false, id: 5},
    {label: 'Tag', value: 'Tag6', checked: false, id: 6},
    {label: 'Tag', value: 'Tag7', checked: false, id: 7},
    {label: 'Tag', value: 'Tag8', checked: false, id: 8},
    {label: 'Tag', value: 'Tag9', checked: false, id: 9},
    {label: 'Tag', value: 'Tag10', checked: false, id: 10},
  ]
})
const addTag = (values) => {
}
const onSubmit = (values) => {
  alert(JSON.stringify(values, null, 2));
  showToast({message: '<b>Well done!</b> Article updated successfully', type: ToastEnum.success})
}
</script>

<template>
  <LayoutDefault :header="header">
    <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">

      <div class="col-12 p-0 d-flex">
        <div class="col-xl-9 col-lg-8 pe-3">
          <AppTextInput label="Title" name="title" type="text"/>
          <AppTextInput :wrapperAttrs="{class:'mt-3'}" label="Description" name="description" type="text"/>
          <AppTextInput :wrapperAttrs="{class:'mt-3'}" area rows="6" label="Body" name="body" type="text"/>
        </div>
        <div class="col-xl-3 col-lg-4 ps-3">
          <Form @submit="addTag" :validation-schema="tagSchema">
            <AppTextInput placeholder="New tag" label="Tags" name="tags" type="text"/>
          </Form>
          <div class="card mt-3 p-2">
            <AppCheckboxList name="tags" label="Tags" v-model:items="data.tags" v-model="data.selected" :errors="errors.tags"/>
          </div>
        </div>
      </div>

      <div class="mt-3">
        <button type="submit" class="btn px-3 btn-primary">Submit</button>
      </div>
    </Form>

  </LayoutDefault>
</template>


<style scoped>

</style>


<script setup lang="ts">
import AppCheckbox from '@/components/AppCheckbox.vue';
import {computed, reactive} from "vue";


interface Props {
  modelValue: [],
  name: string,
  successMessage?: string,
  items: {
    value: any,
    id: string,
    label: string,
  }[]
}

const props = defineProps<Props>()
const data = reactive({
  errorMessage: '',
  meta: null,
})

const emit = defineEmits(['update:modelValue'])
const selected = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

</script>

<template>
  <template v-for="item in props.items">
    <AppCheckbox :labelAttrs="$attrs?.labelAttrs||{class:'mt-1'}" :inputAttrs="$attrs.inputAttrs"
                 @errorMessage="data.errorMessage=$event" @meta="data.meta=$event" :name="props.name" v-model="selected"
                 :value="item.value"
                 :label="item.label" :id="item.id"/>
  </template>
  <div v-show="data.errorMessage || data.meta?.valid" :="$attrs?.errorAttrs"
       :class="['mt-1',{'text-danger':data.errorMessage,'text-success':props.successMessage}]"
       v-html="data.errorMessage || props.successMessage"
  />

</template>



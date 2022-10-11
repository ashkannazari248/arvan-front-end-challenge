<script lang="ts" setup>
import {onMounted, watch, watchEffect} from 'vue';
import {useField} from 'vee-validate';

interface Props {
  modelValue: any,
  name: string,
  id: any,
  label: any,
  value: any,
  errorMessage?: string,
}

const props = defineProps<Props>();

const {
  checked,
  handleChange,
  errorMessage,
  meta,
  setValue,
} = useField(props.name, undefined, {
  type: 'checkbox',
  checkedValue: props.value,
});
const emit = defineEmits(['meta','errorMessage','update:modelValue'])
watchEffect(() => {
  emit('errorMessage', errorMessage)
  emit('meta', meta)
})
onMounted(()=>{

})
watch(() =>checked,()=> {
  emit('update:modelValue', props.modelValue)
})
watch(() => checked, (value) => {
  setValue(value)
})
</script>

<template>
  <label :="$attrs.labelAttrs">
    <input
           :="$attrs.input"
           :name="props.name"
           :id="props.id"
           type="checkbox"
           :value="props.modelValue"
           @input="handleChange(props.value)">
    {{props.label}}
  </label>

</template>

<style scoped>

</style>

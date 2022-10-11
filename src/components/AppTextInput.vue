<script setup lang="ts">
import {toRef, unref, watch, watchEffect} from 'vue';
import {useField} from 'vee-validate';

interface Props {
  type?: string;
  modelValue?: string;
  name: string;
  rows?: string;
  label: string;
  successMessage?: string;
  placeholder?: string;
  area?: boolean;
}


const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  rows: '2',
  modelValue: '',
  successMessage: '',
  placeholder: '',
  area: false,
})

const emit = defineEmits(['update:modelValue'])

const name = toRef(props, 'name');


const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
  setValue,
} = useField(props.name, undefined, {
  initialValue: props.modelValue,
  validateOnValueUpdate: false
});
watchEffect(() => {
  emit("update:modelValue", unref(inputValue))
})
watch(() => props.modelValue, (value) => {
  setValue(value)
})

</script>

<template>
  <div :="$attrs?.wrapperAttrs">
    <label :for="name" :class="['form-label mb-1',{'text-danger':errorMessage}]" v-text="props.label"/>
    <template v-if="props.area">
       <textarea class="form-control mt-1"
                 :="$attrs"
                 :name="name"
                 :id="name"
                 :value="inputValue"
                 :rows="props.rows"
                 :placeholder="props.placeholder"
                 @input="handleChange"
                 @blur="handleBlur"/>
    </template>
    <template v-else>
      <input class="form-control mt-1"
             autocomplete="false"
             :="$attrs"
             :name="name"
             :id="name"
             :type="props.type"
             :value="inputValue"
             :placeholder="props.placeholder"
             @input="handleChange"
             @blur="handleBlur">
    </template>
    <div v-show="errorMessage || meta.valid" :="$attrs?.errorAttrs"
         :class="[' ',{'text-danger':errorMessage,'text-success':props.successMessage}]">
      {{ errorMessage || props.successMessage }}
    </div>
  </div>

</template>

<style scoped lang="scss">
textarea {
  resize: none;
}
*{
  font-size: 16px;
}
</style>

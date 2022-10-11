<template>
    <div v-if="props.modelValue" class="modal d-block" @click="closeModalFunc">
      <div @click.stop="" :class="['modal-dialog','modal-'+props.size]" role="document">
        <div class="modal-content">
          <div class="modal-header align-items-center" v-if="props.showModalHeader">
            <h5 class="modal-title" id="staticBackdropLabel">{{ props.title }}</h5>
            <button type="button" class="btn-close m-0 " @click="closeModalFunc"></button>
          </div>
          <div class="modal-body" v-bind="props.bodyAttrs">
            <slot name="body"/>
          </div>
          <div v-if="$slots.footer" class="modal-footer">
            <slot name="footer" :closeModal="closeModalFunc"/>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
interface Props{
  closeModal?:Function,
  showModalHeader?:boolean,
  modelValue?:boolean|number,
  bodyAttrs?:object,
  size?:'sm'|''|'lg'|'xl',
  title:string,
}

const props=withDefaults(defineProps<Props>(),{
  title:'',
  size:'',
  bodyAttrs:<any>{},
  modelValue:false,
  showModalHeader:true,
})
const emit=defineEmits(['update:modelValue'])

const checkboxModel = ref(!!props.modelValue)
watch(() => props.modelValue, (value) => {
  checkboxModel.value = !!value
})
const closeModalFunc = () => {
  if (props.closeModal)
    props.closeModal()
  emit('update:modelValue', false)
}

</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: rgb(0, 0, 0, 0.7);
  z-index: 100000;
  opacity: 1;
}

.modal-toggle {
  display: none;
}

</style>
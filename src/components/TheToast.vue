<script setup lang="ts">
import {useToast} from '@/composables/toast/useToast'
import {gsap} from 'gsap'
import {onMounted, ref, unref, watch} from "vue";

const {toastRef} = useToast()
const target = ref<HTMLElement | null>(null)
let animation: any
const setAnimation = (): void => {
  animation = gsap.to(unref(target), {
    autoAlpha: 1,
    top: 50,
    display: 'block',
    right: 20,
    ease: 'power4',
    pause: true,
    duration: 0.5,
  })
  animation.pause()

}
onMounted(() => {
  setAnimation()
})
watch(() => toastRef, (value) => {
  if (value.value.show) {
    animation.play(10000)
  } else {
    animation.reverse()
  }
}, {deep: true})
</script>

<template>
  <div id="TheToast">
    <div ref="target" :class="`toast align-items-center rounded p-1 bg-${toastRef.type} border-0`">
      <div class="d-flex">
        <div class="toast-body" v-html="toastRef.message"/>
      </div>
    </div>
  </div>
</template>


<style scoped>
.bg-success{
  background-color:var(--light-green) !important;
  color:var(--military-green)!important;
}
.bg-danger{
  background-color:var(--red-light) !important;
  color:var(--brown)!important;
}
#TheToast {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100001;
  font-size:16px;
  text-align: left;
}
.toast{
  width: fit-content !important;
}
</style>


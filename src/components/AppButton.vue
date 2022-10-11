<template>
  <button :class="{ disabled:props.loading, [`btn btn-${props.variant}`]: props.variant !== undefined }">
    <slot/>
    <span v-if="props.loading" class="spinner-border" role="status">
      <i class="sr-only"/>
    </span>

  </button>
</template>

<script setup lang="ts">
enum ButtonVariantEnum {
  primary = 'primary',
  secondary = 'secondary',
  accent = 'accent',
  ghost = 'ghost',
  link = 'link'
}

interface Props {
  variant?: ButtonVariantEnum;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
});
</script>
<style scoped lang="scss">
.spinner-border{
  width: 16px;
  height: 16px;
}
button{
  font-size: 16px;
}
</style>
<script setup lang="ts">
import {Form} from "vee-validate";
import AppTextInput from "@/components/AppTextInput.vue";
import AppButton from "@/components/AppButton.vue";
import LayoutAuth from "@/layouts/LayoutAuth.vue";
import {useEdit} from "@/composables/auth/edit/useEdit";
import {useEditValidator} from "@/composables/auth/edit/edit.validator";

const {schema} = useEditValidator();


const {loading, error, submit} = useEdit()

</script>

<template>
  <LayoutAuth>
    <h1 class="col-12 text-center mt-2">Edit</h1>
    <Form
        :validation-schema="schema"
        @submit="submit"
        :initial-values="{email: '' }"
    >
      <AppTextInput name="email" label="Email" :wrapperAttrs="{class:'mb-3'}"/>
      <AppButton variant="primary" :loading="loading"
                 class="col-12 mb-3"
                 type="submit">
        Edit
      </AppButton>

    </Form>
  </LayoutAuth>
</template>


<style scoped>
* {
  font-size: 16px;
}

h1 {
  color: var(--warm-grey);
  font-size: 47px
}

a {
  color: var(--charcoal-grey);
  text-decoration: none
}
</style>


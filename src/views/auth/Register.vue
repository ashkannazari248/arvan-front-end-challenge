<script setup lang="ts">
import {Form} from "vee-validate";
import AppTextInput from "@/components/AppTextInput.vue";
import AppButton from "@/components/AppButton.vue";
import LayoutAuth from "@/layouts/LayoutAuth.vue";
import {useRegister} from "@/composables/auth/register/useRegister";
import {useRegisterValidator} from "@/composables/auth/register/register.validator";

const {schema} = useRegisterValidator();


const {loading, error, submit} = useRegister()

</script>

<template>
  <LayoutAuth>
    <h1 class="col-12 text-center mt-2">Register</h1>
    <Form
        :validation-schema="schema"
        @submit="submit"
        :initial-values="{username:'', email: '', password: '' }"
    >
      <AppTextInput name="username" label="User" :wrapperAttrs="{class:'mb-3'}"/>
      <AppTextInput name="email" label="Email" :wrapperAttrs="{class:'mb-3'}"/>
      <AppTextInput name="password" label="Password" type="password" :wrapperAttrs="{class:'mb-3'}"/>

      <AppButton variant="primary" :loading="loading"
                 class="col-12 mb-3"
                 type="submit">
        Register
      </AppButton>
      <RouterLink class="w-100" :to="{name:'login'}">
        Already Registered? <b>Login</b>
      </RouterLink>
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


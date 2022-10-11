<script setup lang="ts">
import { Form } from "vee-validate";
import AppTextInput from "@/components/AppTextInput.vue";
import AppButton from "@/components/AppButton.vue";
import LayoutAuth from "@/layouts/LayoutAuth.vue";
import {useLogin} from "@/composables/auth/login/useLogin";
import {useLoginValidator} from "@/composables/auth/login/login.validator";
const { schema } = useLoginValidator();
const emit = defineEmits(["resetPassword"]);
const resetPasswordClick = () => {
  emit("resetPassword");
};


const {loading,error,submit}=useLogin()

</script>

<template>
  <LayoutAuth>
    <h1 class="col-12 text-center mt-2" >Login</h1>
    <Form
        :validation-schema="schema"
        @submit="submit"
        :initial-values="{ email: '', password: '' }"
    >
      <AppTextInput name="email" label="Email" :wrapperAttrs="{class:'mb-3'}" />
      <AppTextInput name="password" label="Password" type="password" :wrapperAttrs="{class:'mb-3'}"/>


      <AppButton variant="primary"  :loading="loading"
          class="col-12 mb-3"
          type="submit">
        Login
      </AppButton>
      <RouterLink class="w-100" :to="{name:'register'}">
        Don't have account? <b>Register Now</b>
      </RouterLink>
      <div class="w-full flex justify-end">
        <div
            @click="resetPasswordClick"
            role="button"
            class="text-gray-500 text-sm w-100"
        >

        </div>
      </div>
    </Form>
  </LayoutAuth>
</template>


<style scoped>
*{
  font-size: 16px;
}
h1{
  color:var(--warm-grey);
  font-size:47px
}
a{
  color:var(--charcoal-grey);
  text-decoration:none
}
</style>


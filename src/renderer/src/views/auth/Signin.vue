<script setup>
import {ref} from "vue";
import {useAuth} from "../../composables/useAuth";
import {LocalStore} from "../../assets/js/Local";

const email = ref('');
const password = ref('');
const rememberMe = ref(LocalStore.public.get('rememberMe'));

const {signin, toSignup} = useAuth();

const loading = ref(false);
const customSignin = async () => {
  loading.value = true;
  await signin(email.value, password.value, rememberMe.value);
  loading.value = false;
}
</script>

<template>
  <div
    class="w-full surface-card p-5 border-round border-3 surface-border"
  >
    <h1 class=" m-0 mb-5">
      Signin
    </h1>
    <div>
      <label
        for="email1"
        class="block text-900 text-xl mb-2"
      >Email</label>
      <InputText
        id="email1"
        v-model="email"
        type="text"
        placeholder="Email address"
        class="w-full md:w-30rem mb-5"
        style="padding: 1rem"
      />

      <label
        for="password"
        class="block text-900 text-xl mb-2"
      >Password</label>
      <Password
        id="password"
        v-model="password"
        :feedback="false"
        placeholder="Password"
        :toggle-mask="true"
        class="w-full mb-3"
        input-class="w-full"
        :input-style="{padding:'1rem'}"
      />

      <div class="flex align-items-center justify-content-between mb-5 gap-5">
        <div class="flex align-items-center">
          <Checkbox
            id="rememberMe"
            v-model="rememberMe"
            binary
            class="mr-2"
          />
          <label for="rememberMe">Remember me</label>
        </div>
        <a
          class="font-medium no-underline ml-2 text-right cursor-pointer"
          style="color: var(--primary-color)"
        >Forgot
          password?</a>
      </div>
      <Button
        label="Sign In"
        class="w-full p-3 text-xl"
        :loading="loading"
        @click="customSignin"
      />
      <div class="flex align-items-center justify-content-center mt-5">
        <span class="mr-2">Don't have an account?</span>
        <a
          class="font-medium no-underline ml-2 text-right cursor-pointer"
          style="color: var(--primary-color)"
          @click="toSignup"
        >
          Sign Up
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>

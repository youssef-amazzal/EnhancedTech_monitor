<script setup>
import {computed, ref} from "vue";
import {useAuth} from "../../composables/useAuth";

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');

const metaData = computed(() => ({
  first_name: firstName.value,
  last_name: lastName.value,
  role: 'control',
}));

const {toSignin, signup} = useAuth();

</script>

<template>
  <div
    class="w-full surface-card p-5 border-round border-3 surface-border"
  >
    <h1 class=" m-0 mb-5">
      Signup
    </h1>
    <div class="flex mb-5 gap-2">
      <div>
        <label
          for="first-name"
          class="block text-900 text-xl mb-2"
        >First Name</label>
        <InputText
          id="first-name"
          v-model="firstName"
          type="text"
          placeholder="First Name"
          style="padding: 1rem"
        />
      </div>
      <div>
        <label
          for="last-name"
          class="block text-900 text-xl mb-2"
        >Last Name</label>
        <InputText
          id="last-name"
          v-model="lastName"
          type="text"
          placeholder="Last Name"
          style="padding: 1rem"
        />
      </div>
    </div>
    <div>
      <label
        for="email"
        class="block text-900 text-xl mb-2"
      >Email</label>
      <InputText
        id="email"
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
        placeholder="Password"
        :toggle-mask="true"
        class="w-full mb-6"
        input-class="w-full"
        :input-style="{padding:'1rem'}"
      />


      <Button
        label="Sign Up"
        class="w-full p-3 text-xl"
        @click="signup(email, password, metaData)"
      />
      <div class="flex align-items-center justify-content-center mt-5">
        <span class="mr-2">Already have an account?</span>
        <a
          class="font-medium no-underline ml-2 text-right cursor-pointer"
          style="color: var(--primary-color)"
          @click="toSignin"
        >
          Sign In
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>

<script setup>
import {defineModel, defineProps} from 'vue'
import InputText from "primevue/inputtext";
import Password from "primevue/password";

const SIDE = {
  LEFT: 'left',
  RIGHT: 'right'
}

const SIZE = {
  SMALL: 'small',
  NORMAL: 'normal',
  LARGE: 'large'
}

const {modelValue} = defineModel();

const {label, icon, iconSide, placeholder, size, type} = defineProps({
  type: {
    type: String,
    default: 'text',
    validator: (value) => ['text', 'password'].includes(value)
  },
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: Object,
    default: null
  },
  placeholder: {
    type: String,
    default: ''
  },
  iconSide: {
    type: String,
    default: 'left',
  },
  size: {
    type: String,
    default: 'normal',
  }
})

const iconSideClass = {
  [SIDE.LEFT]: 'p-input-icon-left',
  [SIDE.RIGHT]: 'p-input-icon-right'
}

const sizeClass = {
  [SIZE.SMALL]: 'p-inputtext-sm',
  [SIZE.NORMAL]: '',
  [SIZE.LARGE]: 'p-inputtext-lg'
}


</script>
<template>
  <div>
    <slot name="label">
      <label
        class="block text-900 text-xl font-normal mb-2"
      >
        {{ label }}
      </label>
    </slot>
    <slot name="inputField">
      <span
        class="flex p-inputtext align-items-center md:w-30rem mb-5 "
        v-bind="$attrs"
      >
        <component
          :is="icon"
          v-if="icon && iconSide === SIDE.LEFT"
        />
        <component
          :is="type === 'text' ? InputText : Password"
          v-model="modelValue"
          :placeholder="placeholder"
          :class="sizeClass[size]"
          class="w-full border-none"
        />
        <component
          :is="icon"
          v-if="icon && iconSide === SIDE.RIGHT"
        />
      </span>
    </slot>
  </div>
</template>

<style scoped></style>

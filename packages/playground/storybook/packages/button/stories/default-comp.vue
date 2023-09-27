<template>
  <view>
    <ut-button v-bind="attr" />
  </view>
</template>

<script setup lang="ts">
import { useAttrs } from 'vue';
import UtButton from '../button.vue';

const attr = useAttrs();

</script>


<style>

</style>
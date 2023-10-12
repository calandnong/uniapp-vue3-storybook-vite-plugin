<template>
  <view>
    <ut-button v-bind="attr" @click="showModal"/>
    <view>
      <u-keyboard ref="uKeyboard" mode="car" :show="show" @cancel="cancel" @confirm="confirm" ></u-keyboard>
      <ut-button @click="open">点击打开</ut-button>
  </view>
  </view>
</template>

<script setup lang="ts">
import UKeyboard from '../../../stories/uView2/components/u-keyboard/u-keyboard.vue';
import { ref, useAttrs } from 'vue';
import UtButton from '../button.vue';

const attr = useAttrs();

const show = ref(false);

function open() {
  show.value = true;
}

function cancel() {
  show.value = false;
}

function confirm() {
  console.log('确认了');
  
  show.value = false;
}


function showModal() {
  uni.showModal({
    title: '提示',
    content: '是的呢',
    showCancel: true,
    success: ({ confirm }) => {
      if(confirm) {
        console.log('用户确认了');
        return;
      }
      console.log('用户未确认');
    }
  })
}


</script>


<style>

</style>
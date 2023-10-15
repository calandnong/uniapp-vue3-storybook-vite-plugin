<template>
  <view>
    <ut-button v-bind="attr" @click="showModal" @mousedown="touch"/>
    <view style="height: 100px;" @tap="touch">
      dianji
    </view>
    <view>
      <u-keyboard ref="uKeyboard" mode="car" :show="show" @cancel="cancel" @confirm="confirm" ></u-keyboard>
      <ut-button @click="open">点击打开</ut-button>
      <u-search placeholder="日照香炉生紫烟" v-model="keyword"></u-search>
      <u-rate :count="2" :value="4"></u-rate>
  </view>
  </view>
</template>

<script setup lang="ts">
import { ref, useAttrs } from 'vue';
import UtButton from '../button.vue';

const attr = useAttrs();

const show = ref(false);

const keyword = ref('');

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

function touch(e) {
  console.log(e);
  
}


function showModal(e) {
  console.log(e);
  
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
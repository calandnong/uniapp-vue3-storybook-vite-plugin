<template>
  <view 
    class="o-button"
    :class="[
      `o-button-${type}`
    ]"
    @click="showModal"
  >
    {{ text }}
    <slot></slot>
  </view>
</template>

<script setup lang="ts">

export type ButtonType = 'info' | 'error';

export interface Props {
  /**
   * 文字内容
   */
  text?: string;
  /**
   * 按钮类型
   */
  type?: ButtonType;
}

withDefaults(defineProps<Props>(), {
  text: '',
  type: 'info'
});


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


<style lang="scss" scoped>
.o-button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80rpx;
  padding: 0 24rpx;
  font-size: 28rpx;
  cursor: pointer;
  border-radius: 10rpx;

  &-info {
    color: #000000;
    background-color: #FFFFFF;
    border: 1rpx solid #ebedf0;
  }

  &-error {
    color: #FFFFFF;
    background-color: red;
  }

  &:active {
    background-color: #dbe2eb;
  }
}

</style>
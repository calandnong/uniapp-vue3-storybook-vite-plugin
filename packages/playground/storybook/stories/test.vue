<template>
  <view>
    什么东西？
  </view>
</template>

<script>

export default {
  name: 'test',
  methods: {
    // #ifdef H5
    getName() {
      console.log('你好啊');
    },
    // #endif
  },
}
</script>
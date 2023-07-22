<template>
  <div>
    <switch @change="input"></switch>
    <!-- <view style="width: 100px;height: 200px;">我来啦！</view> -->
    <view class="uni-margin-wrap">
      <swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
        :duration="duration">
        <swiper-item>
          <view class="swiper-item uni-bg-red">A</view>
        </swiper-item>
        <swiper-item>
          <view class="swiper-item uni-bg-green">B</view>
        </swiper-item>
        <swiper-item>
          <view class="swiper-item uni-bg-blue">C</view>
        </swiper-item>
      </swiper>
    </view>
    <view>
      <view class="uni-padding-wrap uni-common-mt">
        <view class="progress-box">
          <progress :percent="pgList[0]" show-info stroke-width="3" />
        </view>
        <view class="progress-box">
          <progress :percent="pgList[1]" stroke-width="3" />
        </view>
        <view class="progress-box">
          <progress :percent="pgList[2]" stroke-width="3" />
        </view>
        <view class="progress-box">
          <progress :percent="pgList[3]" activeColor="#10AEFF" stroke-width="3" />
        </view>
        <view class="progress-control">
          <button type="primary" @click="setProgress">设置进度</button>
          <button type="warn" @click="clearProgress">清除进度</button>
        </view>
      </view>
    </view>
    <view>
      <view class="uni-title uni-common-pl">地区选择器</view>
      <view class="uni-list">
        <view class="uni-list-cell">
          <view class="uni-list-cell-left">
            当前选择
          </view>
          <view class="uni-list-cell-db">
            <picker @change="bindPickerChange" :value="index" :range="array">
              <view class="uni-input">{{ array[index] }}</view>
            </picker>
          </view>
        </view>
      </view>
    </view>
    <view>
      <view class="uni-title uni-common-pl">时间选择器</view>
      <view class="uni-list">
        <view class="uni-list-cell">
          <view class="uni-list-cell-left">
            当前选择
          </view>
          <view class="uni-list-cell-db">
            <picker mode="time" :value="time" start="09:01" end="21:01" @change="bindTimeChange">
              <view class="uni-input">{{ time }}</view>
            </picker>
          </view>
        </view>
      </view>
    </view>
    <view class="page">
      <view class="image-list">
        <view class="image-item" v-for="(item, index) in arrayImgs" :key="index">
          <view class="image-content">
            <image style="width: 200px; height: 200px; background-color: #eeeeee;" :mode="item.mode" :src="src"
              @error="imageError"></image>
          </view>
          <view class="image-title">{{ item.text }}</view>
        </view>
      </view>
    </view>
    <view class="uni-padding-wrap uni-common-mt">
      <view class="uni-title uni-common-mt">
        Vertical Scroll
        <text>\n纵向滚动</text>
      </view>
      <view>
        <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper"
          @scrolltolower="lower" @scroll="scroll">
          <view id="demo1" class="scroll-view-item uni-bg-red">A</view>
          <view id="demo2" class="scroll-view-item uni-bg-green">B</view>
          <view id="demo3" class="scroll-view-item uni-bg-blue">C</view>
        </scroll-view>
      </view>
      <view @click="goTop" class="uni-link uni-center uni-common-mt">
        点击这里返回顶部
      </view>
    </view>
    <button @click="selectFile">选择文件</button>
    <view>
        <u-checkbox-group
            v-model="checkboxValue1"
            placement="column"
            @change="checkboxChange"
        >
            <u-checkbox
                :customStyle="{marginBottom: '8px'}"
                v-for="(item, index) in checkboxList1"
                :key="index"
                :label="item.name"
                :name="item.name"
            >
            </u-checkbox>
        </u-checkbox-group>
    </view>
  </div>
</template>

<script setup lang="ts">
import './button.css';
import { nextTick, ref } from 'vue';
import { test } from './example';
import UCheckboxGroup from './uView2/components/u-checkbox-group/u-checkbox-group.vue';
import UCheckbox from './uView2/components/u-checkbox/u-checkbox.vue';
const checkboxValue1 = ref([]);
const checkboxList1 = ref([{
                    name: '苹果',
                    disabled: false
                },
                {
                    name: '香蕉',
                    disabled: false
                },
                {
                    name: '橙子',
                    disabled: false
                }
            ]);

        function checkboxChange(n: unknown) {
            console.log('change', n);
        }

console.log('getCurrentInstance', uni.createSelectorQuery());


withDefaults(defineProps(), {

});


console.log(uni.upx2px(700))
console.log(uni.setStorageSync('storage_key', 'hello'));
console.log()

const indicatorDots = ref(true);
const autoplay = ref(true);
const interval = ref(2000);
const duration = ref(500);
const pgList = ref([0, 0, 0, 0]);

/**
 * 
 */
function input(event: any) {
  console.log('输入中', event.detail.value);
};

function setProgress() {
  pgList.value = [20, 40, 60, 80]
};
function clearProgress() {
  pgList.value = [0, 0, 0, 0]
}

const array = ['中国', '美国', '巴西', '日本'];

const index = ref(0);

function bindPickerChange(e: any) {
  console.log('picker发送选择改变，携带值为', e.detail.value)
  index.value = e.detail.value
}

const time = ref('12:01');

function bindTimeChange(e: any) {
  time.value = e.detail.value
}

const arrayImgs = [{
  mode: 'scaleToFill',
  text: 'scaleToFill：不保持纵横比缩放图片，使图片完全适应'
}, {
  mode: 'aspectFit',
  text: 'aspectFit：保持纵横比缩放图片，使图片的长边能完全显示出来'
}, {
  mode: 'aspectFill',
  text: 'aspectFill：保持纵横比缩放图片，只保证图片的短边能完全显示出来'
}, {
  mode: 'top',
  text: 'top：不缩放图片，只显示图片的顶部区域'
}, {
  mode: 'bottom',
  text: 'bottom：不缩放图片，只显示图片的底部区域'
}, {
  mode: 'center',
  text: 'center：不缩放图片，只显示图片的中间区域'
}, {
  mode: 'left',
  text: 'left：不缩放图片，只显示图片的左边区域'
}, {
  mode: 'right',
  text: 'right：不缩放图片，只显示图片的右边边区域'
}, {
  mode: 'top left',
  text: 'top left：不缩放图片，只显示图片的左上边区域'
}, {
  mode: 'top right',
  text: 'top right：不缩放图片，只显示图片的右上边区域'
}, {
  mode: 'bottom left',
  text: 'bottom left：不缩放图片，只显示图片的左下边区域'
}, {
  mode: 'bottom right',
  text: 'bottom right：不缩放图片，只显示图片的右下边区域'
}];

const src = 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg';
const imageError = function (e) {
  console.error('image发生error事件，携带值为' + e.detail.errMsg)
}


const scrollTop = ref(0);
const old = ref({
  scrollTop: 0
});

function upper(e: any) {
  console.log(e)
}
function lower(e: any) {
  console.log(e)
}
function scroll(e: any) {
  console.log(e)
  old.value.scrollTop = e.detail.scrollTop
}
function goTop(e: any) {
  // 解决view层不同步的问题
  scrollTop.value = old.value.scrollTop
  nextTick(function () {
    scrollTop.value = 0
  });
  console.log('纵向滚动 scrollTop 值已被修改为 0');
}

function selectFile(){
  console.log(test(), 'xxx');
  // uni.showToast({
  //   title: '标题',
  //   duration: 2000
  // });
  // uni.showLoading();
  // setTimeout(() => {
  //   uni.hideLoading();
  // }, 1500)
  // uni.createSelectorQuery();
  // uni.showModal({
  //   title: '提示',
  //   content: '这是一个模态弹窗',
  //   success: function (res) {
  //     if (res.confirm) {
  //       console.log('用户点击确定');
  //     } else if (res.cancel) {
  //       console.log('用户点击取消');
  //     }
  //   }
  // });
  // uni.loadFontFace({
  //   family: 'Bitstream Vera Serif Bold',
  //   source: 'url("https://sungd.github.io/Pacifico.ttf")',
  //   success() {
  //     console.log('success')
  //   }
  // });
  // console.log(uni.getLocale());
  
  // uni.showActionSheet({
  //   itemList: ['A', 'B', 'C'],
  //   success: function (res) {
  //     console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
  //   },
  //   fail: function (res) {
  //     console.log(res.errMsg);
  //   }
  // });
  // uni.request({
  //   url: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
  //   success(res) {
  //     console.log('request', res);
  //   }
  // });

  uni.createSelectorQuery();
  console.log('getSystemInfoSync', uni.getSystemInfoSync());
  console.log('getDeviceInfo', uni.getDeviceInfo());
  uni.getImageInfo({
    src: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
    success(res) {
      console.log('getImageInfo', res);
    },
    fail(err) {
      console.log('getImageInfoerr', err);
    }
  });
  uni.previewImage({
    current: 0,
    urls: [
      'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg'
    ]
  })
}

</script>

<style lang="scss" scoped>

.uni-margin-wrap {
  width: 100%;
}

.swiper {
  height: 300px;
}

.swiper-item {
  display: block;
  height: 300px;
  line-height: 300px;
  text-align: center;
}

.swiper-list {
  margin-top: 40px;
  margin-bottom: 0;
}

.uni-common-mt {
  margin-top: 60px;
  position: relative;
}

.info {
  position: absolute;
  right: 20px;
}

.uni-padding-wrap {
  width: 100%;
}

.uni-bg-red {
  background-color: #f76260;
  color: white;
}

.uni-bg-green {
  background-color: #09bb07;
  color: white;
}

.uni-bg-blue {
  background-color: #007aff;
  color: white;
}

.progress-box {
  width: 100%;
  height: 50px;
  margin-bottom: 60px;
}

.uni-icon {
  line-height: 1.5;
}

.progress-cancel {
  margin-left: 40px;
}

.progress-control button {
  margin-top: 20px;
}


.scroll-Y {
  height: 300px;
}

.scroll-view_H {
  white-space: nowrap;
  width: 100%;
}

.scroll-view-item {
  height: 300px;
  line-height: 300px;
  text-align: center;
  font-size: 36px;
}

.scroll-view-item_H {
  display: inline-block;
  width: 100%;
  height: 300px;
  line-height: 300px;
  text-align: center;
  font-size: 36px;
}
</style>
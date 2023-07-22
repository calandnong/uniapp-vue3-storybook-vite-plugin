export function test() {
  console.log('在其他js模块调用，uni的api，这里是：', uni.canIUse('request'));
  return uni;
}
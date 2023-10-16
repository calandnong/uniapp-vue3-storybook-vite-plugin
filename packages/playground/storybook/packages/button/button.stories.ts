import Button from './stories/default-comp.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
export default {
  title: 'Example/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: {
        type: 'select',
      },
      options: ['info', 'error'],
    },
  },
};

export const Primary: any = {
  args: {
    type: 'error',
    text: '示例',
  },
};
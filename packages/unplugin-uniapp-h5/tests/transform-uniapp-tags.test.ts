import { describe, test, expect } from 'vitest';
import { transformTag, transformTagArray } from 'unplugin-uniapp-h5';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('transformUniTag', () => {
  const matchTag = 'span';
  const replaceTag = 'text';
  test('测试转换双闭合标签【<span></span>】转换为【<text></text>】', () => {
    const template = `<${matchTag}>双闭合标签</${matchTag}>`;
    const expectText = `<${replaceTag}>双闭合标签</${replaceTag}>`;
    const result = transformTag(template, {
      matchTag: 'span',
      replaceTag: 'text',
    });
    console.log('结果为', result);
    expect(result).toBe(expectText);
  });
  test('测试转换双闭合标签包含【属性字段和模版字符串】转换为其他标签', () => {
    const template = `<${matchTag} v-if="你好" name="admin" id="11" test>双闭合标签{{ aaa }}</${matchTag}>`;
    const expectText = `<${replaceTag} v-if="你好" name="admin" id="11" test>双闭合标签{{ aaa }}</${replaceTag}>`;
    const result = transformTag(template, {
      matchTag: 'span',
      replaceTag: 'text',
    });
    console.log('结果为', result);
    expect(result).toBe(expectText);
  });

  test('测试转换单闭合标签【<span />】转换为【<text />】', () => {
    const template = `<${matchTag} />`;
    const expectText = `<${replaceTag} />`;
    const result = transformTag(template, {
      matchTag: 'span',
      replaceTag: 'text',
    });
    console.log('结果为', result);
    expect(result).toBe(expectText);
  });

  test('测试转换单闭合标签包含【属性字段】转换为其他标签', () => {
    const template = `<${matchTag} v-if="你好" name="admin" id="11" test />`;
    const expectText = `<${replaceTag} v-if="你好" name="admin" id="11" test />`;
    const result = transformTag(template, {
      matchTag: 'span',
      replaceTag: 'text',
    });
    console.log('结果为', result);
    expect(result).toBe(expectText);
  });

  test('测试真实vue文件中的单闭合和双闭合标签转换为其他标签的复杂场景', () => {
    const template = readFileSync(resolve(__dirname, './test-data/transformTag/example-raw.xvue')).toString();
    const expectText = readFileSync(resolve(__dirname, './test-data/transformTag/example-expect.xvue')).toString();
    const result = transformTag(template, {
      matchTag: 'span',
      replaceTag: 'text',
    });
    expect(result).toBe(expectText);
  });
  test('测试插件转换的单对象逻辑', () => {
    const template = readFileSync(resolve(__dirname, './test-data/transformTagArray/single/example-raw.xvue')).toString();
    const expectText = readFileSync(resolve(__dirname, './test-data/transformTagArray/single/example-expect.xvue')).toString();
    const result = transformTagArray(template, {
      matchTag: 'span',
      replaceTag: 'label',
    });
    expect(result).toBe(expectText);
  });

  test('测试插件转换的数组逻辑', () => {
    const template = readFileSync(resolve(__dirname, './test-data/transformTagArray/double/example-raw.xvue')).toString();
    const expectText = readFileSync(resolve(__dirname, './test-data/transformTagArray/double/example-expect.xvue')).toString();
    const result = transformTagArray(template, [
      {
        matchTag: 'span',
        replaceTag: 'label',
      },
      {
        matchTag: 'div',
        replaceTag: 'view',
      },
    ]);
    expect(result).toBe(expectText);
  });
});

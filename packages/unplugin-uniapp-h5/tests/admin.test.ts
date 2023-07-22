
import { describe, test, expect } from 'vitest';
// @ts-ignore
import { preprocess } from '../src/plugins/transform-conditional-comment/preprocess/lib/preprocess.js';

describe('测试preprocess', () => {
  test('测试', () => {
    var text = 'Hi, I am <!-- @echo USERNAME -->';
    expect(preprocess(text)).toBe('Hi, I am ');
  })
})
export interface Options {
  /**
   * 需要匹配替换的标签
   */
  matchTag: string;
  /**
   * 需要替换成的标签
   */
  replaceTag: string;
}

/**
 * 转换标签
 * @param template 模版字符串
 * @param options 配置
 * @returns
 */
export function transformTag(template: string, options: Options) {
  const { matchTag, replaceTag } = options;
  const tagRegex = new RegExp(`(<\\/?)${matchTag}(\\s[^>]*?)?>`, 'g');
  const result = template.replace(tagRegex, (_, closingSlash, attributes) => `${closingSlash === '<' ? '<' : '</'}${replaceTag}${attributes || ''}>`);
  return result;
}

/**
 * 合并相同的配置
 * @param options
 * @param target
 * @returns 是否存在合并对象
 */
export function mergeSameOptions(options: Options[], target: Options) {
  const findOptions = options.find(defaultOptions => defaultOptions.matchTag === target.matchTag);
  if (findOptions) {
    // 以传入的新的为准
    findOptions.replaceTag = target.replaceTag;
    return true;
  }
  return false;
}


export function transformTagArray(template: string, options?: Options | Options[]) {
  let result = template;
  const transformOptions: Options[] = [];
  if (!Array.isArray(options)) {
    options && !mergeSameOptions(transformOptions, options) && transformOptions.push(options);
  } else {
    transformOptions.push(...options.filter(_options => !mergeSameOptions(transformOptions, _options)));
  }
  transformOptions.forEach((_options) => {
    result = transformTag(result, _options);
  });
  return result;
}



export function camelToKebab(str: string) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}
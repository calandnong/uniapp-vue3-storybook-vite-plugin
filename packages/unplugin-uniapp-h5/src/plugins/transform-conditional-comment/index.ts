import { Plugin } from "vite";
import { EXTNAME_JS, EXTNAME_VUE } from "./constants";
import * as path from 'node:path';
import { initPreContext, preHtml, preJs } from "./helper";


const PRE_JS_EXTNAME = ['.json', '.css'].concat(EXTNAME_VUE).concat(EXTNAME_JS)

interface VueQuery {
  vue?: boolean
  src?: boolean
  type?: 'script' | 'template' | 'style' | 'custom'
  index?: number
  lang?: string
  raw?: boolean
  setup?: boolean
  'lang.ts'?: string
  'lang.js'?: string
}


function parseVueRequest(id: string) {
  const [filename, rawQuery] = id.split(`?`, 2)
  const query = Object.fromEntries(new URLSearchParams(rawQuery)) as VueQuery
  if (query.vue != null) {
    query.vue = true
  }
  if (query.src != null) {
    query.src = true
  }
  if (query.index != null) {
    query.index = Number(query.index)
  }
  if (query.raw != null) {
    query.raw = true
  }
  return {
    filename,
    query,
  }
}

const cssLangs = `\\.(css|less|sass|scss|styl|stylus|postcss)($|\\?)`
const cssLangRE = new RegExp(cssLangs);

export function transformConditionalComment(): Plugin {
  const preJsFile = preJs;
  const preHtmlFile = preHtml;

  return {
    name: 'vite:transform-conditional-comment',
    enforce: 'pre',
    transform(code, id) {
      initPreContext('h5');
      if (!code.includes('#endif')) {
        return;
      }
      const { filename, query } = parseVueRequest(id)
      const extname = path.extname(filename)
      const isHtml =
        query.type === 'template' || EXTNAME_VUE.includes(extname)
      const isJs = PRE_JS_EXTNAME.includes(extname);
      if (isHtml) {
        code = preHtmlFile(code)
      }

      if (isJs) {
        code = preJsFile(code)
      }

      if(cssLangRE.test(id)){
        code = preJsFile(code);
      }

      console.log('transformConditionalComment--->', code);
      
      return {
        code,
      }
    }
  }
}
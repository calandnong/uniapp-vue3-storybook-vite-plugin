import fs from 'fs'
import os from 'os'
import path from 'path'
import colors from 'picocolors'
import { camelize, capitalize } from '@vue/shared'
export { default as hash } from 'hash-sum'
import { EXTNAME_TS_RE, PAGE_EXTNAME, PAGE_EXTNAME_APP } from './constants'

const enum NodeTypes {
  ROOT = 0,
  ELEMENT = 1,
  TEXT = 2,
  COMMENT = 3,
  SIMPLE_EXPRESSION = 4,
  INTERPOLATION = 5,
  ATTRIBUTE = 6,
  DIRECTIVE = 7,
  COMPOUND_EXPRESSION = 8,
  IF = 9,
  IF_BRANCH = 10,
  FOR = 11,
  TEXT_CALL = 12,
  VNODE_CALL = 13,
  JS_CALL_EXPRESSION = 14,
  JS_OBJECT_EXPRESSION = 15,
  JS_PROPERTY = 16,
  JS_ARRAY_EXPRESSION = 17,
  JS_FUNCTION_EXPRESSION = 18,
  JS_CONDITIONAL_EXPRESSION = 19,
  JS_CACHE_EXPRESSION = 20,
  JS_BLOCK_STATEMENT = 21,
  JS_TEMPLATE_LITERAL = 22,
  JS_IF_STATEMENT = 23,
  JS_ASSIGNMENT_EXPRESSION = 24,
  JS_SEQUENCE_EXPRESSION = 25,
  JS_RETURN_STATEMENT = 26
}

import {
  // NodeTypes,
  ElementNode,
  RootNode,
  TemplateChildNode,
  TemplateTextChildNode,
} from '@vue/compiler-core'
import { ParserPlugin } from '@babel/parser'
import { getPlatformDir } from './platform'

export const version = require('../package.json').version

export let isRunningWithYarnPnp: boolean
try {
  isRunningWithYarnPnp = Boolean(require('pnpapi'))
} catch {}

export const isWindows = os.platform() === 'win32'
export function normalizePath(id: string): string {
  return isWindows ? id.replace(/\\/g, '/') : id
}

export function checkElementNodeTag(
  node: RootNode | TemplateChildNode | null | undefined,
  tag: string
): node is ElementNode {
  return !!node && node.type === (NodeTypes.ELEMENT as any) && (node as any).tag === tag
}

export function normalizeIdentifier(str: string) {
  return capitalize(camelize(str.replace(/\//g, '-')))
}

export function normalizePagePath(pagePath: string, platform: UniApp.PLATFORM) {
  const absolutePagePath = path.resolve((process.env as any).UNI_INPUT_DIR, pagePath)
  let extensions = PAGE_EXTNAME
  if (platform === 'app') {
    extensions = PAGE_EXTNAME_APP
  }
  for (let i = 0; i < extensions.length; i++) {
    const extname = extensions[i]
    if (fs.existsSync(absolutePagePath + extname)) {
      return pagePath + extname
    }
  }
  console.error(`${pagePath} not found`)
}

export function removeExt(str: string) {
  return str.split('?')[0].replace(/\.\w+$/g, '')
}

const NODE_MODULES_REGEX = /(\.\.\/)?node_modules/g

export function normalizeNodeModules(str: string) {
  str = normalizePath(str).replace(NODE_MODULES_REGEX, 'node-modules')
  // HBuilderX 内置模块路径转换
  str = str.replace(
    /.*\/plugins\/uniapp-cli-vite\/node[-_]modules/,
    'node-modules'
  )
  // if (process.env.UNI_PLATFORM === 'mp-alipay') {
  //   str = str.replace('node-modules/@', 'node-modules/npm-scope-')
  // }
  return str
}

export function normalizeMiniProgramFilename(
  filename: string,
  inputDir?: string
) {
  if (!inputDir || !path.isAbsolute(filename)) {
    return normalizeNodeModules(filename)
  }
  return normalizeNodeModules(path.relative(inputDir, filename))
}

export function normalizeParsePlugins(
  importer: string,
  babelParserPlugins?: ParserPlugin[]
) {
  const isTS = EXTNAME_TS_RE.test(importer.split('?')[0])
  const plugins: ParserPlugin[] = []
  if (isTS) {
    plugins.push('jsx')
  }
  if (babelParserPlugins) plugins.push(...babelParserPlugins)
  if (isTS) plugins.push('typescript', 'decorators-legacy')
  return plugins
}

export function pathToGlob(
  pathString: string,
  glob: string,
  options: { windows?: boolean; escape?: boolean } = {}
): string {
  const isWindows =
    'windows' in options ? options.windows : /^win/.test(process.platform)
  const useEscape = options.escape
  const str = isWindows ? pathString.replace(/\\/g, '/') : pathString
  let safeStr = str.replace(
    /[\\*?[\]{}()!]/g,
    isWindows || !useEscape ? '[$&]' : '\\$&'
  )
  return path.posix.join(safeStr, glob)
}

export function resolveSourceMapPath(
  outputDir?: string,
  platform?: UniApp.PLATFORM
) {
  return path.resolve(
    outputDir || (process.env as any).UNI_OUTPUT_DIR,
    '../.sourcemap/' + (platform || getPlatformDir())
  )
}

function hasProjectYarn(cwd: string) {
  return fs.existsSync(path.join(cwd, 'yarn.lock'))
}

function hasProjectPnpm(cwd: string) {
  return fs.existsSync(path.join(cwd, 'pnpm-lock.yaml'))
}

function getInstallCommand(cwd: string) {
  return hasProjectYarn(cwd)
    ? 'yarn add'
    : hasProjectPnpm(cwd)
    ? 'pnpm i'
    : 'npm i'
}

export function installDepTips(
  type: 'dependencies' | 'devDependencies',
  module: string,
  version?: string
) {
  return `Cannot find module: ${module}
Please run \`${colors.cyan(
    `${getInstallCommand(process.cwd())} ${
      module + (version ? '@' + version : '')
    }${type === 'devDependencies' ? ' -D' : ''}`
  )}\` and try again.`
}

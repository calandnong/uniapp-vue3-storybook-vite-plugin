import fs from 'fs'
import path from 'path'
import debug from 'debug'
import * as resolve from 'resolve'
import { once } from '../libs/uniapp/uni-shared/src/utils'
import { normalizePath } from './utils'
import { extensions } from './constants'

export const isInHBuilderX = once(() => {
  // 自动化测试传入了 HX_APP_ROOT(其实就是UNI_HBUILDERX_PLUGINS)
  if (process.env.HX_APP_ROOT) {
    process.env.UNI_HBUILDERX_PLUGINS = process.env.HX_APP_ROOT + '/plugins'
    return true
  }
  try {
    const { name } = require(path.resolve(
      process.cwd(),
      '../about/package.json'
    ))
    if (name === 'about') {
      process.env.UNI_HBUILDERX_PLUGINS = path.resolve(process.cwd(), '..')
      return true
    }
  } catch (e) {
    // console.error(e)
  }
  return false
})


export function requireResolve(filename: string, basedir: string) {
  return resolveWithSymlinks(filename, basedir)
}

function resolveWithSymlinks(id: string, basedir: string): string {
  return resolve.sync(id, {
    basedir,
    extensions,
    // necessary to work with pnpm
    preserveSymlinks: true,
  })
}

export function relativeFile(from: string, to: string) {
  const relativePath = normalizePath(path.relative(path.dirname(from), to))
  return relativePath.startsWith('.') ? relativePath : './' + relativePath
}

export const resolveMainPathOnce = once((inputDir: string) => {
  const mainUTSPath = path.resolve(inputDir, 'main.uts')
  if (fs.existsSync(mainUTSPath)) {
    return normalizePath(mainUTSPath)
  }
  const mainTsPath = path.resolve(inputDir, 'main.ts')
  if (fs.existsSync(mainTsPath)) {
    return normalizePath(mainTsPath)
  }
  return normalizePath(path.resolve(inputDir, 'main.js'))
})

const ownerModules = [
  '@dcloudio/uni-app',
  '@dcloudio/vite-plugin-uni',
  '@dcloudio/uni-cli-shared',
]

const paths: string[] = []

function resolveNodeModulePath(modulePath: string) {
  const nodeModulesPaths: string[] = []
  const nodeModulesPath = path.join(modulePath, 'node_modules')
  if (fs.existsSync(nodeModulesPath)) {
    nodeModulesPaths.push(nodeModulesPath)
  }
  const index = modulePath.lastIndexOf('node_modules')
  if (index > -1) {
    nodeModulesPaths.push(path.join(modulePath.slice(0, index), 'node_modules'))
  }
  return nodeModulesPaths
}

function initPaths() {
  const cliContext = process.env.UNI_CLI_CONTEXT || process.cwd()
  if (cliContext) {
    const pathSet = new Set<string>()
    pathSet.add(path.join(cliContext, 'node_modules'))
    if (!isInHBuilderX()) {
      ;[`@dcloudio/uni-` + process.env.UNI_PLATFORM, ...ownerModules].forEach(
        (ownerModule) => {
          let pkgPath: string = ''
          try {
            pkgPath = require.resolve(ownerModule + '/package.json', {
              paths: [cliContext],
            })
          } catch (e) {}
          if (pkgPath) {
            resolveNodeModulePath(path.dirname(pkgPath)).forEach(
              (nodeModulePath) => {
                pathSet.add(nodeModulePath)
              }
            )
          }
        }
      )
    }
    paths.push(...pathSet)
    debug('uni-paths')(paths)
  }
}

export function getBuiltInPaths() {
  if (!paths.length) {
    initPaths()
  }
  return paths
}

export function resolveBuiltIn(path: string) {
  return require.resolve(path, { paths: getBuiltInPaths() })
}

export function resolveVueI18nRuntime() {
  return path.resolve(
    __dirname,
    '../lib/vue-i18n/dist/vue-i18n.runtime.esm-bundler.js'
  )
}

let componentsLibPath: string = ''
export function resolveComponentsLibPath() {
  if (!componentsLibPath) {
    if (isInHBuilderX()) {
      componentsLibPath = path.join(
        resolveBuiltIn('@dcloudio/uni-components/package.json'),
        '../lib'
      )
    } else {
      componentsLibPath = path.join(
        resolveWithSymlinks(
          '@dcloudio/uni-components/package.json',
         (process.env as any).UNI_INPUT_DIR
        ),
        '../lib'
      )
    }
  }
  return componentsLibPath
}

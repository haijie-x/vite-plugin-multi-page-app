import { Plugin, UserConfig } from 'vite'
import history from 'connect-history-api-fallback'
import path from 'node:path'
import merge from 'deepmerge'
import { ensureHtml, LOG_PREFIX } from './util'

const resolveHtmlRewrites = (
  entry: PluginConfig['entry'],
  userConfig: UserConfig
) => {
  const root = userConfig.root ?? process.cwd()
  const rewrites = entry
    .map(e => {
      if (path.basename(e, '.html') === 'index') {
        return {
          from: new RegExp(`^/${path.basename(path.dirname(e))}(/.*)?$`),
          to: e.startsWith(root) ? `${e.slice(root.length)}` : e
        }
      } else {
        return {
          from: new RegExp(`^/${path.basename(e, '.html')}(/.*)?$`),
          to: e.startsWith(root) ? `${e.slice(root.length)}` : e
        }
      }
    })
    .filter(Boolean) as { from: RegExp; to: string }[]
  return rewrites
}

const resolveEntry = (entry: string[], userConfig: UserConfig) => {
  const _entry = entry
    .map(e => {
      if (e.startsWith('.') || e.startsWith('..')) {
        e = path.resolve(userConfig.root ?? process.cwd(), e)
      }
      return ensureHtml(e)
    })
    .filter(Boolean) as string[]

  return _entry
}

type PluginConfig = {
  entry: string[]
  debug: boolean
}
const createPlugin = (config: PluginConfig): Plugin => {
  const { entry = [], debug = false } = config ?? {}
  let _entry: string[]
  let htmlRewrites: { from: RegExp; to: string }[]

  return {
    name: 'vite-plugin-multi-page-app',
    config(_config) {
      _entry = resolveEntry(entry, _config)
      htmlRewrites = resolveHtmlRewrites(_entry, _config)
      return merge(
        {
          appType: 'mpa',
          build: {
            rollupOptions: {
              input: _entry
            }
          }
        },
        _config
      )
    },
    configureServer(server) {
      const { middlewares } = server
      middlewares.use(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        history({
          htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
          rewrites: htmlRewrites
        })
      )
      middlewares.use((req, _, next) => {
        if (
          debug &&
          req.originalUrl !== req.url &&
          req.headers['accept']?.includes('text/html')
        ) {
          console.log(
            LOG_PREFIX + ` Rewriting ${req.originalUrl} to ${req.url}`
          )
        }
        next()
      })
    }
  }
}

export default createPlugin

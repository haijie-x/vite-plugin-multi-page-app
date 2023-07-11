import { Plugin } from 'vite'
import history from 'connect-history-api-fallback'
import { globbySync } from 'globby'
import path from 'node:path'

const resolveHtmlRewrites = () => {
  const htmls = globbySync('**/*.html', {
    absolute: false
  })
  const rewrites = htmls
    .map(i => {
      const dir = path.basename(path.dirname(i))
      return {
        from: new RegExp(`^/${dir}(/.*)?$`),
        to: `/${i}`
      }
    })
    .filter(Boolean)

  console.log(rewrites)

  return rewrites
}

const plugin = (): Plugin => {
  return {
    name: 'vite-plugin-multi-page-app',
    configureServer(server) {
      const { middlewares } = server
      middlewares.use(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        history({
          logger: console.log.bind(console),
          htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
          rewrites: resolveHtmlRewrites()
        })
      )
    }
  }
}

export default plugin

import os from 'node:os'
import path from 'node:path'
import fs from 'node:fs'

const isWindows = os.platform() === 'win32'

export const LOG_PREFIX = `[vite-plugin-multi-page-app]`

export function slash(p: string): string {
  return p.replace(/\\/g, '/')
}

export const normalizePath = (id: string): string => {
  return path.posix.normalize(isWindows ? slash(id) : id)
}

export const tryStatSync = (id: string): fs.Stats | undefined => {
  try {
    return fs.statSync(id, { throwIfNoEntry: false })
  } catch {
    // slice
  }
}

export const ensureHtml = (id: string) => {
  const stat = tryStatSync(id)
  if (stat?.isDirectory()) {
    return path.join(id, 'index.html')
  } else if (stat?.isFile()) {
    return id
  }
  throw Error(LOG_PREFIX + ' Cannot find html entry file, please check again')
}

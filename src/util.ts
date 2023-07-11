import os from 'node:os'
import path from 'node:path'

export function slash(p: string): string {
  return p.replace(/\\/g, '/')
}
const isWindows = os.platform() === 'win32'

export function normalizePath(id: string): string {
  return path.posix.normalize(isWindows ? slash(id) : id)
}

export function absolutePath(path: string): string {
  return path.startsWith('/') ? path : `file:///${path}`
}

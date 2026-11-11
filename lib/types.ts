/** Index of the light/dark colour class supplied by upstream. */
export type ColourMode = 0 | 1
export type Colours = [string | null, string | null]

export interface Icon {
  index: number
  icon: string
  colour: Colours
  match: RegExp
  priority: number
  matchPath: boolean
  interpreter: RegExp | null
  scope: RegExp | null
  lang: RegExp | null
  signature: RegExp | null
  getClass(colourMode?: ColourMode | null, asArray?: false): string
  getClass(colourMode: ColourMode | null | undefined, asArray: true): string[]
  getClass(colourMode: ColourMode | null | undefined, asArray: boolean): string | string[]
}

export interface IconTable {
  byName: Icon[]
  byInterpreter: Icon[]
  byLanguage: Icon[]
  byPath: Icon[]
  byScope: Icon[]
  bySignature: Icon[]
}

export type CompiledIcon = [
  icon: string, colour: Colours, match: RegExp, priority?: number,
  matchPath?: boolean | null, interpreter?: RegExp | null,
  scope?: RegExp | null, lang?: RegExp | null, signature?: RegExp | null
]
export type CompiledIconTable = [CompiledIcon[], number[][], Record<string, number>]

export interface IconCache {
  directoryName: Map<string, Icon>
  directoryPath: Map<string, Icon>
  fileName: Map<string, Icon>
  filePath: Map<string, Icon>
  interpreter: Map<string, Icon>
  scope: Map<string, Icon>
  language: Map<string, Icon>
  signature: Map<string, Icon>
}

export interface FileIcons {
  directoryIcons: IconTable
  fileIcons: IconTable
  taggedIcons: Partial<Record<string, Icon>>
  readonly cache: IconCache
  read(table: CompiledIconTable): IconTable
  matchName(name: string, directory?: boolean): Icon | null
  matchPath(path: string, directory?: boolean): Icon | null
  matchLanguage(name: string): Icon | null
  matchScope(name: string): Icon | null
  matchInterpreter(name: string): Icon | null
  matchSignature(data: string): Icon | null
}

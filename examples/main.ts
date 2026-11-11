import fileIcons from '../lib/index'
import type { Icon } from '../lib/index'
import './style.css'

const fallbackLanguages = ['javascript', 'typescript', 'python', 'rust', 'markdown', 'shellscript', 'tsx']
const filenames = ['example.txt', 'example.pdf', 'deno.json', 'shader.gdshader', 'eslint.config.ts']
const prismUrl = 'https://raw.githubusercontent.com/PrismJS/prism/master/components.json'

function createItem (icon: Icon | null, title: string): HTMLDivElement | null {
  if (!icon) return null
  const item = document.createElement('div')
  item.className = 'item'
  const element = document.createElement('span')
  element.classList.add('icon', ...icon.getClass(0, true))
  element.title = title
  item.append(element)
  return item
}

function render (languages: Record<string, string>): void {
  const container = document.querySelector<HTMLDivElement>('#app')
  if (!container) throw new Error('Missing icon container')
  const items = Object.entries(languages).map(([language, title]) => createItem(fileIcons.matchLanguage(language), title))
  items.push(...filenames.map(filename => createItem(fileIcons.matchName(filename), filename)))
  container.replaceChildren(...items.filter((item): item is HTMLDivElement => item !== null))
}

// Render immediately so the demo also works offline.
render(Object.fromEntries(fallbackLanguages.map(language => [language, language])))

async function loadLanguages (): Promise<void> {
  try {
    const response = await fetch(prismUrl, { signal: AbortSignal.timeout(5000) })
    if (!response.ok) throw new Error(`Language list returned ${response.status}`)
    const data: unknown = await response.json()
    if (!data || typeof data !== 'object' || !('languages' in data) || !data.languages || typeof data.languages !== 'object') return
    const languages: Record<string, string> = {}
    for (const [name, value] of Object.entries(data.languages)) {
      if (name !== 'meta' && value && typeof value === 'object' && 'title' in value && typeof value.title === 'string') {
        languages[name] = value.title
      }
    }
    render(languages)
  } catch {
    // Keep the local examples when the optional Prism language list is unavailable.
  }
}

void loadLanguages()

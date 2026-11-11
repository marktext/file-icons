import icons, { type Icon, type FileIcons } from '@marktext/file-icons'

const api: FileIcons = icons
const icon: Icon | null = api.matchLanguage('javascript')
if (icon) {
  const text: string = icon.getClass(0)
  const classes: string[] = icon.getClass(1, true)
  void [text, classes]
}
// @ts-expect-error Matchers require strings.
api.matchName(42)
// @ts-expect-error A match may be null.
const missing: Icon = api.matchLanguage('unknown')
// @ts-expect-error Only the two upstream colour indexes are supported.
icon?.getClass(2)
void missing

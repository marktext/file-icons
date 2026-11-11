import icons = require('@marktext/file-icons')

const icon = icons.matchName('deno.json')
if (icon) {
  const classes: string[] = icon.getClass(0, true)
  void classes
}
// @ts-expect-error Matchers require strings.
icons.matchLanguage(42)

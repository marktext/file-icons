import fileIcons from '../build/index.js'
import '../build/index.css'
import './index.css'

const PRISM_LANGS_URL = 'https://raw.githubusercontent.com/PrismJS/prism/master/components.json'
const FILE_EXTIONS = [
  'txt'
]

const getPrismSupportedLanguages = () => {
  return new Promise((resolve, _) => {
    const oReq = new XMLHttpRequest()
    oReq.addEventListener("load", function () {
      resolve(JSON.parse(this.responseText).languages)
    })
    oReq.open('GET', PRISM_LANGS_URL)
    oReq.send()
  })
}

const main = () => {
  getPrismSupportedLanguages()
    .then(languages => {
      const container = document.querySelector('#app')
      const fragment = document.createDocumentFragment()
      for (const [key, value] of Object.entries(languages)) {
        if (key === 'meta') {
          continue
        }

        const item = document.createElement('div')
        item.classList.add('item')
        const icon = document.createElement('span')
        icon.classList.add('icon')
        const iconClass = fileIcons.matchLanguage(key)
        if (iconClass) {
          icon.classList.add(iconClass.icon)
          if (Array.isArray(iconClass.colour) && iconClass.colour.length) {
            icon.classList.add(iconClass.colour[0])
          }
          icon.setAttribute('title', value.title)
          item.appendChild(icon)
          fragment.appendChild(item)
        }
      }
      for (const ext of FILE_EXTIONS) {
        const item = document.createElement('div')
        item.classList.add('item')
        const icon = document.createElement('span')
        icon.classList.add('icon')
        const iconClass = fileIcons.matchName(`MOCK.${ext}`)
        console.log(iconClass.getClass())
        if (iconClass) {
          icon.classList.add(iconClass.icon === 'icon-file-text' ? 'text-icon' : iconClass.icon)
          if (Array.isArray(iconClass.colour) && iconClass.colour.length) {
            icon.classList.add(iconClass.colour[0])
          }
          icon.setAttribute('title', ext)
          item.appendChild(icon)
          fragment.appendChild(item)
        }
      }
      container.appendChild(fragment)
    })
}

main()

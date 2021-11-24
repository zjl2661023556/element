import svgIcon from './svgIcon.vue'
export default function initSvgIcon (app) {
  app.component('svg-icon', svgIcon)
}
const file = require.context('@/icons/svg', false, /\.svg$/)
file.keys().map(file)

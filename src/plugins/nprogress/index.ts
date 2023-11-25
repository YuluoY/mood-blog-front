import nprogress from 'nprogress'

export default nprogress.configure({
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.3,
  easing: 'ease',
  speed: 500,
})

import nprogress from 'nprogress'
import 'nprogress/nprogress.css';

export default nprogress.configure({
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.3,
  easing: 'ease-in-out',
  speed: 500,
})

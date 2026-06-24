import { track } from '@vercel/analytics'

export function trackStartInput() {
  track('start_input')
}

export function trackShowResult() {
  track('show_result')
}

export function trackBackToInput() {
  track('back_to_input')
}

export function trackResetForm() {
  track('reset_form')
}

export function trackShareClick(method: 'webshare' | 'x' | 'copy') {
  track('share_click', { method })
}

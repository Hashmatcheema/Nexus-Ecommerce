import '@testing-library/jest-dom'

// Framer Motion and other libs use IntersectionObserver; jsdom does not provide it
if (typeof globalThis.IntersectionObserver === 'undefined') {
  globalThis.IntersectionObserver = class IntersectionObserver {
    observe = () => null
    unobserve = () => null
    disconnect = () => null
    root = null
    rootMargin = ''
    thresholds = []
  }
}

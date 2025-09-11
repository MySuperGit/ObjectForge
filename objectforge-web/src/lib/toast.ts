export function showToast(msg: string) {
  if (typeof document === 'undefined') return
  const div = document.createElement('div')
  div.textContent = msg
  div.className = 'fixed top-4 left-1/2 -translate-x-1/2 bg-fg-1 text-fg-white px-3 py-2 rounded shadow-card'
  document.body.appendChild(div)
  setTimeout(() => div.remove(), 3000)
}

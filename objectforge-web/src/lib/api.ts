export const api = {
  get: (url: string, options?: RequestInit) =>
    fetch(`/api${url}`, options).then((r) => r.json()),
  removeBg: (file: File) => {
    const fd = new FormData()
    fd.append('file', file)
    return fetch('/api/v1/bg/remove', { method: 'POST', body: fd }).then((r) =>
      r.blob()
    )
  }
}

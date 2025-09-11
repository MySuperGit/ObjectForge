async function handleJson(res: Response) {
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || res.statusText)
  }
  return res.json()
}

export const api = {
  get: (url: string, options?: RequestInit) =>
    fetch(`/api${url}`, options).then(handleJson),
  removeBg: (file: File) => {
    const fd = new FormData()
    fd.append('image_file', file)
    return fetch('/api/v1/bg/remove', { method: 'POST', body: fd }).then((r) => {
      if (!r.ok) throw new Error('bg remove failed')
      return r.blob()
    })
  }
}

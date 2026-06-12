const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

async function apiFetch(path, options = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('rahyan-os-token') : null

  const res = await fetch(`${BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.error || `API error ${res.status}`)
  return data
}

export const api = {
  get: (path) => apiFetch(path),
  post: (path, body) => apiFetch(path, { method: 'POST', body: JSON.stringify(body) }),
  put: (path, body) => apiFetch(path, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (path) => apiFetch(path, { method: 'DELETE' }),
}

export async function getSignedUploadUrl(folder) {
  return api.post('/api/v1/admin/upload/sign', { folder })
}

export async function uploadToCloudinary({ file, signedData }) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('api_key', signedData.api_key)
  formData.append('timestamp', signedData.timestamp)
  formData.append('signature', signedData.signature)
  formData.append('folder', signedData.folder)

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${signedData.cloud_name}/image/upload`,
    { method: 'POST', body: formData }
  )
  const data = await res.json()
  if (!res.ok) throw new Error(data.error?.message || 'Upload failed')
  return { url: data.secure_url, public_id: data.public_id }
}

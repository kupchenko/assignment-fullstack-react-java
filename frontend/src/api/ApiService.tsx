const BACKEND_URL = 'http://localhost:8080'
export const callPost = async (url: string, body: any) => {
  return fetch(`${BACKEND_URL}${url}`, {
    headers: {
      ['Content-Type']: 'application/json',
    },
    body: JSON.stringify(body),
    method: 'POST',
  })
}

export const callGet = (url: string) => {
  return fetch(`${BACKEND_URL}${url}`)
}
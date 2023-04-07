import { getSession } from "./auth"

export const getFullUrl = (url: string) => {
  return process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}${url}` : url
}

export const getAuthorization = () => {
  const jwt = getSession()
  return jwt ? { Authorization: `Bearer ${jwt}` } : {}
}

export const buildOptions = (useAuth: boolean) => {
  const headers: any = {
    'Content-Type': 'application/json',
  };

  const auth = getAuthorization()
  if (useAuth && auth.Authorization) {
    headers.Authorization = auth.Authorization
  }

  return headers
}

export const fetchGet = async (url:string, useAuth=true) => {
  const fullUrl = getFullUrl(url)
  const res = await fetch(fullUrl, { method: 'GET', headers: buildOptions(useAuth) })
  const json = await res.json()
  if (res.status !== 200) {
    console.log(json.message)
    throw Error(json.message)
  }
  return json
}

export const fetchPost = async (url:string, body: any, useAuth=true) => {
  const fullUrl = getFullUrl(url)
  const res = await fetch(fullUrl, {
    method: 'POST',
    headers: buildOptions(useAuth),
    body: JSON.stringify(body),
  })
  const json = await res.json()
  if (res.status !== 200 && res.status !== 201) {
    throw new Error(json.message)
    throw json.message
    // console.error(json.message)
  }
  return json
}

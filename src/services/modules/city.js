import myRequest from '../request'

export function getCityAll() {
  return myRequest.get({
    url: '/city/all'
  })
} 
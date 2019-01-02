export default ({ $axios, redirect }) => {
  $axios.onResponse(res => {
    console.log('response interceptor res.config.url', res.config.url)
    console.log('response interceptor res.data', res.data)
  })
}
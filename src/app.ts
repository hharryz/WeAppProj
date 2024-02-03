import { PropsWithChildren } from 'react'
import Taro, { useLaunch } from '@tarojs/taro'
import './app.scss'

function App({ children }: PropsWithChildren<any>) {

  useLaunch(() => {
    Taro.cloud.init({
      env: ''
    })

    console.log('App launched.')
  })

  // children 是将要会渲染的页面
  return children
}

export default App

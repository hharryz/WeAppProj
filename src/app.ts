import React, { PropsWithChildren } from 'react'
import Taro, { useLaunch } from '@tarojs/taro'
import './app.scss'
import '@nutui/nutui-react-taro/dist/style.css'

function App({ children }: PropsWithChildren<any>) {
  // const [ userid, setUserid ] = React.useState(0)

  useLaunch(() => {
    Taro.cloud.init({
      env: 'cloud1-7g7hsu6p65fc0729'
    })

    // const res = Taro.cloud.callContainer({
    //   "config": {
    //     "env": "prod-7gbkokc9486b1064"
    //   },
    //   "path": "/api/login",
    //   "header": {
    //     "X-WX-SERVICE": "myapp-demo",
    //     "content-type": "application/json"
    //   },
    //   "method": "POST",
    //   // "method": "GET",
    //   "data": {
    //     "name": "Matilda's",
    //     "avatar": "https://www.baidu.com",
    //     "code": "123456",
    //   }
    // })
    // console.log(res)

    console.log('App launched.')
  })


  // children 是将要会渲染的页面
  return children
}

export default App

import { View, Text } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import './index.scss'

export default function Index() {

  useLoad(() => {

    const res = Taro.cloud.callContainer({
      config: {
        env: 'prod-7gbkokc9486b1064',
      },
      path: '/',
      method: 'GET',
      header: {
        'X-WX-SERVICE': 'mybackend',
      },
    });
    console.log(res)

    console.log('Page loaded.')
  })

  return (
    <View className='index'>
      <Text>Hello world!</Text>
    </View>
  )
}

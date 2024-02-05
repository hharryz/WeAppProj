import { View, Text } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import './index.scss'
import React, {useState} from 'react'
import { CalendarCard } from '@nutui/nutui-react-taro'

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

    const renderDayTop = (day) => {
      return day.date === 8 ? '☺' : ''
    }
    const renderDay = (day) => {
      return day.date <= 9 ? `0${day.date}` : day.date
    }
    const renderDayBottom = (day) => {
      return day.date === 8 ? '节日' : ''
    }

  return (
    <div>
      <View className='index'>
        <Text>Hello world!</Text>
      </View>
      <CalendarCard
        renderDayTop={renderDayTop}
        renderDay={renderDay}
        renderDayBottom={renderDayBottom}
      />
    </div>
  )
}

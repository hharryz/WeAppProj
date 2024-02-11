import { ConfigProvider, CalendarCard, Sticky, Button } from '@nutui/nutui-react-taro'
import { View, Text } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import Collapse from '../../components/collapse/collapse'
import React, {useState} from 'react'

import './index.scss'

export default function Index() {

  useLoad(() => {

    // const res = Taro.cloud.callContainer({
    //   config: {
    //     env: 'prod-7gbkokc9486b1064',
    //     },
    //     path: '/',
    //     method: 'GET',
    //     header: {
    //       'X-WX-SERVICE': 'mybackend',
    //     },
    //   });
    //   console.log(res)

      console.log('Page loaded.')
    })

    const calendarTheme = {
      nutuiColorPrimary: '#5d6fbb',
      nutuiCalendarActiveBackgroundColor: '#5d6fbb',
      nutuiCalendarDayActiveBorderRadius: '20px',
    }

    const date = new Date();
    const onChange = (val) => {
      console.log(val);
    };

    // const day = {
    //   date: 8,
    //   type: 'normal',
    //   selected: false,
    //   disabled: false,
    //   bottomInfo: '节日'
    // }

    const renderDayTop = (day) => {
      let val;
      switch (day.date) {
        case 8:
          val = '☺';
          break;
        case 9:
          val = '☹';
          break;
        default:
          val = '';
          break;
      }
      return val;
    }
    const renderDay = (day) => {
      return day.date <= 9 ? `0${day.date}` : day.date
    }
    const renderDayBottom = (day) => {
      return day.date === 8 ? '节日' : ''
    }

  return (
    <div className='page'>
      <View className='index'>
        <Text>Hello world!</Text>
      </View>
      <div className='calendar-wrapper'>
        <ConfigProvider theme={calendarTheme}>
          <CalendarCard
            defaultValue={date} 
            onChange={onChange}
            renderDayTop={renderDayTop}
            renderDay={renderDay}
            renderDayBottom={renderDayBottom}
          />
        </ConfigProvider>
      </div>
      <Collapse /><Collapse /><Collapse /><Collapse />
      <Sticky threshold={0} position='bottom'>
        <Button type='primary'>搜索与收藏</Button>
      </Sticky>
    </div>
  )
}

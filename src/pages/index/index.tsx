import { ConfigProvider, CalendarCard, Sticky, Button, Avatar, Tag } from '@nutui/nutui-react-taro'
// import { View, Text } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState, useEffect } from 'react'
import Collapse from '@/components/collapse/collapse'
import './index.scss'

export interface Todo {
  id: number;
  deadline: string;
  topic: string;
  content: string;
  done: boolean;
}

export default function Index() {
  
  useLoad(() => {
    // Taro.getStorage({
    //   key: 'userid',
    //   success: function (res) {
    //     console.log(res.data)
    //   }
    // })
    // const res = Taro.cloud.callContainer({
    //   "config": {
    //     "env": "prod-7gbkokc9486b1064"
    //   },
    //   "path": `/api/todo`,
    //   "header": {
    //     "X-WX-SERVICE": "myapp-demo",
    //     // "X-WX-OPENID": "2",
    //     "content-type": "application/json"
    //   },
    //   "method": "GET",
    //   // "method": "GET",
    //   "data": {
    //     // "userid": 2,
    //     "deadline": "2024-02-17 10:10:14",
    //     "topic": "hahaaaa",
    //     "content": "faeafeaffa",
    //     "done": false,
    //   }
      // "data": {
        // "id": 7,
        // "userid": 3,
        // "time": "2024-02-17 10:10:10",
        // "tag": "hahaaaa",
        // "mark": 2,
        // "share": true,
        // "star": true,
        // "content": "“当她一个人走在空空的路上，空空的草地里，空空的山谷，走啊走啊的时候，她心里会不停地想到什么呢？那时她也如同空了一般。又由于永远也不会有人看到她这副赤裸的样子，她也不会为“有可能会被人看见”而滋生额外的羞耻之心。她脚步自由，神情自由。自由就是自然吧？而她又多么孤独。自由就是孤独吧？而她对这孤独无所谓，自由就是对什么都无所谓吧？”"
      // }
    // })

    // console.log(res)

    console.log('Page loaded.')
  })

  // const [todoNum, setTodoNum] = useState<number>(0)
  const [todoList, setTodoList] = useState<Todo[]>([])

  useEffect(() => {
    const getTodos = () => {
      Taro.cloud.callContainer({
        "config": {
          "env": "prod-7gbkokc9486b1064"
        },
        "path": `/api/todo`,
        "header": {
          "X-WX-SERVICE": "myapp-demo",
          "content-type": "application/json"
        },
        "method": "GET",
      }).then(res => {
        console.log(res.data)
        setTodoList( res.data.data.map((item: any) => {
          // if 
          const todo: Todo = {
            id: item.id,
            deadline: item.deadline,
            topic: item.topic,
            content: item.content,
            done: item.done
          }
          return todo
        }))
        console.log("todoList refreshed.")
        // setTodoNum(todoList.length)
      }).catch(err => {
        console.log(err)
      })
    }
    getTodos()
  }, [])

  // getTodos()

    const calendarTheme = {
      nutuiColorPrimary: '#5d6fbb',
      nutuiCalendarActiveBackgroundColor: '#5d6fbb',
      nutuiCalendarDayActiveBorderRadius: '20px',
    }

    const buttonTheme = {
      margin: '8',
      nutuiButtonDefaultColor: '#fff',
      nutuiButtonDefaultBackgroundColor: '#5d6fbb',
      nutuiButtonDefaultBorderColor: '#5d6fbb',
    }

    const marginStyle = { margin: 8 }

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

    const ButtonOnChange = () => {
      console.log('Button clicked.')
      Taro.navigateTo({
        url: '/pages/moments/moments'
      })
    }
    const [avatar, setAvatar] = useState<string>('https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0')
    const ChooseAvatar = (e) => {
      console.log('Avatar clicked.', e.detail)
      setAvatar(e.detail.avatarUrl)
    }
    const [isChanged, setIsChanged] = useState<boolean>(false)
    const onChangeTo = () => {
      setIsChanged(!isChanged)
      console.log('Button clicked.')
    }
    const unchangedCard = () => {
      return (<div className='mycard'>
                <div className='namecard-wrapper'>
                  <Button className='avatar-wrapper' openType='chooseAvatar' onChooseAvatar={ChooseAvatar} hoverClass='none'>
                    <Avatar src={avatar} size='large'></Avatar>
                  </Button>
                  <div className='myinfo'>
                    <input className='nickname' type='nickname' placeholder='请输入昵称' />
                    <div className='tag'><Tag>0217</Tag></div>
                  </div>
                  <Button onClick={onChangeTo} style={{
                    margin: 8,
                    '--nutui-button-default-border-color': '#5d6fbb',
                    '--nutui-button-default-color': '#fff',
                    '--nutui-button-default-background-color': '#5d6fbb',
                  }}>加入圈子</Button>
                </div>
              </div>)
    }

    const changedCard = () => {
      return (
        <div className='change-card'>
          <div className='box'><input placeholder='Code' /></div>
            <Button onClick={onChangeTo} style={{
                    margin: 8,
                    '--nutui-button-default-border-color': '#5d6fbb',
                    '--nutui-button-default-color': '#fff',
                    '--nutui-button-default-background-color': '#5d6fbb',
                  }}>确认</Button>
            <Button onClick={onChangeTo} style={{
                    margin: 8,
                    '--nutui-button-default-border-color': '#5d6fbb',
                    '--nutui-button-default-color': '#fff',
                    '--nutui-button-default-background-color': '#5d6fbb',
                  }}>取消</Button>
        </div>
      )
    }

  return (
    <div className='page'>
      { isChanged ? changedCard() : unchangedCard()}
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
      { todoList.map((todo: Todo) => {
        return <Collapse todo={todo} key={todo.id} />
      })}
      <Sticky threshold={0} position='bottom'>
        <Button onClick={ButtonOnChange} size='large'
          style={{
            margin: 8,
            '--nutui-button-default-border-color': '#5d6fbb',
            '--nutui-button-large-font-size': '15px',
            '--nutui-button-default-color': '#fff',
            '--nutui-button-default-background-color': '#5d6fbb',
        }}>搜索与收藏</Button>
      </Sticky>
    </div>
  )
}

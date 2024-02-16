import { ConfigProvider, CalendarCard, Sticky, Button, Avatar, Tag } from '@nutui/nutui-react-taro'
// import { View, Text } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState, useEffect } from 'react'
import Collapse from '@/components/collapse/collapse'
import { Input }from '@tarojs/components'
import './index.scss'
import { get } from 'http'

export interface Todo {
  id: number;
  deadline: string;
  topic: string;
  content: string;
  done: boolean;
}

export interface Note {
  id: number;
  time: string;
  tag: string;
  mark: number;
  share: boolean;
  star: boolean;
  content: string;
}

export default function Index() {
  
  useLoad(() => {
    getTodos()
    getUserInfo()
    console.log('Page loaded.')
  })

  const [myuserId, setMyuserId] = useState<string>('')
  const getUserInfo = () => {
    Taro.cloud.callContainer({
      "config": {
        "env": "prod-7gbkokc9486b1064"
      },
      "path": "/api/login?me=true",
      "header": {
        "X-WX-SERVICE": "myapp-demo",
        "content-type": "application/json"
      },
      "method": "GET",
    }).then(res => {
      console.log(res.data)
      setAvatar(res.data.data.avatar)
      setNicknameValue(res.data.data.name)
      setCodeValue(res.data.data.code)
      setMyuserId(res.data.data.userid)
    }).catch(err => {
      console.log(err)
    })
  }


  const getTodos = async () => {
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
    }).catch(err => {
      console.log(err)
    })
  }

  const [todoList, setTodoList] = useState<Todo[]>([])

  const displayTodos = () => {
    return todoList.map((todo: Todo) => {
      var todoDate = parseInt(todo.deadline.slice(0, 4)) + '-' + parseInt(todo.deadline.slice(4, 6)) + '-' +  parseInt(todo.deadline.slice(6, 8))
      // console.log("1", todoDate, "2", chooseDate)
      if (chooseDate == "" && new Date() < new Date(todoDate)) {
        return <Collapse todo={todo} key={todo.id} />
      } else if (chooseDate == todoDate) {
        return <Collapse todo={todo} key={todo.id} />
      }
    })
  }

    const calendarTheme = {
      nutuiColorPrimary: '#5d6fbb',
      nutuiCalendarActiveBackgroundColor: '#5d6fbb',
      nutuiCalendarDayActiveBorderRadius: '20px',
    }

    var accDate = new Date()
    var today = accDate.getFullYear() + '-' + (accDate.getMonth() + 1) + '-' + accDate.getDate()
    const [chooseDate, setChooseDate] = useState<string>(today)
    const onChange = (val: Date) => {
      if (val == null) { 
        setChooseDate("") 
      } else {
        setChooseDate(val.getFullYear() + '-' + (val.getMonth() + 1) + '-' + val.getDate())
      }
      console.log(val);
    };

    const renderDayTop = (day) => {
      if (day.year == accDate.getFullYear() && day.month == accDate.getMonth() + 1 && day.date == accDate.getDate()) {
        return '●'
      }
    }
    const renderDay = (day) => {
      return day.date <= 9 ? `0${day.date}` : day.date
    }
    const renderDayBottom = (day) => {
      var thing = false
      todoList.map((item) => {
        if (parseInt(item.deadline.slice(0, 4)) == day.year && parseInt(item.deadline.slice(4, 6)) == day.month 
            && parseInt(item.deadline.slice(6, 8)) == day.date) {
          thing = true
        }
      })

      return thing? '▲' : ''
    }

    const ButtonOnChange = () => {
      console.log('Button clicked.')
      Taro.navigateTo({
        url: '/pages/new/new'
      })
    }
    const [avatar, setAvatar] = useState<string>('https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0')
    const ChooseAvatar = (e) => {
      console.log('Avatar clicked.', e.detail)
      Taro.cloud.uploadFile({
        cloudPath: `avatar/${myuserId}.png`, // 对象存储路径，根路径直接填文件名，文件夹例子 test/文件名，不要 / 开头
        filePath: e.detail.avatarUrl, // 微信本地文件，通过选择图片，聊天文件等接口获取
        config: {
          env: 'prod-7gbkokc9486b1064' // 需要替换成自己的微信云托管环境ID
        }
      }).then(res => {
        console.log(res.fileID)
        setAvatar(res.fileID)
        Taro.cloud.callContainer({
          "config": {
            "env": "prod-7gbkokc9486b1064"
          },
          "path": "/api/login",
          "header": {
            "X-WX-SERVICE": "myapp-demo",
            "content-type": "application/json"
          },
          "method": "POST",
          "data": {
            "name": nicknameValue,
            "avatar": avatar,
            "code": codeValue,
          }
        })
      }).catch(error => {
        console.error(error)
      })
    }

    useEffect(() => {
      console.log('Avatar changed.')
    }, [avatar])

    const [nicknameValue, setNicknameValue] = useState<string>('')
    const handleNicknameChange = (event) => {
      console.log(event.detail.value)
      setNicknameValue(event.detail.value)
    }

    const [codeValue, setCodeValue] = useState<string>('')
    const handleCodeChange = (event) => {
      console.log(event.detail.value)
      setCodeValue(event.detail.value)
    }

    const [isChanged, setIsChanged] = useState<boolean>(false)
    const onChangeTo = () => {
      setIsChanged(!isChanged)
      console.log('Button clicked.')
    }

    const onConfirmLogin = () => {
      setIsChanged(!isChanged)
      console.log('Button clicked.')
      const res = Taro.cloud.callContainer({
        "config": {
          "env": "prod-7gbkokc9486b1064"
        },
        "path": "/api/login",
        "header": {
          "X-WX-SERVICE": "myapp-demo",
          "content-type": "application/json"
        },
        "method": "POST",
        "data": {
          "name": nicknameValue,
          "avatar": avatar,
          "code": codeValue,
        }
      })
      console.log(res)
    }

    const unchangedCard = () => {
      return (<div className='mycard'>
                <div className='namecard-wrapper'>
                  <Button className='avatar-wrapper' openType='chooseAvatar' onChooseAvatar={ChooseAvatar} hoverClass='none'>
                    <Avatar src={avatar} size='large'></Avatar>
                  </Button>
                  <div className='myinfo'>
                    <Input className='nickname' type='nickname' placeholder='请输入昵称' onInput={handleNicknameChange} value={nicknameValue} />
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
          <div className='box'><Input className='input-box' placeholder='Code' value={codeValue} onInput={handleCodeChange} /></div>
            <Button onClick={onConfirmLogin} style={{
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
            defaultValue={new Date()} 
            onChange={onChange}
            renderDayTop={renderDayTop}
            renderDay={renderDay}
            renderDayBottom={renderDayBottom}
          />
        </ConfigProvider>
      </div>
      { displayTodos() }
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

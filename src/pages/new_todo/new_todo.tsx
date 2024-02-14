import './new_todo.scss'
import Taro from '@tarojs/taro'
import  React, { useState, useEffect} from "react";
import {  ConfigProvider,Cell,Button, TextArea, Uploader, DatePicker } from '@nutui/nutui-react-taro';
import { Dongdong } from '@nutui/icons-react-taro';
import moment from 'moment';
import { TARGET } from '@tarojs/runtime';



export default function Form() {

  var usrID = '0001', ID = 1;
  var NewOrEdit = false;//false == new; true == edit;
  const [done, setDone] = useState(false);
  const [note, setNote] = useState({
    topic: '',
    content: ''
  });

  const [show1, setShow1] = useState(false)
  const [desc1, setDesc1] = useState('2024年 02月 12日')
  const confirm1 = (values:(string|number)[],options:PickerOption[])=>{
    setDesc1(options.map((option) => option.text).join(' '))
  }
  const [show2, setShow2] = useState(false)
  const [desc2, setDesc2] = useState('12:00')
  const confirm2 = (values:(string|number)[],options:PickerOption[])=>{
    setDesc2(options.map((option) => option.text).join(':'))
  }


  const themeTA = {
    nutuiColorPrimary: 'black',
    nutuigray6: 'black',
    nutuigray4: 'black',
    nutuiColorPrimaryStop1: 'purple',
    nutuiColorPrimaryStop2: 'purple',
    nutuitextareapadding: '5px 25px',
  }
  const marginStyle = { margin: 8 }



  var date='';
  if(date == '')
    date = moment().format('YYYYMMDD');

  function TopicChange(e) {
    setNote({
      ...note,
      topic: e.target.value
    });
  }

  const uploadUrl = 'https://my-json-server.typicode.com/linrufeng/demo/posts'
  const onStart = () => {
    console.log('start 触发')
  }


  const ClickDone = () => {
    if (done == false)
        setDone(true);
    else
        setDone(false);
  }

  const ClickFinishTODO = () => {
    Taro.cloud.init()
    const db = Taro.cloud.database();
    const id = '1'; 
    const data = {
      key: 'hello there?'
    };

    // 更新数据库
    db.collection(usrID).doc(id).update({
      data: data,
      success: function(res) {
        console.log('数据存入成功');
      },
      fail: function(err) {
        console.log('数据存入失败');
      }
    })

    Taro.switchTab({
      url: '../index/index'
    });
  }

  const ClickChange = () => {
    Taro.switchTab({url: '../new/new'});
}


//   function ContentChange(e) {
//     setNote({
//       ...note,
//       content: e.target.value
//     });
//   }



  return (
    <div style={{ backgroundColor: 'grey' }}>
    <div className='container_todo'>
      <div className='c_header'>
        <div className='col_container'>
          <div className='col1'>
            <Button onClick={ClickFinish} fill="none" style={marginStyle}>完成</Button>
          </div>
          <div className='col2'></div>
          <div className='col2'></div>
          <div className='col2' onClick={ClickChange}>
            <img src={require('../../assets/icon/tonote.png')} className='c_icon_to' />
          </div>
        </div>
      </div>

      <div className='c_title'>
        Title: <input value={note.topic} onChange={TopicChange}></input>
      </div>
      
      <div className='c_content'>
      <Cell title="选择待办事项日期" description={desc1} onClick={() => setShow1(true)} />
      <DatePicker
        title="选择待办事项日期"
        visible={show1}
        showChinese
        onClose={() => setShow1(false)}
        onConfirm={(options, values) => confirm1(values,options)}
      />        
      </div>
      <div className='c_content'>
      <Cell title="选择时间（可选）" description={desc2} onClick={() => setShow2(true)} />
      <DatePicker
          title="选择时间"
          type="hour-minutes"
          visible={show2}
          onClose={() => setShow2(false)}
          onConfirm={(options, values) => confirm2(values,options)}
        />
      </div>

      <div className='c_content'>
        Details: {date};
        <ConfigProvider theme={themeTA}>
          <TextArea rows={5}   />
        </ConfigProvider>
        
      </div>
      <div className='c_content'>
      <Uploader
        url={uploadUrl}
        uploadLabel="upload your pics"
        onStart={onStart}
        style={{ marginRight: '10px' }}
      />
      </div>

      
      <div>
        <div className="c_footer">
          <div className="col_container">
            <div className="col1">
              {date}
            </div>
            <div className="col3">
              完成状况
            </div>
            <div className='col2' onClick={ClickDone}>
            { ( done == true ) &&
              <img src={require('../../assets/icon/finish.png')} className='c_icon_finish' />
            }
            { ( done == false ) &&
              <img src={require('../../assets/icon/unfinish.png')} className='c_icon_finish' />
            }
          </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

// export default function Chat() {
//   const [text, setText] = useState({text: ''});

//   function TextChange (e){
//     setText({
//         text: e.target.value
//     })
//   }

//   return (
//     <section className="chat">
//       <textarea
//         value={text}
//         placeholder={'Chat to ' + 'syp'}
//         onChange={TextChange}
//       />
//       <br />
//       <button>发送给 syp</button>
//     </section>
//   );
// }


// // MyPage.tsx
// import React, { useState } from 'react'
// import { View, Input, Text, Image, Picker } from '@tarojs/components'
// import './new.scss'

// const MyPage = () => {

//   const [topic, setTopic] = useState('');
//   const [tag, setTag] = useState('');
//   const tags = ['1', '2', '3', '4', '5', '6', '7'];
//   const [detail, setDetail] = useState('');

//   return (
//     <View className='container'>
//       <Image src='' className=''/>
//       <Text>Topic: </Text>
//       <Input value={topic} onInput={(e) => setTopic(e.target.value)}  className='input'/>
//       <Text>Tag: </Text>
//       <Picker mode='selector' range={tags} onChange={(e) => setTag(tags[e.detail.value])}>
//         <View>{tag || '______'}</View>
//       </Picker>
//       <Text>Detail: </Text>
//       <Input value={detail} onInput={(e) => setDetail(e.target.value)} className='input' type='textarea'/>
//     </View>
//   )
// }

// export default MyPage;
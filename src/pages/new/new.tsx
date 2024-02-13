import './new.scss'
import Taro from '@tarojs/taro'
import  React, { useState, useEffect} from "react";
import {  ConfigProvider,Picker,Cell,Rate,Button, TextArea, Uploader, Tag, ActionSheet } from '@nutui/nutui-react-taro';
import { Dongdong } from '@nutui/icons-react-taro';
import moment from 'moment';
import { TARGET } from '@tarojs/runtime';




export default function Form() {
  
  var usrID = '0001', ID = 1;
  const [mark, setMark] = useState(false);
  const [share, setShare] = useState(false);
  const [tag, setTag] = useState('');
  const [note, setNote] = useState({
    topic: '',
    content: ''
  });


  const [visible, setVisible] = useState(false)
  const [baseDesc, setBaseDesc] = useState(tag)
  const listData1 = [
    [
      { value: 1, text: 'note',},
      { value: 2, text: 'music',},
      { value: 3, text: 'film',},
      { value: 4, text: 'book',},
      { value: 5, text: 'other',}
    ],
  ]
  const changePicker = (list: any[], option: any, columnIndex: number) => {
    console.log(columnIndex, option)
  }
  const confirmPicker = (options: PickerOption[], values: (string | number)[]) => {
    let description = ''
    options.forEach((option: any) => {
      description += option.text
    })
    setBaseDesc(description)
    setTagText(description)
  }

  const [isEditing, setIsEditing] = useState(false);
  const [tagText, setTagText] = useState('');
  function handleTagClick() {
    // if (tag === 'other')
    setIsEditing(true);
  }
  function handleInputChange(e) {
    setTagText(e.target.value);
  }
  function handleInputBlur() {
    setIsEditing(false);
  }

  const [isVisible1, setIsVisible1] = useState(true);
  function NewNote() {
    setIsVisible1(false);
  }
  function NewTodo() {
    setIsVisible1(false);
    Taro.navigateTo({ url: '/pages/new_todo/new_todo' });
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


  var tagBackgroundClass;
  var date='';
  if(date == '')
    date = moment().format('YYYYMMDD');

  if (tag == 'music'){
    tagBackgroundClass = 'container_music';
  } else if (tag == 'film'){
    tagBackgroundClass = 'container_film';
  } else if (tag == 'book'){
    tagBackgroundClass = 'container_book';
  }else
    tagBackgroundClass = 'container_note';


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

  const ClickMark = () => {
    if (mark == false)
        setMark(true);
    else
        setMark(false);
  }
  const ClickShare = () => {
    if (share == false)
        setShare(true);
    else
        setShare(false);
  }

  const ClickFinish = () => {
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

//   function ContentChange(e) {
//     setNote({
//       ...note,
//       content: e.target.value
//     });
//   }

  useEffect(() => {
    setTag(baseDesc);
  }, [baseDesc]);

  return (
    <div style={{ backgroundColor: 'grey' }}>
    <div className={tagBackgroundClass}>
      <div className='c_header'>
        <div className='col_container'>
          <div className='col1'>
            <Button onClick={ClickFinish} fill="none" style={marginStyle}>finish!!!</Button>
          </div>
          <div className='col2' onClick={ClickMark}> 
            { ( mark == true ) &&
              (<div className='c_unmark' >收藏0</div>)
            }
            { ( mark == false ) &&
              (<div className='c_mark' >收藏1</div>)
            }
          </div>
          <div className='col2' onClick={ClickShare}>
            { ( share == true ) &&
              (<div className='c_unlock' >私密0</div>)
            }
            { ( share == false ) &&
              (<div className='c_lock' >私密1</div>)
            }
          </div>
          
        </div>
      </div>
      <div className='c_title'>
        Title: <input value={note.topic} onChange={TopicChange}></input>
      </div>
      <div className='c_picker'>
        <Cell title="#Tag:" description={baseDesc} onClick={() => setVisible(!visible)}/>
        <Picker
          visible={visible}
          options={listData1}
          onConfirm={(list, values) => confirmPicker(list, values)}
          onClose={() => setVisible(false)}
          onChange={changePicker}
         />
      </div>
      <div>
        { ( tag === 'film' || tag === 'book' || tag === 'music' ) &&
            (<div className='c_picker' >Rating: <Rate allowHalf defaultValue={0} /></div>)
        }
      </div>
      
      <div className='c_content'>
        Content: {tag};{date};
        <ConfigProvider theme={themeTA}>
          <TextArea rows={1}   />
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
      <ActionSheet
        visible={isVisible1}
        cancelText='cancel'
        // cancelText={translated['2cd0f3be']}
        onSelect={() => {
          setIsVisible1(false)
        }}
        onCancel={() => setIsVisible1(false)}
      >
        <div style={{ textAlign: 'left', padding: '10px 20px' }} onClick={NewNote}>
          新建笔记
        </div>
        <div style={{ textAlign: 'left', padding: '10px 20px' }} onClick={NewTodo}>
          新建代办
        </div>
      </ActionSheet>
      {/* <img src="https://github.com/hharryz/WeAppProj/blob/add/src/assets/icon/star.png" alt="1" /> */}
      <div>
        <div className="c_footer">
          <div className="col_container">
            <div className="col1">
              {date}
            </div>
            <div className="col2">

            </div>
            <div className="col2">
            {isEditing ? (
              <input value={tagText} onChange={handleInputChange} onBlur={handleInputBlur} />
                ) : (
              <Tag background="#FA2400" plain onClick={handleTagClick}>{tagText}</Tag>
            )}
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
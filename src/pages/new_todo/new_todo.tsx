import './new_todo.scss'
import moment from 'moment';
import Taro , { useRouter } from '@tarojs/taro'
import  React, { useState, useEffect} from "react";
import {  ConfigProvider,Picker,Cell,Rate,Button,TextArea,Uploader,Tag,Tabs,DatePicker } from '@nutui/nutui-react-taro';
//import {  ConfigProvider,Cell,Button, Animate } from '@nutui/nutui-react-taro';


export default function PageB() {

  // var & const & moment
  var usrID = 15;
  var tagBackgroundClass;
  var time;
  var date_d;
  var dateY;
  var dateM;
  var dateD;
  var date_note = moment().format('YYYYMMDD');
  var date_todo = moment().format('YYYY年 MM月 DD日');
  const [ID, setID] = useState('0');
  const [tag, setTag] = useState('');
  const [mark, setMark] = useState(0);
  const [page, setPage] = useState('0');              //'0' == note; '1' == todo;
  const [like, setLike] = useState(111);
  const [star, setStar] = useState(false);
  const [date, setDate] = useState(date_note);
  const [share, setShare] = useState(false);
  const [topic, setTopic] = useState('');
  const [isdone, setIsdone] = useState(false);
  const [NewOrEdit, setNE] = useState(false);         //false == new; true == edit;
  const [contentNote, setContentNote] = useState('')
  const [contentTodo, setContentTodo] = useState('')
   
  // part of reading
    const router = useRouter()
    const { param1, param2 } = router.params
    useEffect(() => {
      console.log('param1: ', param1)
      console.log('param2: ', param2)
      if (param1 == 'note'){
        setPage('0');
        var h = param2 == null ? '0' : param2;
        console.log('pageis: ' + page + ' id: ' + ID + h);
        GetNote(h);
      } else {
        setPage('1');
        var h = param2 == null ? '0' : param2
        console.log('pageis: ' + page + ' id: ' + ID + h);
        GetTodo(h);
      }
    }, [param1, param2])

  // theme
  const themeTA = {
    nutuiColorPrimary: '#fafafa',
    nutuiGray4: '#fafafa',
    nutuiGray5: '#fafafa',
    nutuiBlack3: '#fafafa',
    nutuiTextareaPadding: '10px 15px',
  }
  const themeHT = {
    nutuiTabsTitlesBackgroundColor: '#fafafa',
    nutuiTabsTitlesItemActiveColor: '#b4746b',
    nutuiTabsTitlesTtemActiveFontWeight: '$font-weight-bold',
  }
  const themeHB = {
    nutuiButtonDefaultColor: '#f3eeea',
    nutuiButtonDefaultFontWeight: '$font-weight-bold',
  }
  const themeC = {
    nutuiCellBorderRadius: '500px',
    nutuiCellBoxShadow: '10px 10px 10px 10px rgba(237, 238, 241, 1)',
    nutuiCellBackgroundColor: '#fafafa',
  }
  

  // picker of tag
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
    //console.log(columnIndex, option)
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
  const [tagText, setTagText] = useState('tag');
  function handleTagClick() {
   if (tag === 'other')
    setIsEditing(true);
  }
  function handleInputChange(e) {
    setTagText(e.target.value);
  }
  function handleInputBlur() {
    setIsEditing(false);
  }

  if (page == '1'){
    tagBackgroundClass = 'container_todo';
  }else if (tag == 'music'){
    tagBackgroundClass = 'container_music';
  } else if (tag == 'film'){
    tagBackgroundClass = 'container_film';
  } else if (tag == 'book'){
    tagBackgroundClass = 'container_book';
  }else
    tagBackgroundClass = 'container_note';
  

  // picker of date/time
  const [show1, setShow1] = useState(false)
  const [desc1, setDesc1] = useState('2024年 01月 01日')
  const confirm1 = (values:(string|number)[],options:PickerOption[])=>{
    setDesc1(options.map((option) => option.text).join(' '))
  }
  const [show2, setShow2] = useState(false)
  const [desc2, setDesc2] = useState('00:00')
  const confirm2 = (values:(string|number)[],options:PickerOption[])=>{
    setDesc2(options.map((option) => option.text).join(':'))
  }
  time = desc1+desc2;
  time=time.replace(/年|月|日|:|\s+/g, "");
  

  // click button
  
    const ClickDelete = () => {
      setBaseDesc('')
      setTagText('')
      setTag('')
      setTopic('')
      setContentNote('')
      setContentTodo('')
      setStar(false)
      setShare(false)
      setDesc1(date_todo)
      setDesc2('00:00')
      setIsdone(false)
    }
    const ClickStar = () => {
      if (star == false)
          setStar(true);
      else
          setStar(false);
    }
    const ClickShare = () => {
      if (share == false)
          setShare(true);
      else
          setShare(false);
    }
    const ClickDone = () => {
      if (isdone == false)
          setIsdone(true);
      else
          setIsdone(false);
    }
    const ClickFinish = async() => {
      console.log('finish id: ' + ID + ' page: ' + page);
      if(page == '0'){
        try {
          const res = await Taro.cloud.callContainer({
            config: {
              env: 'prod-7gbkokc9486b1064'
            },
            path: '/api/note',
            header: {
              'X-WX-SERVICE': 'myapp-demo',
              'content-type': 'application/json'
            },
            method: 'POST',
            data: {
              id: ID,
              time: date,
              tag: tagText,
              mark: mark,
              share: share,
              star: star,
              content: contentNote
            }
          });
  
          console.log(res.data);  // 打印响应结果
  
        } catch (err) {
          console.error(err);  // 打印错误信息
        }
      }else if(page == '1'){
      try {
        const res = await Taro.cloud.callContainer({
          config: {
            env: 'prod-7gbkokc9486b1064'
          },
          path: '/api/todo',
          header: {
            'X-WX-SERVICE': 'myapp-demo',
            'content-type': 'application/json'
          },
          method: 'POST',
          data: {
            id: ID,
            deadline: time,	//	截止日期
            topic: topic, 		//	主题
            content: contentTodo, 	//	内容
            done: isdone		//	是否完成
          }
        });
        //console.log(ID);
        console.log(res);  // 打印响应结果
      } catch (err) {
        console.error(err);  // 打印错误信息
      }
      }
      ClickDelete();
      Taro.switchTab({
        url: '../index/index'
      });
    }
  
  
  function TopicChange(e) {
    setTopic(e.target.value);
  }

  const uploadUrl = 'https://my-json-server.typicode.com/linrufeng/demo/posts'
  const onStart = () => {
    console.log('start 触发')
  }

  const ccc = () =>{
    Taro.switchTab({ url: '../moments/moments'});
  }

  useEffect(() => {
    setTag(baseDesc);
  }, [baseDesc]);

  const GetNote = async(id) => {
    
    const res = Taro.cloud.callContainer({
      "config": {
        "env": "prod-7gbkokc9486b1064"
      },
      "path": `/api/note?id=${id}`,
      "header": {
        "X-WX-SERVICE": "myapp-demo",
        "content-type": "application/json"
      },
      "method": "GET",
    })

    console.log((await res).data.data)
    setContentNote((await res).data.data[0].content);
    setTagText((await res).data.data[0].tag);
    setShare((await res).data.data[0].share);
    setMark((await res).data.data[0].mark);
    setStar((await res).data.data[0].star);
    setDate((await res).data.data[0].time);
    setPage('0');
    setID((await res).data.data[0].id);

    console.log(date);
    if (tagText == 'note') setTag('note');
    else if (tagText == 'music') setTag('music');
    else if (tagText == 'film' ) setTag('film');
    else if (tagText == 'book' ) setTag('book');
    else setTag('other');

    setBaseDesc(tag);
  }

  const GetTodo = async(id) => {
    
    const res = Taro.cloud.callContainer({
      "config": {
        "env": "prod-7gbkokc9486b1064"
      },
      "path": `/api/todo?id=${id}`,
      "header": {
        "X-WX-SERVICE": "myapp-demo",
        "content-type": "application/json"
      },
      "method": "GET",
    })

    console.log((await res).data.data)
    setContentTodo((await res).data.data[0].content);
    setTopic((await res).data.data[0].topic);
    setIsdone((await res).data.data[0].done);
    date_d = (await res).data.data[0].deadline;
    dateY = date_d.substring(0,4);
    dateM = date_d.substring(4,6);
    dateD = date_d.substring(6,8);
    setDesc1(`${dateY}年 ${dateM}月 ${dateD}日`);
    setDesc2(`${date_d.substring(8,10)}:${date_d.substring(10,12)}`);
    setPage('1');
    setID((await res).data.data[0].id);

  }

  return (
    <>
    <div className={tagBackgroundClass}>
      
    
      
    <div className='c_header'>
      <div className='col_container'>
        <div className='col1'>
          <ConfigProvider theme={themeHB}>
            <Button onClick={ClickFinish} fill="none" size='small' shape='square'>完成</Button>
          </ConfigProvider>
        </div>


        <div className='col2' onClick={ClickShare}>
          { ( share == true ) && //('unlock')
            (<img src={require('./unlock.png')} className='c_icon_lock' />)
          }
          { ( share == false ) && //('lock')
            (<img src={require('./lock.png')} className='c_icon_lock' />)
          }
        </div>

        <div className='col2' onClick={ClickStar}> 
          { ( star == true ) && //('star')
            (<img src={require('./star.png')} className='c_icon_star' />)
          }
          { ( star == false ) && //('unstar')
            (<img src={require('./unstar.png')} className='c_icon_star' />)
          }
        </div>

        <div className='col2' onClick={ClickDelete}>
            <img src={require('./delete.png')} className='c_icon_delete' />
        </div>

      </div>
    </div>
      

        <div className='c_switcher'>
          <ConfigProvider theme={themeHT}>
          <Tabs value={page} activeColor='#000000' onChange={ (value) => {
            setPage(value); ClickDelete();
          }} activeType="divider">
            {(page == '0') && (<Tabs.TabPane title="编辑笔记"></Tabs.TabPane>)}
            {(page == '1') && (<Tabs.TabPane title="编辑待办"></Tabs.TabPane>)}
          </Tabs>
          </ConfigProvider>
        </div>

    <div className='c_ body'>
    {(page == '0') && (
        <>

        <div className='c_picker'>
          
            <Cell title="#Tag:"  description={baseDesc} onClick={() => setVisible(!visible)}/>
          
          <div className='c_paddingtop'><Picker
            visible={visible}
            options={listData1}
            onConfirm={(list, values) => confirmPicker(list, values)}
            onClose={() => setVisible(false)}
            onChange={changePicker}
          /></div>
        </div>

        <div>
          { ( tag === 'film' || tag === 'book' || tag === 'music' ) &&
              <div className='c_picker' > Rating: 
                <div className='c_paddingleft'>
                  <Rate allowHalf defaultValue={0} value={mark} onChange={(value) => setMark(value)} />
                </div>
              </div>
          }
        </div>
        
        <div className='c_content'>
          Content: 
          <div className='c_paddingtop'>
            <ConfigProvider theme={themeTA}>
              <TextArea rows={1} className='c_textarea' value={contentNote}
                onChange={(contentNote) => setContentNote(contentNote)}
              />
            </ConfigProvider>
          </div> 
          
        </div>

        <div className='c_content'>
          <Uploader
            url={uploadUrl}
            uploadLabel="upload your pics"
            onStart={onStart}
            style={{ marginRight: '10px' }}
          />
        </div>

        <div className="c_footer">
          <div className="col_container">
            <div className="cold1">
              {date}
            </div>
            <div className='cold2'>
              {like}
            </div>
            <div className="cold2">
              <img src={require('./like.png')} className='c_icon_like' />
            </div>
            <div className="cold2">
              {isEditing ? (
                <input value={tagText} onChange={handleInputChange} onBlur={handleInputBlur} />
                  ) : (
                <Tag background="#FA2400" plain onClick={handleTagClick}>{tagText}</Tag>
              )}
            </div>
          </div>
        </div>

      </>
    )}
    </div>

    <div className='c_ body'>
    {(page == '1') && (
    <>
      <div className='c_title'>
        Title: 
        <div className='c_paddingleft'><input value={topic} onChange={TopicChange}></input></div>
      </div>

      <div className='c_content'>
        <ConfigProvider theme={themeC}>
          <Cell title="选择待办事项日期" description={desc1} onClick={() => setShow1(true)} />
        </ConfigProvider>
        <DatePicker
          title="选择待办事项日期"
          visible={show1}
          showChinese
          onClose={() => setShow1(false)}
          onConfirm={(options, values) => confirm1(values,options)}
        />        
      </div>

      <div className='c_content'>
      <ConfigProvider theme={themeC}>
        <Cell title="选择时间（可选）" description={desc2} onClick={() => setShow2(true)} />
      </ConfigProvider>
      <DatePicker
          title="选择时间"
          type="hour-minutes"
          visible={show2}
          onClose={() => setShow2(false)}
          onConfirm={(options, values) => confirm2(values,options)}
        />
      </div>

      <div className='c_content'>
        Details:
        <div className='c_paddingtop'>
          <ConfigProvider theme={themeTA}>
            <TextArea rows={5}   className='c_textarea' value={contentTodo}
              onChange={(contentTodo) => setContentTodo(contentTodo)}
            />
          </ConfigProvider>
        </div>
      </div>

      <div className="c_footer">
        <div className="col_container">
          <div className="cold1">
            {time}
          </div>
          <div className="cold2">
            完成状况 
          </div>
          <div className='cold2' onClick={ClickDone}>
            { (isdone == true) && 
              (<img src={require('./done.png')} className='c_icon_done' />)
            }
            { (isdone == false) &&
              (<img src={require('./undone.png')} className='c_icon_done' />)
            }
          </div>
        </div>
      </div>

    </>
    )}
    </div>

    <button onClick={ccc}>back</button>

    </div>

    </>
  )
}


// export default function Form() {

//   var usrID = '0001', ID = 1;
//   var NewOrEdit = false;//false == new; true == edit;
//   const [done, setDone] = useState(false);
//   const [note, setNote] = useState({
//     topic: '',
//     content: ''
//   });

//   const [show1, setShow1] = useState(false)
//   const [desc1, setDesc1] = useState('2024年 02月 12日')
//   const confirm1 = (values:(string|number)[],options:PickerOption[])=>{
//     setDesc1(options.map((option) => option.text).join(' '))
//   }
//   const [show2, setShow2] = useState(false)
//   const [desc2, setDesc2] = useState('12:00')
//   const confirm2 = (values:(string|number)[],options:PickerOption[])=>{
//     setDesc2(options.map((option) => option.text).join(':'))
//   }


//   const themeTA = {
//     nutuiColorPrimary: 'black',
//     nutuigray6: 'black',
//     nutuigray4: 'black',
//     nutuiColorPrimaryStop1: 'purple',
//     nutuiColorPrimaryStop2: 'purple',
//     nutuitextareapadding: '5px 25px',
//   }
//   const marginStyle = { margin: 8 }



//   var date='';
//   if(date == '')
//     date = moment().format('YYYYMMDD');

//   function TopicChange(e) {
//     setNote({
//       ...note,
//       topic: e.target.value
//     });
//   }

//   const uploadUrl = 'https://my-json-server.typicode.com/linrufeng/demo/posts'
//   const onStart = () => {
//     console.log('start 触发')
//   }


//   const ClickDone = () => {
//     if (done == false)
//         setDone(true);
//     else
//         setDone(false);
//   }

//   const ClickFinishTODO = () => {
//     Taro.cloud.init()
//     const db = Taro.cloud.database();
//     const id = '1'; 
//     const data = {
//       key: 'hello there?'
//     };

//     // 更新数据库
//     db.collection(usrID).doc(id).update({
//       data: data,
//       success: function(res) {
//         console.log('数据存入成功');
//       },
//       fail: function(err) {
//         console.log('数据存入失败');
//       }
//     })

//     Taro.switchTab({
//       url: '../index/index'
//     });
//   }

//   const ClickChange = () => {
//     Taro.switchTab({url: '../new/new'});
// }


// //   function ContentChange(e) {
// //     setNote({
// //       ...note,
// //       content: e.target.value
// //     });
// //   }



//   return (
//     <div style={{ backgroundColor: 'grey' }}>
//     <div className='container_todo'>
//       <div className='c_header'>
//         <div className='col_container'>
//           <div className='col1'>
//             <Button onClick={ClickFinish} fill="none" style={marginStyle}>完成</Button>
//           </div>
//           <div className='col2'></div>
//           <div className='col2'></div>
//           <div className='col2' onClick={ClickChange}>
//             <img src={require('../../assets/icon/tonote.png')} className='c_icon_to' />
//           </div>
//         </div>
//       </div>

//       <div className='c_title'>
//         Title: <input value={note.topic} onChange={TopicChange}></input>
//       </div>
      
//       <div className='c_content'>
//       <Cell title="选择待办事项日期" description={desc1} onClick={() => setShow1(true)} />
//       <DatePicker
//         title="选择待办事项日期"
//         visible={show1}
//         showChinese
//         onClose={() => setShow1(false)}
//         onConfirm={(options, values) => confirm1(values,options)}
//       />        
//       </div>
//       <div className='c_content'>
//       <Cell title="选择时间（可选）" description={desc2} onClick={() => setShow2(true)} />
//       <DatePicker
//           title="选择时间"
//           type="hour-minutes"
//           visible={show2}
//           onClose={() => setShow2(false)}
//           onConfirm={(options, values) => confirm2(values,options)}
//         />
//       </div>

//       <div className='c_content'>
//         Details: {date};
//         <ConfigProvider theme={themeTA}>
//           <TextArea rows={5}   />
//         </ConfigProvider>
        
//       </div>
//       <div className='c_content'>
//       <Uploader
//         url={uploadUrl}
//         uploadLabel="upload your pics"
//         onStart={onStart}
//         style={{ marginRight: '10px' }}
//       />
//       </div>

      
//       <div>
//         <div className="c_footer">
//           <div className="col_container">
//             <div className="col1">
//               {date}
//             </div>
//             <div className="col3">
//               完成状况
//             </div>
//             <div className='col2' onClick={ClickDone}>
//             { ( done == true ) &&
//               <img src={require('../../assets/icon/done.png')} className='c_icon_finish' />
//             }
//             { ( done == false ) &&
//               <img src={require('../../assets/icon/undone.png')} className='c_icon_finish' />
//             }
//           </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// }

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
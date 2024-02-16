import './new.scss'
import Taro from '@tarojs/taro'
import  React, { useState, useEffect} from "react";
import {  ConfigProvider,Picker,Cell,Rate,Button, TextArea, Uploader, Tag, Tabs, DatePicker } from '@nutui/nutui-react-taro';
import { Dongdong } from '@nutui/icons-react-taro';
import moment from 'moment';
import { TARGET } from '@tarojs/runtime';
import { styles } from '@tarojs/shared';


export default function Form () {
  
  // var p1;
  // if(props.location.state)
  //   p1 = props.location.state.param1;
  var usrID = 15, ID = 1;
  const [NewOrEdit, setNE] = useState(false);//false == new; true == edit;
  const [isdone, setIsdone] = useState(false);
  const [page, setPage] = useState('0');//'0' == note; '1' == todo;
  const [mark, setMark] = useState(0);
  const [like, setLike] = useState(111);
  const [star, setStar] = useState(false);
  const [share, setShare] = useState(false);
  const [tag, setTag] = useState('');
  const [contentNote, setContentNote] = useState('')
  const [contentTodo, setContentTodo] = useState('')
  const [topic, setTopic] = useState('');

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



  var tagBackgroundClass;
  var date;
  var date_f;
  date = moment().format('YYYYMMDD');
  date_f = moment().format('YYYY年 MM月 DD日');

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

  const [show1, setShow1] = useState(false)
  const [desc1, setDesc1] = useState(date_f)
  const confirm1 = (values:(string|number)[],options:PickerOption[])=>{
    setDesc1(options.map((option) => option.text).join(' '))
  }
  const [show2, setShow2] = useState(false)
  const [desc2, setDesc2] = useState('00:00')
  const confirm2 = (values:(string|number)[],options:PickerOption[])=>{
    setDesc2(options.map((option) => option.text).join(':'))
  }
  var time = desc1+desc2;
  time=time.replace(/年|月|日|:|\s+/g, "");

  function TopicChange(e) {
    setTopic(e.target.value);
  }

  const uploadUrl = 'https://my-json-server.typicode.com/linrufeng/demo/posts'
  const onStart = () => {
    console.log('start 触发')
  }

  const ClickDelete = () => {
    setBaseDesc('')
    setTagText('')
    setTag('')
    setTopic('')
    setContentNote('')
    setContentTodo('')
    setStar(false)
    setShare(false)
    setDesc1(date_f)
    setDesc2('00:00')
    setIsdone(false)
  }
  const ClickStar = () => {
  if (page == '0'){
    if (star == false)
        setStar(true);
    else
        setStar(false);
  }}
  const ClickShare = () => {
  if (page == '0'){
    if (share == false)
        setShare(true);
    else
        setShare(false);
  }}
  const ClickDone = () => {
  if (page == '1'){
    if (isdone == false)
        setIsdone(true);
    else
        setIsdone(false);
  }}
  
  const WebGet = async() => {
    
    const res = Taro.cloud.callContainer({
      "config": {
        "env": "prod-7gbkokc9486b1064"
      },
      "path": `/api/note?id=${ID}`,
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
    date = (await res).data.data[0].time;

    if (tagText == 'note') setTag('note');
    else if (tagText == 'music') setTag('music');
    else if (tagText == 'film' ) setTag('film');
    else if (tagText == 'book' ) setTag('book');
    else setTag('other');

    setBaseDesc(tag);
  }

  const ClickFinish = async() => {
    //if(NewOrEdit == false){
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
            //userid: usrID,
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
            //userid: usrID,
            deadline: time,	//	截止日期
            topic: topic, 		//	主题
            content: contentTodo, 	//	内容
            done: isdone		//	是否完成
          }
        });
        console.log(res);  // 打印响应结果
      } catch (err) {
        console.error(err);  // 打印错误信息
      }
      }
    // }else{
    //   if(page == '0'){
    //     try {
    //       const res = await Taro.cloud.callContainer({
    //         config: {
    //           env: 'prod-7gbkokc9486b1064'
    //         },
    //         path: '/api/note',
    //         header: {
    //           'X-WX-SERVICE': 'myapp-demo',
    //           'content-type': 'application/json'
    //         },
    //         method: 'POST',
    //         data: {
    //           userid: ID,
    //           time: date,
    //           tag: tagText,
    //           mark: mark,
    //           share: share,
    //           star: star,
    //           content: contentNote
    //         }
    //       });
    //       console.log(res.data);  // 打印响应结果
    //     } catch (err) {
    //       console.error(err);  // 打印错误信息
    //     }
    //   }else if(page == '1'){
    //     try {
    //       const res = await Taro.cloud.callContainer({
    //         config: {
    //           env: 'prod-7gbkokc9486b1064'
    //         },
    //         path: '/api/todo',
    //         header: {
    //           'X-WX-SERVICE': 'myapp-demo',
    //           'content-type': 'application/json'
    //         },
    //         method: 'POST',
    //         data: {
    //           userid: ID,
    //           deadline: time,	//	截止日期
    //           topic: topic, 		//	主题
    //           content: contentTodo, 	//	内容
    //           done: isdone		//	是否完成
    //         }
    //       });
    //       console.log(res);  // 打印响应结果
    //     } catch (err) {
    //       console.error(err);  // 打印错误信息
    //     }
    // }
    // }
    ClickDelete();
    Taro.switchTab({
      url: '../index/index'
    });
  }

  const CheckFrom = () => {
    var prefetch = Taro.getStorageSync('value');
    if (prefetch != '-1'){
      ID = prefetch;
      console.log(ID);
      Taro.setStorageSync('value', '-1');
      setNE(true);
    }
  }

  useEffect(() => {
    setTag(baseDesc);
  }, [baseDesc]);

  useEffect(() => {
    CheckFrom();
  }, []);

  
  // const nowpath = useLocation();
  // useEffect(() => {
  //   return () => {
  //     console.log(`Current path is ${nowpath}`);
  //   };
  // },[nowpath]); 

  return (
    <div style={{ backgroundColor: 'grey' }}>
      <div className={tagBackgroundClass}>


        <div className='c_header'>
          <div className='col_container'>

            <div className='col1'>
              <ConfigProvider theme={themeHB}>
                <Button onClick={ClickFinish} fill="none" size='small' shape='square'>完成</Button>
              </ConfigProvider>
            </div>

            <div className='col2' onClick={ClickShare}>
              { (page == '0') && ( share == true ) && 
                (<img src={require('../../assets/icon/unlock.png')} className='c_icon_lock' />)
              }
              { (page == '0') && ( share == false ) &&
                (<img src={require('../../assets/icon/lock.png')} className='c_icon_lock' />)
              }
            </div>

            <div className='col2' onClick={ClickStar}> 
              { (page == '0') && ( star == true ) &&
                (<img src={require('../../assets/icon/star.png')} className='c_icon_star' />)
              }
              { (page == '0') && ( star == false ) &&
                (<img src={require('../../assets/icon/unstar.png')} className='c_icon_star' />)
              }
            </div>

            <div className='col2' onClick={ClickDelete}>
              <img src={require('../../assets/icon/delete.png')} className='c_icon_delete' />         
            </div>

          </div>
        </div>
        
        {(NewOrEdit == false) && (
          <div className='c_switcher'>
            <ConfigProvider theme={themeHT}>
            <Tabs value={page} activeColor='#000000' onChange={ (value) => {
              setPage(value); ClickDelete();
            }} activeType="divider">
              <Tabs.TabPane title="新建笔记"></Tabs.TabPane>
              <Tabs.TabPane title="新建待办"></Tabs.TabPane>
            </Tabs>
            </ConfigProvider>
          </div>
        )}

        {(page == '0') && (
          <>
          {/* <div className='c_title'>
            Title:
            <div className='c_paddingleft'><input value={topic} onChange={TopicChange}></input></div>
          </div> */}

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
                <div className='c_picker' > <div className='c_bold'>Rating: </div> 
                  <div className='c_paddingleft'>
                    <Rate allowHalf defaultValue={0} value={mark} onChange={(value) => setMark(value)} />
                  </div>
                </div>
            }
          </div>
          
          <div className='c_content'>
            <div className='c_bold'>Content: </div> 
            <div className='c_paddingtop'>
              <ConfigProvider theme={themeTA}>
                <TextArea rows={5} className='c_textarea' value={contentNote}
                  onChange={(contentNote) => setContentNote(contentNote)}
                />
              </ConfigProvider>
            </div> 
          </div>


          <div className='c_content'>
            <div className='c_paddingtop'></div>
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
                <img src={require('../../assets/icon/like.png')} className='c_icon_like' />
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

        {(page == '1') && (
        <>
          <div className='c_title'>
            <div className='c_bold'>Title: </div> 
            <div className='c_paddingleft'><input value={topic} style={{fontSize: "18px",  textAlign: "center"}} onChange={TopicChange}></input></div>
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
            <div className='c_bold'> Details: </div>
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
                  (<img src={require('../../assets/icon/done.png')} className='c_icon_done' />)
                }
                { (isdone == false) &&
                  (<img src={require('../../assets/icon/undone.png')} className='c_icon_done' />)
                }
              </div>

            </div>
          </div>
        </>
        )}
        
      </div>
    </div>
  );
}
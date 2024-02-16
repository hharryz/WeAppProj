// searchPage.tsx  
  
import React, { useState, useEffect } from 'react';  
import './search.scss';  
<<<<<<< Updated upstream
import { DatePicker,Cell,ConfigProvider } from '@nutui/nutui-react-taro'
=======
import {Picker,DatePicker,Cell,ConfigProvider } from '@nutui/nutui-react-taro'
import NoteCard from '@/components/notecard/notecard';
import Bubble_add from '@/components/bubble_add/bubble_add';
import Bubble_fresh from '@/components/bubble_fresh/bubble_fresh';
>>>>>>> Stashed changes


<<<<<<< Updated upstream
=======
export interface Note {
  id: number;
  userid: string;
  time: string;
  tag: string;
  mark: number;
  share: boolean;
  star: boolean;
  content: string;
  name:string;
  avatar:string;
  ismine:boolean;
}

export interface User {
  name:string;
  avatar:string;
  ismine:boolean;
}
>>>>>>> Stashed changes

const SearchPage: React.FC = () => {  
  const cellTheme = {
    nutuiCellPadding: '50px,50px',
    nutuiCellExtraFontSize:'30px',
    nutuiCellTitleFontSize:'30px',
    nutuiCellLineHeight:'24px',
    nutuiCellDividerRight:'100px',
    nutuiCellBorderRadius:'20px',
  }
<<<<<<< Updated upstream
  const [monitor, setMonitor] = useState(false)
  const [show1, setShow1] = useState(false)
  const [desc1, setDesc1] = useState('2024年 02月 12日')
  const confirm1 = (values:(string|number)[],options:PickerOption[])=>{
    setDesc1(options.map((option) => option.text).join(' '))
  }
=======
  const [show1, setShow1] = useState(false);
  const [desc1, setDesc1] = useState('选择日期');
  const [desc2, setDesc2] = useState('');
>>>>>>> Stashed changes
  const [searchInput, setSearchInput] = useState("");  
  const [Color1, set1Color] = useState('white');  
  const [Color2, set2Color] = useState('white');  
  const [Color3, set3Color] = useState('white');  
  const [Color4, set4Color] = useState('white');  
  const [Color5, set5Color] = useState('white');  
  const [Color6, set6Color] = useState('white');  
<<<<<<< Updated upstream
  const handleSearch = () => {  
    // 处理搜索逻辑  
    console.log("Search for:", searchInput);  
  };  
=======
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [noteList, setNoteList] = useState<Note[]>([]);
  const [searchList, setSearchList] = useState<Note[]>([]);
  const [user,setUser] = useState<User>({name:'test', avatar:'test', ismine:false});
  const [visible, setVisible] = useState(false)
  const [baseDesc, setBaseDesc] = useState('选择标签')
  const [tag, setTag] = useState('None')
  const [condition,setCondition] = useState('collection');
  const confirm1 = (values:(string|number)[],options:PickerOption[])=>{
    setDesc1(options.map((option) => option.text).join(' '))
  }
  const listData1 = [
    [
      { value: 1, text: 'film',},
      { value: 2, text: 'music',},
      { value: 3, text: 'book',},
      { value: 4, text: 'note',},
      { value: 5, text: 'other',},
      { value: 6, text: 'all',},
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
  }
  useEffect( () => {
    Taro.cloud.callContainer({
      "config": {
        "env": "prod-7gbkokc9486b1064"
      },
      "path": `/api/login?me=true`,
      "header": {
        "X-WX-SERVICE": "myapp-demo",
        "content-type": "application/json"
      },
      "method": "GET",
    }).then(res => {
      console.log(res.data)
      setUser({
          name:res.data.data.name,
          avatar:res.data.data.avatar,
          ismine:res.data.data.avatar,
        }
      )
      console.log("User information refreshed.")
    }).catch(err => {
      console.log(err)
    })
  },[]);
  console.log(user);
  useEffect(() => {  
    if(tag==='film'){
      set1Color('#5d6fbb'); set2Color('white'); set3Color('white');
      set4Color('white');   set5Color('white'); set6Color('white');
    }else if(tag==='music'){
      set1Color('white');   set2Color('#5d6fbb'); set3Color('white');
      set4Color('white');   set5Color('white');   set6Color('white');
    }else if(tag==='book'){
      set1Color('white');   set2Color('white');   set3Color('#5d6fbb');
      set4Color('white');   set5Color('white');   set6Color('white');
    }else if(tag==='note'){
      set1Color('white');     set2Color('white');   set3Color('white');
      set4Color('#5d6fbb');   set5Color('white');   set6Color('white');
    }else if(tag==='other'){
      set1Color('white');   set2Color('white');     set3Color('white');
      set4Color('white');   set5Color('#5d6fbb');   set6Color('white');
    }else if(tag==='all'){
      set1Color('white');   set2Color('white');     set3Color('white');
      set4Color('white');   set5Color('white');   set6Color('#5d6fbb');
    }else{
      set1Color('white');   set2Color('white');   set3Color('white');
      set4Color('white');   set5Color('white');   set6Color('white');
    }
    const getNotes = () => {
      Taro.cloud.callContainer({
        "config": {
          "env": "prod-7gbkokc9486b1064"
        },
        "path": `/api/note`,
        "header": {
          "X-WX-SERVICE": "myapp-demo",
          "content-type": "application/json"
        },
        "method": "GET",
      }).then(res => {
        console.log(res.data)
    const filteredNotes = tag==='all'?( 
      res.data.data.map((item: any) => {
      // if 
      const note: Note = {
        id: item.id,
        userid:item.userid,
        time: item.time,
        tag: item.tag,
        mark: item.mark,
        share: item.share,
        star: item.star,
        content: item.content,
        name:user.name,
        avatar:user.avatar,
        ismine:user.ismine
      }
      return note
    })):(tag==='other'?(
      res.data.data.filter(item => item.tag !== 'film' && item.tag !== 'music' && item.tag !== 'note' && item.tag !== 'book').map(item => {  
        const note : Note = {  
          id: item.id,
          userid:item.userid,
          time: item.time,
          tag: item.tag,
          mark: item.mark,
          share: item.share,
          star: item.star,
          content: item.content,
          name:user.name,
          avatar:user.avatar,
          ismine:user.ismine,
        };  
        return note;  
      })
    ):(res.data.data.filter(item => (item.tag) === tag).map(item => {  
      const note : Note = {  
        id: item.id,
        userid:item.userid,
        time: item.time,
        tag: item.tag,
        mark: item.mark,
        share: item.share,
        star: item.star,
        content: item.content,
        name:user.name,
        avatar:user.avatar,
        ismine:user.ismine, 
      };  
      return note;  
    })));

    setNoteList(filteredNotes);
    console.log(filteredNotes);
    console.log("List refreshed."); 
      }).catch(err => {
        console.log(err)
      })
    } 
    getNotes(); 
    console.log(tag);
  }, [tag]);
  useEffect(() => {   
    console.log('Condition has changed:', condition);  
  }, [condition]);
  useEffect(() => {   
    setDesc2(desc1.replace(/年|月|日|:|\s+/g, ""));
    console.log('Time has changed:',desc1);  
  }, [desc1]);
  useEffect(() => {   
    console.log('Time:',desc2);  
  }, [desc2]);
  useEffect(() => {   
    console.log('baseDesc hase changed:',baseDesc);  
  }, [baseDesc]);
>>>>>>> Stashed changes
  const handleFilm = () => {  
    set1Color(Color1 === 'white' ? '#5d6fbb' : 'white');  
  };  
  const handleMusic = () => {  
    set2Color(Color2 === 'white' ? '#5d6fbb' : 'white');  
  };  
  const handleBook = () => {  
    set3Color(Color3 === 'white' ? '#5d6fbb' : 'white');  
  };  
  const handleOther = () => {  
    set4Color(Color4 === 'white' ? '#5d6fbb' : 'white');  
  };  
<<<<<<< Updated upstream
  const handleDaily = () => {  
    set5Color(Color5 === 'white' ? '#5d6fbb' : 'white');   
  };  
  const handleDiary = () => {  
    set6Color(Color6 === 'white' ? '#5d6fbb' : 'white');  
=======
  const handleAll = () => {  
    if(tag ==='all'){
      setTag('none');
    }else{
      setTag('all');
    }
>>>>>>> Stashed changes
  };  
  const handleDate = () => {
    setShow1(true);
    setMonitor(true);
  }

<<<<<<< Updated upstream
  return (  
    <div className="search-container">  
=======
  const handleSearch = () => {  
    setCondition('search');
    if(desc1==='选择日期'&&(baseDesc==='选择标签'||baseDesc==='All')){
      const getSearch = () => {
        Taro.cloud.callContainer({
          "config": {
            "env": "prod-7gbkokc9486b1064"
          },
          "path": `/api/login`,
          "header": {
            "X-WX-SERVICE": "myapp-demo",
            "content-type": "application/json"
          },
          "method": "GET",
        }).then(res => {
          console.log(res.data)
      var filteredSearchs = res.data.data.filter(item => (item.content.includes(searchInput))).map(item => {  
        const search : Note = {  
          id: item.id,
          userid:item.userid,
          time: item.time,
          tag: item.tag,
          mark: item.mark,
          share: item.share,
          star: item.star,
          content: item.content,
          name:item.name,
          avatar:item.avatar,
          ismine:item.ismine 
        };  
        return search;  
      });  
      setSearchList(filteredSearchs);  
      console.log("Search for:", searchInput);  
      console.log("Search refreshed.无日期无标签");  
      console.log(filteredSearchs);
        }).catch(err => {
          console.log(err)
        })
      } 
      getSearch();
    }else if(desc1!=='选择日期'&&(baseDesc==='选择标签'||baseDesc==='All')){
      const getSearch = () => {
        Taro.cloud.callContainer({
          "config": {
            "env": "prod-7gbkokc9486b1064"
          },
          "path": `/api/login`,
          "header": {
            "X-WX-SERVICE": "myapp-demo",
            "content-type": "application/json"
          },
          "method": "GET",
        }).then(res => {
          console.log(res.data)
      var filteredSearchs = res.data.data.filter(item => (item.content.includes(searchInput))&&(item.time==desc2)).map(item => {  
        const search : Note = {  
          id: item.id,
          userid:item.userid,
          time: item.time,
          tag: item.tag,
          mark: item.mark,
          share: item.share,
          star: item.star,
          content: item.content,
          name:item.name,
          avatar:item.avatar,
          ismine:item.ismine, 
        };  
        return search;  
      });  
      setSearchList(filteredSearchs);  
      console.log("Search for:", searchInput,"; Time:",desc1);  
      console.log("Search refreshed.有日期无标签");  
      console.log(filteredSearchs);
        }).catch(err => {
          console.log(err)
        })
      } 
      getSearch();
    }else if(desc1=='选择日期'&&(baseDesc!=='选择标签'&&baseDesc!=='All')){
      const getSearch = () => {
        Taro.cloud.callContainer({
          "config": {
            "env": "prod-7gbkokc9486b1064"
          },
          "path": `/api/login`,
          "header": {
            "X-WX-SERVICE": "myapp-demo",
            "content-type": "application/json"
          },
          "method": "GET",
        }).then(res => {
          console.log(res.data)
      var filteredSearchs = baseDesc==='other'? res.data.data.filter(item => item.tag !== 'film' && item.tag !== 'music' && item.tag !== 'note' && item.tag !== 'book' && item.content.includes(searchInput)).map(item => {  
        const search : Note = {  
          id: item.id,
          userid:item.userid,
          time: item.time,
          tag: item.tag,
          mark: item.mark,
          share: item.share,
          star: item.star,
          content: item.content,
          name:item.name,
          avatar:item.avatar,
          ismine:item.ismine,  
        };  
        return search;  
      }):res.data.data.filter(item => item.tag===baseDesc&&item.content.includes(searchInput)).map(item => {  
        const search : Note = {  
          id: item.id,
          userid:item.userid,
          time: item.time,
          tag: item.tag,
          mark: item.mark,
          share: item.share,
          star: item.star,
          content: item.content,
          name:item.name,
          avatar:item.avatar,
          ismine:item.ismine, 
        };  
        return search;  
      });  
      setSearchList(filteredSearchs);  
      console.log("Search for:", searchInput,"; Tag:",baseDesc);  
      console.log("Search refreshed.有标签无日期"); 
      console.log(filteredSearchs); 
        }).catch(err => {
          console.log(err)
        })
      } 
      getSearch();
    }else if(desc1!=='选择日期'&&(baseDesc!=='选择标签'&&baseDesc!=='All')){
      const getSearch = () => {
        Taro.cloud.callContainer({
          "config": {
            "env": "prod-7gbkokc9486b1064"
          },
          "path": `/api/login`,
          "header": {
            "X-WX-SERVICE": "myapp-demo",
            "content-type": "application/json"
          },
          "method": "GET",
        }).then(res => {
          console.log(res.data);
      var filteredSearchs = baseDesc==='other'? 
      res.data.data.filter(item => item.tag !== 'film' && item.tag !== 'music' && item.tag !== 'note' && item.tag !== 'book' && item.time===desc2 && item.content.includes(searchInput)).map(item => {  
        const search : Note = {  
          id: item.id,
          userid:item.userid,
          time: item.time,
          tag: item.tag,
          mark: item.mark,
          share: item.share,
          star: item.star,
          content: item.content,
          name:item.name,
          avatar:item.avatar,
          ismine:item.ismine, 
        };  
        return search;  
      })
      :
      res.data.data.filter(item => item.tag===baseDesc&&item.time===desc2&&item.content.includes(searchInput)).map(item => {  
        const search : Note = {  
          id: item.id,
          userid:item.userid,
          time: item.time,
          tag: item.tag,
          mark: item.mark,
          share: item.share,
          star: item.star,
          content: item.content,
          name:item.name,
          avatar:item.avatar,
          ismine:item.ismine, 
        };  
        return search;  
      });  
      setSearchList(filteredSearchs);  

      console.log("Search for:", searchInput,"; Time:",desc1,"; Tag:",baseDesc);  
      console.log("Search refreshed.有日期有标签");  
      console.log(filteredSearchs);
        }).catch(err => {
          console.log(err)
        })
      } 
      getSearch();
    }
  };  
  const handleReturn = () => {
    setCondition('collection');
    setDesc1('选择日期');
    setBaseDesc('选择标签');
    setTag('None');
  }
  const collectionCard = () => {
    return(
      <div className="search-container">  
>>>>>>> Stashed changes
      <div className="search-bar">  
        <input   
          type="text"   
          placeholder="输入搜索关键词"   
          value={searchInput}   
          onChange={(e) => setSearchInput(e.target.value)}   
        />  



      <ConfigProvider theme={cellTheme}>
        <Cell description={desc1} onClick={handleDate} />
        <DatePicker
          title="日期选择"
          visible={show1}
          showChinese
          onClose={() => setShow1(false)}
          onConfirm={(options, values) => confirm1(values,options)}
        />        
      </ConfigProvider>
      <button onClick={handleSearch}>搜索</button>  
      </div>  
      <div className="favorites-section">  
        <span>已收藏</span>  
        <hr />  
      </div>  
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>  
        <div style={{ display: 'flex' ,marginTop:"5px",marginBottom:"5px"}}>  
          <button className="tagStyle"  onClick={handleFilm} style={{backgroundColor: Color1 , color: Color1 === 'white' ? '#5d6fbb' : 'white'}}>film</button>  
          <button className="tagStyle" onClick={handleMusic} style={{backgroundColor: Color2 , color: Color2 === 'white' ? '#5d6fbb' : 'white'}}>music</button>  
          <button className="tagStyle" onClick={handleBook} style={{backgroundColor: Color3 , color: Color3 === 'white' ? '#5d6fbb' : 'white'}}>book</button>  
        </div>  
        <div style={{ display: 'flex' }}>  
          <button className="tagStyle" onClick={handleOther} style={{backgroundColor: Color4 , color: Color4 === 'white' ? '#5d6fbb' : 'white'}}>other</button>  
          <button className="tagStyle" onClick={handleDaily} style={{backgroundColor: Color5 , color: Color5 === 'white' ? '#5d6fbb' : 'white'}}>daily</button>  
          <button className="tagStyle" onClick={handleDiary} style={{backgroundColor: Color6 , color: Color6 === 'white' ? '#5d6fbb' : 'white'}}>diary</button>  
        </div>  
      </div>
      {/* 其他与搜索相关的内容 */}  
<<<<<<< Updated upstream
    </div>  
  );  
};  
  
export default SearchPage;  
=======
      <div className='moments'>
        {  
          noteList.map(note => (  
            <NoteCard note={note} />  
          ))   
        }  
      </div>
    </div>  
    )
  }
  const searchCard = () => {
    return(
      <div className="search-container">  
      <div className="search-bar">  
        <input   
          type="text"   
          placeholder="输入搜索关键词"   
          value={searchInput}   
          onChange={(e) => setSearchInput(e.target.value)}   
        />  

      <ConfigProvider theme={cellTheme}>
        <Cell description={desc1} onClick={handleDate} />
        <DatePicker
          title="日期选择"
          visible={show1}
          showChinese
          onClose={() => setShow1(false)}
          onConfirm={(options, values) => confirm1(values,options)}
        />        
      </ConfigProvider>
      <ConfigProvider theme={cellTheme}>
        <Cell description={baseDesc} onClick={() => setVisible(!visible)}/>
        <Picker
          visible={visible}
          options={listData1}
          onConfirm={(list, values) => confirmPicker(list, values)}
          onClose={() => setVisible(false)}
          onChange={changePicker}
        />   
      </ConfigProvider>
      <button onClick={handleSearch}>搜索</button>  
      <button onClick={handleReturn}>返回</button>  
      </div>  
      {/* 其他与搜索相关的内容 */}  
      <div className='moments'>
        {  
          searchList.map(note => (  
            <NoteCard note={note} />  
          ))   
        }  
      </div>
    </div>  
    )
  }
  return (
    <div>
      <Bubble_add />
      <Bubble_fresh />
      {(condition==='collection' ? collectionCard() : searchCard())}
    </div>

  );  
};  
  
export default SearchPage;  


  // useEffect(() => {
  //   const getTodos = () => {
  //     Taro.cloud.callContainer({
  //       "config": {
  //         "env": "prod-7gbkokc9486b1064"
  //       },
  //       "path": `/api/todo`,
  //       "header": {
  //         "X-WX-SERVICE": "myapp-demo",
  //         "content-type": "application/json"
  //       },
  //       "method": "GET",
  //     }).then(res => {
  //       console.log(res.data)
  //       setTodoList( res.data.data.map((item: any) => {
  //         // if 
  //         const todo: Todo = {
  //           id: item.id,
  //           deadline: item.deadline,
  //           topic: item.topic,
  //           content: item.content,
  //           done: item.done
  //         }
  //         return todo
  //       }))
  //       console.log("todoList refreshed.")
  //       // setTodoNum(todoList.length)
  //     }).catch(err => {
  //       console.log(err)
  //     })
  //   }
  //   const getNotes = () => {
  //     Taro.cloud.callContainer({
  //       "config": {
  //         "env": "prod-7gbkokc9486b1064"
  //       },
  //       "path": `/api/note`,
  //       "header": {
  //         "X-WX-SERVICE": "myapp-demo",
  //         "content-type": "application/json"
  //       },
  //       "method": "GET",
  //     }).then(res => {
  //       console.log(res.data)
        // setNoteList( res.data.data.map((item: any) => {
        //   // if 
        //   const note: Note = {
        //     id: item.id,
        //     time: item.time,
        //     tag: item.tag,
        //     mark: item.mark,
        //     share: item.share,
        //     star: item.star,
        //     content: item.content,
        //   }
        //   return note
        // }))
  //       console.log("noteList refreshed.")
  //     }).catch(err => {
  //       console.log(err)
  //     })
  //   } 
  //   getTodos(),
  //   getNotes()
  // }, [])
>>>>>>> Stashed changes

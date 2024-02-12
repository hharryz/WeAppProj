// searchPage.tsx  
  
import React, { useState, useEffect } from 'react';  
import './search.scss';  
import { DatePicker,Cell } from '@nutui/nutui-react-taro'


var DateSelect = () => {
  const [show1, setShow1] = useState(false)
  const [desc1, setDesc1] = useState('2012年 01月 01日')
  const confirm1 = (values:(string|number)[],options:PickerOption[])=>{
    setDesc1(options.map((option) => option.text).join(' '))
  }
  return ( 
    <>   
      <Cell title="显示中文" desc={desc1} onClick={() => setShow1(true)} />
      <DatePicker
        title="日期选择"
        visible={show1}
        isShowChinese
        onCloseDatePicker={() => setShow1(false)}
        onConfirmDatePicker={(values,options) => confirm1(values,options)}
      />
    </>
  );
};  

const SearchPage: React.FC = () => {  
  const [searchInput, setSearchInput] = useState("");  
  const [Color1, set1Color] = useState('white');  
  const [Color2, set2Color] = useState('white');  
  const [Color3, set3Color] = useState('white');  
  const [Color4, set4Color] = useState('white');  
  const [Color5, set5Color] = useState('white');  
  const [Color6, set6Color] = useState('white');  
  const handleSearch = () => {  
    // 处理搜索逻辑  
    console.log("Search for:", searchInput);  
  };  
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
  const handleDaily = () => {  
    set5Color(Color5 === 'white' ? '#5d6fbb' : 'white');   
  };  
  const handleDiary = () => {  
    set6Color(Color6 === 'white' ? '#5d6fbb' : 'white');  
  };  
  var Dat = DateSelect();

  return (  
    <div className="search-container">  
      <div className="search-bar">  
        <input   
          type="text"   
          placeholder="输入搜索关键词"   
          value={searchInput}   
          onChange={(e) => setSearchInput(e.target.value)}   
        />  

        <button onClick={DateSelect} style={{ margin: '10px' }}>日期筛选</button>  

        <button onClick={handleSearch}>搜索</button>  

      </div>  
      <div>  
        {Dat}
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
    </div>  
  );  
};  
  
export default SearchPage;  
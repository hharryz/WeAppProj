// searchPage.tsx  
  
import React, { useState, useEffect } from 'react';  
import './search.scss';  
import { DatePicker,Cell,ConfigProvider } from '@nutui/nutui-react-taro'



const SearchPage: React.FC = () => {  
  const cellTheme = {
    nutuiCellPadding: '50px,50px',
    nutuiCellExtraFontSize:'30px',
    nutuiCellTitleFontSize:'30px',
    nutuiCellLineHeight:'24px',
    nutuiCellDividerRight:'100px',
    nutuiCellBorderRadius:'20px',
  }
  const [monitor, setMonitor] = useState(false)
  const [show1, setShow1] = useState(false)
  const [desc1, setDesc1] = useState('2024年 02月 12日')
  const confirm1 = (values:(string|number)[],options:PickerOption[])=>{
    setDesc1(options.map((option) => option.text).join(' '))
  }
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
  const handleDate = () => {
    setShow1(true);
    setMonitor(true);
  }

  return (  
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
    </div>  
  );  
};  
  
export default SearchPage;  
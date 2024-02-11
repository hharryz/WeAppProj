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
  
  const handleSearch = () => {  
    // 处理搜索逻辑  
    console.log("Search for:", searchInput);  
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
      <button>film</button>
      <button>music</button>
      <button>book</button>
      <button>other</button>
      {/* 其他与搜索相关的内容 */}  
    </div>  
  );  
};  
  
export default SearchPage;  
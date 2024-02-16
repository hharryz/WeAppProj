<<<<<<< Updated upstream
// import React, { useState } from "react";
// import { Button } from '@nutui/nutui-react-taro';
// import { Link } from 'react-router-dom';

// const App = () => {
//   const [tab1value, setTab1value] = useState('0');
//   return (
//     <div className="c_bg">
//       1234
//       <Link to={{
//     pathname: "../new/new",
//     state: {
//       param1: 1
//     }
//     }}>edit!</Link>
//     </div>
//   );
// };
// export default App;
=======
import NoteCard from "@/components/notecard/notecard"
import Taro from '@tarojs/taro'
import  React, { useState, useEffect} from "react";
import { View, Button } from '@tarojs/components'


import './moments.scss'


export default function Moments() {
    // useLoad(() => {
    //     // Taro.showTabBar()
    // })
    const theme_add = {
        '--nutui-button-border-radius': '100%',
        '--nutui-button-border-width': '0px',
        // '--nutui-button-default-height': '50px',
        '--nutui-button-default-font-size': '20px',
        '--nutui-button-default-background-color': '#5D6FBB',
        nutuiButtonDefaultColor: '#ffffff',
        nutuiButtonDefaultFontWeight: '$font-weight-bold',
      }
    const [AddCancel, setAC] = useState(false);//false == add; true == cancel;
    var help = false;
    var value;
    const clickAC = () => {
        if(AddCancel == false)
          setAC(true);
        else
          setAC(false);
      }
    const clickA = () => {
        if(AddCancel == true){
          setAC(false);
          Taro.navigateTo({url: `../new/new?param1=note&param2=0`})
        }
      }
    const clickC = () => {
        if(AddCancel == true){
          setAC(false);
          Taro.navigateTo({url: `../new/new?param1=todo&param2=0`})
        }
      }
    const buttonClick = () => {
        console.log('Button clicked.');
        if(help == false){
            //Taro.setStorageSync('value', '12');
            value = '12';
            help = true;
        }else{
            //Taro.setStorageSync('value', '24');
            value = '24';
            help = false;
        }
        
        Taro.navigateTo({
            url:'../new_todo/new_todo?data=' + encodeURIComponent(value)
        });
        
        
    }
    return (
        <>
        <div className='moments'>
          <NoteCard />
        </div>
        <button onClick={buttonClick}>click here</button>
        <div className='c_ac'>
          <div className='c1'>
            <div className='c_add' onClick={clickAC}>
              {(AddCancel == false) && ( <img src={require('../../assets/icon/add.png')} width={'100%'} height={'100%'} />)}
              {(AddCancel == true ) && ( <img src={require('../../assets/icon/cancel.png')} width={'100%'} height={'100%'} />)}         
            </div>
          </div>
          <div className='c2'>
            {(AddCancel == true ) && (
              <div className='c_cancel' onClick={clickA}>
                <img src={require('../../assets/icon/note.png')} width={'70%'} height={'70%'} />
              </div>
            )}
          </div>
          <div className='c3'>
            {(AddCancel == true ) && (
              <div className='c_cancel' onClick={clickC}>
                <img src={require('../../assets/icon/todo.png')} width={'70%'} height={'70%'} />
              </div>
            )}
          </div>
        </div>
        
        </>
    )
}
>>>>>>> Stashed changes

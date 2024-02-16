import Taro from '@tarojs/taro'
import  React, { useState, useEffect} from "react";
import { View, Button } from '@tarojs/components'
import './bubble_add.scss'


export default function Bubble_add() {

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
          Taro.navigateTo({url: `../../pages/new/new?param1=note&param2=0`})
        }
      }
    const clickC = () => {
        if(AddCancel == true){
          setAC(false);
          Taro.navigateTo({url: `../../pages/new/new?param1=todo&param2=0`})
        }
      }


    return (
        <>
        <div className='c_ac'>
          <div className='c1'>
            <div className='c_add' onClick={clickAC}>
              {(AddCancel == false) && ( <img src={require('./add.png')} width={'100%'} height={'100%'} />)}
              {(AddCancel == true ) && ( <img src={require('./cancel.png')} width={'100%'} height={'100%'} />)}         
            </div>
          </div>
          <div className='c2'>
            {(AddCancel == true ) && (
              <div className='c_cancel' onClick={clickA}>
                <img src={require('./note.png')} width={'70%'} height={'70%'} />
              </div>
            )}
          </div>
          <div className='c3'>
            {(AddCancel == true ) && (
              <div className='c_cancel' onClick={clickC}>
                <img src={require('./todo.png')} width={'70%'} height={'70%'} />
              </div>
            )}
          </div>
        </div>
        
        </>
    )
}

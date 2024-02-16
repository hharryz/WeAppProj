import  React, { useState, useEffect} from "react";
import './bubble_fresh.scss'
import { Animate } from '@nutui/nutui-react-taro';

export default function Bubble_fresh() {

    const ClickFresh = () => {
        console.log('click');
    }

    return (
        <>
        {/* <Animate type="ripple" action="click"> */}
        <div className='c_fresh' onClick={ClickFresh}>
            <img src={require('./refresh.png')} width={'100%'} height={'100%'} />
        </div>
        {/* </Animate> */}
        </>
    )
}

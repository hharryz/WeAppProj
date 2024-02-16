import { useState } from 'react'
import { ConfigProvider, Tag, Button } from '@nutui/nutui-react-taro'
<<<<<<< Updated upstream
=======
import { Todo } from '@/pages/index'
>>>>>>> Stashed changes
import './collapse.scss'
import Taro from '@tarojs/taro';

export default function Collapse() {
    const [isClicked, setIsClicked] = useState<boolean>(false);
    var help = false;
    const tagTheme = {
        nutuiTagBackgroundColor: 'aquamarine',
    }

    const handleClick = () => {
        setIsClicked(!isClicked);
    }
    var value;
    const buttonClick = () => {
        console.log('Button clicked.');
        if(help == false){
            //Taro.setStorageSync('value', '12');
            value = 50;
            help = true;//todo
            Taro.navigateTo({
                url:`../../pages/new_todo/new_todo?param1=todo&param2=${value}`,
            });
        }else{
            //Taro.setStorageSync('value', '24');
            value = 19;
            help = false;
            Taro.navigateTo({
                url:`../../pages/new_todo/new_todo?param1=note&param2=${value}`,
            });
        }
        

         console.log('before switch'+value) ;
        
    }

    const collapseContent = (click: boolean) => {
        if (click) {
            return (
                <div className='main-clicked'>
                    <div className='color-tag'></div>
                    <div className='card-content'>
                        <div className='card-header' onClick={handleClick}>
                            <div className='content'>
                                <div className='head'>微信小程序大作业</div>
                                <div className='tag'>
                                    <ConfigProvider theme={tagTheme}><Tag>hahaaaa</Tag></ConfigProvider>
                                </div>
                            </div>
                            <div className='time'>02-17</div>
                        </div>
                        <div className='card-body'>
                            众所周知，微信小程序是一款。。。众所周知，微信小程序是一款。。。
                            众所周知，微信小程序是一款。。。众所周知，微信小程序是一款。。。
                            众所周知，微信小程序是一款。。。众所周知，微信小程序是一款。。。
                            众所周知，微信小程序是一款。。。
                        </div>
                        <div className='card-footer'>
                            <Button type='primary' size='mini' onClick={buttonClick} className='button'>Solid</Button>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className='main-unclicked' onClick={handleClick}>
                    <div className='color-tag'></div>
                    <div className='content'>
                        <div className='head'>微信小程序大作业</div>
                        <div className='body'>摆烂！</div>
                    </div>
                    <div className='time'>02-17</div>
                </div>
            );
        }
    }

    return (
        <div className='collapse-card'>
            {collapseContent(isClicked)}
        </div>
    );
}
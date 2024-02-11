import { Avatar, Tag, Ellipsis, ImagePreview, Rate, ConfigProvider } from '@nutui/nutui-react-taro'
import React, { useState } from 'react'
import './notecard.scss'

export default function NoteCard() {
    const content = '注意！这是一篇笔记！注意！这是一篇笔记！注意！这是一篇笔记！注意！这是一篇笔记！注意！这是一篇笔记！注意！这是一篇笔记！注意！这是一篇笔记！注意！这是一篇笔记！注意！这是一篇笔记！注意！这是一篇笔记！注意！这是一篇笔记！注意！这是一篇笔记！注意！这是一篇笔记！注意！这是一篇笔记！'

    const images = [
        {
          src: 'https://t7.baidu.com/it/u=1700588201,792130339&fm=193&f=GIF'
        },
        {
          src: 'https://t7.baidu.com/it/u=1032479594,2383177859&fm=193&f=GIF'
        },
        {
          src: 'https://t7.baidu.com/it/u=3203007717,1062852813&fm=193&f=GIF'
        },
        {
          src: 'https://t7.baidu.com/it/u=2291349828,4144427007&fm=193&f=GIF'
        }
    ];

    const rateTheme = {
        nutuiRateItemMargin: '1rpx',
        nutuiRateIconColor: '#5d6fbb',
    }

    const [init, setInit] = useState<number>(0);
    const [showPreview, setShowPreview] = useState<boolean>(false);

    const showFn = () => {
        setShowPreview(true)
    }

    const hideFn =() => {
        setShowPreview(false)
    }

    return (
        <div className='share-card'>
            <div className='header'>
                <div className='avatar'>
                    <Avatar size='small' src='https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png' />
                </div>
                <div className='nickname'>Me</div>
                <div className='tag'><Tag>#tag</Tag></div>
            </div>
            <div className='main'>
                    <Ellipsis 
                      content={content}
                      direction='end'
                      expandText='全部 →' 
                      collapseText='收起'
                    />
            </div>
            <div className='images'>
                <div className='display-image'>
                    {images.map((image, index) => (
                        <span
                          key={image.src}
                          onClick={() => {setInit(index + 1); showFn();}}
                          style={{ marginRight: '20rpx' }}
                        >
                        <img width='100rpx'
                          height='100rpx'
                          src={image.src}
                          alt={image.src}
                          className='image-item'
                        />
                        </span>)
                    )}
                </div>
                <ImagePreview
                  images={images}
                  visible={showPreview}
                  defaultValue={init}
                  onClose={hideFn}
                />
            </div>
            <div className='rate'>
                <ConfigProvider theme={rateTheme}><Rate value={3} readOnly /></ConfigProvider>
            </div>
            <div className='footer'>
                <div className='date'>2024-2-17</div>
                <div className='thumbup'></div>
                <div className='comment'></div>
            </div>
        </div>
    )
}
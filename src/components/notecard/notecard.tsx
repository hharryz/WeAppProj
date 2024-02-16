import { Avatar, Tag, Ellipsis, ImagePreview, Rate, ConfigProvider } from '@nutui/nutui-react-taro'
import React, { useState } from 'react'
import './notecard.scss'
import Taro from '@tarojs/taro';

export interface Note {
  id: number;
  userid: string;
  time: string;
  tag: string;
  mark: number;
  share: boolean;
  star: boolean;
  content: string;
  name: string;
  avatar: string;
  ismine: boolean;
}

// export interface User {
//   name: string;
//   userid: string;
//   avatar: string;
// }

export default function NoteCard({ note}: { note: Note }) {

    const images = [
        // {
        //   src: 'https://t7.baidu.com/it/u=1700588201,792130339&fm=193&f=GIF'
        // },
        // {
        //   src: 'https://t7.baidu.com/it/u=1032479594,2383177859&fm=193&f=GIF'
        // },
        // {
        //   src: 'https://t7.baidu.com/it/u=3203007717,1062852813&fm=193&f=GIF'
        // },
        // {
        //   src: 'https://t7.baidu.com/it/u=2291349828,4144427007&fm=193&f=GIF'
        // }
    ];

    const rateTheme = {
        nutuiRateItemMargin: '1rpx',
        nutuiRateIconColor: '#5d6fbb',
    }

    const clickEdit = () => {
      console.log('click! ' + note.id);
      Taro.navigateTo({url: `../../pages/new_todo/new_todo?param1=note&param2=${note.id}`})
    }

    const [init, setInit] = useState<number>(0);
    const [showPreview, setShowPreview] = useState<boolean>(false);

    const showFn = () => {
        setShowPreview(true)
    }

    const hideFn =() => {
        setShowPreview(false)
    }

    const [like, setLike] = useState<boolean>(false)
    const onLikeChange = () => {
        console.log('like changed.')
        setLike(!like)
    }

    const tagTheme = {
      nutuiTagBackgroundColor: '#77bba5',
    }

    return (
        <div className='share-card'>
            <div className='header'>
                <div className='avatar'>
                    <Avatar size='small' src={note.avatar} />
                </div>
                <div className='nickname'>{ note.name }</div>
                <div className='tag'><ConfigProvider theme={tagTheme}><Tag>{ note.tag }</Tag></ConfigProvider></div>
            </div>
            <div className='main'>
                    <Ellipsis 
                      content={note.content}
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
            { note.mark? 
            <div className='rate'>
                <ConfigProvider theme={rateTheme}><Rate value={note.mark} readOnly /></ConfigProvider>
            </div> : null }
            <div className='footer'>
                <div className='date'>{ note.time.slice(0, 4) + '-' + note.time.slice(4, 6) + '-' + note.time.slice(6, 8) }</div>
                <div className='right-side'>
                  <div className='edit'>
                    {note.ismine? <img src={require('./edit.png')} className='edit-item' onClick={clickEdit}></img> : null}                  </div>
                  <div className='star'>
                    {(note.star && note.ismine)? <img src={require('./star.png')} className='star-item'></img> 
                              : <img src={require('./unstar.png')} className='star-item'></img>}
                  </div>
                  <div className='like' onClick={onLikeChange}>
                    {like? <img src={require('./like.png')} className='like-item'></img> 
                          : <img src={require('./unlike.png')} className='like-item'></img>}
                  </div>
                </div>
                
            </div>
        </div>
    )
}
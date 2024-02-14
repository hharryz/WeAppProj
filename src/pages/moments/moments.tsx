import NoteCard from "@/components/notecard/notecard"
// import Taro, { useLoad } from '@tarojs/taro'

import './moments.scss'


export default function Moments() {
    // useLoad(() => {
    //     // Taro.showTabBar()
    // })
    return (
        <div className='moments'>
            <NoteCard />
        </div>
    )
}
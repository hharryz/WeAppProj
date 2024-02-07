export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/new/new',
    'pages/moments/moments',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#000',
    selectedColor: '#56abe4',
    backgroundColor: '#fff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/new/new',
        text: '新建',
        iconPath: 'assets/icon/new.png',
        selectedIconPath: 'assets/icon/new-active.png',
      },
      {
        pagePath: 'pages/index/index',
        text: '主页',
        iconPath: 'assets/icon/home.png',
        selectedIconPath: 'assets/icon/home-active.png'
      },
      {
        pagePath: 'pages/moments/moments',
        text: '圈子',
        iconPath: 'assets/icon/palette.png',
        selectedIconPath: 'assets/icon/palette-active.png'
      },
    ]
  },

})

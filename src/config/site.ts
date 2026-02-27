/**
 * 站点配置：可从原博客站（如 Ghost 设置）同步后填写
 */
export const siteConfig = {
  /** 站点名称（Logo / 标题） */
  title: '厦门暗游网络科技有限公司',
  /** 首页 Hero 副标题（原博客的站点描述） */
  subtitle: '游戏让生活更有趣，关注鸿蒙、Unity、Cocos、Laya、Egret、AR，影子工作室',
  /** 导航菜单：label 显示文字， url 链接 */
  navigation: [
    { label: '首页', url: '/' },
    { label: '关于我们', url: '/tag/games/' },
    { label: '开发笔记', url: '/tag/dev/' },
    { label: 'Cocos', url: '/tag/cocos-creator/' },
    { label: 'Unity', url: '/tag/unity/' },
    { label: '读书', url: '/tag/books/' },
    { label: 'Privacy', url: '/privacy/' },
  ] as const,
} as const;

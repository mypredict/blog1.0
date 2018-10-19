import Vue from 'vue'
import Router from 'vue-router'

const TopHome = () => import('@/components/content/home/TopHome')
const WebList = () => import('@/components/content/web/WebList')
const WebRouter = () => import('@/components/content/web/WebRouter')
const LifeList = () => import('@/components/content/life/LifeList')
const LifeRouter = () => import('@/components/content/life/LifeRouter')
const TopMyself = () => import('@/components/content/myself/TopMyself')
const TopBoard = () => import('@/components/content/board/TopBoard')
const WriteArticle = () => import('@/components/content/writearticle/WriteArticle')
const ShowArticle = () => import('@/components/content/showarticle/ShowArticle')
var a = 'https://www.baidu.com/static/'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'TopHome',
      components: {
        TopHome
      }
    },
    {
      path: '/web',
      components: {
        WebRouter
      },
      children: [
        {
          path: '/',
          name: 'WebRouter',
          component: WebList
        },
        {
          path: 'writearticle',
          name: 'WebRouter/WriteArticle',
          component: WriteArticle
        },
        {
          path: 'showarticle',
          name: 'WebRouter/ShowArticle',
          component: ShowArticle
        }
      ]
    },
    {
      path: '/life',
      components: {
        LifeRouter
      },
      children: [
        {
          path: '/',
          name: 'LifeRouter',
          component: LifeList
        },
        {
          path: 'writearticle',
          name: 'LifeRouter/WriteArticle',
          component: WriteArticle
        },
        {
          path: 'showarticle',
          name: 'LifeRouter/ShowArticle',
          component: ShowArticle
        }
      ]
    },
    {
      path: '/myself',
      name: 'TopMyself',
      components: {
        TopMyself
      }
    },
    {
      path: '/board',
      name: 'TopBoard',
      components: {
        TopBoard
      }
    }
  ]
})


import news from '../components/news'
import  matches from '../components/matches'
import newsDetails from '../components/newsDetails'



export default{
  routes: [
    {path: '/', name: 'news', component: news, meta: {keepAlive: true}},
    {path: '/matches', name: 'matches', component: matches, meta: {keepAlive: true}},
    {path: '/newsDetails', name: 'newsDetails', component: newsDetails},

  ]
}

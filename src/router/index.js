import Vue from 'vue'
import Router from 'vue-router'
import Consult from '../pages/consult/router'
import News from '../pages/news/router'
import Service from '../pages/service/router'
import User from "../pages/ucenter/router"
import Tab from "../pages/tab/router"

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect:"/tab/news"
        },
        ...Consult,
        ...Service,
        ...News,
        ...User,
        ...Tab
    ]
})

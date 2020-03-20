import Vue from 'vue';
import Router from 'vue-router';

import login from '@/pages/login';
import index from '@/pages/index';
import admin from '@/pages/admin';
import student from '@/pages/student';
import video from '@/pages/video';
import course from '@/pages/course';
import courseEdit from '@/pages/courseEdit';

Vue.use(Router)
export default new Router({
//  mode: 'history', // html5 history 模式
    routes: [ // 路由配置 
        {
            path: "/",
            redirect: "/login"
        }, {
            path: '/login',
            component: login
        }, {
            path: '/index',
            component: index
        }, {
            path: '/admin',
            component: admin
        }, {
            path: '/student',
            component: student
        }, {
            path: '/video',
            component: video
        }, {
            path: '/course',
            component: course
        }, {
            path: '/courseEdit/:ID', // 回头 传值 
            component: courseEdit
        }, {
            path: '/addCourse',
            component: courseEdit
        }

    ]
})
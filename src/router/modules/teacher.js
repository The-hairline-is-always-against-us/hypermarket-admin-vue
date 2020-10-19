
const teacherRouter = {
    path: '/',
    component: () => import(/* webpackChunkName: "home" */ '../../components/common/Home.vue'),
    meta: { title: '自述文件' },
    children: [
        {
            path: '/myTeachCourse',
            component: () => import(/* webpackChunkName: "dashboard" */ '../../components/teacher/ShowMyCourse'),
            meta: { title: '用户管理' },
            roles: ['root','normal']
        },
        {
            path: '/getAllTeacherCourse',
            component: () => import(/* webpackChunkName: "dashboard" */ '../../components/teacher/GetAllCourse'),
            meta: { title: '系统监控' },
            roles: ['root','normal']
        },
        {
            path: '/teachCourse',
            component: () => import(/* webpackChunkName: "dashboard" */ '../../components/teacher/SelectCourse'),
            meta: { title: '授课绑定' },
            roles: ['root','normal']
        },
        {
            path: '/dropTeachCourse',
            component: () => import(/* webpackChunkName: "dashboard" */ '../../components/teacher/DropCourse'),
            meta: { title: '解除授课' },
            roles: ['root','normal']
        },
        {
            path: '/changeTeacherInfo',
            component: () => import(/* webpackChunkName: "dashboard" */ '../../components/teacher/ChangeInfo'),
            meta: { title: '信息修改' },
            roles: ['root','normal']
        }
    ]
};

export default teacherRouter;
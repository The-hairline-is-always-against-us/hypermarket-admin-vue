
const studentRouter = {
    path: '/',
    component: () => import(/* webpackChunkName: "home" */ '../../components/common/Home.vue'),
    meta: { title: '自述文件' },
    children: [
        {
            path: '/userManage',
            component: () => import(/* webpackChunkName: "dashboard" */ '../../components/student/UserManage'),
            meta: { title: '选课页面' },
            roles: [0,'normal']
        },
        {
            path: '/goodsManage',
            component: () => import(/* webpackChunkName: "dashboard" */ '../../components/student/GoodsManage'),
            meta: { title: '全部课程' },
            roles: [0,'normal']
        },
        {
            path: '/storeManage',
            component: () => import(/* webpackChunkName: "dashboard" */ '../../components/student/StoreManage'),
            meta: { title: '选课查询' },
            roles: [0,'normal']
        },
        {
            path: '/applyList',
            component: () => import(/* webpackChunkName: "dashboard" */ '../../components/student/ApplyList'),
            meta: { title: '退课选择' },
            roles: [0,'normal']
        },
        {
            path: '/changeInfo',
            component: () => import(/* webpackChunkName: "dashboard" */ '../../components/student/ChangeInfo'),
            meta: { title: '信息修改' },
            roles: [0,'normal']
        }
    ]
};

export default studentRouter;
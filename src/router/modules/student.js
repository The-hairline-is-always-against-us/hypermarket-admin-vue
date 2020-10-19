
const studentRouter = {
    path: '/',
    component: () => import(/* webpackChunkName: "home" */ '../../components/common/Home.vue'),
    meta: { title: '自述文件' },
    children: [
        {
            path: '/userManage',
            component: () => import(/* webpackChunkName: "dashboard" */ '../../components/student/UserManage'),
            meta: { title: '用户管理' },
            roles: ['admin','normal']
        },
        {
            path: '/goodsManage',
            component: () => import(/* webpackChunkName: "dashboard" */ '../../components/student/GoodsManage'),
            meta: { title: '商品管理' },
            roles: ['admin','normal']
        },
        {
            path: '/storeManage',
            component: () => import(/* webpackChunkName: "dashboard" */ '../../components/student/StoreManage'),
            meta: { title: '商铺管理' },
            roles: ['admin','normal']
        },
        {
            path: '/applyList',
            component: () => import(/* webpackChunkName: "dashboard" */ '../../components/student/ApplyList'),
            meta: { title: '申请管理' },
            roles: ['admin','normal']
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
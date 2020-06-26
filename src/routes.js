import UserDetail from './components/user/UserDetail.vue';
import UserEdit from './components/user/UserEdit.vue';
import Home from './components/Home.vue';
import User from './components/user/User.vue';
import Header from './components/Header.vue';
import Signup from './components/user/Signup.vue';
import UserList from './components/user/UserList.vue';
import UserRefList from './components/user/UserRefList.vue'

export const routes = [
    { path: '', name: 'home', components: {
        default: Home,
        'header-top': Header
    } },

    { path: '/signup', name: 'signin', components: {
        default: Signup,
        'header-top': Header
    } },
    


    { path: '/user', component: User,
    children: [
        { path: '', component: UserList, name: 'list'},
        { path: ':id', component: UserDetail },
        { path: ':id/edit', component: UserEdit },
        { path: ':id/reflist', component: UserRefList, name: 'reflist' },
    ] },
    // { path: '/redirect-me', redirect: { name: 'home' } },
    // { path: '*', redirect: '/' }
];
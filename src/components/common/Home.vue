<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <div class="content">
                <transition name="move" mode="out-in">
<!--                    <keep-alive>-->
                        <router-view></router-view>
<!--                    </keep-alive>-->
                </transition>
                <el-backtop target=".content"></el-backtop>
            </div>
        </div>
    </div>
</template>

<script>
import vHead from './Header.vue';
import vSidebar from './Sidebar.vue';
import vTags from './Tags.vue';
import bus from './bus';
import { postRequest } from '@/utils/axiousApi';
export default {
    data() {
        return {
            collapse: false
        };
    },
    components: {
        vHead,
        vSidebar,
        vTags
    },
    created() {
        bus.$on('collapse-content', msg => {
            this.collapse = msg;
        });
    }
};
</script>

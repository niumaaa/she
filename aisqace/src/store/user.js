import $ from 'jquery';
import { jwtDecode } from 'jwt-decode';

const ModuleUser = {
    state: {
        id: "",
        username: "",
        photo: "",
        followerCount: 0,
        refresh: "",
        access: "",
        is_login: ""
    },
    getters: {
    },
    mutations: {
        updateUser(state, user) {
            state.id = user.id;
            state.username = user.username;
            state.photo = user.photo;
            state.followerCount = user.followerCount;
            state.access = user.access;
            state.refresh = user.refresh;
            state.is_login = user.is_login;
        },
        updateAccess(state, access) {
            state.access = access
            localStorage.setItem('access_token', access) // 持久化存储
        },
        logout(state) {
            state.id = "";
            state.username = "";
            state.photo = "";
            state.followerCount = 0;
            state.access = "";
            state.refresh = "";
            state.is_login = false;
            state.access = ''
            localStorage.removeItem('access_token') // 清除存储
        }
    },
    actions: {
        login(context, data) {
            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/api/token/",
                type: "POST",
                data: {
                    username: data.username,
                    password: data.password,
                },
                success(resp) {
                    const { access, refresh } = resp;
                    const access_obj = jwtDecode(access);

                    setInterval(() => {
                        $.ajax({
                            url: "https://app165.acapp.acwing.com.cn/api/token/refresh/",
                            type: "POST",
                            contentType: "application/json", // 新增
                            data: JSON.stringify({ refresh }), // 改为JSON格式
                            success(resp) {
                                context.commit('updateAccess', resp.access);
                            },
                            error() {
                                console.error('Token刷新失败');
                            }
                        });
                    }, 4.5 * 60 * 1000); // 正确间隔：270000ms=4分30秒
                    $.ajax({
                        url: "https://app165.acapp.acwing.com.cn/myspace/getinfo/",
                        type: "GET",
                        data: {
                            user_id: access_obj.user_id,
                        },
                        headers: {
                            'Authorization': "Bearer " + access,
                        },
                        success(resp) {
                            context.commit("updateUser", {
                                ...resp,
                                access: access,
                                refresh: refresh,
                                is_login: true,
                            });
                            data.success();
                        },
                    })
                },
                error() {
                    data.error();
                }
            });
        },
    },
    modules: {
    }
};

export default ModuleUser;

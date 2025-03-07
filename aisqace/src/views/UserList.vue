<template>
    <ContentBase>
        <div class="card" v-for="user in users" :key="user.id"  @click="open_user_profile(user.id)">
          <div class="card-body">
            <div class="row">
              <div class="col-1">
                <img class="img-fluid" :src="user.photo" alt="">
              </div>
              <div class="col-11">
                <div class="username">{{ user.username }}</div>
                <div class="follower-count">粉丝数：{{ user.followerCount }}</div>
              </div>
            </div>
          </div>
        </div>
    </ContentBase>
  </template>
  
  <script>
  import ContentBase from '../components/ContentBase'
  import  $ from 'jquery'
  import {ref} from 'vue'
  import router from '@/router/index';
  import { useStore } from 'vuex';


  export default {
    name: 'UserList',
    components: {
        ContentBase,
    },
    setup() {
      const store = useStore();
    let users = ref([]);

    $.ajax({
      url: 'https://app165.acapp.acwing.com.cn/myspace/userlist/',
      type: "get",
      success(resp) {
        users.value = resp;
      }
    });

    const open_user_profile = userId => {
      if (store.state.user.is_login) {
        router.push({
          name: "userprofile",
          params: {//  参数
            userId
          }
        })
      } else {
        router.push({
          name: "login"// 跳转登陆页面
        });
      }
    }

    return {
      users,
      open_user_profile
    };
  }
}

  </script>
  
  <style scoped>
  img{
    border-radius: 50%;
  }

  .username {
    font-weight: bold;
    height: 50%;
  }

  .follower-count {
    font-size: 14px;               /* 增大字体，提高可读性 */
    color: #555;                   /* 使用柔和深灰色 */
    line-height: 1.5;              /* 优化行高，改善阅读体验 */
    padding: 5px 0;                /* 添加内边距，调整布局 */
}

.card {
    margin-bottom: 20px;           /* 保持底部间距 */
    cursor: grab;                  /* 保留抓手鼠标样式 */
    border: 1px solid #ddd;        /* 添加浅灰边框 */
    background-color: #f9f9f9;     /* 添加浅灰背景 */
    border-radius: 5px;            /* 圆角柔化外观 */
    transition: all 500ms ease;    /* 平滑过渡效果 */
}

.card:hover {
    box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.3); /* 增强阴影深度 */
    transform: scale(1.05);        /* 轻微放大，增加动感 */
}

/* 禁止文本选择 */
.username, .follower-count {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

/* 移除焦点轮廓 */
.card:focus {
  outline: none;
}

/* 修正光标显示 */
.card {
  cursor: pointer; /* 将 grab 改为常规指针 */
  /* 如果确实需要 grab 效果，可以保留但需要处理焦点 */
}
/* 头像容器样式 */
.col-1 {
  user-select: none; /* 防止文本选择 */
  cursor: default;   /* 重置光标样式 */
}

/* 图片样式 */
.img-fluid:focus {
  outline: none;
}

  </style>
  
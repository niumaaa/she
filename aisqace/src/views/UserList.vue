<template>
    <ContentBase>
        <div class="card" v-for="user in users" :key="user.id">
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

  export default {
    name: 'UserList',
    components: {
        ContentBase,
    },
    setup() {
      let users = ref([]);
      $.ajax({
        url :'https://app165.acapp.acwing.com.cn/myspace/userlist/',
        type: 'get',
        success(resp) {
          users.value = resp;
        }
      });
      return {
      users,
    }
    },
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
    font-size: 12px;
    color: gray;
    heigh: 50%;
  }

  .card{
    margin-bottom: 20px;
    cursor: grab;
  }
  </style>
  
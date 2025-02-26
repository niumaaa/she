<template>
    <ContentBase>
        <div class="row">
          <div class="col-3">
            <UserProfileInfo @follow="follow" @unfollow="unfollow" :user="user"/>
            <UserProfileWrite @post_a_post="post_a_post"/>
          </div>
          <div class="col-9">
            <UserProfilePosts  :posts="posts" />
          </div>
        </div>
    </ContentBase>
  </template>
  
  <script>
  import ContentBase from '../components/ContentBase'
  import UserProfileInfo from '../components/UserProfileInfo'
  import UserProfilePosts from '../components/UserProfilePosts'
  import {reactive} from 'vue'
  import UserProfileWrite from '../components/UserProfileWrite'

  export default {
    name: 'UserProfile',
    components: {
        ContentBase,
        UserProfileInfo,
        UserProfilePosts,
        UserProfileWrite,
    },
    setup: ()=> {
      const user = reactive({
        id: 1,
        username: "123",
        lastName: "zhou",
        firstName: "jianying",
        followerCount: 0,
        is_followed: false,
      });
      const posts = reactive ({
        count: 3,
        posts: [
          {id : 1,
          userId: 1,
          content: "测试aispace帖子1",
          },
          {id : 2,
          userId: 1,
          content: "测试aispace帖子2",
          },
          {id : 3,
          userId: 1,
          content: "测试aispace帖子3",
          },
        ]
      });
      const follow =  () => {
        if (user.is_followed) return;
        user.is_followed = true;
        user.followerCount ++;
      };
      const unfollow = () => {
        if (!user.is_followed) return;
        user.is_followed = false;
        user.followerCount --;
      };

      const post_a_post = (content) => {
        posts.count ++;
        posts.posts.unshift({
          id : posts.count,
          userId: 1,
          content: content,
          })
      };
      return {
        user,
        follow,
        unfollow,
        posts,
        post_a_post,

      }
    }
  }
  </script>
  
  <style scoped>
  </style>
  
<template>
    <div class="card">
        <div class="card-body">
            <div v-for="post in posts.posts" :key="post.id">
               <div class="card single-post">
                <div class="card-body">
                    {{ post.content }}
                </div>
               </div>
            </div> 
            <!--对于post都构造div-->
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserProfilePosts",
        props: {
            posts: {
                type: Object,
                required: true,
            },
        }
    }
</script>

<style>
.single-post {
    margin-bottom: 10px;
}
</style>
<template>
  <el-dialog class="PostViewer" title="帖子详情" :visible.sync="isVisible">
    <div v-loading.lock="isLoading">
      <h2>标签</h2>
      <div>
        <el-tag v-for="(tag, index) in post.tags" :key="index">{{ tag.name }}</el-tag>
      </div>
    </div>

    <template #footer>
      <el-button size="mini" @click="isVisible = false">取消</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { reqShowPost } from '../../api/post';

export default {
  name: 'PostViewer',

  data() {
    return {
      isLoading: false,
      isVisible: false,
      params: {
        id: null
      },
      post: {
        id: 0,
        title: '',
        categories: [],
        tags: []
      }
    };
  },

  methods: {
    async open({ id }) {
      this.params.id = id;
      this.isLoading = true;
      this.isVisible = true;

      try {
        const { data } = await reqShowPost(this.params.id, {
          includes: 'user,category,tags'
        });
        this.post = data.data;
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

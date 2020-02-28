<template>
  <div class="Post">
    <el-card class="table" shadow="hover">
      <el-table :data="tableData">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column show-overflow-tooltip label="标题" prop="title"></el-table-column>
        <el-table-column label="分类" prop="category.alias"></el-table-column>
        <el-table-column label="楼主" prop="user.name"></el-table-column>
        <el-table-column label="创建时间" prop="created_at"></el-table-column>
        <el-table-column label="操作" fixed="right">
          <template #default="scope">
            <el-button size="mini" type="primary" @click="onViewPost(scope)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <post-viewer ref="postViewer"></post-viewer>
  </div>
</template>

<script>
import { reqFetchPosts } from '../../api/post';
import PostViewer from './PostViewer';

export default {
  name: 'Post',

  components: { PostViewer },

  data() {
    return {
      tableData: []
    };
  },

  created() {
    this.getPosts();
  },

  methods: {
    async getPosts() {
      const { data } = await reqFetchPosts({
        includes: 'category,user,tags'
      });
      this.tableData = data.data;
    },
    onViewPost({ row }) {
      this.$refs.postViewer.open({ id: row.id });
    }
  }
};
</script>

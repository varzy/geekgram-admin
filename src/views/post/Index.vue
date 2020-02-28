<template>
  <div class="Post">
    <el-card class="panel" shadow="hover">
      <el-form inline ref="panel" :model="panel">
        <el-form-item label="标题">
          <el-input placeholder="请输入标题" v-model="panel.title"></el-input>
        </el-form-item>
        <el-form-item label="分类">
          <el-select placeholder="请选择分类" v-model="panel.categoryId">
            <el-option
              v-for="(category, index) in categoryOptions"
              :key="index"
              :label="category.alias"
              :value="category.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button @click="onResetPanel">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="table g-gap" shadow="hover">
      <el-table :data="tableData" v-loading="isTableLoading">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column show-overflow-tooltip label="标题" prop="title"></el-table-column>
        <el-table-column label="分类" prop="category.alias"></el-table-column>
        <el-table-column label="楼主" prop="user.name"></el-table-column>
        <el-table-column label="创建时间" prop="created_at"></el-table-column>
        <el-table-column label="操作" fixed="right">
          <template #default="scope">
            <el-link type="primary" :underline="false" @click="onViewPost(scope)">详情</el-link>
            <el-divider direction="vertical"></el-divider>
            <el-link type="danger" :underline="false" @click="onDeletePost(scope)">删除</el-link>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination class="g-align-right g-gap"></el-pagination>
    </el-card>

    <post-viewer ref="postViewer"></post-viewer>
  </div>
</template>

<script>
import { reqDestroyPost, reqFetchPosts } from '../../api/post';
import PostViewer from './PostViewer';
import { reqFetchCategories } from '../../api/category';

export default {
  name: 'Post',

  components: { PostViewer },

  data() {
    return {
      tableData: [],
      isTableLoading: false,
      panel: {
        title: '',
        categoryId: null
      },
      categoryOptions: []
    };
  },

  created() {
    this.getPosts();
    this.getCategoryOptions();
  },

  methods: {
    async getPosts() {
      try {
        this.isTableLoading = true;

        const reqParams = { includes: 'category,user,tags' };

        if (this.panel.title) reqParams.title = this.panel.title;
        if (this.panel.categoryId) reqParams.category_id = this.panel.categoryId;

        const { data } = await reqFetchPosts(reqParams);
        this.tableData = data.data;
      } finally {
        this.isTableLoading = false;
      }
    },
    async getCategoryOptions() {
      const { data } = await reqFetchCategories();
      this.categoryOptions = data.data;
    },
    async onSearch() {
      try {
        await this.$refs.panel.validate();
      } catch {
        return;
      }

      this.getPosts();
    },
    onResetPanel() {
      this.panel.title = '';
      this.panel.categoryId = null;
      this.$refs.panel.resetFields();

      this.getPosts();
    },
    onViewPost({ row }) {
      this.$refs.postViewer.open({ id: row.id });
    },
    async onDeletePost({ row }) {
      try {
        this.isTableLoading = true;
        await reqDestroyPost(row.id);

        this.$message.success('删除成功');
      } finally {
        this.isTableLoading = false;
      }
    }
  }
};
</script>

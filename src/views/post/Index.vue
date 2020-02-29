<template>
  <div class="Post">
    <el-card class="panel" shadow="hover">
      <el-form class="h-form_item_no_bottom" inline ref="form" :model="form">
        <el-form-item label="标题">
          <el-input placeholder="请输入标题" v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="分类">
          <el-select multiple collapse-tags placeholder="请选择分类" v-model="form.categoryIds">
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
        <el-table-column type="index" label="#" :index="onCalcTableIndex"></el-table-column>
        <el-table-column show-overflow-tooltip label="标题" prop="title"></el-table-column>
        <el-table-column label="分类" prop="category.alias"></el-table-column>
        <el-table-column label="楼主" prop="user.name"></el-table-column>
        <el-table-column label="创建时间" prop="created_at"></el-table-column>
        <el-table-column label="操作" fixed="right">
          <template #default="scope">
            <el-link type="primary" :underline="false" @click="onViewPost(scope)">详情</el-link>
            <el-divider direction="vertical"></el-divider>
            <el-popover ref="popover" placement="left" width="160" trigger="click">
              <p>确定删除吗？</p>
              <div class="g-align-right">
                <el-link type="primary" :underline="false" style="margin-right: 12px">取消</el-link>
                <el-button type="primary" size="mini">确定</el-button>
              </div>
            </el-popover>
            <el-link v-popover:popover type="danger" :underline="false">删除</el-link>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        class="g-align-right g-gap"
        layout="prev, pager, next"
        :total="pager.total"
        :page-size="pager.size"
        @current-change="handlePageChanged"
      ></el-pagination>
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
      form: {
        title: '',
        categoryIds: []
      },
      pager: {
        total: 0,
        size: 20,
        page: 1
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

        const reqParams = {
          includes: 'category,user,tags',
          page: this.pager.page,
          size: this.pager.size
        };

        if (this.form.title) reqParams.title = this.form.title;
        if (this.form.categoryIds) reqParams.category_ids = this.form.categoryIds;

        const { data } = await reqFetchPosts(reqParams);
        this.tableData = data.data;
        this.pager.total = data.meta.total;
      } finally {
        this.isTableLoading = false;
      }
    },
    async getCategoryOptions() {
      const { data } = await reqFetchCategories();
      this.categoryOptions = data.data;
    },
    onSearch() {
      this.getPosts();
    },
    onResetPanel() {
      this.form.title = '';
      this.form.categoryIds = [];
      this.$refs.form.resetFields();

      this.getPosts();
    },
    handlePageChanged(page) {
      this.pager.page = page;
      this.getPosts();
    },
    onCalcTableIndex(index) {
      return (this.pager.page - 1) * this.pager.size + index + 1;
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

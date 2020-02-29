<template>
  <div class="Tag">
    <el-card shadow="hover" class="panel">
      <el-button v-show="!isCreatingTag" type="primary" @click="isCreatingTag = true"
        >新增标签
      </el-button>

      <el-collapse-transition>
        <el-form
          v-show="isCreatingTag"
          ref="form"
          class="form g-gap"
          inline
          :model="form"
          :rules="formRules"
        >
          <el-form-item prop="name" label="标签名称">
            <el-input v-model="form.name" placeholder="请输入标签名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onCreateTag">提交</el-button>
            <el-button @click="onCancelCreateTag">取消</el-button>
          </el-form-item>
        </el-form>
      </el-collapse-transition>
    </el-card>

    <el-card shadow="hover" class="tags g-gap">
      <el-form inline class="tags-filter h-form_item_no_bottom">
        <el-form-item label="排序方式">
          <el-select v-model="filter.order">
            <el-option
              v-for="option in orderOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签名称">
          <el-input v-model="filter.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getTags">查询</el-button>
          <el-button @click="onResetFilter">重置</el-button>
        </el-form-item>
      </el-form>

      <el-divider></el-divider>

      <div class="tags-list g-gap" v-loading="isLoading">
        <el-tag
          closable
          size="large"
          class="tags-list-item"
          type="primary"
          v-for="tag in tags"
          :key="tag.id"
          @click="onTagClick(tag)"
          @close="onTagClose(tag)"
        >
          <span>{{ tag.name }}</span>
          <el-divider direction="vertical"></el-divider>
          <span>{{ tag.post_count }}</span>
        </el-tag>
      </div>
    </el-card>
  </div>
</template>

<script>
import { reqDestroyTag, reqFetchTags, reqStoreTag } from '../../api/tag';

export default {
  name: 'Tag',

  data() {
    return {
      isCreatingTag: false,
      isLoading: false,
      tags: [],
      filter: {
        order: 'created_at',
        name: ''
      },
      form: {
        name: ''
      },
      formRules: {
        name: [{ required: true, message: '标签名必填', trigger: 'blur' }]
      },
      orderOptions: [
        { label: '创建时间', value: 'created_at' },
        { label: '最常使用', value: 'most_used' }
      ]
    };
  },

  created() {
    this.getTags();
  },

  methods: {
    async getTags() {
      try {
        this.isLoading = true;

        const reqParams = { with_post_count: 1 };

        if (this.form.name.trim()) {
          reqParams.name = this.form.name.trim();
        }

        const { data } = await reqFetchTags(reqParams);
        this.tags = data.data;
      } finally {
        this.isLoading = false;
      }
    },
    async onCreateTag() {
      try {
        await this.$refs.form.validate();
      } catch {
        return;
      }

      try {
        this.isLoading = true;

        await reqStoreTag({ name: this.form.name });

        this.getTags();
      } finally {
        this.isLoading = false;
      }
    },
    onCancelCreateTag() {
      this.form.name = '';
      this.$refs.form.resetFields();

      this.isCreatingTag = false;
    },
    onTagClick(tag) {},
    onResetFilter() {
      this.filter = '';
      this.getTags();
    },
    async onTagClose(tag) {
      try {
        this.isLoading = true;

        await reqDestroyTag(tag.id);
        this.tags = this.tags.filter(item => item.id !== tag.id);
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.Tag {
  .tags {
    &-list {
      &-item {
        margin-right: 8px;
        margin-bottom: 4px;
        cursor: pointer;
      }
    }
  }
}
</style>

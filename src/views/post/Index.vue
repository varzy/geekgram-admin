<template>
  <div class="Post">
    <el-card class="table" shadow="hover">
      <el-table :data="tableData"></el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Post',

  data() {
    return {
      tableData: []
    }
  }
};
</script>

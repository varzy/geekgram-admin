<template>
  <div class="index">
    <p class="greeting">hello, world</p>
    <el-button type="primary">Button</el-button>
  </div>
</template>

<script>
export default {
  name: 'Index'
}
</script>

<style lang="scss" scoped>
.index {
  .greeting {
    color: $g-color-primary;
  }
}
</style>

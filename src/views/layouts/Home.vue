<template>
  <div class="home">
    <el-menu
      class="home-aside"
      default-active="2"
      background-color="#000c17"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isMenuCollapsed"
      @select="handleMenuToggled"
    >
      <el-menu-item index="DashboardIndex">
        <i class="el-icon-s-home"></i>
        <span slot="title">仪表盘</span>
      </el-menu-item>
      <el-menu-item index="PostIndex">
        <i class="el-icon-s-management"></i>
        <span slot="title">帖子管理</span>
      </el-menu-item>
      <el-menu-item index="CategoryIndex">
        <i class="el-icon-menu"></i>
        <span slot="title">分类管理</span>
      </el-menu-item>
      <el-menu-item index="TagIndex">
        <i class="el-icon-collection-tag"></i>
        <span slot="title">标签管理</span>
      </el-menu-item>
    </el-menu>

    <section class="home-body">
      <header class="home-body-header">
        <div class="left">
          <i
            class="left-collapse el-icon-s-fold"
            :class="{ 'left-collapse-collapsed': isMenuCollapsed }"
            @click="isMenuCollapsed = !isMenuCollapsed"
          ></i>
        </div>
        <div class="right">
          <div class="right-avatar">
            <el-image class="full-width full-height" fit="cover"></el-image>
          </div>
        </div>
      </header>
      <main class="home-body-main">
        <router-view />

        <div class="home-body-main-fake_footer"></div>
      </main>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',

  data() {
    return {
      isMenuCollapsed: false
    };
  },

  methods: {
    handleMenuToggled(index) {
      this.$router.push({ name: index });
    }
  }
};
</script>

<style scoped lang="scss">
.home {
  height: 100vh;
  overflow: hidden;
  display: flex;
  background-color: #f0f2f5;

  &-aside {
    height: 100%;
    overflow: auto;
    flex-shrink: 0;

    &:not(.el-menu--collapse) {
      width: 15.6vw;
      max-width: 256px;
      min-height: 192px;
    }
  }

  &-body {
    min-width: 0;
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;

    &-header {
      flex-shrink: 0;
      height: 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 500;
      padding-left: 20px;
      padding-right: 20px;
      background-color: #fff;
      box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

      .left {
        &-collapse {
          font-size: 24px;
          cursor: pointer;
          transition: 0.2s all ease-in-out;

          &-collapsed {
            transform: rotate(-180deg);
          }
        }
      }

      .right {
        &-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
        }
      }
    }

    &-main {
      min-height: 0;
      padding: 18px 18px 0;
      flex: 1;
      overflow: auto;

      // 解决 firefox 浏览器 flex 布局下 padding-bottom 无效的问题
      &-fake_footer {
        margin-top: 48px;
      }
    }
  }
}
</style>

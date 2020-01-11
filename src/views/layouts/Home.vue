<template>
  <div class="home">
    <section class="home-aside">
      <el-menu
        default-active="2"
        class="home-aside-menu"
        background-color="#000c17"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isMenuCollapsed"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </section>

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
  }
};
</script>

<style scoped lang="scss">
.home {
  height: 100vh;
  overflow: hidden;
  display: flex;

  &-aside {
    height: 100%;
    flex-shrink: 0;
    overflow: auto;
    background-color: #000c17;
    color: #fff;

    &-logo {
      width: 100%;
      height: 72px;
      line-height: 72px;
      text-align: center;

      &-inner {
        margin: 0;
        padding: 0;
        font-size: 20px;
        letter-spacing: 1px;
      }
    }

    &-menu {
      border: 0;

      &:not(.el-menu--collapse) {
        width: 15.6vw;
        max-width: 256px;
        min-height: 192px;
      }
    }
  }

  &-body {
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

<template>
  <div class="home">
    <el-container>
      <el-aside width="auto">
        <div class="logo"></div>
        <el-menu
          :unique-opened="true"
          default-active="/user"
          :collapse="isCollapse"
          :router="true"
          class="el-menu-admin"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu
            :index="item.path"
            v-for="item in menuData"
            :key="item.id"
          >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item.authName }}</span>
            </template>
            <el-menu-item
              :index="tag.path"
              v-for="tag in item.children"
              :key="tag.id"
            >
              <i class="el-icon-menu"></i>
              <span
                slot="title"
                class="menu-span"
                @click="handlePathClick(tag)"
                >{{ tag.authName }}</span
              >
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- header部分 -->
        <el-header>
          <i class="myicon myicon-menu toggle-btn" @click="toggleCollapse"></i>
          <dir class="system-title">电商后台管理系统</dir>
          <div>
            <span class="welcome">您好,{{ $store.state.username }}</span>
            <el-button type="text" @click="logout">退出</el-button>
          </div>
        </el-header>
        <!-- 中间内容部分 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { getMenu } from "@/api";
export default {
  data() {
    return {
      isCollapse: false,
      menuData: [
        {
          authName: "用户管理",
          id: 1,
          path: "0",
          children: [
            {
              authName: "用户列表",
              id: "users",
            },
          ],
        },
        {
          authName: "权限管理",
          id: 2,
          path: "1",
          children: [
            {
              authName: "权限列表",
              id: "rights",
            },
            {
              authName: "角色列表",
              id: "roles",
            },
          ],
        },
        {
          authName: "商品管理",
          id: 3,
          path: "2",
          children: [
            {
              authName: "商品分类",
              id: "categories",
            },
            {
              authName: "商品列表",
              id: "goods",
            },
            {
              authName: "订单列表",
              id: "orders",
            },
            {
              authName: "测试列表",
              id: "test",
            },
            {
              authName: "测试列表2",
              id: "test2",
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    logout() {
      // 清除登录状态，清除locaStorage中的token
      localStorage.removeItem("mytoken");
      // 跳转到登录页面
      this.$router.push({ name: "Login" });
    },
    handlePathClick(item) {
      console.log(item);
      this.$router.push(item.id);
    },
  },
  // 获取左侧菜单列表
  created() {},
};
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  background-color: #e5e5e5;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-menu-admin {
    border-right: 0;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    height: 60px;
    background: url(../assets/logo.jpg);
    background-size: 100% 100%;
    background-color: white;
  }
  .toggle-btn {
    padding: 0 10px;
    margin-left: -20px;
    font-size: 36px;
    line-height: 60px;
    color: white;
    cursor: pointer;
    &:hover {
      background-color: #00635a;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: white;
  }

  .menu-span {
    display: inline-block;
    width: 100%;
  }
}
</style>

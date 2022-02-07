<template>
  <div class="orders">
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>商品管理</el-breadcrumb-item>
          <el-breadcrumb-item>
            <span class="currentpage">订单列表</span></el-breadcrumb-item
          >
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row class="xiabianju">
      <el-col>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
        <el-button type="success" plain @click="handleClick"
          >添加商品</el-button
        >

        <el-button type="primary" @click="queryOne">查询</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
    <div class="yema">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </div>
    <!-- 添加商品对话框   -->
    <el-dialog title="添加商品" :visible.sync="addProductVisible">
      <el-form
        :model="addForm"
        :label-width="formLabelWidth"
        ref="addUserForm"
        :rules="rules"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addForm.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addProductVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getOrderList, getOne, testPost } from "@/api";
import axios from "axios";

export default {
  data() {
    return {
      addProductVisible: false,
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      formLabelWidth: "80px",
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: "blur,change",
          },
        ],
        mobile: [{ required: true, message: "电话不能为空" }],
      },
      tableData: [],
      currentPage4: 4,
      input: "",
    };
  },

  methods: {
    addUserSubmit() {
      console.log(this.addForm);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleClick() {
      this.addProductVisible = true;
    },
    queryOrderList() {
      getOrderList()
        .then((res) => {
          this.tableData = res.data;
        })
        .catch((e) => {
          this.$message.error("请求失败，请重试！");
        });
    },
    queryOne() {
      getOne({ name: this.input })
        .then((res) => {
          console.log(res);
          this.tableData = res.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    tPost() {
      testPost({ a: 1, b: 2 })
        .then((res) => {})
        .catch((e) => {});
    },
  },

  created() {
    this.tPost();
    this.queryOne();
  },
};
</script>

<style lang='scss'>
.orders {
  .xiabianju {
    margin-bottom: 10px;
  }
  .yema {
    width: 100%;
    margin-top: 10px;
    text-align: right;
    background-color: white;
  }
}
</style>

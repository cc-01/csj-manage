<template>
  <div class="goods">
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>商品管理</el-breadcrumb-item>
          <el-breadcrumb-item>
            <span class="currentpage">商品列表</span></el-breadcrumb-item
          >
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row class="ccc">
      <el-col>
        <el-button type="success" plain @click="addProductVisible = true"
          >添加商品</el-button
        >
        <el-button type="success" plain @click="addProductVisible2 = true"
          >添加商品2</el-button
        >
      </el-col>
    </el-row>
    <el-table :data="goodsList" border v-loading="loading" style="width: 100%">
      <el-table-column label="商品名称" width="280">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.thirdName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属类目" width="280">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.secondName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属模块" width="280">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.firstName }}</span>
        </template>
      </el-table-column>
    </el-table>

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
    <!-- 添加商品对话框   -->
    <el-dialog title="添加商品" :visible.sync="addProductVisible2">
      <el-form
        :model="addForm2"
        :label-width="formLabelWidth"
        ref="addUserForm"
        :rules="rules"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm2.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm2.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm2.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addForm2.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addProductVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="addUserSubmit2">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getCategories } from "@/api";
export default {
  data() {
    return {
      loading: true,
      goodsList: [],
      addProductVisible: false,
      addProductVisible2: false,
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      addForm2: {
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
    };
  },
  created() {
    this.inintlist();
    this.loading = false;
  },
  methods: {
    inintlist() {
      getCategories({ type: 3 }).then((res) => {
        if (res.meta.status === 200) {
          res.data.forEach((first) => {
            if (first.children) {
              first.children.forEach((second) => {
                if (second.children) {
                  second.children.forEach((third) => {
                    this.goodsList.push({
                      thirdName: third.cat_name,
                      secondName: second.cat_name,
                      firstName: first.cat_name,
                    });
                  });
                }
              });
            }
          });
        }
        this.total = this.goodsList.length;
      });
    },

    addUserSubmit() {
      console.log(this.addForm);
    },
    addUserSubmit2() {},
  },
};
</script>

<style lang='scss'>
.goods {
  table {
    width: 100% !important;
  }

  .el-table__empty-block {
    width: 100% !important;
  }
  .ccc {
    margin-bottom: 10px;
  }
}
</style>

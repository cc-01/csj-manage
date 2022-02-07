<template>
  <div>
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
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
      <el-menu-item index="4"
        ><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item
      >
    </el-menu>
    <el-row class="xiabianju">
      <el-col>
        <el-button type="primary" plain @click="addProductVisible = true"
          >主要按钮</el-button
        >
      </el-col>
    </el-row>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="date" label="日期" width="150">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="province" label="省份" width="120">
      </el-table-column>
      <el-table-column prop="city" label="市区" width="120"> </el-table-column>
      <el-table-column prop="address" label="地址" width="300">
      </el-table-column>
      <el-table-column prop="zip" label="邮编" width="120"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small" @click="redactClick(scope.row)"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="deleClick(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-descriptions
      class="margin-top"
      title="带边框列表"
      :column="3"
      :size="size"
      border
    >
      <template slot="extra">
        <el-button type="primary" size="small">操作</el-button>
      </template>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          用户名
        </template>
        kooriookami
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          手机号
        </template>
        18100000000
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          居住地
        </template>
        苏州市
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          备注
        </template>
        <el-tag size="small">学校</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          联系地址
        </template>
        江苏省苏州市吴中区吴中大道 1188 号
      </el-descriptions-item>
    </el-descriptions>
    <div style="margin-top: 20px">
      <el-radio-group v-model="radio3" size="medium">
        <el-radio-button label="上海"></el-radio-button>
        <el-radio-button label="北京" disabled></el-radio-button>
        <el-radio-button label="广州"></el-radio-button>
        <el-radio-button label="深圳"></el-radio-button>
      </el-radio-group>
    </div>
    <div style="margin-top: 20px">
      <el-time-picker
        v-model="value1"
        :picker-options="{
          selectableRange: '18:30:00 - 20:30:00',
        }"
        placeholder="任意时间点"
      >
      </el-time-picker>
    </div>
    <el-dialog title="查看详情" :visible.sync="ccccc">
      我点击的数据为：
      <br />
      日期 {{ clcikData.date }}
      <br />
      姓名： {{ clcikData.name }}
      <br />
      省份： {{ clcikData.province }}
      <br />
      市区： {{ clcikData.city }}
      <br />
      地址： {{ clcikData.address }}
      <div slot="footer" class="dialog-footer">
        <el-button @click="ccccc = false">取 消</el-button>
        <el-button type="primary" @click="addUserSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑" :visible.sync="editVisible">
      我点击的数据为：
      <br />
      日期 {{ cccData.date }} <el-input v-model="cccData.date"></el-input>
      <br />
      姓名： {{ cccData.name }}<el-input v-model="cccData.name"></el-input>
      <br />
      省份： {{ cccData.province
      }}<el-input v-model="cccData.province"></el-input>
      <br />
      市区： {{ cccData.city }}<el-input v-model="cccData.city"></el-input>
      <br />
      地址： {{ cccData.address
      }}<el-input v-model="cccData.address"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserSubmit2">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎1",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-04",
          name: "王小虎2",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333,
        },
        {
          date: "2016-05-01",
          name: "王小虎3",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎4",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
      ],
      size: "",
      activeIndex: "1",
      activeIndex2: "1",
      radio3: "上海",
      value1: new Date(2016, 9, 10, 18, 40),
      ccccc: false,
      clcikData: {},
      cccData: {},
      editVisible: false,
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClick(param) {
      this.clcikData = param;
      this.ccccc = true;
    },
    redactClick(para) {
      this.cccData = para;
      this.editVisible = true;
    },
    addUserSubmit() {
      this.ccccc = false;
    },
    addUserSubmit2() {
      this.editVisible = false;
    },
    deleClick(p) {
      console.log(p.name);
      confirm("确定要删除" + p.name + "吗？");
    },
  },
};
</script>
<style scoped>
.xiabianju {
  margin-top: 15px;
  margin-bottom: 10px;
}
.margin-top {
  margin-top: 20px;
}
</style>

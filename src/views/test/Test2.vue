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
      <el-col>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
        <el-button type="success" plain @click="queryTwo">查询</el-button>
      </el-col>
    </el-row>
    {{ aaa }}
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
          <el-button @click="redactClick(scope.row)" type="text" size="small"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="deleClick(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="查看详情" :visible.sync="aaaaa">
      我点击的数据为：
      <br />
      日期 {{ clcikData.date }}
      <br />
      <div slot="footer" class="dialog-footer">
        <el-button @click="aaaaa = false">取 消</el-button>
        <el-button type="primary" @click="addUserSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑" :visible.sync="bbbbb">
      我点击的数据为：
      <br />
      日期 <el-input v-model="eeeData.date"></el-input>
      <br />
      <div slot="footer" class="dialog-footer">
        <el-button @click="bbbbb = false">取 消</el-button>
        <el-button type="primary" @click="addUserSubmit2">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getTwo, getThree } from "@/api";
export default {
  data() {
    return {
      tableData: [],
      aaaaa: false,
      bbbbb: false,
      clcikData: {},
      eeeData: {},
      input: "",
      aaa: "",
    };
  },
  methods: {
    handleClick(param) {
      this.clcikData = param;
      this.aaaaa = true;
    },
    redactClick(e) {
      this.eeeData = e;
      this.bbbbb = true;
    },
    addUserSubmit() {
      this.aaaaa = false;
    },
    addUserSubmit2() {
      this.bbbbb = false;
    },
    deleClick(p) {
      console.log(p.name);
      confirm("确定要删除" + p.name + "吗？");
    },
    queryTwo() {
      getTwo({ name: this.input })
        .then((res) => {
          console.log(res);
          this.tableData = res.data;
        })
        .catch((e) => {
          console.log(e);
          this.$message.error("请求失败，请重试！");
        });
    },
    queryThree() {
      getThree()
        .then((res) => {
          console.log(res);
          this.aaa = res;
        })
        .catch((e) => {
          this.$message.error("请求失败，请重试！");
        });
    },
  },
  created() {
    this.queryTwo();
    this.queryThree();
  },
};
</script>

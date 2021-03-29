<template>
  <!-- 品牌管理 -->
  <div>
    <el-button type="primary" @click="showAddDialog">+添加</el-button>
    <el-table style="width: 100%" border :data="trademarkList">
      <el-table-column
        prop="prop"
        label="序号"
        type="index"
        align="center"
        width="80"
      >
      </el-table-column>

      <el-table-column prop="tmName" label="品牌名称" width="width">
      </el-table-column>

      <el-table-column prop="prop" label="品牌logo" width="width">
        <template slot-scope="{ row, $index }">
          <img
            :src="row.logoUrl"
            alt=""
            srcset=""
            style="height: 60px; width: 80px"
          />
        </template>
      </el-table-column>

      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row, $index }">
          <el-button type="primary" @click="showUpdateDialog(row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="deleteTrademark(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- //添加弹出 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="tmForm" :rules="rules" ref="tmForm">
        <el-form-item label="品牌名称" label-width="80px" prop="tmName">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="上传图片" label-width="80px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div class="el-upload__tip" slot="tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>

        <el-button type="primary" @click="addOrUpdateTrademark"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 分页器
      @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      -->
    <el-pagination
      style="text-align: center"
      :current-page="page"
      :page-count="6"
      :page-sizes="[1, 5, 10]"
      :page-size="limit"
      :total="total"
      @size-change="handleSizeChange"
      layout="prev, pager, next, jumper,->,sizes,total"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "Trademark",
  data() {
    return {
      limit: 1,
      page: 1,
      trademarkList: [],
      total: 4,
      dialogFormVisible: false,
      tmForm: {
        tmName: "",
        logoUrl: ""
      },
      rules: {
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" }
        ],
        logoUrl: [{ required: true, message: "请上传图片" }]
      }
    };
  },
  mounted() {
    this.getTrademarkList();
  },
  methods: {
    //获取列表数据
    async getTrademarkList(page = 1) {
      const result = await this.$API.trademark.getPageList(
        this.page,
        this.limit
      );
      if (result.code === 200) {
        this.trademarkList = result.data.records;
        this.total = result.data.total;
      }
    },
    //改变当前页数
    handleCurrentChange(page) {
      this.page = page;
      this.getTrademarkList(page);
    },
    //修改每页数量
    handleSizeChange(event) {
      this.limit = event;
      this.getTrademarkList();
    },

    handleAvatarSuccess(res, file) {
      this.tmForm.logoUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //点击显示上传
    showAddDialog() {
      this.tmForm = {
        tmName: "",
        logoUrl: ""
      };
      this.dialogFormVisible = true;
    },
    //点击修改
    showUpdateDialog(row) {
      //基本数据类型不存在深浅拷贝
      this.tmForm = { ...row };
      console.log(row);
      this.dialogFormVisible = true;
    },
    //  dialogFormVisible = false
    //点击确定添加或修改
    addOrUpdateTrademark() {
      this.dialogFormVisible = false;
      let trademark = this.tmForm;

      this.$refs.tmForm.validate(async valid => {
        if (valid) {
          alert("submit!");
          //整理参数
          try {
            await this.$API.trademark.addOrUpdate(trademark);
            this.$message.success(
              trademark.id ? "修改品牌成功" : "添加品牌成功"
            );
            //成功
            this.getTrademarkList(trademark.id ? this.page : 1);
          } catch (error) {
            this.$message.error(trademark.id ? "修改品牌失败" : "添加品牌失败");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //点击删除
    async deleteTrademark(row) {
      // console.log(row);
      try {
        await this.$API.trademark.delete(row.id);
        this.getTrademarkList(
          this.trademarkList.length > 1 ? this.page : this.page - 1
        );
        this.$message.success("删除成功");
      } catch (error) {
        this.$message.error("删除失败");
      }
    }
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

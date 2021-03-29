<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" :model="cForm">
      <el-form-item label="一级分类">
          <!-- //到这了 -->
        <el-select v-model="cForm.category1Id" placeholder="请选择" @change="handlerCategory1">
          <el-option :label="c1.name" :value="c1.id"  v-for="(c1, index) in category1List" :key="index"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="二级分类">
        <el-select value="" placeholder="请选择">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="三级分类">
        <el-select value="" placeholder="请选择">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelector",
  //   getCategory1
  data() {
    return {
         category1List:[],
      category2List:[],
      category3List:[],
       cForm:{
        category1Id:'',
        category2Id:'',
        category3Id:''
      }
    };
  },
  mounted() {
      this.getCategory1List()
  },
  methods: {
    async  getCategory1List(){
        let result = await this.$API.category.getCategory1()
        if(result.code === 200){
            this.category1List = result.data
        }
        // console.log(this.cForm.category1Id);
      }
  }
};
</script>

<style></style>

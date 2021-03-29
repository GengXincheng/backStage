import request from "@/utils/request";

export default {
    getCategory1() {
    return request.get("/admin/product/getCategory1");
  },
   //根据一级分类id获取2级分类列表
  // GET /admin/product/getCategory2/{category1Id}
    getCategory2(category1Id) {
    return request.get(`/admin/product/getCategory2/${category1Id}`);
  },
    //根据二级分离id获取3级分类列表
  // GET /admin/product/getCategory3/{category2Id}
    getCategory3(category2Id) {
    return request.get(`/admin/product/getCategory3/${category2Id}`);
  },

};

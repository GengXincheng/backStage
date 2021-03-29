import request from "@/utils/request";
export default {
  // DELETE  /admin/product/baseTrademark/remove/{id}
  // 根据品牌id删除某个品牌
  delete(id) {
      //axios的对象写法,第一个参数永远是路径
    return request.delete(`/admin/product/baseTrademark/remove/${id}`);
  },
  // POST /admin/product/baseTrademark/save
  // 新增一个品牌

  // PUT /admin/product/baseTrademark/update
  // 修改一个品牌
  // 修改一个品牌
  // 无论是增还是改，都需要一个请求体参数，这个参数就是品牌对象
  // 但是这两个请求方式，所传递的品牌对象是不一样的，如果是新增品牌对象里面没有id，如果是修改，品牌对象里面有id
  addOrUpdate(trademark){
    if(trademark.id){//修改
        return request.put('/admin/product/baseTrademark/update',trademark);
    }else{//新增
        return request.post('/admin/product/baseTrademark/save',trademark);
    }
  },
  // GET /admin/product/baseTrademark/{page}/{limit}
  // 查询品牌的分页列表数据
  getPageList(page,limit){
      return request.get(`/admin/product/baseTrademark/${page}/${limit}`)
  }
};

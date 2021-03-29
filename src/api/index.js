// 引入并暴露
//可以理解为先引入在baolu

// import trademark from './product/trademark'
// export default trademark


//引入并暴露不可简写

export {default as trademark} from './product/trademark'
export {default as attr} from './product/attr'
export {default as category} from './product/category'

//相当于同事暴露了  trademark    attr
// 最终出去的是
// {
//     trademark,
//     attr
// }

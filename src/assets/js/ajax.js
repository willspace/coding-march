import axiosFactory from 'axios'

const axios = axiosFactory.create( {
} ) ; // 新建axios实例，避免污染全局axios



// 返回拦截器
axios.interceptors.response.use( res => {
  let data = res.data;
  if(res.status === 200){
    return Promise.resolve(data);
  }else{
    // @Note 统一错误处理 依据返回码是否是通用返回码和默认标记
    return Promise.reject(data);
  }
}, error => {
  // 超时等其他catch到的错误
  return Promise.reject(error);

});

let get  = (url, data, handler=true, title='')=>{
  let _data = Object.assign({},data||{});
  _data.t = new Date().getTime();
  return axios.get(url,{ params:_data, handler: handler, title: title });
}


let post = (url, data, handler=true, title='') =>{
  // 对象默认转化为json对象
  return axios.post(url, data, {
    headers:{
      'Content-Type':'application/json'
    }, handler: handler, title: title });
}


export default {
  get: get,
  post: post
};


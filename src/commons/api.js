import axios from 'axios';

const domain = 'https://www.bppproject.com'; //http://localhost:8080 https://www.bppproject.com

export default {
  // 获取日期形式展示列表
  getDateLists: (params) => {
    return axios({
      method: 'get',
      url: domain + '/cardAdmin/dateLists',
      params: params
    })
  },
  // 获取银行卡列表
  getBanks: (params) => {
    return axios({
      method: 'get',
      url: domain + '/cardAdmin/banks',
      params: params
    })
  },
  // 新增数据
  insertMain: (params) => {
    return axios({
      method: 'put',
      url: domain + '/cardAdmin/mainData',
      data: params
    })
  },
  // 编辑数据
  editMain: (params) => {
    return axios({
      method: 'post',
      url: domain + '/cardAdmin/mainData',
      data: params
    })
  },
  // 更新状态
  upMains: (params) => {
    return axios({
      method: 'post',
      url: domain + '/cardAdmin/upMains',
      params: params
    })
  },
  // 获取详细信息，进行编辑
  getDetails: (params) => {
    return axios({
      method: 'get',
      url: domain + '/cardAdmin/selectMainAdm',
      params: params
    })
  }
}

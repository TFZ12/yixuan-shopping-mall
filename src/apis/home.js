import httpInstance from "@/utils/http";

export function getBannerAPI(param = {}) {
  const { distributionSite = '1' } = param
  return httpInstance({
    url: "home/banner",
    params: {
      distributionSite
    }
  });
}

/**
 * @description: 获取新鲜好物
 * @param {*}
 * @return {*}
 */
export const findNewAPI = () => {
  return httpInstance({
    url: '/home/new'
  })
}

export const getHotAPI = () => {
  return httpInstance({
    url: 'home/hot'
  })
}

/**
 * @description: 获取所有商品模块
 * @param {*}
 * @return {*}
 */
export const getGoodsAPI = () => {
  return httpInstance({
    url: '/home/goods'
  })
}

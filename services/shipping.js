/* eslint-disable camelcase */
import db from '../models/index'
import redisCache from '../utils/cache'

redisCache.addToCache()

const { shipping, shipping_region } = db

async function getShippingRegionsById (id) {
  return await findOne(shipping_region, { 
    shipping_region_id: id },[{
    model: shipping,
}]
)
}
async function getShippingById (id) {
  return await findOne(shipping, { 
    shipping_id: id }
)
}
 async function getShippingRegions() {
  return await shipping_region.findAll();

  

}
async function findOne(model, option, include = []) {
  return await model.findOne({
      where: {
       [Object.keys(option)]: Object.values(option)
      },
      include
  });
}




export default {
  getShippingRegions,
  getShippingRegionsById,
  getShippingById
}

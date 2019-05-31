/* eslint-disable camelcase */
import shippingService from '../services/shipping'
import asyncF from '../middlewares/async'
import globalFunc from '../utils/globalfunc'
import constants from '../constants/index'
import cache from '../utils/cache'

let field = 'shipping_id'
function getShippingRegions () {
  return asyncF(async (req, res) => {
    let value = await cache.checkCache(req.originalUrl)
    if(value !== null){
      return res.status(constants.NETWORK_CODES.HTTP_SUCCESS).json(value.data)
    }
    let shippingsRegions = await shippingService.getShippingRegions()
    if (isEmpty(shippingsRegions)) {
      return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
        code: globalFunc.getKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.USR_02),
        message: constants.ERROR_CODES.USR_02,
        field
      })
    }
    cache.addToCache(req.originalUrl, {data: shippingsRegions}, constants.CACHE_TYPES.hour)
    return res.status(constants.NETWORK_CODES.HTTP_SUCCESS).json(shippingsRegions)
 
  })
}

 function getShippingRegionsById () {
  return asyncF(async (req, res) => {
    let value = await cache.checkCache(req.originalUrl)
    if(value !== null){
      return res.status(constants.NETWORK_CODES.HTTP_SUCCESS).json(value.data)
    }
    const { shipping_id } = req.params;
    const parsedId = parseInt(shipping_id, 10);
    if (!isNaN(parsedId)) {
      let shippingsRegions = await shippingService.getShippingRegionsById( parsedId)
    if (isEmpty(shippingsRegions)) {
      return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
        code: globalFunc.getKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.USR_02),
        message: constants.ERROR_CODES.USR_02,
        field
      })
    }
    
   cache.addToCache(req.originalUrl, {data: shippingsRegions.shippings}, constants.CACHE_TYPES.hour)
  return res.status(constants.NETWORK_CODES.HTTP_SUCCESS).json(shippingsRegions.shippings)

   }
   return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
    code: globalFunc.getKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.USR_09),
    message: constants.ERROR_CODES.USR_09,
    field
  })
  })

}
export default {
  getShippingRegions,
  getShippingRegionsById
}

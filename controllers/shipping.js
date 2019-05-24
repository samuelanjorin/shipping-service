/* eslint-disable camelcase */
import isEmpty from 'lodash.isempty'
import shippingService from '../services/shipping'
import asyncF from '../middlewares/async'
import globalFunc from '../utils/globalfunc'
import constants from '../constants/index'

let field = 'shipping_id'
function getShippingRegions () {
  return asyncF(async (req, res) => {
        let shippingsRegions = await shippingService.getShippingRegions()
    if (isEmpty(shippingsRegions)) {
      return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
        code: globalFunc.getKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.USR_02),
        message: constants.ERROR_CODES.USR_02,
        field
      })
    }
    //let shippingRegionJSON = globalFunc.convertObjectValuesRecursive(shippingsRegions.dataValues, null, '')

    return res.json(shippingsRegions).status(constants.NETWORK_CODES.HTTP_CREATED)
  })
}

function getShippingRegionsById () {
  return asyncF(async (req, res) => {
    const { shipping_id } = req.params;
    const parsedId = parseInt(shipping_id, 10);
    if (!isNaN(parsedId)) {
   
    let shippings = await shippingService.getShippingRegionsById( parsedId)

    if (isEmpty(shippings)) {
      return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
        code: globalFunc.getKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.USR_02),
        message: constants.ERROR_CODES.USR_02,
        field
      })
    }
      shippings = globalFunc.convertObjectValuesRecursive(shippings.dataValues, null, '')

    return res.json(shippings).status(constants.NETWORK_CODES.HTTP_CREATED)
  }
  })
}


export default {
  getShippingRegions,
  getShippingRegionsById
}

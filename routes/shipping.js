import { Router } from 'express'
import controller from '../controllers/shipping'
import authenticate from '../middlewares/authenticate'

const router = Router()

router.get('/', authenticate.verifyUser, controller.getShippingRegions())
router.get('/:shipping_id', authenticate.verifyUser, controller.getShippingRegionsById())
router.get('/shipping/:shipping_id', authenticate.verifyUser, controller.getShippingById())

export default router

import { Router } from 'express'
import { adapterRoute } from '../adapters/express-route-adapter'
import { makeAddResellerController } from '../factories/reseller/add-reseller/add-reseller-factory'
import { makeLoginResellerController } from '../factories/reseller/login-reseller/login-reseller-factory'

export default (router: Router): void => {
  router.post('/login', adapterRoute(makeLoginResellerController()))
  router.post('/reseller', adapterRoute(makeAddResellerController()))
}

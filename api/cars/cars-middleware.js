const Cars = require('./cars-model')
const vin = require('vin-validator')


const checkCarId = (req, res, next) => {
  // DO YOUR MAGIC
  const car =  Cars.getById(req.params.id)
    if(!car){
      next({status: 404, message: 'not found'})
    }else{
      req.car = car
      next()
    }
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  if (!req.body.vin) return next({
    status: 400,
    message: `vin is missing`
  })
  if (!req.body.make) return next({
    status: 400,
    message: `make is missing`
  })
  if (!req.body.model) return next({
    status: 400,
    message: `model is missing`
  })
  if (!req.body.mileage) return next({
    status: 400,
    message: `mileage is missing`
  })
  next()
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  if (vin.validate(req.body.vin)){
    next()
  }else{
    next({ status: 400, message: `vin ${req.body.vin} is invalid`})
  }
}

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
  const existing =  Cars.getByVin(req.body.vin)
  if(!existing){
    next()
  }else{
    next({status: 400, message:`vin ${req.body.vin} already exists`})
  }
}
module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid
} 
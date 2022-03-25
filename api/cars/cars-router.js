// DO YOUR MAGIC
const Cars = require('./cars-model')
const {
    checkCarId,
    checkCarPayload,
    checkVinNumberUnique,
    checkVinNumberValid
} = require('./cars-middleware')

const router = require('express').Router()


router.get('/', async (req, res, next) => {
    try {
        const cars = await Cars.getAll()
        res.json(cars)
    } catch (error) {
        next(error)
    }


})

router.get('/:id', checkCarId, (req, res, next) => {
    res.json(req.car)
})

router.post('/', 
checkCarPayload, 
checkVinNumberValid,
checkVinNumberUnique, 
async(req, res, next) => {
    try {
        const car = await Cars.create(req.body)
        res.json(car)
    } catch (error) {
        next(error)
    }
})

module.exports = router 
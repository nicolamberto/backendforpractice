import { Router } from "express";
import ProductManager from '../ProductManager.js'

const router = Router()

router.get('/', async (req, res)=>{
    try {
        const users = await ProductManager.getProduct()
        res.status(200).json({message:'Products', users})
    } catch (error) {
        return error
    }

})


router.get('/:pid', async(req,res)=>{
    const {pid}= req.params  
    try {
        const product = await ProductManager.getProductById(+pid)
        res.status(200).json({message:'PRODUCT', product})
    } catch (error) {
        res.status(500).json({error})
    }
})


router.post('/', async(req, res)=>{
    try {
        const newProduct = await ProductManager.addProduct(req.body)
        res.status(200).json({message:'User Created', user: newProduct })
    } catch (error) {
        res.status(500).json({error})
    }
})


router.put('/:pid',async (req, res)=>{
    const {pid} = req.params
    try {
        const productUpdated = await ProductManager.updateProduct(+pid, req.body)
        res.status(200).json({message:'Product updated.'})

    } catch (error) {
        res.status(500).json({error})
    }
})


router.delete('/:pid',async (req, res)=>{
    const {pid} = req.params
    try {
        const response = await ProductManager.deleteProduct(+pid)
        res.status(200).json({message:'Product deleted.'})
    } catch (error) {
        res.status(500).json({error})
    }
})

export default router
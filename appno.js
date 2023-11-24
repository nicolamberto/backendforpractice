import express from 'express'
import ProductManager from './src/ProductManager.js'
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/api/users',async (req, res)=>{

    try {
        const users = await ProductManager.getProduct()
        res.status(200).json({message:'Products', users})
    } catch (error) {
        return error
    }

})


app.get('/api/users/:idUser', async(req,res)=>{
    const {idUser}= req.params
    try {
        const user = await ProductManager.getProductById(+idUser)
        res.status(200).json({message:'user', user})
    } catch (error) {
        res.status(500).json({error})
    }
})

app.post('/api/users', async(req, res)=>{
    try {
        const newUser = await ProductManager.addProduct(req.body)
        res.status(200).json({message:'User Created', user: newUser })
    } catch (error) {
        res.status(500).json({error})
    }
})



app.listen(8080,()=>{
    console.log('puerto 8080');
})
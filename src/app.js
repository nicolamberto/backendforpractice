import express from 'express'
import ProductsRouter from './routes/product.router.js'
import CartRouter from './routes/cart.router.js'

const app = express() 

app.use(express.json())
app.use(express.urlencoded({extended:true}))

//routes
app.use('/api/products', ProductsRouter)
app.use('/api/carts', CartRouter)

const PORT = 8080

app.listen(PORT,()=>{
    console.log('escuchando al puerto 8080');
})
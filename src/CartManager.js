import fs from 'fs'

class CartManager {
    constructor(path) {
        this.path = path
    }


    async getCart() {
        if (fs.existsSync(this.path)) {
            const carts = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(carts)
        } else {
            return []
        }
    }

    async getOneCart(id) {
        const carts = await this.getCart()
        const cart = carts.find(i => i.id === id)
        return cart
    }

    async createCart() {
        const carts = await this.getCart()
        let id
        if (!carts.length) {
            id = 1
        } else {
            id = carts[carts.length - 1].id + 1
        }
        const newCart = { products:[], id }
        usuariosPrev.push(newCart)
        await fs.promises.writeFile(this.path, JSON.stringify(carts))
        return newCart
    }


    async addProduct(idCart, idProduct){
        const carts = await this.getCart()
        const cart = carts.find(i=>i.id===id)
        const userIndex = cart.products.findIndex(i=>i.product===id)
        if(userIndex === -1){
            cart.products.push({product:idProduct, quantity:1})
        } else {
            cart.products[userIndex].quantity++
        }
        await fs.promises.writeFile(this.path, JSON.stringify(cart))
        return cart
    }

}


async function prueba() {
}

prueba()


const manager = new CartManager('Carts.json');
export default manager
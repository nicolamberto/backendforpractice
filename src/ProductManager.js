import fs from 'fs'

class ProductManager{
    constructor(path){
        this.path=path
    }

    async addProduct(prod){
        try {
            const usuariosPrev = await this.getProduct()
            let id 
            if(!usuariosPrev.length){
                id = 1
            } else {
                id = usuariosPrev[usuariosPrev.length-1].id+1
            }
            const newUser = {...prod, id}
            usuariosPrev.push(newUser)
            await fs.promises.writeFile(this.path, JSON.stringify(usuariosPrev))
            return newUser
        } catch (error) {
            return error
        } 
    }

    async getProduct(){
        try {
            if(fs.existsSync(this.path)){
                const infoArchivo = await fs.promises.readFile(this.path, 'utf-8')
                return JSON.parse(infoArchivo)
            } else {
                return []
            }
        } catch (error) {
            return error
        }   
    }

    async getProductById(id){
        try {
            const usuariosPrev = await this.getProduct()
            const usuario = usuariosPrev.find(u=> u.id === id)
            if(!usuario){
                return 'Usuario no encontrado'
            } return usuario
        } catch (error) {
            return error
        }
    }

    async deleteProduct(id){
        try {
            const usuariosPrev = await this.getProduct()
            const nuevoArregloUsarios = usuariosPrev.filter(u=> u.id !== id)
            await fs.promises.writeFile(this.path, JSON.stringify(nuevoArregloUsarios))

        } catch (error) {
            return error
        }
    }

    async updateProduct(id, obj){
        try {
            const usuariosPrev = await this.getProduct()
            const usuarioIndex = usuariosPrev.findIndex(u=> u.id === id)
            if(usuarioIndex === -1){
                return 'El producto que quieres actualizar no se encuentra disponible'
            } 
            const usuario = usuariosPrev[usuarioIndex]
            const usuarioUpdate = {...usuario, ...obj}
            usuariosPrev[usuarioIndex] = usuarioUpdate
            await fs.promises.writeFile(this.path, JSON.stringify(usuariosPrev))
        } catch (error) {
            return error
        }
    }

}

const usuario2= {
    nombre: 'asdasdasd',
    apellido:'asdasdasd'
}

const obj ={
    nombre:'cambiado',
    apellido:'cambiado'
}

async function prueba(){
    const manager = new ProductManager('Usuarios.json');
    await manager.addProduct(usuario2)
    //const usuarios = await manager.getProduct()
    //const usuario = await manager.getProductById(3)
    //await manager.deleteProduct(3)
    //console.log(usuario);
}

prueba()


const manager = new ProductManager('Users.json');
export default manager
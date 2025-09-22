import { Request, Response } from 'express'
class CarrinhoController {
    adicionar(req:Request, res:Response) {
        res.send("tere top")
    }
    listar(req:Request, res:Response) {
         res.send("tere legal")
    }
}
export default CarrinhoController
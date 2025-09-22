import {Router} from 'express'

import CarrinhoController from './carrinho/carrinho.constroller'
import ProdutosController from './produtos/produtos.controller'

const carrinhoController = new CarrinhoController()
const produtoController = new ProdutosController()

const rotas = Router()

rotas.get('/carrinho', carrinhoController.listar)
rotas.post('/carrinho', carrinhoController.adicionar)

// Rotas dos produtos
rotas.get('/produtos', produtoController.listar)
rotas.post('/produtos', produtoController.adicionar)

export default rotas
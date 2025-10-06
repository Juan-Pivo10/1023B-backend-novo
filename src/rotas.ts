import {Router} from 'express'

import carrinhoController from './carrinho/carrinho.controller.js'
import produtosController from './produtos/produtos.controller.js'
import usuariosController from './usuarios/usarios.controller.js'

const rotas = Router()

//rotas.get('/carrinho', carrinhoController.listarItem)
//rotas.post('/carrinho', carrinhoController.adicionarItem)

// Rotas dos produtos
rotas.get('/produtos', produtosController.listar)
rotas.post('/produtos', produtosController.adicionar)

rotas.post('/adicionarItem', carrinhoController.adicionarItem)





rotas.post('/adicionarUsuario', usuariosController.adicionar)
rotas.post('/login', usuariosController.login)

export default rotas
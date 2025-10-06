import { Request, Response } from "express";
import { db } from '../database/banco-mongo.js'
import { ObjectId } from "mongodb";

interface ItemCarrinho {
    produtoId: string;
    quantidade: number;
    precoUnitario: number;
    nome: string;
}

interface Carrinho {
    usuarioId: string;
    itens: ItemCarrinho[];
    dataAtualizacao: Date;
    total: number;
}
class CarrinhoController {
    //adicionarItem
    async adicionarItem(req:Request, res:Response) {
        const { usuarioId, produtoId, quantidade } = req.body;
        if (!usuarioId || !produtoId || !quantidade) {
            return res.status(400).json({ error: "usuarioId, produtoId e quantidade são obrigatórios" });
        }

        // Buscar o produto no banco de dados
        const produto = await db.collection("produtos").findOne({ _id: ObjectId.createFromHexString(produtoId)});
        if (!produto) {
            return res.status(404).json({ error: "Produto não encontrado" });
        }

        // Pegar o preço do produto
        const precoUnitario = produto.preco;

        // Pegar o nome do produto
        const nome = produto.nome;
        const item: ItemCarrinho = { produtoId, quantidade, precoUnitario, nome };

        // Verificar se um carrinho com o usuário já existe
        const carrinhosCollection = db.collection<Carrinho>("carrinhos");
        let carrinho: Carrinho | null = await carrinhosCollection.findOne({ usuarioId });
        if (!carrinho) {
            // Se não existir deve criar um novo carrinho
            carrinho = {
                usuarioId,
                itens: [item],
                dataAtualizacao: new Date(),    
                total: 0
            };
        }

        // Adicionar o item ao carrinho
        carrinho.itens.push(item);
        carrinho.total += precoUnitario * quantidade;
        carrinho.dataAtualizacao = new Date();

        // Salvar o carrinho no banco de dados
        await db.collection("carrinhos").updateOne({ usuarioId }, { $set: carrinho }, { upsert: true });

        return res.status(201).json(carrinho);
    }





    //removerItem
    //atualizarQuantidade
    //listar
    //remover                -> Remover o carrinho todo

}
export default new CarrinhoController()
import React from "react";
import {Produto} from 'app/models/produtos'
import {useState} from "react";

interface TabelaProdutosProps{
    produtos: Array<Produto>;
    onEdit: (produto) => void;
    onDelete: (produto) => void;
}

export const TabelaProdutos: React.FC<TabelaProdutosProps> = ({produtos, onDelete, onEdit}) => {
    return(
        <table className={"table is-hoverable"} >
            <thead>
                <tr>
                    <th>Código</th>
                    <th>SKU</th>
                    <th>NOME</th>
                    <th>PREÇO</th>
                    <th>AÇÕES</th>
                </tr>
            </thead>
            <tbody>
            {produtos.map(produto =>  <ProdutoRow
                                        onDelete={onDelete}
                                        onEdit={onEdit}
                                        key={produto.id}
                                        produto={produto}/> )}
            </tbody>
        </table>
    )
}
interface ProdutoRowProps {
    produto: Produto;
    onEdit: (produto) => void;
    onDelete: (produto) => void;
}

const ProdutoRow: React.FC<ProdutoRowProps> = ({produto, onDelete, onEdit}) => {

    const [deletando, setDeletando] = useState<boolean>(false )
    const onDeleteClick = (produto: Produto) => {
        if(deletando){
            onDelete(produto)
            setDeletando(false)
        }else
            setDeletando(true)
    }

    const cancelaDeleta = () => setDeletando(false)

    return (
        <tr>
            <td>{produto.id}</td>
            <td>{produto.sku}</td>
            <td>{produto.nome}</td>
            <td>{produto.preco}</td>
            <td>
                {!deletando &&
                <button onClick={event => onEdit(produto)} className={"button is-success is-rounded is-small"}>   Editar </button>
                }
                <button onClick={event => onDeleteClick(produto)} className={"button is-danger  is-rounded is-small"}> {deletando? "Confirma?" : "Deletar"} </button>

                {deletando &&
                    <button onClick={cancelaDeleta} className={"button is-rounded is-small"}> Cancelar </button>
                }
            </td>
        </tr>
    )
}

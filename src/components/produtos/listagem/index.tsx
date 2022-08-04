import {Layout} from 'components'
import {Loader} from 'components/common/loader'
import Link from "next/link";
import {TabelaProdutos} from './tabela'
import {Produto} from 'app/models/produtos'
import useSWR from 'swr'
import {httpClient} from "../../../app/http/indexhttp";
import {AxiosResponse} from "axios";
import {router} from "next/client";
import Router from "next/router";
import {useProdutoService} from "../../../app/services";
import {useEffect, useState} from "react";
import {Alert} from "../../common/message";

export const ListagemProdutos: React.FC = () => {

    // const produtos: Produto[] = []
    const service = useProdutoService();
    const [messages, setMessages] = useState<Array<Alert>>([])
    const {data: result, error} = useSWR<AxiosResponse<Produto[]>>('/api-produtos', url => httpClient.get(url))
    const [lista, setLista] = useState<Produto[]>([])

    useEffect(() => {
        setLista(result?.data || [])
        },
        [result])

    const editar = (produto: Produto) => {
        const url = `/cadastros/produtos?id=${produto.id}`
        Router.push(url)

    }
    const deletar = (produto: Produto) => {
        service.deletar(produto.id).then(response => {
            setMessages([{
                tipo: "success", texto: "Produto excluído com sucesso!"}
            ])
            const listaAlterada: Produto[] | undefined = lista?.filter(p => p.id != produto.id)
            setLista(listaAlterada)
        })
    }

    return(
        <Layout titulo={"Produtos"} mensagens={messages}>
            <Link href={"/cadastros/produtos"}>
            <button className={"button is-warning"}>Novo</button>
            </Link>
            <br/>
            <br/>
            <Loader show={!result}></Loader>
            <TabelaProdutos onEdit={editar}
                            onDelete={deletar}
                            produtos={lista}/>

        </Layout>
    )
}
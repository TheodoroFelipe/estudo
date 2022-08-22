import {Layout, Input, Message} from 'components';
import React, {useEffect, useState, useTransition} from 'react';
import {useProdutoService} from 'app/services';
import {Produto} from "../../../app/models/produtos";
import {Alert} from "components/common/message";
import * as yup from 'yup';
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import Link from "next/link";
import {useRouter} from "next/router";
import {formatReal} from 'app/util/money/index'
import {string} from "yup";

const msgCampoObrigatorio = "Campo obrigatório";

const validationSchema = yup.object().shape({
    sku: yup.string().required(msgCampoObrigatorio),
    nome: yup.string().required(msgCampoObrigatorio),
    descricao: yup.string().required(msgCampoObrigatorio),
    preco: yup.number().required(msgCampoObrigatorio).moreThan(0, "O valor deve ser maior que 0,00.")

})

interface FormErros{
    sku?: string;
    nome?: string | undefined;
    preco?: string;
    descricao?: string;
}

export const CadastroProdutos: React.FC = () => {

    const service = useProdutoService()
    const [sku, setSku] = useState<string|undefined>('') //varável para receber o valor de entrada do forms, mesmo nome setado no json;
    const [preco, setPreco] = useState<string | undefined>('')
    const [nome, setNome] = useState<string | undefined>('')
    const [descricao, setDescricao] = useState<string|undefined>('')
    const [id, setId] = useState<string|undefined>('')
    const [cadastro, setCadastro] = useState<string|undefined>('')
    const [messages, setMessages] = useState<Array<Alert>>([])
    const [codigo_erro, setCodigo_erro] = useState<number|undefined>()
    const [errors, setErrors] = useState<FormErros>({})
    const router = useRouter();
    const {id: queryId} = router.query;

    useEffect(() => {

        if (queryId) {

            service.carregarProduto(queryId).then(produtoEncontrado => {
                console.log(produtoEncontrado)
                setId(produtoEncontrado.id)
                setSku(produtoEncontrado.sku)
                setNome(produtoEncontrado.nome)
                setDescricao(produtoEncontrado.descricao)
                setPreco(formatReal(`${produtoEncontrado.preco}`))
                setCadastro(produtoEncontrado.cadastro || '')
            })
        }
    }, [queryId])


    // noinspection TypeScriptValidateTypes
    const submit = () => {
        const produto: Produto = {
            id,
            sku,
            preco: parseFloat(preco),
            nome,
            descricao
        }

        validationSchema.validate(produto).then(obj => {
            setErrors({})

            if (id){

                service
                    .atualizar(produto)
                    .then(response => setCodigo_erro(1))

            }else{
                service
                    .salvar(produto)
                    .then(produtoResposta => {
                        setId(produtoResposta.data.id)
                        setCadastro(produtoResposta.data.cadastro)
                        setCodigo_erro(2)})
            }
            }).catch(err => {
                //console.log(JSON.parse(JSON.stringify(err)))
                const field = err.path;
                const message = err.message;

                setErrors({ [field]: message })

                // setMessages([
                //     {tipo: "danger", field, texto:message}
                // ])
            })
    }

    return (
        <Layout titulo={"Produtos"} mensagens={messages} codigo_erro={codigo_erro}>

            {id &&
                <div className={"columns"}>

                    <Input label={"Código:"}
                           columnClass={"is-half"}
                           value={id}
                           disabled
                           id={"inputId"}
                    />

                    <Input label={"Data de cadastro:"}
                           columnClass={"is-half"}
                           value={cadastro}
                           disabled
                           id={"input`DataCadastro"}
                    />

                </div>
            }


            <div className={"columns"}>

                <Input label={"SKU *"}
                       columnClass={"is-half"}
                       onChange={event => setSku(event.target.value)}
                       value={sku}
                       id={"inputSku"}
                       placeholder={"Digite o SKU do produto."}
                       error={errors.sku}/>

                <Input label={"Preço *"}
                       columnClass={"is-half"}
                       onChange={event => setPreco(event.target.value)}
                       value={preco}
                       id={"inputPreco"}
                       placeholder={"Digite o preço do produto."}
                       maxLenght={16}
                       //error={errors.preco}
                />

            </div>

            <div className={"columns"}>

                <Input label={"Nome *"}
                       columnClass={"is-full"}
                       onChange={event => setNome(event.target.value)}
                       value={nome}
                       id={"inputNome"}
                       placeholder={"Digite o nome do produto."}
                       error={errors.nome}/>

            </div>

            <div className={"columns"}>
                <div className={"field column is-full"}>
                    <label className={"label"} htmlFor={"inpuDescricao"}> Descrição: * </label>
                    <div className={"control"}>
                        <textarea className={"textarea"}
                               onChange={event => setDescricao(event.target.value)}
                               id={"inputDescricao"}
                               placeholder={"Entre com uma descrição para o produto"}/>
                        {errors.descricao &&
                            <p className={"help is-danger"}>{errors.descricao}</p> }
                    </div>
                </div>
            </div>

            <div className={"field is-grouped"}>
                <div className={"control is-link"}>
                    <button onClick={submit} className="button">
                        {id ? "Atualizar" : "Salvar"}
                    </button>
                </div>
                <div className={"control"}>
                    <Link href={"/consultas/produtos"}>
                    <button className={"button is-link"}>Voltar</button>
                    </Link>
                </div>
                </div>
        </Layout>
    );
};
import {Layout, Input, Message} from 'components';
import React, {useState} from 'react';
import {useProdutoService} from 'app/services';
import {Produto} from "../../../app/models/produtos";
import {Alert} from "components/common/message";
import * as yup from 'yup';
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

const msgCampoObrigatorio = "Capo obrigatório";

const validationSchema = yup.object().shape({
    sku: yup.string().required(msgCampoObrigatorio),
    nome: yup.string().required(msgCampoObrigatorio),
    descricao: yup.string().required(msgCampoObrigatorio),
    preco: yup.number().required(msgCampoObrigatorio)

})

interface FormErros{
    sku?: string;
    nome?: string;
    preco?: string;
    descricao?: string;
}

export const CadastroProdutos: React.FC = () => {

    const service = useProdutoService()
    const [sku, setSku] = useState<string>('') //varável para receber o valor de entrada do forms, mesmo nome setado no json;
    const [preco, setPreco] = useState<string>('')
    const [nome, setNome] = useState<string>('')
    const [descricao, setDescricao] = useState<string>('')
    const [id, setId] = useState<string|undefined>('')
    const [cadastro, setCadastro] = useState<string|undefined>('')
    const [messages, setMessages] = useState<Array<Alert>>([])
    const [codigo_erro, setCodigo_erro] = useState<number|undefined>()
    const [errors, setErrors] = useState<FormErros>({})


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

            setErrors({
                [field]: message
            })

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
                       onChange={setSku}
                       value={sku}
                       id={"inputSku"}
                       placeholder={"Digite o SKU do produto."}
                       error={errors.sku}/>

                <Input label={"Preço *"}
                       columnClass={"is-half"}
                       onChange={setPreco}
                       value={preco}
                       id={"inputPreco"}
                       placeholder={"Digite o preço do produto."}
                       maxLenght={16}
                       error={errors.preco}/>

            </div>

            <div className={"columns"}>

                <Input label={"Nome *"}
                       columnClass={"is-full"}
                       onChange={setNome}
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
                    <button className={"button is-link"}>Voltar</button>
                </div>

            </div>
        </Layout>
    );
};
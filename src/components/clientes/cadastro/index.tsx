import React, {useState} from "react";
import {Layout} from "../../layout";
import {ClienteForm} from './form'
import {Cliente} from "../../../app/models/clientes";
import {useClienteService} from "../../../app/services/cliente.service";

export const CadastroCliente: React.FC = () => {

    const [cliente, setCliente] = useState<Cliente>({});

    const service = useClienteService();

    const handleSubmit = (cliente: Cliente) => {

        service.salvar(cliente).then(clienteResposta => {
            setCliente(clienteResposta.data)
            console.log(clienteResposta.data);
        })
    }

    return (

            <Layout titulo={"Clientes"}>
                <ClienteForm cliente={cliente} onSubmit={handleSubmit}/>

            </Layout>

    )
}
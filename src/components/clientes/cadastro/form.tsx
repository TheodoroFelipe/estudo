import React from "react";
import {Cliente} from 'app/models/clientes'
import {useFormik} from "formik";
import {Input} from 'components'

interface ClienteFormProps {
    cliente: Cliente;
    onSubmit: (cliente: Cliente) => void;
}

const formScheme: Cliente = {
    id: '',
    cadastro: '',
    cpf: '',
    dataNascimento: '',
    endereco: '',
    nome: '',
    telefone: '',
    email: ''

}

export const ClienteForm: React.FC<ClienteFormProps> = ({cliente, onSubmit}) => {

    const formik = useFormik<Cliente>({
        initialValues: {... formScheme, ... cliente},
        onSubmit,
    })

    return (
        <form onSubmit={formik.handleSubmit}>{
            formik.values.id &&

            <div className={"columns"}>

                <Input id={"id"}
                       name={"id"}
                       onChange={formik.handleChange}
                       value={formik.values.id}
                       label={"Código: *"}
                       columnClasses={"is-half"}
                       disabled
                       autoComplete={"off"}/>

                <Input id={"cadastro"}
                       name={"cadastro"}
                       onChange={formik.handleChange}
                       value={formik.values.cadastro}
                       label={"Data Cadastro: *"}
                       columnClasses={"is-half"}
                       disabled
                       autoComplete={"off"}/>
            </div>
            }
            <div className={"columns"}>
                <Input id={"nome"}
                       name={"nome"}
                       label={"Nome: *"}
                       onChange={formik.handleChange}
                       value={formik.values.nome}
                       columnClasses ={"is-full"}
                autoComplete={"off"}/>
            </div>

            <div className={"columns"}>
                <Input id={"cpf"}
                       name={"cpf"}
                       onChange={formik.handleChange}
                       value={formik.values.cpf}
                       label={"CPF: *"}
                       columnClasses={"is-half"}
                       autoComplete={"off"}/>

                <Input id={"dataNascimento"}
                       name={"dataNascimento"}
                       onChange={formik.handleChange}
                       value={formik.values.dataNascimento}
                       label={"Data de Nascimento: *"}
                       columnClasses={"is-half"}
                       autoComplete={"off"}/>
            </div>

            <div className={"columns"}>
                <Input id={"endereco"}
                       name={"endereco"}
                       label={"Endereço: *"}
                       onChange={formik.handleChange}
                       value={formik.values.endereco}
                       columnClasses ={"is-full"}
                       autoComplete={"off"}/>
            </div>

            <div className={"columns"}>
                <Input id={"email"}
                       name={"email"}
                       onChange={formik.handleChange}
                       value={formik.values.email}
                       label={"E-mail: *"}
                       columnClasses={"is-half"}
                       autoComplete={"off"}/>

                <Input id={"telefone"}
                       name={"telefone"}
                       onChange={formik.handleChange}
                       value={formik.values.telefone}
                       label={"Telefone: *"}
                       columnClasses={"is-half"}
                       autoComplete={"off"}/>
            </div>

        </form>
    )
}
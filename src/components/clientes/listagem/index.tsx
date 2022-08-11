import {Layout} from "../../layout";
import {Input} from "../../common";
import {useFormik} from "formik";
import {useState} from "react";
import {Cliente} from "../../../app/models/clientes";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import clientes from "../../../pages/cadastros/clientes";


interface ConsultaClientesForm{
    nome?: string;
    cpf?: string;
}

export const ListagemClientes: React.FC = () => {

    const [cliente, setCliente] = useState<Cliente[]>([
        {id: "0", nome: "Fulano", cpf: "000.000.000-98", email: "email@email"}
    ]);


    const handleSubmit = (filtro: ConsultaClientesForm) => {
        console.log(filtro)
    }

    const {handlesubmit: formikSubmit, values: filtro, handleChange} = useFormik<ConsultaClientesForm>({
        onSubmit: handleSubmit,
        initialValues: {nome: '', cpf: ''}
    })

    return(
        <Layout titulo={"Clientes"}>

            <form onSubmit={formikSubmit}>

                <div className={"columns"}>
                    <Input id={"nome"} name={"nome"} value={filtro.nome} label={"Nome"} columnClasses={"is-half"}
                    autoComplete={"off"}
                    onChange={handleChange}/>

                    <Input id={"cpf"} name={"cpf"} value={filtro.cpf} label={"CPF"} columnClasses={"is-half"}
                    onChange={handleChange}/>
                </div>
                <div className={"field is-grouped"}>
                    <div className={"control is-link"}>
                        <button type={"submit"} className={"button is-success"}>
                            Consultar
                        </button>
                    </div>
                </div>
                <div className={"columns"}>
                    <div className={"is-full"}>
                        <DataTable value={clientes}>

                            <Column field={"id"}   header={"Código"} />
                            <Column field={"nome"} header={"Nome"}   />
                            <Column field={"cpf"}  header={"CPF"}    />
                            <Column field={"nome"} header={"E-mail"} />

                        </DataTable>
                    </div>
                </div>
            </form>
        </Layout>
    )
}
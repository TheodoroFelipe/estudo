import {Layout} from "../../layout";
import {Input} from "../../common";
import {useFormik} from "formik";
import {useState} from "react";
import {Cliente} from "../../../app/models/clientes";
import {DataTable, DataTablePageParams} from "primereact/datatable";
import {Column} from "primereact/column";
import clientes from "../../../pages/cadastros/clientes";
import {Page} from "../../../app/models/common/page";
import {event} from "next/dist/build/output/log";
import {useClienteService} from "../../../app/services/cliente.service";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;


interface ConsultaClientesForm{
    nome?: string;
    cpf?: string;
}

export const ListagemClientes: React.FC = () => {

    const service = useClienteService();
    const [loading, setLoading] = useState<boolean>(false)
    const [cliente, setCliente] = useState<Page<Cliente>>({
        content: [],
        first: 0,
        number: 0,
        size: 10,
        totalElements: 0
        }
    );


    const handleSubmit = (filtro: ConsultaClientesForm) => {
        handlePage(null);
    }

    const {handlesubmit: formikSubmit, values: filtro, handleChange} =
        useFormik<ConsultaClientesForm>({
        onSubmit: handleSubmit,
        initialValues: {nome: '', cpf: ''}
    })

    const handlePage = (event) => {
        setLoading(true)
        service.find(filtro.nome, filtro.cpf, event?.page, event?.rows)
            .then(result => {
                setCliente({...result, first: event?.first}) //passando resultado e setando o first sendo o que é passado pelo evento;
            }).finally(() => setLoading(false))

    }

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
                        <DataTable value={cliente.content} totalRecords={cliente.totalElements} //quantidade de elementos que existe no banco de dados
                                   lazy={true} paginator={true}
                                   first={cliente.first}
                                   rows={cliente.size}
                                   onPage={handlePage}
                                   loading={loading} emptyMessage={"Nenhum registro encontrado."}>

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
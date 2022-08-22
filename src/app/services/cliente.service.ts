import {httpClient} from "../http/indexhttp";
import {Cliente} from "../models/clientes";
import {AxiosResponse} from "axios";
import {Page} from "../models/common/page";
import {data} from "browserslist";

const resourceURL: string = "/api/clientes"

export const useClienteService =() => {

    const salvar = async (cliente: Cliente): Promise<AxiosResponse<Cliente>> => {
        //const response: AxiosResponse<Cliente> = await httpClient.post<Cliente>(resourceURL, cliente);
        return httpClient.post<Cliente>(resourceURL, cliente);
    }

    const atualizar = async (cliente: Cliente): Promise<void> => {
        const url: string = `${resourceURL}/${cliente.id}`
        await httpClient.put<Cliente>(url, cliente)
    }

    const carregarCliente = async (id) : Promise<Cliente> => {
        const url: string = `${resourceURL}/${id}`
        const response: AxiosResponse<Cliente> = await httpClient.get(url);
        return response.data;
    }

    const deletar = async (id) : Promise<void> => {
        const url: string = `${resourceURL}/${id}`
        await httpClient.delete(url)
    }

    const find = async (nome: string, cpf: string, page: number, size: number): Promise<Page<Cliente>> => {
        const url = `${resourceURL}?nome = ${nome} & cpf = ${cpf} & page = ${page} & size = ${size}`
        const response: AxiosResponse<Page<Cliente>> = await  httpClient.get(url);
        return response.data;
    }

    return{
        salvar,
        atualizar,
        carregarCliente,
        deletar,
        find
    }

 }

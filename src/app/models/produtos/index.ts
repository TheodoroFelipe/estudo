//import {Produto} from "../../../pages/cadastros/produtos";

export interface Produto {
    id?: string;
    nome?: string;
    descricao?: string;
    preco?: number;
    sku?: string | undefined;
    cadastro?: string;
}
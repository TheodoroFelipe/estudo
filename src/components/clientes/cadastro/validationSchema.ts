import * as Yup from 'yup'

const campoObrigatorioMsg = "Campo obrigatório!";

const validationScheme = Yup.object()
    .shape({
        cpf: Yup.string().trim().required(campoObrigatorioMsg).length(14, "CPF inválido!"),
        dataNascimento: Yup.string().trim().required(campoObrigatorioMsg).length(10, "Data inválida!"),
        email: Yup.string().trim().required(campoObrigatorioMsg).email("E-mail inválido!"),
        endereco: Yup.string().trim().required(campoObrigatorioMsg),
        nome: Yup.string().trim().required(campoObrigatorioMsg),
        telefone: Yup.string().trim().required(campoObrigatorioMsg)
    })


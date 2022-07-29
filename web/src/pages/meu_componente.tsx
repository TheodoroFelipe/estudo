//um componente React: sempre letra maiúscula par definição dos componentes;
//expressão js dentro do tsx é escrita dentro das chaves {};
import Head from "next/head";
import React from "react";

interface MensagemProps{ //serve como interface de propriedades para determinado componente;
    mensagem: string;
}

const Mensagem: React.FC<MensagemProps> = (props: MensagemProps) => {
    return(
        <div>
            {props.mensagem}
        </div>
    )

}

// function Mensagem(props: any) {
//     return(
//         <div>
//             {props.mensagem}
//         </div>
//     )
// }


// function MeuComponente(){
//     return(
//         <div>
//             <Head>
//                 <title> Criando um componente .tsx. </title>
//             </Head>
//
//             <body>
//                     Meu componente novo!
//                     <Mensagem mensagem= "Teste js" />
//             </body>
//         </div>
//     )
// }

const MeuComponente = () => {
    return(
        <div>
            <Mensagem mensagem = "Uma nova mensagem!"/>
        </div>
    )
}

export default MeuComponente; // estamos exportando a função;
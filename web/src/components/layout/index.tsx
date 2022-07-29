import {Menu} from './menu'
import {ReactNode} from "react";
import {Message} from 'components'
import {Alert} from "/components/common/message"

interface LayoutProps{
    titulo?: string;
    children?: ReactNode;
    mensagens?: Array<Alert>;
    codigo_erro: number|undefined;
}

export const Layout: React.FC <LayoutProps> = (props) => {
    return(
        <div className = "app">
            <section className = "main-content columns is-fullheight">
                {/* menu ficará aqui */}
                <Menu/>

                <div className={"container column is-10"}>
                    <div className={"card-content"}>
                        <div className={"card-header"}>
                            <p className={"card-header-title"}>
                                {props.titulo}

                            </p>
                        </div>
                        <div className={"card-content"}>
                            <div className={"content"}>
                                {props.mensagens &&
                                    // eslint-disable-next-line react/jsx-key
                                    props.mensagens.filter((mensagem) => {
                                        return mensagem.codigo == props.codigo_erro
                                    }).map((mensagem) => <Message key={mensagem.texto} {...mensagem} />)
                                }
                                {props.children}

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
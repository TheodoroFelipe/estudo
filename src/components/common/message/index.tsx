import React from "react";


interface MessageProps {
    tipo: string;
    texto: string;
    field?: string;
}

export interface Alert{
    tipo: string;
    field?: string;
    texto: string;
    codigo?: number;
}


export const Message: React.FC<MessageProps> = ({
    texto, field, tipo
                                                }) =>  {
    return (
        <article className={`message is-${tipo}`}>
            <div className={"message-body"}>
                {field && `&{field}:`} {texto}
            </div>
        </article>
    )
}
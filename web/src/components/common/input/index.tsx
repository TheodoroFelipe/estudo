import {HTMLAttributes} from 'react'

interface InputProps extends HTMLAttributes<HTMLInputElement>{
    id: string;
    onChange?: (value) => void;
    label: string;
    columnClass: string;
    error?: string|undefined;
}

export const Input: React.FC <InputProps> = ({id, onChange, label, columnClass, error, ...inputProps}: InputProps) => {
    return(
          <div className={`field column ${columnClass}`}>
            <label className={"label"}
                   htmlFor={id}> {label} </label>

                <div className={"control"}>
                        <input className={"input"}
                                  id={id} {...inputProps}
                                  onChange={event => {
                                      if (onChange)
                                      onChange(event.target.value)}}/>
                    {error &&
                        <p className={"help is-danger"}>
                            {error}
                        </p>

                    }
                </div>
          </div>
    )
}
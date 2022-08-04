import Link from "next/link";

export const Menu: React.FC = () =>{ //estrutura de componente React!!
    return(
        <aside className={"column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile"}>
            <p className={"menu-label is-hidden-touch"}>
                Minhas Vendas
            </p>

            <ul className={"menu-list"}>
                <MenuItem href={"/"} label={"Home"}/>
                <MenuItem href={"/"} label={"Configuration"}/>
                <MenuItem href={"/consultas/produtos"} label={"Products"}/>
                <MenuItem href={"/cadastros/clientes"} label={"Clientes"}/>
                <MenuItem href={"/"} label={"Sair"}/>
            </ul>

        </aside>
    )
}

interface MenuItemProps{
    href: string;
    label: string;

}

const MenuItem: React.FC <MenuItemProps> = (props: MenuItemProps) => {
    return(
        <li>
            <Link href={props.href}>
                <a href={"#"}>
                    <span className={"icon"}></span>
                    {props.label}
                </a>
            </Link>
        </li>

    )
}
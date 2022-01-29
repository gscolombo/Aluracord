import config from '../config.json';
const colors = config.theme.colors;

export default function Title(props) {
    const Tag = props.tag || 'h1';
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>
                {`
                    ${Tag} {
                        color: ${colors.neutrals['000']};
                        font-size: 36px;
                        font-weight: 600;
                        font-family: 'Titillium Web', sans-serif;
                    }
                `}
            </style>
        </>
    )
}
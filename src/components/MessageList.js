import { Box, Text, Image } from "@skynexui/components";
import config from "../config.json";

const colors = config.theme.colors;

export function MessageList(props) {
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflowY: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.messages.map( message => {
                return (
                    <Text
                        key={ message.id }
                        id={ message.id}
                        className="message"
                        tag="li"
                        styleSheet={{                   
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: colors.neutrals[700],
                            }
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget
                            .querySelector(".gg-trash")
                            .classList
                            .remove('unshow');
                        }}
                        onMouseOut={ (e) => {
                            e.currentTarget
                            .querySelector(".gg-trash")
                            .classList
                            .add('unshow');
                        }}
                    >
                        <Box
                            styleSheet={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={ message.avatar }
                            />
                            <Text tag="strong">
                                { message.de }
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>

                            <button 
                                className="gg-trash unshow"
                                style={{
                                    marginLeft: "auto",
                                    cursor: "pointer"
                                }}
                                onClick={(e) => {
                                    const id = Number.parseInt(e.nativeEvent.path[2].id);
                                    props.customOnClick(id);
                                }}
                            >
                            </button>
                        </Box>
                        {message.texto.startsWith(":sticker:") ? (
                            <Image 
                                src={message.texto.replace(':sticker:', '')}
                                styleSheet={{
                                    maxWidth: "100px"
                                }}
                            />
                        ) : (
                            message.texto 
                        )} 
                    </Text>
                )
            })}
            
        </Box>
    )
}
import { Box, Text, TextField, Button, Image } from "@skynexui/components";
import { useEffect, useState } from "react/cjs/react.development";
import config from "../config.json";

// Supabase
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMyODg3MSwiZXhwIjoxOTU4OTA0ODcxfQ.aP7Uojxx1j8H72MMwR9xpz2_0zzRe8tgZbKpXLFYPto";
const SUPABASE_URL = "https://aijrncfzrejofeycjmsy.supabase.co";

const colors = config.theme.colors;

export default function ChatPage(){
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);


    function handleNewMessage(newMessage) {
        const message = {
            id: messageList.length + 1,
            text: newMessage,
            from: 'gscolombo',
        }

        setMessageList([
            message,
            ...messageList
        ]);
        setMessage('');
    }

    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: colors.primary['500'],
                    backgroundImage: `url(${config.theme.background})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                }}

            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: '1',
                        width: '100%', maxWidth: '95%', height: '100%', maxHeight: '95vh',
                        border: `2px solid rgb(255 255 255)`,
                        borderRadius: '5px', padding: '32px',
                        boxShadow: `inset 0 0 30px 0 rgb(0 0 0 / 50%)`,
                        backgroundColor: 'rgb(0, 0, 0, .75)', 
                    }}
                >
                    <Header />
                    <Box
                        styleSheet={{
                            position: 'relative',
                            display: 'flex',
                            flex: 1,
                            height: '80%',
                            backgroundColor: colors.neutrals[600],
                            flexDirection: 'column',
                            borderRadius: '5px',
                            padding: '16px',
                        }}
                    >
                        <MessageList 
                            messages={ messageList }
                            customOnClick={(id) => {
                                const newMessageList = messageList.filter( item => {
                                    if (item.id !== id) {
                                        return item;
                                    }
                                });

                                setMessageList(newMessageList);
                            }}
                        />

                        <Box
                            as="form"
                            styleSheet={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <TextField
                                value={ message }
                                onKeyPress={ e => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        handleNewMessage(message);
                                    }
                                }}
                                onChange={e => {
                                       const value = e.target.value;
                                       setMessage(value); 
                                    }
                                }
                                placeholder="Insira sua mensagem aqui..."
                                type="textarea"
                                styleSheet={{
                                    width: '100%',
                                    border: '0',
                                    resize: 'none',
                                    borderRadius: '5px',
                                    padding: '6px 8px',
                                    backgroundColor: colors.neutrals[800],
                                    marginRight: '12px',
                                    color: colors.neutrals[200],
                                }}
                            />

                            <Button
                                type="button"
                                label="ENVIAR"
                                styleSheet={{
                                    height: "100%"
                                }}
                                onClick={ () => {
                                    handleNewMessage(message)
                                }}
                            />
                        </Box>
                    </Box>
                </Box>

            </Box>
        </>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ 
                width: '100%', 
                marginBottom: '16px', 
                display: 'flex',
                alignItems: 'center', 
                justifyContent: 'space-between' }} >
                <Text styleSheet={{ color: ' white' }} variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    const [mouseState, setMouseState] = useState([]);

    // Função para verificar o hover na mensagem
    useEffect(() => {
        if (mouseState.length > 0 && mouseState[0] !== "deletedItem") {
            const state = mouseState[0];
    
            if (typeof document !== "undefined") {
                const button = mouseState[1].querySelector(".gg-trash");
                state === "over" ?
                button.classList.remove("unshow") : button.classList.add("unshow");
            }            
        }
    }, [mouseState[0]]);


    return (
        <Box
            tag="ul"
            styleSheet={{
                // overflow: 'scroll',
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
                        onMouseEnter={(e) => {
                            const li = e.target;
                            setMouseState(["over", li]);
                        }}
                        onMouseLeave={ (e) => {
                            const li = e.target;
                            setMouseState(["out", li]);
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
                                src={`https://github.com/gscolombo.png`}
                            />
                            <Text tag="strong">
                                { message.from }
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

                            <link href='https://css.gg/trash.css' rel='stylesheet'></link>
                            <button 
                                className="gg-trash unshow"
                                style={{
                                    marginLeft: "auto",
                                    cursor: "pointer"
                                }}
                                onClick={(e) => {
                                    const id = Number.parseInt(e.nativeEvent.path[2].id);
                                    props.customOnClick(id);
                                    setMouseState(["deletedItem"]);
                                }}
                            >
                            </button>
                        </Box>
                        { message.text }
                    </Text>
                )
            })}
            
        </Box>
    )
}
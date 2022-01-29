import { Box, Text, TextField, Button, Image } from "@skynexui/components";
import React, { useEffect, useState } from 'react';
import config from "../config.json";

// Componentes do Next
import Head from "next/head";

// Supabase
import { createClient } from "@supabase/supabase-js";

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMyODg3MSwiZXhwIjoxOTU4OTA0ODcxfQ.aP7Uojxx1j8H72MMwR9xpz2_0zzRe8tgZbKpXLFYPto";
const SUPABASE_URL = "https://aijrncfzrejofeycjmsy.supabase.co";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function listenDB(f) {
    return supabase
        .from('mensagens')
        .on("INSERT", (info) => {
            f(info.new);
        })
        .subscribe();
}

// Componentes personalizados
import { StickersButton } from "../components/StickersButton";
import { MessageList } from "../components/MessageList";

const colors = config.theme.colors;

export default function ChatPage(){
    const [message, setMessage] = useState('');
    const [loadingState, setLoadingState] = useState('unloaded');
    const [messageList, setMessageList] = useState([]);

    // Busca das mensagens no banco de dados externo
    useEffect(() => {
        supabase.from('mensagens')
        .select("*")
        .order("id", { ascending: false})
        .then(({ data }) => setMessageList(data));

        listenDB( newMessage => {
            setMessageList( previousList => {
                return [
                    newMessage,
                    ...previousList
                ]
            });
        });
    },  []);

    async function handleNewMessage(newMessage) {
        const message = {
            texto: newMessage,
            de: 'gscolombo',
        }

        await supabase.from('mensagens').insert(message);
        setMessage('');
    }

    return (
        <>
            <Head>
                <link href='https://css.gg/trash.css' rel='stylesheet'></link>
            </Head>
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
                                supabase.from('mensagens')
                                .delete()
                                .match({ id: id })
                                .then( ({ data }) => {
                                    const filteredList = messageList.filter( item => {
                                        if (item.id !== data[0].id) {
                                            return item;
                                        }
                                    })
                                    setMessageList(filteredList);
                                })
                            }}
                        />

                        
                        <Box
                            as="form"
                            styleSheet={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <StickersButton
                                onStickerClick={(sticker) => {
                                    handleNewMessage(`:sticker:${sticker}`)
                                }}
                            />
                            <TextField
                                value={ message }
                                onKeyPress={ e => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        if (message !== "") {
                                            handleNewMessage(message);
                                        } 
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
                                    margin: '0 12px',
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
                                    handleNewMessage(message);
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


import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import config from '../../config.json';

// Hooks do React
import React, { useEffect, useState } from 'react';

// Componentes e funções do Next
import Head from 'next/head';
import { useRouter } from 'next/router';

// Scripts personalizados
import randomColors from "../utils/randomColors";

const colors = config.theme.colors;

function Title(props) {
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

export default function HomePage() {
    const [username, setUsername] = useState('');

    const routing = useRouter();
    const bgImage = "https://i.imgur.com/GCJRhiA.png";
    const userImgSrc = username.length > 2 ? "https://github.com/" + username + ".png" : "";

    useEffect(() => {
        randomColors();
    });
    
    let removeDisplayClass = "";
    if (username === "") {
        removeDisplayClass = "unshow";
    }

    return (
        <>
            <Head>
                <style>
                    {
                        '@import url(https://fonts.googleapis.com/css2?family=Titillium+Web:wght@200;300;400;600;700&display=swap);'
                    }
                </style>
            </Head>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: colors.primary['500'],
                    backgroundImage: `url(${bgImage})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                }}
            >
                <Box className='main'
                    styleSheet={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-around',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '700px',
                        border: `2px solid rgb(255 255 255)`,
                        borderRadius: '5px', padding: '32px', margin: '16px',
                        boxShadow: `inset 0 0 30px 0 rgb(0 0 0 / 50%)`,
                        backgroundColor: 'rgb(0, 0, 0, .75)', 
                    }}
                >
                    {/* Formulário */}
                    <Box
                        tag="form"
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', 
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' },
                            textAlign: 'center',
                            marginBottom: '32px',
                        }}
                        onSubmit={
                            function(e) {
                                e.preventDefault();
                                routing.push('/chat');
                            }
                        }
                    >
                        <Title>Bem vindo de volta!</Title>
                        <Text variant="body3"
                            styleSheet={{
                                marginBottom: '32px', color: colors.neutrals['100'],
                                fontFamily: 'Titillium Web, sans-serif;',
                                fontSize: '18px',
                                fontWeight: '400'
                            }}>
                                {config.name}
                            </Text>
                        <TextField fullWidth
                            placeholder='Insira seu nome de usuário do Github'
                            value={username}
                            onChange={
                               function(event) {
                                   const value = event.target.value;
                                   setUsername(value);
                               }
                           }
                            textFieldColors={{
                                neutral: {
                                    textColor: colors.neutrals['900'],
                                    mainColor: colors.neutrals['200'],
                                    mainColorHighlight: colors.primary['500'],
                                    backgroundColor: colors.neutrals['000']
                                }
                            }}
                        />

                        <Button
                            type="submit"
                            label='Entrar'
                            fullWidth
                            buttonColors={{
                                contrastColor: colors.neutrals['800'],
                                mainColor: colors.primary['500'],
                                mainColorLight: colors.primary['400'],
                                mainColorStrong: colors.primary['600']
                            }}
                            styleSheet={{
                                color: colors.neutrals['000']
                            }}
                        />

                    </Box>
                    {/* Formulário */}

                    {/* Área da Foto */}
                    <Box
                        className='imgField'
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', 
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '16px',
                            boxShadow: `inset 0 0 70px 0 rgb(0 0 0 / 50%)`,
                            backgroundColor: 'rgb(255, 255, 255, .5)', 
                            borderRadius: '10px',
                            flex: 1,
                            minHeight: '240px'
                        }}
                    >

                        <Image
                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '16px',
                            }}
                            src={ userImgSrc }
                        />

                        <Text
                            className={ removeDisplayClass }
                            variant="body4"
                            styleSheet={{
                                color: colors.neutrals['200'],
                                backgroundColor: colors.neutrals['900'],
                                padding: '3px 10px',
                                borderRadius: '1000px',
                                marginBottom: '5px'
                            }}
                        >
                            {username}
                        </Text>
                    </Box>
                    {/* Área da Foto */}

                </Box>
            </Box>
        </>
    ) 
}

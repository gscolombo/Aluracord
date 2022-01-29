import { Box, Button, Text, TextField, Image, Icon } from '@skynexui/components';
import config from '../config.json';

// Hooks do React
import React, { useEffect, useState } from 'react';

// Componentes e funções do Next
import { useRouter } from 'next/router';

// Componentes personalizados
import Title from '../components/Title';

// Scripts personalizados
import randomColors from "../utils/randomColors";
import handleLoading from '../utils/handleLoading';

const colors = config.theme.colors;

let timer;
export default function HomePage() {
    // Variáveis de estado de input
    const [username, setUsername] = useState('');
    const [inputStatus, setInputStatus] = useState(false);
    const [stringSize, setStringSize] = useState({lastSize: 0, size: 0});
    const [lastInput, setLastInput] = useState('');

    // Variáveis de estado de requisições
    const [userData, setUserData] = useState(null);
    const [loadingState, setLoadingState] = useState('unloaded');
    const [error, setError] = useState('');

    let avatarSrc;
    let name;
    if (userData !== null && userData.avatar_url !== '') {
        avatarSrc = userData.avatar_url;
        name = userData.name;
    }

    // Função para verificar e guardar último valor de input 
    useEffect(() => {
        const size = stringSize.size;
        clearTimeout(timer);
        
        if (inputStatus) {
            timer = setTimeout(() => {
                setStringSize({
                    lastSize: size,
                    size: size
                })
            }, 1000);   
        }

        if (stringSize.lastSize === stringSize.size){
            clearTimeout(timer);
            setInputStatus(false);

            const input = document.querySelector(".login");
            const value = input.value;
            setLastInput(value);
        }

    }, [stringSize.lastSize])

    useEffect( () => {
        if (username !== "" && lastInput === "") {
            setLoadingState('loading');
        } else if (username === "" || username.length < 2) {
            setLoadingState('unloaded');
        }
    })

    // Função para requisição da API do Github
    useEffect(() => {
        if (lastInput === "") {
            setUserData({});
        }

        if (lastInput !== "" && lastInput.length > 2) {
            const url = `https://api.github.com/users/${lastInput}`;
            fetch(url)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    if (res.status === 404) {
                        setError('Perfil não encontrado :(');
                    } else {
                        setError('Falha na requisição. Código de erro: ' + res.status);
                    }
                    setLoadingState("error");
                    throw new Error(res.status);
                }
            })
            .then(json => {
                setUserData(json);
                setLoadingState('loaded');
            })
            .catch( error => {
                console.error("Falha na requisição!", error);
            })
        }
    }, [lastInput])

    const routing = useRouter();

    // Utilidades
    useEffect(() => {
        handleLoading(loadingState);
    });

    useEffect(() => {
        randomColors();
    }, [])
    
    let removeDisplayClass = "";
    if (username === "") {
        removeDisplayClass = "unshow";
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
                            className="login"
                            placeholder='Insira seu nome de usuário do Github'
                            value={username}
                            onChange={
                               function(event) {
                                    const value = event.target.value;
                                    setUsername(value);
                                    setInputStatus(true);
                                    setStringSize({
                                        lastSize: stringSize.size,
                                        size: value.length
                                    });
                               }
                           }
                            onKeyDown={e => {
                                    if (e.key === "Backspace"){
                                        setLastInput('');
                                    }
                            }}
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
                            boxShadow: `0 0 30px 0 rgb(255 255 255 / 50%), 
                                        inset 0 0 50px 0 rgb(0 0 0 / 25%)`,
                            backgroundColor: 'rgb(255, 255, 255)', 
                            borderRadius: '10px',
                            flex: 1,
                            minHeight: '240px'
                        }}
                    >

                        <Image
                            className="avatar"
                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '16px',
                            }}
                            src={ avatarSrc }
                        />

                        {/* Caixa de carregamento */}
                        <Box
                            className='loadingBox unshow'
                            styleSheet={{
                                display: "flex",
                                flexDirection: 'column',
                                marginTop: '25%'
                            }}
                        >
                            <Icon
                                className='loadingIcon'
                                name="FaGithub"
                                styleSheet={{
                                    minHeight: "50px",
                                    minWidth: "50px",
                                    margin: "auto auto 10px auto",
                                    animation: "rotate360 linear 2s infinite"
                                }}
                            />
                            <Text
                                className='loadingText'
                                styleSheet={{
                                    marginBottom: "auto",
                                    color: colors.neutrals['900'],
                                    fontFamily: 'Titillium Web, sans-serif;',
                                }}
                            >
                                Carregando usuário
                            </Text>
                        </Box>
                        {/* Caixa de carregamento */}
                        
                        {/* Caixa de erro */}
                        <Box
                            className='errorBox unshow'
                            styleSheet={{
                                display: "flex",
                                flexDirection: 'column',
                                marginTop: '25%'
                            }}
                        >
                        <Icon
                                className='errorIcon'
                                name="FaExclamationCircle"
                                styleSheet={{
                                    minHeight: "50px",
                                    minWidth: "50px",
                                    margin: "auto auto 10px auto",
                                    color:"red"
                                }}
                            />
                            <Text
                                className='errorText'
                                styleSheet={{
                                    marginBottom: "auto",
                                    color: colors.neutrals['900'],
                                    fontFamily: 'Titillium Web, sans-serif;',
                                }}
                            >
                                { error }
                            </Text>
                        </Box>   
                        {/* Caixa de erro */}

                        <Text
                            variant="heading5"
                            styleSheet={{
                                color: colors.neutrals['900'],
                                padding: '0px 10px',
                                borderRadius: '1000px',
                                marginBottom: '5px',
                                fontFamily: 'Titillium Web, sans-serif;'
                            }}
                        >
                            { name }
                        </Text>

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

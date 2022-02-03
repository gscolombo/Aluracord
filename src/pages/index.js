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
import getCatPics from '../utils/getCatPics';
import CatPicker from '../components/CatPicker';

const colors = config.theme.colors;

let timer;
export default function HomePage() {
    // Roteamento
    const routing = useRouter();

    // Variáveis de estado de input
    const [username, setUsername] = useState('');
    const [inputStatus, setInputStatus] = useState(false);
    const [stringSize, setStringSize] = useState({lastSize: 0, size: 0});
    const [lastInput, setLastInput] = useState('');

    // Variáveis de estado de requisições
    const [userData, setUserData] = useState(null);
    const [loadingState, setLoadingState] = useState('unloaded');
    const [error, setError] = useState('');

    let ghAvatar;
    let name;
    if (userData !== null && userData.avatar_url !== '') {
        ghAvatar = userData.avatar_url;
        name = userData.name;
    }

    // Variáveis de utilidades
        // Formulário
        const [placeholder, setPlaceholder] = useState("Insira seu nome de usuário do Github");
        const [buttonLabel, setButtonLabel] = useState('Não possui uma conta no Github? Clique aqui!')

        // Caixa de apresentação do usuário
        const [usernameBoxClass, setusernameBoxClass] = useState('unshow');
        const [loadingUser, setloadingUser] = useState('show');
        const [loadingText, setLoadingText] = useState('Aguardando usuário');
        const [opacity, setOpacity] = useState(0);

        // GATOS
        const [cats, setCats] = useState({ content: [], status: 'unloaded'});
        const [catPicker, setCatPicker] = useState(false);
        const [catAvatar, setCatAvatar] = useState("");
    

    // Função para verificar e guardar último valor de input 
    useEffect(() => {
        if (!catPicker) {
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
        }
    }, [stringSize.lastSize])

    useEffect( () => {
        if (!catPicker) {
            if (username !== "" && lastInput === "") {
                setLoadingState('loading');
            } else if (username === "" || username.length < 2) {
                setLoadingState('unloaded');
            }
        }
    })

    // Função para requisição da API do Github
    useEffect(() => {
        if (!catPicker) {
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
        }    
    }, [lastInput])

    // Utilidades
    useEffect(() => {
        randomColors();
    }, [])

    useEffect(() => {
        handleLoading(loadingState);
        if (username === "") setusernameBoxClass('unshow')

        if (loadingState === "loading" || loadingState === "loaded") {
            setloadingUser("unshow");
            setOpacity(1);
        } else {
            setloadingUser("show");
            setOpacity(0);
        }
    }, [loadingState])
    
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
                                if (catPicker) 
                                    routing.push(`/chat?username=${username}&avatar=${catAvatar}&cat=true`, `/chat`);
                                else 
                                    routing.push(`/chat?username=${lastInput}&avatar=${ghAvatar}`, `/chat`);
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
                            placeholder={ placeholder }
                            value={username}
                            onChange={
                               function(event) {
                                    const value = event.target.value;
                                    setUsername(value);
                                    setInputStatus(true);
                                    setusernameBoxClass('');
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
                                mainColor: colors.primary['600'],
                                mainColorLight: colors.primary['400'],
                                mainColorStrong: colors.primary['300']
                            }}
                            styleSheet={{
                                color: colors.neutrals['000'],
                            }}
                            onClick={(e) => {
                                if (placeholder === "...") e.preventDefault();
                            }}
                        />

                        <Button
                            type="button"
                            label={ buttonLabel }
                            fullWidth
                            buttonColors={{
                                contrastColor: colors.neutrals['800'],
                                mainColor: colors.neutrals['600'],
                                mainColorLight: colors.primary['900'],
                                mainColorStrong: colors.neutrals['300']
                            }}
                            styleSheet={{
                                color: colors.neutrals['000'],
                                marginTop: '10px'
                            }}
                            onClick={() => {
                                if (!catPicker) {
                                    setPlaceholder("...")
                                    setLoadingText("Carregando gatinhos :3")

                                    const catsJSON = getCatPics();
                                    catsJSON.then(data => {
                                        setCats({
                                            content: data,
                                            status: "loaded"
                                        })
                                        setOpacity(1);
                                        setloadingUser("unshow");
                                        setCatPicker(true);
                                        setPlaceholder("Insira seu nome de usuário");
                                        setButtonLabel("Voltar");

                                        if (data.length > 0) {
                                            const randomCat = data[Math.floor(Math.random() * (data.length + 1))].url;
                                            setCatAvatar(randomCat);
                                        }
                                    });
                                } else {
                                    setCatPicker(false);
                                    setCats({ content: {}, status: "unloaded" })
                                    setLoadingText("Aguardando usuário");
                                    setOpacity(0);
                                    setloadingUser("show");
                                    setPlaceholder("Insira seu nome de usuário do Github");
                                    setButtonLabel("Não possui uma conta no Github? Clique aqui!");
                                }
                                
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
                            boxShadow: `0 0 30px 0 rgb(255 255 255 / ${ opacity / 2}), 
                                        inset 0 0 50px 0 rgb(0 0 0 / 25%)`,
                            backgroundColor: `rgba(255, 255, 255, ${ opacity })`,
                            border: "1px solid white", 
                            borderRadius: '10px',
                            flex: 1,
                            minHeight: '240px',
                            transition: "background-color 0.25s ease-in"
                        }}
                    >

                        {cats.content.length > 0 && catAvatar !== "" ?
                            <CatPicker 
                                cats={ cats }
                                avatar={ catAvatar }
                                onCat={ cat => {
                                    setCatAvatar(cat);
                                }}
                            />  
                        : 
                            <Image
                                className="avatar"
                                styleSheet={{
                                    borderRadius: '50%',
                                    marginBottom: '16px',
                                }}
                                src={ ghAvatar }
                            />
                        }

                        <Text
                            className={ loadingUser }
                            styleSheet={{
                                color: "white",
                                margin: "auto 0",
                                textAlign: "center"
                            }}
                        >
                            { loadingText }
                            <Box
                                className={ loadingUser }
                                styleSheet={{ 
                                    display: "flex", justifyContent: "space-around",
                                    width: "40%",
                                    margin: "15px auto 0 auto",
                                }}
                            >
                                <Box
                                    className='circle'
                                    styleSheet={{
                                        height: "5px",
                                        width: "5px",
                                        backgroundColor: "white",
                                        borderRadius: "50%",
                                        animation: "rollercoaster 1s infinite ease-in-out"
                                    }}
                                />

                                <Box
                                    className='circle'
                                    styleSheet={{
                                        height: "5px",
                                        width: "5px",
                                        backgroundColor: "white",
                                        borderRadius: "50%",
                                        animation: "rollercoaster 1s infinite 0.25s ease-in-out"
                                    }}
                                />

                                <Box
                                    className='circle'
                                    styleSheet={{
                                        height: "5px",
                                        width: "5px",
                                        backgroundColor: "white",
                                        borderRadius: "50%",
                                        animation: "rollercoaster 1s infinite 0.5s ease-in-out"
                                    }}
                                />
                            </Box>
                            
                        </Text>

                        

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
                            className={ usernameBoxClass }
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

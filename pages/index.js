import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import config from '../config.json';

const colors = config.theme.colors;

function GlobalStyle() {
    return (
        <style global jsx>
            {`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    list-style: none;
                  }
                  body {
                    font-family: 'Open Sans', sans-serif;
                  }
                  /* App fit Height */ 
                  html, body, #__next {
                    min-height: 100vh;
                    display: flex;
                    flex: 1;
                  }
                  #__next {
                    flex: 1;
                  }
                  #__next > * {
                    flex: 1;
                  }
                  /* ./App fit Height */ 
            `}
        </style>
    );
}

function Title(props) {
    const Tag = props.tag || 'h1';
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>
                {`
                    ${Tag} {
                        color: ${colors.neutrals['000']};
                        font-size: 24px;
                        font-weight: 300;
                    }
                `}
            </style>
        </>
    )
}

export default function HomePage() {
    const name = 'Gabriel Colombo'
    const username = 'gscolombo';
    const bgImage = "https://images.pexels.com/photos/4644812/pexels-photo-4644812.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
    return (
        <>
            <GlobalStyle />
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
                <Box
                    styleSheet={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '700px',
                        borderRadius: '5px', padding: '32px', margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: colors.neutrals['700'], 
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
                    >
                        <Title tag='h2'>Bem vindo de volta!</Title>
                        <Text variant="body3"
                            styleSheet={{
                                marginBottom: '32px', color: colors.neutrals['300']
                            }}>
                                {config.name}
                            </Text>
                        <TextField fullWidth 
                            textFieldColors={{
                                neutral: {
                                    textColor: colors.neutrals['200'],
                                    mainColor: colors.neutrals['900'],
                                    mainColorHighlight: colors.primary['500'],
                                    backgroundColor: colors.neutrals['800']
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
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', 
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '16px',
                            backgroundColor: colors.neutrals['800'],
                            border: '1px solid',
                            borderColor: colors.neutrals['999'],
                            borderRadius: '10px',
                            flex: 1,
                            minHeight: '240px'
                        }}
                    >

                        <Image 
                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '8px'
                            }}
                            src={`https://github.com/${username}.png`}
                        />

                        <Text
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

                        <Text
                            variant="heading5"
                            styleSheet={{
                                color: colors.neutrals['200'],
                                padding: '2px 10px',
                            }}
                        >
                            {name}
                        </Text>

                    </Box>
                    {/* Área da Foto */}

                </Box>
            </Box>
        </>
    ) 
}

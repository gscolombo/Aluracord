import { Image, Box, Button, Icon } from "@skynexui/components";
import { useState } from "react";
import config from '../config.json';

const colors = config.theme.colors;

export default function CatPicker(props) {
    const [cat, setCat] = useState(props.avatar);
    const [avatarBox, setAvatarBox] = useState("avatarBox unshow");

    return (
        <>
            <Image 
                className="avatar"
                styleSheet={{
                    width: "166px",
                    height: "166px",
                    borderRadius: '50%',
                    marginBottom: '16px',
                    
                }}
                src={ cat }
            />

            <Button
                label="Trocar avatar"
                styleSheet={{
                    borderRadius: '10px'
                }}
                onClick={ () => {
                    setAvatarBox("avatarBox");
                } }
            />

            <Box
                className={ avatarBox }
                styleSheet={{
                    display: "flex", flexDirection: "column", 
                    boxShadow: `inset 0 0 30px 0 rgb(0 0 0 / 50%)`,
                    backgroundColor: colors.primary["200"] + "EF",
                    minWidth: {
                        md: "400px",
                        xs: '20vw'
                    },
                    height: "300px",
                    position: "absolute",
                    top: {
                        md: "25vh",
                        xs: "35vh"
                    },
                    borderRadius: "10px",
                    // animation: "growFromTheSides .25s",
                }}
            >
                <Button
                    type="button"
                    iconName="plus"
                    variant="tertiary"
                    styleSheet={{
                        transform: "rotate(45deg)",
                        maxWidth: "20px",
                        maxHeight: "20px",
                        alignSelf: "flex-end",
                        marginRight: "5px",
                        marginTop: "5px"
                    }}
                    onClick={() => {
                        setAvatarBox('avatarBox out')
                        setTimeout(() => {
                            setAvatarBox("avatarBox unshow")
                        }, 500)
                    }}
                />
                <Box
                className="custom-scrollbar"
                styleSheet={{
                    display: "grid", 
                    gridTemplateColumns: {
                        xs: "repeat(2, 1fr)",
                        md: "repeat(3, 1fr)"
                    }, 
                    gap: "10px",
                    boxShadow: `inset 0 0 30px 0 rgb(0 0 0 / 50%)`,
                    backgroundColor: colors.neutrals['999'],
                    width: {
                        md: "390px",
                        xs: "300px"
                    },
                    height: "290px",
                    borderRadius: "5px",
                    margin: "5px auto",
                    padding: "5px",
                    overflowY: "scroll",
                }}
                >
                    {props.cats.content.map( cat => {
                        return (
                            <Box
                                key={ cat.id }
                                id={ cat.id }
                                styleSheet={{
                                    height: "100px",
                                    overflow: "hidden",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    borderRadius: "5px",
                                    opacity: "0.75",
                                    hover: {
                                        opacity: "1"
                                    },
                                    transition: "opacity .2s"
                                }}
                            >
                                <Image
                                    key={ cat.id }
                                    className="cat"
                                    styleSheet={{
                                        padding: "5px",
                                        maxWidth: "100%",
                                        maxHeight: "100%",
                                        cursor: "pointer",
                                    }}
                                    src={ cat.url }
                                    onClick={() => {
                                        setCat(cat.url);
                                        setAvatarBox("avatarBox out");
                                        props.onCat( cat.url )

                                        setTimeout(() => {
                                            setAvatarBox("avatarBox unshow");
                                        }, 250)
                                    }}
                                />
                            </Box>
                        )
                    })}
                </Box>
            </Box>
        </>
        
    )
}
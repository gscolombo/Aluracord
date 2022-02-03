function GlobalStyle() {
    return (
        <style global jsx>
            {`
                @import url(https://fonts.googleapis.com/css2?family=Titillium+Web:wght@200;300;400;600;700&display=swap);
                
                @keyframes rotate360{
                  from {
                    transform: rotate(0deg)
                  } to {
                    transform: rotate(360deg)
                  }
                }

                @keyframes growFromTheSides{
                  from {
                    clip-path: inset(0 50%);
                    opacity: 0.75;
                  } to {
                    clip-path: inset(0 0);
                    opacity: 1;
                  }
                }

                @keyframes shrinkFromTheSides{
                  from {
                    clip-path: inset(0 0);
                    opacity: 1;
                  } to {
                    clip-path: inset(0 50%);
                    opacity: 0.75;
                  }
                }

                @keyframes rollercoaster{
                  0% {
                    transform: translateY(0)
                  } 50% {
                    transform: translateY(-5px)
                  } 100% {
                    tranform: translateY(5px)
                  }
                }

                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    list-style: none;
                }

                .custom-scrollbar::-webkit-scrollbar {
                  width: 15px;
                }

                .custom-scrollbar::-webkit-scrollbar-track {
                  background-color: #080A0C;
                }

                .custom-scrollbar::-webkit-scrollbar-thumb {
                  background-color: #6633FF;
                  border: 5px solid #080A0C;
                  border-radius: 10px;
                }

                body, span {
                  font-family: 'Titillium Web', sans-serif !important;
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

                .unshow {
                  display: none !important;
                }

                .avatarBox {
                  animation: growFromTheSides .25s forwards;
                }

                .avatarBox.out {
                  animation: shrinkFromTheSides .25s forwards
                }
            `}
        </style>
    );
}

export default function App({ Component, pageProps }) {
    return (
        <>
            <GlobalStyle />
            <Component {...pageProps} />
        </>    
    )
}
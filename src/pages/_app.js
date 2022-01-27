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

                  .unshow {
                    display: none !important;
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
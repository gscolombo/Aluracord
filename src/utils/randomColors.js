export default function randomColors(){
    if (typeof document !== "undefined") {
        const box = document.querySelector('.main');

        let colors = [255, 255, 255, 255, 255, 255];
        let factors = [];
        for (let i = 0; i < 6; i++) {
            factors[i] = Math.random() * (1 - 0 + 1) + 0;
        }
            
        function changeBoxColor() {
            colors.forEach((color, i) => {
                if (color >= 255 || color < 0) {
                    factors[i] = -factors[i];
                }
            });

            colors = colors.map((color, i) => {
                return color += factors[i];
            });
            
            box.style.border = `2px solid rgb(${colors[0]}, ${colors[1]}, ${colors[2]})`;
            requestAnimationFrame(changeBoxColor);
        }
        
        requestAnimationFrame(changeBoxColor);
    }    
}
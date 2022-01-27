export default function handleLoading(state) {
    const loadingBox = document.querySelector(".loadingBox");
    const errorBox = document.querySelector(".errorBox")

    const avatar = document.querySelector(".avatar");

    switch(state) {
        case "unloaded":
            loadingBox.classList.add('unshow');
            avatar.classList.add('unshow');
            errorBox.classList.add('unshow');
            break;
        case "loading":
            loadingBox.classList.remove('unshow');
            avatar.classList.add('unshow');
            errorBox.classList.add('unshow');
            break;
        case "loaded":
            loadingBox.classList.add('unshow');
            avatar.classList.remove('unshow');
            errorBox.classList.add('unshow');
            break;
        case "error":
            loadingBox.classList.add('unshow');
            avatar.classList.add('unshow');
            errorBox.classList.remove('unshow');
    }
}
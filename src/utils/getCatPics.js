export default async function getCatPics() {
    const url = new URL("https://api.thecatapi.com/v1/images/search");
    const params = {
        limit: 30,
        category_ids: "2",
        size: "small"
    };

    Object.keys(params).forEach( key => url.searchParams.append(key, params[key]));
    const key = process.env.NEXT_PUBLIC_X_API_KEY;

    try {
        const res = await fetch(url, {
            headers: {
                'x-api-key': key
            },
        });
        if (res.ok) {
            const json = await res.json();
            return json;
        } else {
            throw new Error("Falha na requisição de gatinhos");
        }
    } catch ( error ) {
        console.error(error)
        return "Não foram encontrados gatinhos :(";
    }
      
}
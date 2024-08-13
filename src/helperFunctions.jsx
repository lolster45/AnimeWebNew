async function getTopList(limit, page, filter, setTopAnime, setLoading, navigate) {

    const api = `https://api.jikan.moe/v4/top/anime?limit=${limit}&page=${page}&filter=${filter}`;

    try {
        const apiFetch = await fetch(api);
        const data = await apiFetch.json();
        if(data.data.length === 0) throw error;

        setLoading(false);
        setTopAnime(data.data);

    } 
    catch (error) {
        console.log(error)
        navigate("/error")
    }
}

export {getTopList}
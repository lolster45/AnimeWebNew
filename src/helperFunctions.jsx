


async function getTopList(api, setTopState, setLoading, navigate) {
    try {
        const apiFetch = await fetch(api);
        const data = await apiFetch.json();
        if(data.data.length === 0) throw error;

        setTopState(data.data);
        setLoading(false);
    } 
    catch (error) {
        console.log(error)
        navigate("/error")
    }
}

 //Functions that navigates the pages of the API...
 const handleMore = (e, setPage) => {
    e.currentTarget.parentElement.classList.add("more");
    setPage(prev => +prev + +"1")
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scroll to the top
    });
}
const handleLess = (e, setPage) => {
    e.currentTarget.parentElement.classList.remove("more")
    setPage(prev => +prev - +"1")
}
//Hadles layout change....
const handleLayoutChange = (setLayout) => {
    setLayout(prev => !prev)
}

export {getTopList, handleMore, handleLess, handleLayoutChange}
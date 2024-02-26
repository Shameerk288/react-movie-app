export const login = async () => {
    const res = await fetch("https://api.themoviedb.org/3/authentication/guest_session/new",
    {
        headers:{
            Authorization:             
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NTBlZDA3MTYwMmQ3MDU2ODFlN2U2YTM2MGMxMmVkNiIsInN1YiI6IjY1Y2JkMGJhOGMwYTQ4MDE3Y2I4NmVkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oi6no8lz4tDhvjMxjPDGQdNHjZ3hrO7F3QyBmznGS7o"            
        },
    })

    return res.json();
}

export const rateMovie = async (movieId: number, rating: number) => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${localStorage.getItem("guest_session_id")}&api_key=${import.meta.env.VITE_API_KEY}`,
    {
        method: "POST",
        headers:{
            accept: "application/json",
            "content-type": "application/json;charset=utf-8" 
        },
        body: `{"value": ${rating}}`,
    });

    return res.json();
}

export const rateTvShow = async (tvShowId: number, rating: number) => {
    const res = await fetch(`https://api.themoviedb.org/3/tv/${tvShowId}/rating?guest_session_id=${localStorage.getItem("guest_session_id")}&api_key=${import.meta.env.VITE_API_KEY}`,
    {
        method: "POST",
        headers:{
            accept: "application/json",
            "content-type": "application/json;charset=utf-8" 
        },
        body: `{"value": ${rating}}`,
    });

    return res.json();
}
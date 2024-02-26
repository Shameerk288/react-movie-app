//Code for fetching all movies
export const fetchMovies = async () => {
    const res = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en=US&page=1",
        {
            headers:{
                Authorization:             
                    "Bearer"            
            },
        }
    );

    return res.json();
}

//Code for fetching all Tv Shows
export const fetchTvShows = async () => {
    const res = await fetch(
        "https://api.themoviedb.org/3/tv/popular?language=en=US&page=1",
        {
            headers:{
                Authorization:             
                    "Bearer"            
            },
        }
    );

    return res.json();
}

//Code for fetching single movie details based on its Id
export const fetchMovie = async (movieId: string) => {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?language=en=US&page=1`,
        {
            headers:{
                Authorization:             
                    "Bearer"            
            },
        }
    );

    return res.json();
}

//Code for fetching single Tv Show details based on its Id
export const fetchTvShow = async (tvshowId: string) => {
    const res = await fetch(
        `https://api.themoviedb.org/3/tv/${tvshowId}?language=en=US&page=1`,
        {
            headers:{
                Authorization:             
                    "Bearer"            
            },
        }
    );

    return res.json();
}

//Code for fetching all rated movies
export const getRatedMovies = async () => {

    const res = await fetch(`https://api.themoviedb.org/3/guest_session/${localStorage.getItem("guest_session_id")}/rated/movies?language=en-US&page=1&sort_by=created_at.asc&api_key=${import.meta.env.VITE_API_KEY}`,)

    // console.log(res.json);
    return res.json();
}

//Code for fetching all rated TV shows
export const getRatedTvShows= async () => {

    const res = await fetch(`https://api.themoviedb.org/3/guest_session/${localStorage.getItem("guest_session_id")}/rated/tv?language=en-US&page=1&sort_by=created_at.asc&api_key=${import.meta.env.VITE_API_KEY}`,)

    return res.json();
}

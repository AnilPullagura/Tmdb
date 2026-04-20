import {useState, useEffect} from 'react'
import Header from '../Header'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
const MovieDetails = props => {
  const [apiStatus, setStatus] = useState(apiConstants.initial)
  const [movieDetails, setDetail] = useState({})
  const [castarray, setCaste] = useState([])
  const {match} = props
  const {params} = match
  const {id} = params

  const API_KEY = process.env.TMDBS_KEY || '8884b537b3f692ee92e87e61d21b289a'

  const api = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
  const castApi = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`

  const updateData = data => {
    const url = 'https://image.tmdb.org/t/p/w500'
    const movieObj = {
      backdropPath: url + data.backdrop_path,
      genres: data.genres.map(each => each.name),
      title: data.original_title,
      overview: data.overview,
      poster: url + data.poster_path,
      releaseDate: new Date(data.release_date),
      runTime: data.runtime,
      status: data.status,
      voteAvg: Math.round(data.vote_average * 10) / 10,
    }
    return movieObj
  }
  const updateDetails = data => {
    const url = 'https://image.tmdb.org/t/p/w500'
    const castData = data.cast.map(each => ({
      charName: each.character,
      originalName: each.original_name,
      imageUrl: url + each.profile_path,
      id: each.id,
    }))

    return castData
  }

  const geApiCall = async () => {
    setStatus(apiConstants.loading)
    try {
      const response = await fetch(api)
      const castResponse = await fetch(castApi)
      if (response.ok) {
        const data = await response.json()
        const castData = await castResponse.json()
        const castDetails = updateDetails(castData)
        const movieData = updateData(data)
        setCaste(castDetails)
        setDetail(movieData)
        setStatus(apiConstants.success)
      } else {
        setStatus(apiConstants.failure)
      }
    } catch (er) {
      alert(er.message)
      setStatus(apiConstants.failure)
    }
  }

  useEffect(() => {
    geApiCall()
  }, [])

  const renderLoaderview = () => (
    <div className="loading-view">
      <h1>loading...</h1>
    </div>
  )

  const renderFailureView = () => (
    <div className="loading-view failure-view">
      <h1>unknown caught error</h1>
      <button type="button" onClick={() => geApiCall()}>
        retry
      </button>
    </div>
  )

  const renderSuccessView = () => {
    const year = movieDetails.releaseDate.getFullYear()
    const month = movieDetails.releaseDate.toLocaleString('default', {
      month: 'long',
    })
    const day = movieDetails.releaseDate.getDate()
    const hours = Math.floor(movieDetails.runTime / 60)
    const minutes = movieDetails.runTime % 60
    const {
      backdropPath,
      genres,
      title,
      overview,
      poster,
      releaseDate,
      runTime,
      status,
      voteAvg,
    } = movieDetails
    console.log(movieDetails)
    return (
      <div>
        <div
          className="movie-box"
          style={{backgroundImage: `url(${backdropPath})`}}
        >
          <img src={poster} alt="poster" />
          <div>
            <span>
              <p className="status">{status}</p>
              <p>
                {month}
                {day},{year}
              </p>
            </span>
            <h1>{title}</h1>
            <ul>
              <li>{voteAvg} IMDB</li>
              <li>
                {hours}H {minutes}M
              </li>

              {genres.map(each => (
                <li className="genre" key={each.id}>
                  {each}
                </li>
              ))}
            </ul>
            <p>{overview}</p>
            <button type="button">Watch Trailer</button>
          </div>
        </div>
        <div className="cast-box">
          <h1>CAST</h1>
          <p className="subtitle">The face behind the journey</p>
          <ul>
            {castarray.map(each => (
              <li className="cast-item" key={each.id}>
                <img src={each.imageUrl} alt="cast" />
                <p className="cast-name">{each.originalName}</p>
                <p className="org-name">{each.charName}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  const renderUI = () => {
    switch (apiStatus) {
      case apiConstants.loading:
        return renderLoaderview()
      case apiConstants.failure:
        return renderFailureView()
      case apiConstants.success:
        return renderSuccessView()
      default:
        return null
    }
  }

  return (
    <div>
      <Header moviepage />
      <div className="movie-details-container">{renderUI()}</div>
    </div>
  )
}
export default MovieDetails

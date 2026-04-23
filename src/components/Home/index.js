import {useState, useEffect} from 'react'

import MovieItem from '../MovieItem'

import './index.css'

import Header from '../Header'

const apiConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Home = () => {
  const [searchQ, setSearch] = useState('')
  const [pageNum, setPageNum] = useState(1)
  const [movies, setMovies] = useState([])
  const [maxPages, setMAx] = useState(0)
  const [apiStatus, setStatus] = useState(apiConstants.initial)
  const API_KEY = process.env.TMDBS_KEY || '8884b537b3f692ee92e87e61d21b289a'

  const onChangeSearch = searchq => {
    setSearch(searchq)
  }

  const api = searchQ
    ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchQ}&page=${pageNum}`
    : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNum}`

  const polishedData = data => {
    const url = 'https://image.tmdb.org/t/p/w500'
    const updateData = data.map(each => ({
      adult: each.adult,
      backdropUrl: url + each.backdrop_path,
      id: each.id,
      originalLanguage: each.original_language,
      originalTitle: each.original_title,
      overview: each.overview,
      popularity: each.popularity,
      posterUrl: url + each.poster_path,
      releaseDate: each.release_date,
      title: each.title,
      video: each.video,
      voteAvg: Math.round(each.vote_average * 10) / 10,
      voteCount: each.vote_count,
    }))
    return updateData
  }

  const getApicall = async () => {
    setStatus(apiConstants.loading)
    try {
      const response = await fetch(api)
      if (response) {
        const data = await response.json()
        setMAx(data.total_pages)
        const moviesList = polishedData(data.results)
        setMovies(moviesList)
        setStatus(apiConstants.success)
      } else {
        setStatus(apiConstants.failure)
      }
    } catch (er) {
      setStatus(apiConstants.failure)
    }
  }

  useEffect(() => {
    getApicall()
  }, [searchQ, pageNum])

  const decreasePage = () => {
    if (pageNum <= 1) {
      setPageNum(1)
    } else {
      setPageNum(prev => prev - 1)
    }
  }

  const increasePage = () => {
    if (pageNum >= maxPages) {
      setPageNum(maxPages)
    } else {
      setPageNum(prev => prev + 1)
    }
  }

  const onRetry = () => {
    getApicall()
  }
  const renderLoadingView = () => (
    <div className="loading-container">
      <p>Loading...</p>
    </div>
  )

  const renderFailureView = () => (
    <div className="failure-container">
      <h1>Unexpected issue got</h1>
      <button onClick={onRetry} type="button">
        retry
      </button>
    </div>
  )

  const renderSuccessView = () => (
    <ul className="home-movie-list">
      {movies.map(each => (
        <MovieItem details={each} key={each.id} />
      ))}
    </ul>
  )

  const renderUi = () => {
    switch (apiStatus) {
      case apiConstants.loading:
        return renderLoadingView()
      case apiConstants.success:
        return renderSuccessView()
      case apiConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return (
    <div>
      <Header onChangeSearch={onChangeSearch} searchQ={searchQ} />
      <div className="home-container">
        <h1 className="home-title">Popular</h1>
        {renderUi()}
        <div className="pagination-container">
          <button onClick={decreasePage} type="button">
            Prev
          </button>
          <p>{pageNum}</p>
          <button onClick={increasePage} type="button">
            Next
          </button>
        </div>
        <p className="page-details">
          showing {pageNum} pages out of {maxPages}
        </p>
      </div>
    </div>
  )
}
export default Home

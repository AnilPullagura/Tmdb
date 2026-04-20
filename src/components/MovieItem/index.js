import {Link} from 'react-router-dom'
import './index.css'

const MovieItem = props => {
  const {details} = props
  const {
    adult,
    backdropUrl,
    id,
    originalLanguage,
    originalTitle,
    overview,
    popularity,
    posterUrl,
    releaseDate,
    title,
    video,
    voteAvg,
    voteCount,
  } = details
  return (
    <li className="movie-item">
      <div
        className="poster-box"
        style={{backgroundImage: `url(${posterUrl})`}}
      >
        <p>*{voteAvg}</p>
      </div>
      <div className="btn-box">
        <h1>{title}</h1>
        <Link to={`/movie/${id}`}>
          <button type="button">View Details</button>
        </Link>
      </div>
    </li>
  )
}
export default MovieItem

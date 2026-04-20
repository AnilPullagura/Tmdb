import {useState} from 'react'
import {NavLink} from 'react-router-dom'

import './index.css'

const Header = props => {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const {onChangeSearch, searchQ, moviepage} = props
  console.log(moviepage)

  const toggleMenu = () => setMenuOpen(!isMenuOpen)

  const updateSearch = e => {
    onChangeSearch(e.target.value)
  }

  return (
    <div className="header-wrapper">
      <div className="header-container">
        <h1 className="logo-text">movieDB</h1>
        <nav className="desktop-nav">
          <NavLink exact to="/" className="nav-link" activeClassName="active">
            popular
          </NavLink>
          <NavLink
            to="/top-rated"
            className="nav-link"
            activeClassName="active"
          >
            toprated
          </NavLink>
          <NavLink to="/upcoming" className="nav-link" activeClassName="active">
            upcoming
          </NavLink>
        </nav>
        <input
          className={`desktop-input ${moviepage === true ? 'dis' : ''}`}
          type="text"
          onChange={updateSearch}
          value={searchQ}
          placeholder="Search"
        />

        <div className="search-and-mobile">
          <div className="search-container">
            <input
              className={moviepage === true ? 'dis' : ''}
              type="search"
              onChange={updateSearch}
              value={searchQ}
              placeholder="Search"
            />
          </div>
          <button type="button" className="btn-icon" onClick={toggleMenu}>
            =
          </button>
        </div>
      </div>

      <div className={`mobile-menu-overlay ${isMenuOpen ? 'open' : ''}`}>
        <button type="button" className="close-icon" onClick={toggleMenu}>
          X
        </button>
        <nav className="mobile-nav-links">
          <NavLink exact to="/" className="nav-link" onClick={toggleMenu}>
            popular
          </NavLink>
          <NavLink to="/top-rated" className="nav-link" onClick={toggleMenu}>
            toprated
          </NavLink>
          <NavLink to="/upcoming" className="nav-link" onClick={toggleMenu}>
            upcoming
          </NavLink>
        </nav>
      </div>
    </div>
  )
}

export default Header

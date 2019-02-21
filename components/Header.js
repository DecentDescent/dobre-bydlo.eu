export default class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <div className="header__logo">
          <a href="/index">Dobré bydlo</a>
        </div>
        <div className="header__nav-toggle" onClick={this.props.navToggle}>
          <svg viewBox="0 0 56 56">
            <path
              d="M28,0C12.561,0,0,12.561,0,28s12.561,28,28,28s28-12.561,28-28S43.439,0,28,0z M40,41H16c-1.104,0-2-0.896-2-2s0.896-2,2-2
	h24c1.104,0,2,0.896,2,2S41.104,41,40,41z M40,30H16c-1.104,0-2-0.896-2-2s0.896-2,2-2h24c1.104,0,2,0.896,2,2S41.104,30,40,30z
	 M40,19H16c-1.104,0-2-0.896-2-2s0.896-2,2-2h24c1.104,0,2,0.896,2,2S41.104,19,40,19z"
            />
          </svg>
        </div>
        <ul className="header__nav">
          <li>
            <a
              href="/kdo-jsme"
              className={this.props.active === "nav1" ? "active" : ""}
            >
              Kdo jsme
            </a>
          </li>
          <li>
            <a
              href="/realizace"
              className={this.props.active === "nav2" ? "active" : ""}
            >
              Realizace
            </a>
          </li>
          <li>
            <a
              href="/mame-nasito"
              className={this.props.active === "nav3" ? "active" : ""}
            >
              Máme našito
            </a>
          </li>
          <li>
            <a
              href="/kontakt"
              className={this.props.active === "nav4" ? "active" : ""}
            >
              Kontakt
            </a>
          </li>
        </ul>
      </header>
    );
  }
}

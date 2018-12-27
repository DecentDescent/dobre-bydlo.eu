export default class Content extends React.Component {
  render() {
    return (
      <div>
        <div className={"content " + this.props.extraClass}>
          {this.props.children}
        </div>
        <div
          className={
            this.props.navOpened
              ? "mobile-nav mobile-nav--opened"
              : "mobile-nav"
          }
        >
          <ul>
            <li>
              <a href="/kdo-jsme">Kdo jsme</a>
            </li>
            <li>
              <a href="/realizace">Realizace</a>
            </li>
            <li>
              <a href="/mame-nasito">Máme našito</a>
            </li>
            <li>
              <a href="/kontakt">Kontakt</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

import "../styles/styles.scss";
import Head from "../components/Head";
import Content from "../components/Content";
import Header from "../components/Header";

export default class KdoJsme extends React.Component {
  state = {
    navOpened: false
  };

  navToggle = () => {
    this.setState({
      navOpened: !this.state.navOpened
    });
  };

  navHandler = () => {
    this.setState({
      navOpened: false
    });
  };

  render() {
    return (
      <div>
        <Head />
        <Header
          handleNav={this.handleNav}
          handleNavItem={this.handleNavItem}
          navToggle={this.navToggle}
        />
        <Content
          extraClass="content--centered"
          navOpened={this.state.navOpened}
          navHandler={this.navHandler}
        >
          <div className="content__container">
            <h1>Kdo jsme</h1>
            <img src="static/gallery/home.jpg" className="about" />
            <p>
              Jsme Dobré bydlo.
              <br />
              Jsme ateliér.
              <br />
              Jsme obchod.
              <br />
              Jsme dvě 40+.
            </p>
            <p>
              Máme rády ruční práce, šití, tvořiost, látky. Daly jsme se
              dohromady, abychom dávaly látkám hloubku, tvar a harmonii.
            </p>
            <p>
              Kombinujeme ruční práci a precizní šití. Ke každé zakázce
              přistupujeme tak, jako bychom jí dělaly samy pro sebe.
            </p>
            <p>
              Od roku 1999 budujeme Dobré bydlo coby zakázkový ateliér otevřený
              pro tvůrčí inspiraci.
            </p>
            <p>
              Ve spolupráci s architekty vytváříme celé interiéry, ale umíme i
              doplňky pro útulný domov.
            </p>
            <p>
              <strong>Zkrátka a jednoduše</strong>
              <br />
              <strong>Navrhneme - Zaměříme - Ušijeme - Pověsíme</strong>
            </p>
            <p>Okna oblékáme, stoly prostíráme.</p>
          </div>
        </Content>
      </div>
    );
  }
}

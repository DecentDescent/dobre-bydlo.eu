import "../styles/styles.scss";
import Head from "../components/Head";
import Content from "../components/Content";
import Header from "../components/Header";

export default class Index extends React.Component {
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
        <Content
          extraClass="content--hero"
          navOpened={this.state.navOpened}
          navHandler={this.navHandler}
        />
        <Header
          handleNav={this.handleNav}
          handleNavItem={this.handleNavItem}
          navToggle={this.navToggle}
        />
      </div>
    );
  }
}

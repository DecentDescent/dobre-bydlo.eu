import "../styles/styles.scss";
import Head from "../components/Head";
import Content from "../components/Content";
import Header from "../components/Header";
const sanityClient = require("@sanity/client");
import BlockContent from "@sanity/block-content-to-react";

const client = sanityClient({
  projectId: "6rx0nq6y",
  dataset: "dobrebydloeudata"
});

export default class KdoJsme extends React.Component {
  state = {
    navOpened: false,
    loading: true,
    pageContent: []
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

  componentDidMount() {
    client
      .fetch(
        `
        * | [ _type == "page" && slug.current == "kdo-jsme"]| {
          _id,
          title,
          content,
        }`
      )
      .then(res => {
        this.setState({
          loading: false,
          pageTitle: res[0].title,
          pageContent: res[0].content
        });
      })
      .catch(err => {
        console.error("Oh no, error occured: ", err);
      });
  }

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
            <h1>{this.state.pageTitle}</h1>
            <img src="static/gallery/home.jpg" className="about" />
            <BlockContent blocks={this.state.pageContent} />
          </div>
        </Content>
      </div>
    );
  }
}

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

export default class Kontakt extends React.Component {
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

  componentWillMount() {
    client
      .fetch(
        `
      * | [ _type == "page" && slug.current == "kontakt"]| {
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
            <BlockContent blocks={this.state.pageContent} />
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2541.756058927103!2d14.252599515405747!3d50.4270164794722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470bd77544476c4f%3A0xdc9558ecf024b1f8!2sHavl%C3%AD%C4%8Dkova+184%2C+413+01+Roudnice+nad+Labem!5e0!3m2!1scs!2scz!4v1540903390220" />
          </div>
        </Content>
      </div>
    );
  }
}

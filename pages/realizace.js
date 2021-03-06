import "../styles/styles.scss";
import Head from "../components/Head";
import Content from "../components/Content";
import Header from "../components/Header";
const sanityClient = require("@sanity/client");
import BlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";
import { PhotoSwipe, PhotoSwipeGallery } from "react-photoswipe";

const client = sanityClient({
  projectId: "6rx0nq6y",
  dataset: "dobrebydloeudata"
});

const builder = imageUrlBuilder(client);

let tempArray = [];
let tempTitles = [];
let tempDescriptions = [];
let tempContents = [];
let tempGallery = {};
let tempImg = [];
let tempURL;

export default class Realizace extends React.Component {
  state = {
    navOpened: false,
    dataTitles: [],
    dataDescriptions: [],
    dataGallery: [],
    galleryOpened: false
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

  openPhotoSwipe = e => {
    e.preventDefault();
    this.setState({
      isOpen: true,
      options: {
        closeOnScroll: false
      }
    });
  };

  handleClose = () => {
    this.setState({
      isOpen: false
    });
  };

  getThumbnailContent = item => {
    return <img src={item.thumbnail} with={120} height={90} />;
  };

  generateGalleries() {
    Object.keys(tempContents).map(j =>
      Object.keys(tempContents[j]).map(
        k => (
          (tempURL = builder.image(tempContents[j][k]).url()),
          (tempGallery[j] = [
            ...(tempGallery[j] || []),
            {
              src: tempURL,
              thumbnail: tempURL + "?w=500",
              title: "Photo",
              w: tempURL
                .split("-")[1]
                .split(".")[0]
                .split("x")[0],
              h: tempURL
                .split("-")[1]
                .split(".")[0]
                .split("x")[1]
            }
          ])
        )
      )
    );
    this.setState({
      dataTitles: tempTitles,
      dataDescriptions: tempDescriptions,
      dataGallery: tempGallery
    }),
      this.renderGalleries();
  }

  getThumbnailContent = item => {
    return <img src={item.thumbnail} with={120} height={90} />;
  };

  renderGalleries = () => {
    return this.state.dataTitles.map((title, id) => (
      <div className="section__gallery">
        <h2>{title}</h2>
        <p>{this.state.dataDescriptions[id]}</p>
        <PhotoSwipeGallery
          items={this.state.dataGallery[id]}
          thumbnailContent={this.getThumbnailContent}
        />
      </div>
    ));
  };

  componentWillMount() {
    client
      .fetch(
        `
      * | [ _type == "realizace"]| {
        _id,
        title,
        description,
        content,
      }`
      )
      .then(res => {
        Object.keys(res).map(
          i => (
            tempTitles.push(res[i].title),
            tempDescriptions.push(res[i].description),
            tempContents.push(res[i].content),
            i >= res.length - 1
              ? this.generateGalleries()
              : console.log("Načítám")
          )
        );
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
        <Content navOpened={this.state.navOpened} navHandler={this.navHandler}>
          <div className="content__container">
            <h1>Realizace</h1>
          </div>
          {this.state.dataGallery[0] ? (
            this.renderGalleries()
          ) : (
            <p className="loading">Načítání...</p>
          )}
        </Content>
      </div>
    );
  }
}

import "../styles/styles.scss";
import Head from "../components/Head";
import Content from "../components/Content";
import Header from "../components/Header";
import { PhotoSwipeGallery } from "react-photoswipe-component";

const PHOTO_ITEMS = [
  {
    src: "static/gallery/mame-nasito/1.jpg",
    w: 1200,
    h: 800
  },
  {
    src: "static/gallery/mame-nasito/2.jpg",
    w: 1200,
    h: 800
  },
  {
    src: "static/gallery/mame-nasito/3.jpg",
    w: 1200,
    h: 800
  },
  {
    src: "static/gallery/mame-nasito/4.jpg",
    w: 1200,
    h: 800
  },
  {
    src: "static/gallery/mame-nasito/5.jpg",
    w: 1200,
    h: 800
  },
  {
    src: "static/gallery/mame-nasito/6.jpg",
    w: 1200,
    h: 800
  },
  {
    src: "static/gallery/mame-nasito/7.jpg",
    w: 1200,
    h: 800
  },
  {
    src: "static/gallery/mame-nasito/8.jpg",
    w: 1200,
    h: 800
  },
  {
    src: "static/gallery/mame-nasito/9.jpg",
    w: 1200,
    h: 800
  },
  {
    src: "static/gallery/mame-nasito/10.jpg",
    w: 1200,
    h: 800
  },
  {
    src: "static/gallery/mame-nasito/11.jpg",
    w: 1200,
    h: 800
  },
  {
    src: "static/gallery/mame-nasito/12.jpg",
    w: 1200,
    h: 800
  },
  {
    src: "static/gallery/mame-nasito/13.jpg",
    w: 1200,
    h: 800
  },
  {
    src: "static/gallery/mame-nasito/14.jpg",
    w: 1200,
    h: 800
  },
  {
    src: "static/gallery/mame-nasito/15.jpg",
    w: 1200,
    h: 800
  },
  {
    src: "static/gallery/mame-nasito/16.jpg",
    w: 1200,
    h: 800
  },
  {
    src: "static/gallery/mame-nasito/17.jpg",
    w: 1200,
    h: 800
  },
  {
    src: "static/gallery/mame-nasito/18.jpg",
    w: 1200,
    h: 800
  },
  {
    src: "static/gallery/mame-nasito/19.jpg",
    w: 1200,
    h: 800
  },
  {
    src: "static/gallery/mame-nasito/20.jpg",
    w: 1200,
    h: 800
  },
  {
    src: "static/gallery/mame-nasito/21.jpg",
    w: 1200,
    h: 800
  },
  {
    src: "static/gallery/mame-nasito/22.jpg",
    w: 1200,
    h: 800
  },
  {
    src: "static/gallery/mame-nasito/23.jpg",
    w: 1200,
    h: 800
  },
  {
    src: "static/gallery/mame-nasito/24.jpg",
    w: 1200,
    h: 800
  },
  {
    src: "static/gallery/mame-nasito/25.jpg",
    w: 1200,
    h: 800
  },
  {
    src: "static/gallery/mame-nasito/26.jpg",
    w: 1200,
    h: 800
  },
  {
    src: "static/gallery/mame-nasito/27.jpg",
    w: 1200,
    h: 800
  },
  {
    src: "static/gallery/mame-nasito/28.jpg",
    w: 1200,
    h: 800
  },
  {
    src: "static/gallery/mame-nasito/29.jpg",
    w: 1200,
    h: 800
  },
  {
    src: "static/gallery/mame-nasito/30.jpg",
    w: 1200,
    h: 800
  },
  {
    src: "static/gallery/mame-nasito/31.jpg",
    w: 1200,
    h: 800
  }
];

export default class MameNasito extends React.Component {
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
        <Content navOpened={this.state.navOpened} navHandler={this.navHandler}>
          <div
            className="content__container"
            navOpened={this.state.navOpened}
            navHandler={this.navHandler}
          >
            <h1>Máme Našito</h1>
            <p>
              Máme rády ruční práce, šití, tvořiost, látky. Daly jsme se
              dohromady, abychom dávaly látkám hloubku, tvar a harmonii.
            </p>
          </div>
          <div className="section__gallery">
            <PhotoSwipeGallery items={PHOTO_ITEMS} />
          </div>
        </Content>
      </div>
    );
  }
}
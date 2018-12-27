import "../styles/styles.scss";
import Head from "../components/Head";
import Content from "../components/Content";
import Header from "../components/Header";
import { PhotoSwipeGallery } from "react-photoswipe-component";

const PHOTO_ITEMS_1 = [
  {
    src: "static/gallery/realizace/vinarstvi/1.jpg",
    w: 1200,
    h: 800,
    caption: "Vinařství"
  },
  {
    src: "static/gallery/realizace/vinarstvi/2.jpg",
    w: 1200,
    h: 800,
    caption: "Vinařství"
  },
  {
    src: "static/gallery/realizace/vinarstvi/3.jpg",
    w: 1200,
    h: 800,
    caption: "Vinařství"
  },
  {
    src: "static/gallery/realizace/vinarstvi/4.jpg",
    w: 1200,
    h: 800,
    caption: "Vinařství"
  },
  {
    src: "static/gallery/realizace/vinarstvi/5.jpg",
    w: 1200,
    h: 800,
    caption: "Vinařství"
  },
  {
    src: "static/gallery/realizace/vinarstvi/6.jpg",
    w: 1200,
    h: 800,
    caption: "Vinařství"
  },
  {
    src: "static/gallery/realizace/vinarstvi/7.jpg",
    w: 1200,
    h: 800,
    caption: "Vinařství"
  },
  {
    src: "static/gallery/realizace/vinarstvi/8.jpg",
    w: 1200,
    h: 800,
    caption: "Vinařství"
  },
  {
    src: "static/gallery/realizace/vinarstvi/9.jpg",
    w: 1200,
    h: 800,
    caption: "Vinařství"
  },
  {
    src: "static/gallery/realizace/vinarstvi/10.jpg",
    w: 1200,
    h: 800,
    caption: "Vinařství"
  },
  {
    src: "static/gallery/realizace/vinarstvi/11.jpg",
    w: 1200,
    h: 800,
    caption: "Vinařství"
  },
  {
    src: "static/gallery/realizace/vinarstvi/12.jpg",
    w: 1200,
    h: 800,
    caption: "Vinařství"
  }
];

const PHOTO_ITEMS_2 = [
  {
    src: "static/gallery/realizace/pekarstvi/1.jpg",
    w: 1200,
    h: 800,
    caption: "Pekařství Kraupner"
  },
  {
    src: "static/gallery/realizace/pekarstvi/2.jpg",
    w: 1200,
    h: 800,
    caption: "Pekařství Kraupner"
  },
  {
    src: "static/gallery/realizace/pekarstvi/3.jpg",
    w: 1200,
    h: 800,
    caption: "Pekařství Kraupner"
  },
  {
    src: "static/gallery/realizace/pekarstvi/4.jpg",
    w: 1200,
    h: 800,
    caption: "Pekařství Kraupner"
  },
  {
    src: "static/gallery/realizace/pekarstvi/5.jpg",
    w: 1200,
    h: 800,
    caption: "Pekařství Kraupner"
  },
  {
    src: "static/gallery/realizace/pekarstvi/6.jpg",
    w: 1200,
    h: 800,
    caption: "Pekařství Kraupner"
  },
  {
    src: "static/gallery/realizace/pekarstvi/7.jpg",
    w: 1200,
    h: 800,
    caption: "Pekařství Kraupner"
  }
];

const PHOTO_ITEMS_3 = [
  {
    src: "static/gallery/realizace/cukrarna/1.jpg",
    w: 1200,
    h: 800,
    caption: "Cukrárna a Kavárna Dortletka"
  },
  {
    src: "static/gallery/realizace/cukrarna/2.jpg",
    w: 1200,
    h: 800,
    caption: "Cukrárna a Kavárna Dortletka"
  },
  {
    src: "static/gallery/realizace/cukrarna/3.jpg",
    w: 1200,
    h: 800,
    caption: "Cukrárna a Kavárna Dortletka"
  },
  {
    src: "static/gallery/realizace/cukrarna/4.jpg",
    w: 1200,
    h: 800,
    caption: "Cukrárna a Kavárna Dortletka"
  },
  {
    src: "static/gallery/realizace/cukrarna/5.jpg",
    w: 1200,
    h: 800,
    caption: "Cukrárna a Kavárna Dortletka"
  },
  {
    src: "static/gallery/realizace/cukrarna/6.jpg",
    w: 1200,
    h: 800,
    caption: "Cukrárna a Kavárna Dortletka"
  },
  {
    src: "static/gallery/realizace/cukrarna/7.jpg",
    w: 1200,
    h: 800,
    caption: "Cukrárna a Kavárna Dortletka"
  },
  {
    src: "static/gallery/realizace/cukrarna/8.jpg",
    w: 1200,
    h: 800,
    caption: "Cukrárna a Kavárna Dortletka"
  },
  {
    src: "static/gallery/realizace/cukrarna/9.jpg",
    w: 1200,
    h: 800,
    caption: "Cukrárna a Kavárna Dortletka"
  },
  {
    src: "static/gallery/realizace/cukrarna/10.jpg",
    w: 1200,
    h: 800,
    caption: "Cukrárna a Kavárna Dortletka"
  },
  {
    src: "static/gallery/realizace/cukrarna/11.jpg",
    w: 1200,
    h: 800,
    caption: "Cukrárna a Kavárna Dortletka"
  }
];
const PHOTO_ITEMS_4 = [
  {
    src: "static/gallery/realizace/statek/1.jpg",
    w: 1200,
    h: 800,
    caption: "Statek"
  },
  {
    src: "static/gallery/realizace/statek/2.jpg",
    w: 1200,
    h: 800,
    caption: "Statek"
  },
  {
    src: "static/gallery/realizace/statek/3.jpg",
    w: 1200,
    h: 800,
    caption: "Statek"
  },
  {
    src: "static/gallery/realizace/statek/4.jpg",
    w: 1200,
    h: 800,
    caption: "Statek"
  },
  {
    src: "static/gallery/realizace/statek/5.jpg",
    w: 1200,
    h: 800,
    caption: "Statek"
  },
  {
    src: "static/gallery/realizace/statek/6.jpg",
    w: 1200,
    h: 800,
    caption: "Statek"
  },
  {
    src: "static/gallery/realizace/statek/7.jpg",
    w: 1200,
    h: 800,
    caption: "Statek"
  },
  {
    src: "static/gallery/realizace/statek/8.jpg",
    w: 1200,
    h: 800,
    caption: "Statek"
  },
  {
    src: "static/gallery/realizace/statek/9.jpg",
    w: 1200,
    h: 800,
    caption: "Statek"
  },
  {
    src: "static/gallery/realizace/statek/10.jpg",
    w: 1200,
    h: 800,
    caption: "Statek"
  },
  {
    src: "static/gallery/realizace/statek/11.jpg",
    w: 1200,
    h: 800,
    caption: "Statek"
  },
  {
    src: "static/gallery/realizace/statek/12.jpg",
    w: 1200,
    h: 800,
    caption: "Statek"
  },
  {
    src: "static/gallery/realizace/statek/13.jpg",
    w: 1200,
    h: 800,
    caption: "Statek"
  },
  {
    src: "static/gallery/realizace/statek/14.jpg",
    w: 1200,
    h: 800,
    caption: "Statek"
  },
  {
    src: "static/gallery/realizace/statek/15.jpg",
    w: 1200,
    h: 800,
    caption: "Statek"
  },
  {
    src: "static/gallery/realizace/statek/16.jpg",
    w: 1200,
    h: 800,
    caption: "Statek"
  }
];

export default class Realizace extends React.Component {
  state = {
    navOpened: false
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
          <div className="content__container">
            <h1>Realizace</h1>
          </div>

          <div className="section__gallery">
            <h2>Zámecké Vinařství Johann W</h2>
            <p>Třebívlice</p>
            <PhotoSwipeGallery items={PHOTO_ITEMS_1} />
          </div>
          <div className="section__gallery">
            <h2>Pekařství Kraupner</h2>
            <p>Roudnice nad Labem</p>
            <PhotoSwipeGallery items={PHOTO_ITEMS_2} />
          </div>
          <div className="section__gallery">
            <h2>Cukrárna a Kavárna Dortletka</h2>
            <p>Rodinné cukrářství a kavárna v Roudnici nad Labem</p>
            <PhotoSwipeGallery items={PHOTO_ITEMS_3} />
          </div>
          <div className="section__gallery">
            <h2>Dvůr Perlová voda</h2>
            <p>Kostelec nad Ohří</p>
            <PhotoSwipeGallery items={PHOTO_ITEMS_4} />
          </div>
        </Content>
      </div>
    );
  }
}

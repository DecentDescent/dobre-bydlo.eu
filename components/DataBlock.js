export default class cmsData extends React.Component {
  state = {
    loading: true
  };

  componentDidMount() {
    client
      .fetch(
        "*[_type == $type][0...5]", // Query
        { type: "page" } // Params (optional)
      )
      .then(res => {
        this.setState({
          loading: false,
          content: { __html: res.content }
        });
        console.log(res);
      })
      .catch(err => {
        console.error("Oh no, error occured: ", err);
      });
  }
  render() {
    const { loading, content, err } = this.state;
    return err ? (
      err.message
    ) : loading ? (
      "loading"
    ) : (
      <div dangerouslySetInnerHTML={content} />
    );
  }
}

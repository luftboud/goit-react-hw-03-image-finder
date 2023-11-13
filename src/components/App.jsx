import { Component } from 'react';
import axios from 'axios';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
const API_KEY = '36975406-14cef0b651718033f414d4154';
axios.defaults.baseURL = 'https://pixabay.com/api';
class App extends Component {
  state = {
    q: 'random',
    page: 1,
    hits: []
  };
  handleSearch = evt => {
    evt.preventDefault();
    const input = evt.target.querySelector('input');
    const request = input.value;
    this.setState({ q: request, hits: [], page: 1 });
  };
  handleLoad = () => {
    this.setState({ page: this.state.page + 1 });
  };
  async componentDidMount() {
    const response = await axios.get(
      `/?key=${API_KEY}&q=${this.state.q}&page=1&image_type=photo&orientation=horizontal&per_page=12`
    );
    const hits = response.data.hits;
      this.setState({hits: [...hits]})
  }
  async componentDidUpdate(prevProps , prevState) {
    if (this.state.page !== prevState.page || this.state.q !== prevState.q) {
          console.log(this.state.page);
      const response = await axios.get(
        `/?key=${API_KEY}&q=${this.state.q}&page=${this.state.page}&image_type=photo&orientation=horizontal&per_page=12`
      );
      const hits = response.data.hits;
      this.setState(prevState => ({
        hits: [...prevState.hits, ...hits],
      }));
    }
  }
  render() {
    return (
      <div className="app">
        <Searchbar onSubmit={this.handleSearch}></Searchbar>
        <ImageGallery hits={this.state.hits}></ImageGallery>
        <Button onClick={this.handleLoad}></Button>
      </div>
    );
  }
}
export { App };

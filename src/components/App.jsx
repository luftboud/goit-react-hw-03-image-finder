import { Component } from 'react';
import axios from 'axios';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Rings } from  'react-loader-spinner'
const API_KEY = '36975406-14cef0b651718033f414d4154';
axios.defaults.baseURL = 'https://pixabay.com/api';
class App extends Component {
  state = {
    q: 'random',
    page: 1,
    hits: []
  };
  loader_boolean = true
  button_display = "unvisible";
  handleSearch = evt => {
    evt.preventDefault();
    const input = evt.target.querySelector('input');
    const request = input.value;
    this.setState({ q: request, hits: [], page: 1 });
    evt.target.reset();
  };
  handleLoad = () => {
    this.setState({ page: this.state.page + 1 });
  };
  async componentDidMount() {
    const response = await axios.get(
      `/?key=${API_KEY}&q=${this.state.q}&page=1&image_type=photo&orientation=horizontal&per_page=12`
    );
    this.loader_boolean = false;
    this.button_display = "visible";
    const hits = response.data.hits;
    this.setState({ hits: [...hits] })
    
  }
  async componentDidUpdate(prevProps, prevState) {
    this.loader_boolean = true;
    this.button_display = "unvisible";
    if (this.state.page !== prevState.page || this.state.q !== prevState.q) {
          console.log(this.state.page);
      const response = await axios.get(
        `/?key=${API_KEY}&q=${this.state.q}&page=${this.state.page}&image_type=photo&orientation=horizontal&per_page=12`
      );
      this.loader_boolean = false;
      this.button_display = "visible";
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
        <Rings
          height="160"
          width="160"
          color="#3f51b5"
          radius="6"
          wrapperStyle={{ margin: "auto", paddingTop: 310}}
          wrapperClass=""
          visible={this.loader_boolean}
          ariaLabel="rings-loading"
        />
        <ImageGallery hits={this.state.hits}></ImageGallery>
        <Button onClick={this.handleLoad} display={this.button_display}></Button>
      </div>
    );
  }
}
export { App };

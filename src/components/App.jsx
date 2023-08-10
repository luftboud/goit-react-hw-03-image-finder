import { Component } from 'react';
import axios from 'axios';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
const API_KEY = '36975406-14cef0b651718033f414d4154';
axios.defaults.baseURL = 'https://pixabay.com/api';
class App extends Component {
  state = {
    q: '',
    page: 1,
  };
  hitsArr = [];
  handleSearch = evt => {
    evt.preventDefault();
    const input = evt.target.querySelector('input');
    const request = input.value;
    this.setState({ q: request });
    // evt.target.reset();
  };
  handleLoad = () => {
    this.setState({ page: this.state.page + 1 });
  };
  // async componentDidMount() {
  //   const response = await axios.get(
  //     `/?key=${API_KEY}&q=${this.state.q}&page=1&image_type=photo&orientation=horizontal&per_page=12`
  //   );
  //   this.setState({ articles: response.data.hits });
  //   this.hitsArr = this.state.articles;
  // }
  async componentDidUpdate() {
    console.log(this.state.page);
    const response = await axios.get(
      `/?key=${API_KEY}&q=${this.state.q}&page=${this.state.page}&image_type=photo&orientation=horizontal&per_page=12`
    );
    response.data.hits.map(el => this.hitsArr.push(el));
    console.log(this.hitsArr);
  }
  render() {
    return (
      <div className="app">
        <Searchbar onSubmit={this.handleSearch}></Searchbar>
        <ImageGallery hits={this.hitsArr}></ImageGallery>
        <Button onClick={this.handleLoad}></Button>
      </div>
    );
  }
}
export { App };

import { Component } from 'react';
import axios from 'axios';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Rings } from 'react-loader-spinner';
import { Modal } from './Modal';
import css from './styles/App.module.css'
const API_KEY = '36975406-14cef0b651718033f414d4154';
axios.defaults.baseURL = 'https://pixabay.com/api';
class App extends Component {
  state = {
    q: 'random',
    page: 1,
    hits: [],
    loader_boolean: false,
    button_display: "unvisible",
    modal_src: "",
    modal_alt: "",
    modal_visibility: "unvisible"
  };
  handleSearch = evt => {
    evt.preventDefault();
    const input = evt.target.querySelector('input');
    const request = input.value;
    this.setState({ q: request, hits: [], page: 1 });
    evt.target.reset();
    // input.value = '';
  };
  handleLoad = () => {
    this.setState({ page: this.state.page + 1 });
  };
  showModal = evt => {
    evt.preventDefault();
    const item = evt.target;
    if (item.src !== undefined) {
      this.setState({ modal_src: item.src, modal_alt: item.alt, modal_visibility: "visible" });
    document.addEventListener("keydown", evt => {
      evt.preventDefault();
      if (evt.key === "Escape") {
      this.setState({ modal_visibility: "unvisible" });
      }
    });
    }
  }
  modalClick = evt => {
    evt.preventDefault();
    this.setState({ modal_visibility: "unvisible" });
  }
  async componentDidUpdate(prevProps, prevState) {
    if (this.state.page !== prevState.page || this.state.q !== prevState.q) {
      this.setState({loader_boolean: true})
          console.log(this.state.page);
      const response = await axios.get(
        `/?key=${API_KEY}&q=${this.state.q}&page=${this.state.page}&image_type=photo&orientation=horizontal&per_page=12`
      );
      this.setState({loader_boolean: false})
      this.setState({button_display: "visible"})
      const hits = response.data.hits;
      this.setState(prevState => ({
        hits: [...prevState.hits, ...hits],
      }));
    }
  }
  render() {
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleSearch}></Searchbar>
        <Rings
          height="160"
          width="160"
          color="#3f51b5"
          radius="6"
          wrapperStyle={{ margin: "auto", paddingTop: 310}}
          wrapperClass=""
          visible={this.state.loader_boolean}
          ariaLabel="rings-loading"
        />
        <ImageGallery hits={this.state.hits} onClick={this.showModal}></ImageGallery>
        <Button onClick={this.handleLoad} display={this.state.button_display}></Button>
        <Modal src={this.state.modal_src} alt={this.state.modal_alt} visibility={this.state.modal_visibility} onClick={this.modalClick}></Modal>
      </div>
    );
  }
}
export { App };

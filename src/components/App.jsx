import { fetchImage } from 'api/api';
import { Component } from 'react';
import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { ToastContainer, toast, Flip } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';

// CALL IT ONCE IN YOUR APP
injectStyle();

export class App extends Component {
  state = {
    imagesArray: [],
    toSearch: '',
    page: 1,
    loading: false,
    error: false,
    totalImagesPage: null,
  };

  async componentDidUpdate(_, prevState) {
    if (
      this.state.toSearch !== prevState.toSearch ||
      this.state.page !== prevState.page
    ) {
      this.setState({
        loading: true,
      });
      try {
        const images = await fetchImage(this.state.toSearch, this.state.page);

        this.setState(prevState => {
          return {
            imagesArray: [...prevState.imagesArray, ...images.hits],
            totalImagesPage: Math.ceil(images.totalHits / 12),
          };
        });

        if (this.state.totalImagesPage === this.state.page) {
          toast.info(
            "We're sorry, but you've reached the end of search results."
          );
        }

        if (images.totalHits === 0) {
          console.log('No images');
          toast.info("Sorry, but we couldn't find this images.");
        }
      } catch (error) {
        this.setState({ error: true });
        toast.error('Sorry, we have a problem');
      } finally {
        this.setState({
          loading: false,
        });
      }
    }
  }

  onSubmit = value => {
    if (this.state.toSearch !== value) {
      this.setState({
        imagesArray: [],
        toSearch: value,
        page: 1,
      });
    }
  };

  handlerLoadMore = () => {
    console.log(this.state.page);
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { imagesArray, loading, totalImagesPage, page } = this.state;
    const isBtnLoad = totalImagesPage !== page;

    return (
      <div className="App">
        <SearchBar onSubmit={this.onSubmit} />
        {imagesArray.length > 0 && <ImageGallery imagesItems={imagesArray} />}
        {loading && <Loader />}
        {imagesArray.length > 0 && isBtnLoad && (
          <Button handlerLoadMore={this.handlerLoadMore} />
        )}
        <ToastContainer autoClose={5000} transition={Flip} />
      </div>
    );
  }
}

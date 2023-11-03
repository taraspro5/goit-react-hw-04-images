import { fetchImage } from 'api/api';
import { useEffect, useState } from 'react';
import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { ToastContainer, toast, Flip } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';

// CALL IT ONCE IN YOUR APP
injectStyle();

export const App = () => {
  const [imagesArray, setImagesArray] = useState([]);
  const [toSearch, setToSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [totalImagesPage, setTotalImagesPage] = useState(null);

  // useEffect(() => {
  //   console.log('CHANGE');
  // }, [toSearch, page]);

  useEffect(() => {
    if (toSearch === '') {
      return;
    }
    async function getImages() {
      try {
        setLoading(true);
        const images = await fetchImage(toSearch, page);

        setImagesArray(prevState => [...prevState, ...images.hits]);
        setTotalImagesPage(Math.ceil(images.totalHits / 12));

        if (totalImagesPage === page) {
          toast.info(
            "We're sorry, but you've reached the end of search results."
          );
        }

        if (images.totalHits === 0) {
          console.log('No images');
          toast.info("Sorry, but we couldn't find this images.");
        }
      } catch (error) {
        setError(true);
        toast.error('Sorry, we have a problem');
      } finally {
        setLoading(false);
      }
    }

    getImages();
  }, [toSearch, page]);

  const onSubmit = value => {
    if (toSearch !== value) {
      setImagesArray([]);
      setToSearch(value);
      setPage(1);
    }
  };

  const handlerLoadMore = () => {
    console.log(page);
    setPage(prevState => prevState + 1);
  };

  const isBtnLoad = totalImagesPage !== page;

  return (
    <div className="App">
      <SearchBar onSubmit={onSubmit} />
      {imagesArray.length > 0 && <ImageGallery imagesItems={imagesArray} />}
      {loading && <Loader />}
      {imagesArray.length > 0 && isBtnLoad && (
        <Button handlerLoadMore={handlerLoadMore} />
      )}
      <ToastContainer autoClose={5000} transition={Flip} />
    </div>
  );
};

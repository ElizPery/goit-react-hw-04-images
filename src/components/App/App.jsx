import { useEffect, useState, useRef } from "react";
import Searchbar from "components/Searchbar";
import ImageGallery from "components/ImageGallery";
import { fetchGallery } from "api/gallery";
import Button from "components/Button";
import css from './App.module.css';
import Loader from "components/Loader";
import { Modal } from "components/Modal";
import Notiflix from 'notiflix';

export function App() {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState('');
  const [tags, setTags] = useState('');
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    fetchData(query, page);
  }, [query, page]);

  const fetchData = async (query, page) => {
    if (query.trim() === '') {
      return Notiflix.Notify.warning('Please enter your request');
    }

    setIsLoading(true);

    try {
      const response = await fetchGallery(query, page);

      if (response.items.length === 0) {
        setIsLoading(false)
        return Notiflix.Notify.failure('Nothing found');
      }

      setItems(prev => [...prev, ...response.items]);
      setTotal(response.total);

    } catch {
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  };

  const onSubmit = e => {
    e.preventDefault();

    const inputValue = e.target.elements[1].value;

    setQuery(inputValue);
    setItems([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1)
  };

  const onCloseModal = () => {
    setShowModal(false);
    setModalData('');
    setTags('');
  };

  const onOpenModal = (img, alt) => {
    setShowModal(true);
    setModalData(img);
    setTags(alt);
  };

  return (
    <div className={css.app}>
      {showModal && (
        <Modal onClose={onCloseModal} >
          <img src={modalData} alt={tags} />
        </Modal>
      )}
      <Searchbar onSubmit={onSubmit} />
      {items.length !== 0 && (
        <ImageGallery items={items} toggleModal={onOpenModal} />
      )}
      {isLoading && <Loader />}
      {isError &&
        Notiflix.Notify.failure(
          'Something went wrong, please try another query'
        )}
      {(total / items.length) > 1 && !isLoading && items.length !== 0 && (
        <Button onClick={handleLoadMore} />
      )}
    </div>
  );
}
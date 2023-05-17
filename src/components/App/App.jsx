import { Component } from "react";
import Searchbar from "components/Searchbar";
import ImageGallery from "components/ImageGallery";
import { fetchGallery } from "api/gallery";
import Button from "components/Button";
import css from './App.module.css';
import Loader from "components/Loader";
import Modal from "components/Modal";
import Notiflix from 'notiflix';

export class App extends Component {
  state = {
    query: '',
    items: [],
    total: 0,
    page: 1,
    isError: false,
    isLoading: false,
    showModal: false,
    modalData: '',
    tags: ''
  };

  componentDidUpdate(_, prevState) {
    const {
      query,
      page ,
    } = this.state;


    if (prevState.query !== query || prevState.page !== page) {
      this.fetchData(query, page);
    }
  }

  fetchData = async (query, page) => {

    if (query.trim() === '') {
      return Notiflix.Notify.warning('Please enter your request');
    }

    this.setState({
      isLoading: true,
    });

    try {
      const response = await fetchGallery(query, page);

      if (response.items.length === 0) {
        this.setState({isLoading: false})
        return Notiflix.Notify.failure('Nothing found');
      }

      this.setState(prev => ({
        items: [...prev.items, ...response.items],
        total: response.total,
      }));

    } catch {
      this.setState({ isError: true});
    } finally {
      this.setState(
        {isLoading: false}
      )
    }
  };

  onSubmit = e => {
    e.preventDefault();

    const inputValue = e.target.elements[1].value;

    this.setState({
      query: inputValue,
      items: [],
      page: 1,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  onCloseModal = () => {
    this.setState({
      showModal: false,
      modalData: '',
      tags: '',
    });
  };

  onOpenModal = (img, alt) => {
    this.setState({
      showModal: true,
      modalData: img,
      tags: alt
    });
  };

  render() {
    const {
      items, total,
      isError,
      isLoading,
      showModal,
      modalData,
      tags
    } = this.state;

    const { onCloseModal, onSubmit, onOpenModal, handleLoadMore } = this;

    const loadMore = total / items.length;

    return (
      <div className={css.app}>
        {showModal && (
          <Modal onClose={onCloseModal}>
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
        {loadMore > 1 && !isLoading && items.length !== 0 && (
          <Button onClick={handleLoadMore} />
        )}
      </div>
    );
  }
}

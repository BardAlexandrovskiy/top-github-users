import React from 'react';
import Header from './header';
import InputSearch from './inputSearch';
import ErrorContainer from './errorContainer';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputSearch: {
        value: '',
        display: 'flex'
      },
      preloader: 'none',
      errorContainer: 'none'
    };
  }

  handleChangeInput = e =>
    this.setState({ inputSearch: { value: e.target.value } });

  getUsersTop = () => {
    const { inputSearch } = this.state;
    if (inputSearch.value.trim()) {
      this.setState({ preloader: 'inline-block' });
      fetch(`https://api.github.com/search/users?q=${inputSearch.value}`)
        .then(res => {
          if (res.status !== 200) {
            this.setState({
              inputSearch: { value: '', display: 'none' }
            });
            console.log(res.json());
          }
        })
        .catch(this.setState({ errorContainer: 'flex' }))
        .finally(
          this.setState({
            inputSearch: { value: '' },
            preloader: 'none'
          })
        );
    }
  };

  handlePressInput = e => {
    if (e.keyCode === 13) {
      this.getUsersTop();
    }
  };

  handleClickLogo = () => {
    this.setState({ inputSearch: { display: 'flex' } });
  };

  handleClickErrorButton = () => {
    this.setState({ errorContainer: 'none' });
  };

  render() {
    const { inputSearch, preloader, errorContainer } = this.state;
    return (
      <div className="main_app">
        <ErrorContainer
          style={{
            display: errorContainer
          }}
          handleClickErrorButton={this.handleClickErrorButton}
        />
        <Header handleClickLogo={this.handleClickLogo} />
        <main className="main_container">
          <div className="lds-dual-ring" style={{ display: preloader }} />
          <InputSearch
            value={inputSearch.value}
            handleChangeInput={this.handleChangeInput}
            handlePressInput={this.handlePressInput}
            handleClickButton={this.getUsersTop}
            style={{ display: inputSearch.display }}
          />
        </main>
      </div>
    );
  }
}

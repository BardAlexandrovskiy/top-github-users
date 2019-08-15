import React from 'react';
import Header from './header';
import InputSearch from './inputSearch';
import ErrorContainer from './errorContainer';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputSearchValue: '',
      preloader: 'none',
      errorContainer: 'none'
    };
  }

  handleChangeInput = e => this.setState({ inputSearchValue: e.target.value });

  getUsersTop = () => {
    const { inputSearchValue } = this.state;
    if (inputSearchValue.trim()) {
      this.setState({ preloader: 'inline-block' });
      fetch(`https://api.github.com/search/users?q=${inputSearchValue}`)
        .then(res => {
          if (res.status === 200) {
            this.setState({
              inputSearchValue: ''
            });
            return res.json();
          }
          throw new Error(res.status);
        })
        .then(usersInfoObj => {
          if (usersInfoObj.items.length) {
            return console.log(usersInfoObj);
          }
          throw new Error('Нет пользователей');
        })
        .catch(() => this.setState({ errorContainer: 'block' }))
        .finally(() => {
          this.setState({
            inputSearchValue: '',
            preloader: 'none'
          });
        });
    }
  };

  handlePressInput = e => {
    if (e.keyCode === 13) {
      this.getUsersTop();
    }
  };

  handleClickLogo = () => {
    alert('клик на лого');
  };

  handleClickErrorButton = () => {
    this.setState({ errorContainer: 'none' });
  };

  render() {
    const { inputSearchValue, preloader, errorContainer } = this.state;
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
            value={inputSearchValue}
            handleChangeInput={this.handleChangeInput}
            handlePressInput={this.handlePressInput}
            handleClickButton={this.getUsersTop}
          />
        </main>
      </div>
    );
  }
}

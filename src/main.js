import React from 'react';
import Header from './header';
import InputSearch from './inputSearch';
import ErrorContainer from './errorContainer';
import TopUsersContainer from './topUsersContainer';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputSearchValue: '',
      preloader: 'none',
      errorContainer: 'none',
      users: [],
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
            return usersInfoObj.items;
          }
          throw new Error('Нет пользователей');
        })
        .then(users => {
          if (users.langth < 10) {
            this.setState({ users: users });
          } else {
            this.setState({ users: users.slice(0, 10) });
          }
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
    this.setState({ users: [] });
  };

  handleClickErrorButton = () => {
    this.setState({ errorContainer: 'none' });
  };

  render() {
    const {
      inputSearchValue, preloader, errorContainer, users,
    } = this.state;
    return (
      <div className="main_app">
        <ErrorContainer
          style={{
            display: errorContainer,
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
          <TopUsersContainer users={users} />
        </main>
      </div>
    );
  }
}

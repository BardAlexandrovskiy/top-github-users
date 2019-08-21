import React from 'react';
import Header from './header';
import InputSearch from './inputSearch';
import ErrorContainer from './errorContainer';
import ItemList from './itemList';


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

  getError = () => this.setState({ errorContainer: 'block' });


  getUsersTop = () => {
    const { inputSearchValue } = this.state;
    if (inputSearchValue.trim()) {
      this.setState({ preloader: 'inline-block' });
      const location = inputSearchValue.replace(' ', '-');
      fetch(`https://api.github.com/search/users?q=location:${location}+repos:%3E9+followers:%3E10`)
        .then((res) => {
          if (res.status === 200) {
            this.setState({
              inputSearchValue: '',
            });
            return res.json();
          }
          throw new Error(res.status);
        })
        .then((usersInfoObj) => {
          if (usersInfoObj.items.length) {
            return usersInfoObj.items;
          }
          throw new Error('Нет пользователей');
        })
        .then((usersArr) => {
          if (usersArr.langth < 10) {
            this.setState({ users: usersArr });
          } else {
            this.setState({ users: usersArr.slice(0, 10) });
          }
        })
        .catch(this.getError)
        .finally(() => {
          this.setState({
            inputSearchValue: '',
            preloader: 'none',
          });
        });
    }
  };

  handlePressInput = (e) => {
    if (e.keyCode === 13) {
      this.getUsersTop();
    }
  };

  handleClickLogo = () => {
    // this.setState({ users: [] });
    window.location.reload();
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
          <div className="lds-ellipsis" style={{ display: preloader }}>
            <div />
            <div />
            <div />
            <div />
          </div>
          <InputSearch
            value={inputSearchValue}
            handleChangeInput={this.handleChangeInput}
            handlePressInput={this.handlePressInput}
            handleClickButton={this.getUsersTop}
          />
          <ul className="top_users_container">
            {users.map(user => <ItemList getError={this.getError} key={user.id} user={user} />)}
          </ul>
        </main>
      </div>
    );
  }
}

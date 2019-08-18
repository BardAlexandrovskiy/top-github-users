import React from 'react';
import PropTypes from 'prop-types';

export default class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      bio: '',
      location: '',
      email: '',
    };
  }

  componentDidMount() {
    const { user } = this.props;
    return fetch(user.url)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw new Error(res.status);
      })
      .then((userAdditional) => {
        this.setState({
          name: userAdditional.name,
          bio: userAdditional.bio,
          location: userAdditional.location,
          email: userAdditional.email,
        });
      });
  }

  render() {
    const { user } = this.props;
    const {
      name, bio, location, email,
    } = this.state;
    return (
      <li className="list_item">
        <div className="user_avatar_container">
          <img src={user.avatar_url} alt="avatar" className="user_avatar" />
        </div>
        <div className="list_item_content">
          <a className="user_login" href={user.html_url}>
            {user.login}
          </a>
          <p className="user_name">{name}</p>
          <p className="user_bio">{bio}</p>
          <div className="user_location">
            <svg
              display={location ? 'inline-block' : 'none'}
              className="user_email_img"
              viewBox="0 0 12 16"
              version="1.1"
              width="12"
              height="16"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                fill="#ccc"
                d="M6 0C2.69 0 0 2.5 0 5.5 0 10.02 6 16 6 16s6-5.98 6-10.5C12 2.5 9.31 0 6 0zm0 14.55C4.14 12.52 1 8.44 1 5.5 1 3.02 3.25 1 6 1c1.34 0 2.61.48 3.56 1.36.92.86 1.44 1.97 1.44 3.14 0 2.94-3.14 7.02-5 9.05zM8 5.5c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z"
              />
            </svg>
            <p className="user_location_text">{location}</p>
          </div>
          <p className="user_email">
            <svg
              display={email ? 'inline-block' : 'none'}
              className="user_email_img"
              viewBox="0 0 14 16"
              version="1.1"
              width="14"
              height="16"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                fill="#ccc"
                d="M0 4v8c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H1c-.55 0-1 .45-1 1zm13 0L7 9 1 4h12zM1 5.5l4 3-4 3v-6zM2 12l3.5-3L7 10.5 8.5 9l3.5 3H2zm11-.5l-4-3 4-3v6z"
              />
            </svg>
            <p className="user_email_text">{email}</p>
          </p>
        </div>
      </li>
    );
  }
}

ItemList.propTypes = {
  user: PropTypes.shape({
    url: PropTypes.string,
    avatar_url: PropTypes.string,
    login: PropTypes.string,
    html_url: PropTypes.string,
  }),
};

ItemList.defaultProps = {
  user: {
    url: '',
    avatar_url: '',
    login: '',
    html_url: '',
  },
};

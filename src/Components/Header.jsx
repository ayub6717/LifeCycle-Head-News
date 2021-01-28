import React, { Component, createRef } from "react";
import { infoCategory } from "./Info";
class Header extends Component {
  state = {
    searchTerm: "",
  };

  searchBarRef = createRef();

  handleChange = (e) => {
    this.setState({
      searchTerm: e.target.value,
    });
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.props.search(this.state.searchTerm);
    }
  };

  componentDidMount() {
    this.searchBarRef.current.focus();
  }

  render() {
    const { category, changeCategory } = this.props;
    return (
      <div className="my-4">
        <h1 className="mb-4" style={{ fontWeight: "300", textAlign: "center"}}>
          <b>LifeCycle Head News</b>
        </h1>
        <input
          ref={this.searchBarRef}
          type="search"
          className="form-control"
          placeholder="Typing"
          value={this.state.searchTerm}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        />
        <div className="my-4">
          {infoCategory &&
            Object.keys(infoCategory).map((item) => {
              if (category === infoCategory[item]) {
                return (
                  <button
                    onClick={() => changeCategory(infoCategory[item])}
                    className="btn btn-sm btn-warning mr-2 mb-2"
                  >
                    {`${infoCategory[item]}`}
                  </button>
                );
              }

              return (
                <button
                  onClick={() => changeCategory(infoCategory[item])}
                  className="btn btn-sm btn-dark mr-2 mb-2"
                >
                  {`${infoCategory[item]}`}
                </button>
              );
            })}
        </div>
      </div>
    );
  }
}

export default Header;

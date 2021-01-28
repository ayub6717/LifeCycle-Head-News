import React from "react";
import "./App.css";
import Header from "./Components/Header";
import News, { infoCategory } from "./Components/Info";
import Newslist from "./Components/Newslist";
import Pagination from "./Components/Pagination";
import Loading from "./Components/Loading";
import Reftest from "./Components/Reftest";

const news = new News(infoCategory.technology);
class App extends React.Component {
  state = {
    data: {},
    isLoading: true,
  };

  aboutResult = React.createRef();
  jumbotronRef = React.createRef();
  componentDidMount() {
    news
      .getNews()
      .then((data) => {
        this.setState({ data, isLoading: false });
      })
      .catch((e) => {
        console.log(e);
        alert("something Went Worng");
        this.setState({ isLoading: false });
      });

    console.log(this.jumbotronRef);
  }

  goToTop = () => {
    window.scroll(0, this.aboutResult.current.scrollTop);
  };

  next = () => {
    if (this.state.data.isNext) {
      this.setState({ isLoading: true });
    }
    news
      .next()
      .then((data) => {
        this.setState({ data, isLoading: false });
      })
      .catch((e) => {
        console.log(e);
        alert("something Went Worng");
        this.setState({ isLoading: false });
      });
  };

  prev = () => {
    if (this.state.data.isPrevious) {
      this.setState({ isLoading: true });
    }
    news
      .prev()
      .then((data) => {
        this.setState({ data, isLoading: false });
      })
      .catch((e) => {
        console.log(e);
        alert("something Went Worng");
        this.setState({ isLoading: false });
      });
  };

  handlePageChange = (value) => {
    this.setState({
      data: {
        ...this.state.data,
        currentPage: Number.parseInt(value),
      },
    });
  };

  goToPage = () => {
    this.setState({ isLoading: true });
    news
      .setCurrentPage(this.state.data.currentPage)
      .then((data) => {
        this.setState({ data, isLoading: false });
      })
      .catch((e) => {
        console.log(e);
        alert("something Went Worng");
        this.setState({ isLoading: false });
      });
  };

  changeCategory = (category) => {
    this.setState({ isLoading: true });
    news
      .changeCategory(category)
      .then((data) => {
        this.setState({ data, isLoading: false });
      })
      .catch((e) => {
        console.log(e);
        alert("something Went Worng");
        this.setState({ isLoading: false });
      });
  };

  search = (searchTerm) => {
    this.setState({ isLoading: true });
    news
      .search(searchTerm)
      .then((data) => {
        this.setState({ data, isLoading: false });
      })
      .catch((e) => {
        console.log(e);
        alert("something Went Worng");
        this.setState({ isLoading: false });
      });
  };
  render() {
    const {
      article,
      isPrevious,
      isNext,
      category,
      totalResults,
      currentPage,
      totalPage,
    } = this.state.data;
    return (
      <div className="Bg">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 offset-md-3">
              <Header
                category={category}
                changeCategory={this.changeCategory}
                search={this.search}
              />
              <div ref={this.aboutResult} className="d-flex">
                <p className="text-black-50 ">
                  About {totalResults} results found
                </p>
                <p className="text-black-50 ml-auto">
                  {currentPage} page of {totalPage}
                </p>
              </div>

              {this.state.isLoading ? (
                <Loading />
              ) : (
                <div>
                  <Newslist news={article} />
                  <Pagination
                    next={this.next}
                    prev={this.prev}
                    isPrevious={isPrevious}
                    isNext={isNext}
                    totalPage={totalPage}
                    currentPage={currentPage}
                    handlePageChange={this.handlePageChange}
                    goToPage={this.goToPage}
                  />
                  <button style={{marginLeft: "39%"}}
                    className="btn btn-dark my-5"
                    onClick={this.goToTop}
                  >
                    Go To Top
                  </button>
                </div>
              )}
              <Reftest ref={this.jumbotronRef} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

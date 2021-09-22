import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      quoteList: [
        {
          text: "Quote will appear in here!",
          author: "Author"
        },
      ],
      tweetAnchor: 'https://www.twitter.com/intent/tweet?text=Quote%20will%20appear%20in%20here!%20-Author'
      /*quoteList: [
        {
          quote: "Quote will appear in here!",
          author: "Author"
        },
        {
          quote: "Everything takes time, be patience!",
          author: "Me"
        },
        {
          quote: "Don't be the first! Be the true one!",
          author: "Denzel Washington"
        }
      ]*/
    }

    this.copyHandle = this.copyHandle.bind(this);
    this.nextQuoteHandle = this.nextQuoteHandle.bind(this);

  }

  copyHandle() {
    navigator.clipboard.writeText(this.state.quoteList[this.state.index]["text"]);
    alert('Copied quote: \n' + this.state.quoteList[this.state.index]["text"]);
  }
  nextQuoteHandle() {
    if(this.state.index > this.state.quoteList.length-2){
      this.setState(state => ({
        index: 0,
        tweetAnchor: this.createTweetAnchor(state)
      }))
    } else {
      this.setState(state => ({
        index: state.index + 1,
        tweetAnchor: this.createTweetAnchor(state)
      }))
    }
  }

  createList = (data) => {
    this.setState(state => ({
      quoteList: state.quoteList.concat(data)
    }))
  }

  createTweetAnchor = (state) => {
    const prefix = "https://www.twitter.com/intent/tweet?text=";
    const textQuote =  state.quoteList[state.index+1]["text"];
    const textAuthor = state.quoteList[state.index+1]["author"];
    const textFull = textQuote + " -" + textAuthor;
    return prefix.concat(textFull.replace(/\s/g,"%20"));
  }

  componentDidMount(){
    const url = "https://type.fit/api/quotes";
    fetch(url)
    .then(response => response.json())
    .then(this.createList)
    .catch("Error occured while fetching data")
  }

  render(){
    return (
      <div className="wrapper" id="quote-box">
      <div className="content">
        <h1 className="title">Online Quote Generator</h1>
        <div className="quote-wrapper">
          <div className="quote-body">
            <div className="top-quote">
              <p className="quote" id="text">
                <q>{this.state.quoteList[this.state.index]["text"]}</q>
              </p>
              <button className="option copy" onClick={this.copyHandle}>
                <FontAwesomeIcon icon={faCopy} />
              </button>
            </div>
            <button className="option new-quote" id="new-quote" onClick={this.nextQuoteHandle}>
              <FontAwesomeIcon icon={faSyncAlt} />
            </button>
          </div>
          <div className="author-body">
            <p className="author" id="author">{this.state.quoteList[this.state.index]["author"]}</p>
          </div>
        </div>
        <div className="quote-footer">
          <h2 className="footer-subtitle">Share</h2>
          <a className="social-btn"
            id="fb-quote" 
            onClick={() => {alert("coming soon!")}}
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon className="fb-icon" icon={faFacebookSquare} />
          </a>
          <a 
            className="social-btn"
            id="tweet-quote"
            href={this.state.tweetAnchor}
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon className="tw-icon" icon={faTwitterSquare} />
          </a>
        </div>
      </div>
    </div>
    );
  }
}

export default App;

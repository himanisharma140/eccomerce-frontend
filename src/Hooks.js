import React, {Component, useState, useEffect} from 'react';

const Hooks = () => {
  const[news, setNews] = useState([]);
  const[searchQuery, setSearchQuery] = useState('react')
  const[url, setUrl] = useState('http://hn.algolia.com/api/v1/search?query=react')
  const[loading, setLoading] = useState(false)

  //fetch news
  const fetchNews = () => {
    setLoading(true)
    fetch(url)
    .then(result => result.json())
    .then(data => setNews(data.hits), setLoading(false))
    .catch(error => console.log(error))
  }

  useEffect(() => {
    fetchNews()
  },[url])

  const handleChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`)
  }

   return(
     <div>
        <h1>News</h1>
        {loading ? <h2>Loading...</h2> : ""}
        <form onSubmit={handleSubmit}>
        <input type="text" value={searchQuery} onChange={handleChange}></input>
        <button>Search</button>
        {news.map((n,i) => (
          <p key={i}> {n.title} </p>
        ))}
        </form>
      </div>
  )
}

// class App extends Component {
//   state = {
//     count: 0
//   };
//   componentDidMount() {
//     document.title = `Button clicked ${this.state.count} times`;
//   }
//   componentDidUpdate() {
//     document.title = `Button clicked ${this.state.count} times`;
//   }
//   increment = () => {
//     this.setState({
//       count: this.state.count + 1
//     })
//   }
//   render(){
//   return (
//     <div>
//       <h1>Counter app</h1>
//       <button onClick={this.increment}>Clicked {this.state.count} times </button>
//     </div>
//   );
// }
// }

export default Hooks;

import React from 'react';

import './App.css';

import { Component } from 'react';
import {CardList} from './components/card-list/card-list.component';

import {SearchBox} from './components/search-box/search-box.component'

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }



class App extends Component{
    constructor(){
      super();

      this.state ={
        monsters:[ ],
        searchField:''
      };

      // function components doesn't know this (the context which the function gets called, which is the app component)
      // so it has to bind the context
      //this.handleChange = this.handleChange.bind(this); //but by using arrow functions will automatically bind this
      // (context) to where function is defined.
    }
    //gets the lexical scoping
    handleChange =(e) => {
     this.setState({searchField:e.target.value});

    }
  
    //life cycle method gets called just after a component is mounted (inserted into the DOM) 
    //this casues an additional rendering so, have to be careful when using, could cause a performance hit
    componentDidMount(){
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({monsters:users}))
  
    }
   render(){

      const {monsters,searchField } = this.state;
      const filteredMonsters = monsters.filter(monster =>monster.name.toLowerCase().includes(searchField.toLocaleLowerCase()));

    return(
      
      <div className="App">
        <h1>Monsters Rolodex </h1>
       <SearchBox
        placeholder = 'search monsters'
        handleChange={this.handleChange}
       />
        <CardList monsters={filteredMonsters}/>

       </div>


    );

  }
  
}

export default App;

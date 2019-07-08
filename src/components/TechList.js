import React, { Component } from 'react';
import TechItem from './TechItem';

class TechList extends Component {
  state = {
    newTech: '',
    techs: [],
  };

  // Runs whenever the components appears on screen
  componentDidMount() {
    const techs = localStorage.getItem('techs');

    if(techs) {
      this.setState({ techs: JSON.parse(techs) })
    }
  }

  // Runs whenever there's a change on props or state
  componentDidUpdate(_, prevState) {
    if(prevState.techs !== this.state.techs) {
      localStorage.setItem('techs', JSON.stringify(this.state.techs))
    }

  }

  handleInputChange = e => {
    this.props.tech;
    this.setState({ newTech: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ techs: [...this.state.techs, this.state.newTech], newTech: '' });
  };

  handleDelete = tech => {
    this.setState({ techs: this.state.techs.filter(t => t !== tech) });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <ul>
          {this.state.techs.map(tech => (
            <TechItem tech={tech} key={tech} onDelete={() => this.handleDelete(tech)} />
          ))}
        </ul>
        <input type="text" onChange={this.handleInputChange} value={this.state.newTech} />
        <button type="submit">Send</button>
      </form>
    );
  }
}

export default TechList;

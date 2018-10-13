import React, {Component} from 'react';
import {Button} from 'react-materialize';
import './Question.css';
import Question from "./Question";

export default class CompleteDocument extends Component {
  constructor(props) {
    super(props);
    this.input = '';
    this.state = {
      stepN: 0,
    };
    this.template = {
      id: this.props.match.params.id,
      name: "Taxe d'habitation",
      fields: [
        {
          name: "Prénom",
          value: "Thibaut",
        },
        {
          name: "Nom",
          value: "Cornolti",
        },
        {
          name: "Ville",
        },
      ],
    };
    this.questionLength = this.template.fields.length;
  }

  clickNext = () => {
    this.template.fields[this.state.stepN].value = this.input;
    if (this.isLastStep()) {
      this.props.history.push('/')
    } else {
      this.setState({stepN: this.state.stepN + 1})
    }
  };

  inputChange = (evt) => {
    this.input = evt.currentTarget.value;
  };

  isLastStep = () => {
    return this.state.stepN + 1 >= this.questionLength;
  };

  render() {
    let buttonName = this.isLastStep() ? 'Terminé' : 'Suivant';
    return (
      <div>
        <h1>{this.template.name}</h1>
        <h2>Oups, il nous manque quelques informations ! ({this.state.stepN + 1}/{this.questionLength})</h2>
        <Question onInputChange={this.inputChange} name={this.template.fields[this.state.stepN].name}/>
        <Button onClick={this.clickNext} className={"waves-effect waves-block waves-light"}>{buttonName}</Button>
      </div>
    )
  }
}

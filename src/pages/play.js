import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Questions from '../components/Questions';
import '../styles/play.css';

class Play extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: {},
      loading: true,
      answers: [],
    };
    this.concatenaAnswers = this.concatenaAnswers.bind(this);
    this.randomize = this.randomize.bind(this);
    this.saveStorage = this.saveStorage.bind(this);
  }

  async componentDidMount() {
    await this.fetchAPI();
    this.concatenaAnswers();
    this.saveStorage();
  }

  componentDidUpdate(prevProps) {
    const { numQuestion } = this.props;
    if (prevProps.numQuestion !== numQuestion) this.concatenaAnswers();
  }

  async fetchAPI() {
    const { url } = this.props;
    const token = JSON.parse(localStorage.getItem('token'));
    const urlToken = `&token=${token}`;
    const END_POINT = `${url}${urlToken}`;
    const response = await fetch(END_POINT);
    const json = await response.json();
    this.setState({ questions: json, loading: false });
  }

  concatenaAnswers() {
    const { numQuestion } = this.props;
    const { questions: { results } } = this.state;
    const { correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } = results[numQuestion];

    const incorrectObject = incorrectAnswers.map((incorrect, index) => ({
      data: 'wrong-answer', answer: incorrect, id: index,
    }));
    const correctObject = { data: 'correct-answer', answer: correctAnswer };
    const answer = [...incorrectObject, correctObject];
    this.randomize(answer);
  }

  randomize(answer) {
    const numbers = [];
    while (numbers.length !== answer.length) {
      const number = Math.floor(Math.random() * answer.length);
      if (!numbers.includes(number)) numbers.push(number);
    }
    const ordenedAnwsers = numbers.map((number) => answer[number]);
    this.setState({
      answers: ordenedAnwsers,
    });
  }

  saveStorage() {
    const { name, email } = this.props;
    const player = {
      name,
      assertions: 0,
      score: 0,
      gravatarEmail: email,
    };
    localStorage.setItem('state', JSON.stringify({ player }));
  }

  render() {
    const { numQuestion } = this.props;
    const { questions: { results }, loading, answers } = this.state;
    if (loading) return <div>Loading...</div>;
    return (
      <div className="play">
        <Header />
        <Questions question={ results[numQuestion] } answers={ answers } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  url: state.settings.url,
  numQuestion: state.questions.nextQuestion,
  name: state.login.name,
  email: state.login.email,
});

export default connect(mapStateToProps)(Play);

Play.propTypes = {
  url: PropTypes.string,
  numQuestion: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
}.isRequired;

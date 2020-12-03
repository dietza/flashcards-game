const chai = require('chai');
const expect = chai.expect;

const Card = require('../src/Card');
const Turn = require('../src/Turn');

describe('Turn', () => {

  let card1;
  let card2;
  let card3;

  beforeEach(() => {

    card1 = new Card(1, 'How does JS combine different datatypes?', ['it never does', 'magic', 'type coercion'], 'type coercion');

    card2 = new Card(2, 'When does hoisting occur?', ['in the execution phase', 'in the creation phase', 'when sails need raising'], 'in the creation phase');

    card3 = new Card(3, 'When should we use dot notation?', ['when we know the exact, unchanging key name', 'never', 'always'], 'When we know the exact, unchanging key name');

  });

  it('should be a function', () => {
    expect(Turn).to.be.a('function');
  });

  it('should be an instance of Turn', () => {
    const turn = new Turn();
    expect(turn).to.be.an.instanceof(Turn);
  }); 

  it('should store a guess from a user', () => {
    const turn = new Turn('When we know the exact, unchanging key name', card3);
    expect(turn.guess).to.equal('When we know the exact, unchanging key name');
  });

  it('should store a flashcard', () => {
    const turn = new Turn('type coercion', card1);
    expect(turn.card).to.be.an.instanceOf(Card);
  });

  it('should be able to return the guess made by the user', () => {
    const turn = new Turn('in the creation phase', card2);
    turn.returnGuess();
    expect(turn.guess).to.equal('in the creation phase');
  });

  it('should be able to return the flashcard', () => {
    const turn = new Turn('When we know the exact, unchanging key name', card3);
    turn.returnCard();
    expect(turn.card).to.be.an.instanceOf(Card);
    expect(typeof turn.card).to.equal('object');
  });

  it('should have a question and answer from the card', () => {
    const turn = new Turn('type coercion', card1);
    turn.returnCard();
    expect(turn.card.question).to.equal('How does JS combine different datatypes?');
    expect(turn.card.correctAnswer).to.equal('type coercion');
  });

  it('should check whether the guess is the correct answer', () => {
    const turn = new Turn('type coercion', card1);
    turn.evaluateGuess();
    expect(turn.eval).to.equal(true);
  });

  it('should also evaluate an incorrect answer', () => {
    const turn = new Turn('magic', card1);
    turn.evaluateGuess();
    expect(turn.eval).to.equal(false);
  });

  it('should give a user feedback reflecting a correct guess', () => {
    const turn = new Turn('When we know the exact, unchanging key name', card3);
    turn.giveFeedback();
    expect(turn.feedback).to.equal('correct!');
  });

  it('should give a user feedback reflecting an incorrect guess', () => {
    const turn = new Turn('when sails need raising', card2);
    turn.giveFeedback();
    expect(turn.feedback).to.equal('incorrect!');
  });
});
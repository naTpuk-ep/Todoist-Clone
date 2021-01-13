import React from 'react';
import { connect } from 'react-redux';
import { createTodo } from '../../redux/actions/actions';

import './Modal.scss';

class Modal extends React.Component {
  state = {
    title: '',
  };

  submitHandler = (event) => {
    event.preventDefault();
    const { title } = this.state;
    if (title.length) {
      const { createTodo } = this.props;
      const newTodo = {
        id: new Date().getTime(),
        title,
        done: false,
      };
      createTodo(newTodo);
      this.setState({ title: '' });
      this.props.closeModal();
    }
  };

  changeInputHandler = (event) => {
    this.setState((prevState) => ({
      ...prevState,
      ...{
        [event.target.name]: [event.target.value],
      },
    }));
  };

  render() {
    return (
      <div className='Modal'>
        <form onSubmit={this.submitHandler}>
          <label htmlFor='title'> Add new ToDo</label>
          <input
            type='text'
            id='title'
            value={this.state.title}
            name='title'
            onChange={this.changeInputHandler}
          />
          <button type='submit'>
            <i className='material-icons red-text'>done</i>
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  createTodo,
};

export default connect(null, mapDispatchToProps)(Modal);

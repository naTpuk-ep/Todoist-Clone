import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoList from '../../components/TodoList';
import { setMonthView } from '../../redux/actions/actions';
import './Month.scss';

function Month( props ) {

	const { todos } = props;
	console.log(props);

	const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

	const [tableDate, setTableDate] = useState({
		year: new Date().getFullYear(),
		month: new Date().getMonth(),
	})

	const todosDates = todos.map(todo => todo.date);
	
	const dispatch = useDispatch();
	const currDate = useSelector(state => state.monthView.date);

	const dayOfFirst = getDay(new Date(tableDate.year, tableDate.month, 1));
	function getDay (day) {
		return day.getDay() === 0 ? 7 : day.getDay();
	}

	const daysInMonth = 32 - 
	new Date(
		tableDate.year,
		tableDate.month,
		32
	).getDate();

	const getMonthsTodos = () => {
		const todos = [];
		for (let i = 0; i < daysInMonth; i++) {
			todos[i] = 0;
			todosDates.forEach(date => {
				if (new Date(date).getFullYear() === tableDate.year 
				&& new Date(date).getMonth() === tableDate.month
				&& new Date(date).getDate() === i + 1) {
					todos[i] += 1;
				}
			})
		}
		return todos;
	}

	const setDatesToTable = () => (
		days.map((day, i) => (
			i === dayOfFirst - 1
				? getMonthsTodos().map((dayTodos, j) => (
					<div key={j + i} className='date'>
						<span className='date__number'>
							{`${j + 1}:`}
						</span>
						<span className='date__todos'>
							{Boolean(dayTodos) ? dayTodos : null}
						</span>
					</div>
				))
				: (
					<div key={i} className='date'>
						{null}
					</div>
				)
		))
	)

	const setDaysToTable = () => (
		days.map((day, i) => (
			<div key={i} className='day'>
				{day}
			</div>
		))
	)

	const clickHandler = (e) => {
		const clickDate = {
			year: tableDate.year,
			month: tableDate.month,
		}
		if (e.target.className === 'date') {
			if (e.target.innerHTML !== '') {
				clickDate.date = parseFloat(e.target.firstChild.textContent);
			}
		} else {
			clickDate.date = parseFloat(e.target.parentElement.firstChild.textContent);
		}
		clickDate.todos = todos.filter((todo) => (
			new Date(todo.date).getFullYear() === clickDate.year 
			&& new Date(todo.date).getMonth() === clickDate.month
			&& new Date(todo.date).getDate() === clickDate.date
		))
		if (e.target.innerHTML !== '') dispatch(setMonthView(clickDate));
	}

	if (currDate) {
		currDate.todos = todos.filter((todo) => (
			new Date(todo.date).getFullYear() === currDate.year 
			&& new Date(todo.date).getMonth() === currDate.month
			&& new Date(todo.date).getDate() === currDate.date
		))
	}

	const backHandler = () => {
		dispatch(setMonthView(null));
	}

	const nextHandler = () => {
		setTableDate((state) => ({
			...state,
			month: (
				tableDate.month === 11 
				? 0 
				: tableDate.month + 1
			)
		}))
	}

	const prevHandler = () => {
		setTableDate((state) => ({
			...state,
			month: (
				tableDate.month === 0 
				? 11
				: tableDate.month - 1
			)
		}))
	}

	return (
		<React.Fragment>
			<h3>{`${currDate 
			? currDate.date 
			: ''} ${new Date(
				tableDate.year, 
				tableDate.month
			).toLocaleString('default', { month: 'long' })} ${tableDate.year}`}</h3>
			{currDate 
			? (
			<React.Fragment>
				<div className='Today'>
					<TodoList todos={currDate.todos} />
				</div>
				<button onClick={backHandler}>Back to month</button>
			</React.Fragment>
			)
			: (
				<div className='month__wrapper'>
					<div className='days'>
						{setDaysToTable()}
					</div>
					<div className='dates' onClick={clickHandler}>
						{setDatesToTable()}
					</div>
					<div className='month__nav'>
						<button onClick={prevHandler}>Prev month</button>
						<button onClick={nextHandler}>Next month</button>
					</div>
				</div>
			)}
		</React.Fragment>
	)
}

export default Month;
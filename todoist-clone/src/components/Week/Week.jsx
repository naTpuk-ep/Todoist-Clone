import React, { useState } from 'react';
import TodoList from '../TodoList';
import { setWeekView } from '../../redux/actions/actions';
import './Week.scss';
import { useDispatch, useSelector } from 'react-redux';


function Week (props) {

	const { todos, getToday, days, getDay } = props;

	const dispatch = useDispatch();
	const currDate = useSelector(state => state.view.weekDate);

	const [tableDate, setTableDate] = useState({
		year: new Date().getFullYear(),
		month: new Date().getMonth(),
	})

	const checkDates = (date1, date2) => (
		date1.getTime() === date2.getTime()
	)

	const getDayTodos = date => (
		todos.filter(todo => (
			checkDates(new Date(todo.date), date)
		))
	)


	
	// const dayOfFirst = getDay(new Date(tableDate.year, tableDate.month, 1));
	// const daysInMonth = 32 - 
	// new Date(
	// 	tableDate.year,
	// 	tableDate.month,
	// 	32
	// ).getDate();

	// function getMonday(d) {
	// 	d = new Date(d);
	// 	var day = d.getDay(),
	// 			diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
	// 	return new Date(d.setDate(diff));
	// }

	function getDaysOfWeek(current) {
		var week = [];
		var first = ((current.getDate() - current.getDay()) + 1);
		for (var i = 0; i < 7; i++) {
			week.push(
				new Date(current.setDate(first++))
			);
		}
		return week;
	}



	// const getWeekDates = () => {
	// 	let thisDay = getDay(new Date(getToday()));
	// 	let monday = getMonday(new Date(getToday()));
	// 	console.log(monday);
	// 	return (
	// 		days.map((day, i) => {
	// 			return (
	// 				monday
	// 			)
	// 		})
	// 	)
	// }

	// console.log(getDayTodos(new Date(getToday())));

	// const [weekView, setWeekView] = useState(true)

	const clickHandler = (e) => {
		const clickDate = {
			month: tableDate.month,
			year: tableDate.year,
			date: e.currentTarget.id,
		};
		clickDate.todos = todos.filter((todo) => (
			checkDates(new Date(clickDate.date), new Date(todo.date))
		));
		dispatch(setWeekView(clickDate));
	}

	const backHandler = () => {
		dispatch(setWeekView(null));
	}
	if (currDate) {
		currDate.todos = todos.filter(todo => checkDates(new Date(todo.date), new Date(currDate.date)))
	}

	
	return (

		<React.Fragment>
		{/* <h3>
			{`${currDate 
			? currDate.date 
			: ''} ${new Date(
				tableDate.year, 
				tableDate.month
			).toLocaleString('default', { month: 'long' })} ${tableDate.year}`}
		</h3> */}
		{currDate 
		? (
		<React.Fragment>
			<div className='Today'>
				<TodoList todos={currDate.todos} />
			</div>
			<button onClick={backHandler}>Back to week</button>
		</React.Fragment>
		)
		: (
			<div className='week'>
			{getDaysOfWeek(new Date(getToday())).map((day, j) => {
				return (
					<div key={day.getTime()} id={day.toISOString()} className='day' onClick={clickHandler} >
						<h3>
							{days[getDay(day) - 1]}
						</h3>
						<div className='TodoList' >
							{getDayTodos(day).map((todo, i) => (
								<div key={i} className='TodoItem'>
								<label>
									<input
										type='checkbox'
										defaultChecked={todo.completed}
										disabled
									/>
									<span className={todo.completed ? 'title completed' : 'title'}>{todo.title}</span>
									<span>{todo.date}</span>
								</label>
							</div>
							))}		
						</div>
				</div>
				)
			})}
		</div>

		)}
	</React.Fragment>
		

	)
}

export default Week;

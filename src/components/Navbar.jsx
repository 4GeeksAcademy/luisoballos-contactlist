import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<>
			<h1>Luis Oballos' contact list</h1>
			<nav className="navbar navbar-light bg-light">
				<div className="container">
					<Link to="/contacts">
						<span className="navbar-brand mb-0 h1">Home</span>
					</Link>
					<Link to="/create-todo-list">
						<span className="navbar-brand mb-0 h1">Create a to-do list</span>
					</Link>
				</div>
			</nav>
		</>
	);
};
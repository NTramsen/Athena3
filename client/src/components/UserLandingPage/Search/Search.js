import React from 'react';

const Search = ()=>{
	return(
		<div className='search-container'>
			<div className='search-header'>
				<p>Search for an item:</p>
			</div>
			<input className = 'search-form'
				placeholder = 'Enter item name'
				type = 'text'></input>
			<button className = 'search-button btn'>Search</button>
		</div>
	);
}

export default Search;
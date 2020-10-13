import React, {useState} from 'react';
import './style.css';

const Checkout = ()=>{

	const [newItemName, setNewItemName] = useState('');
	const [newItemNum, setNewItemNum] = useState('');
	
	const updateItems = ()=>{
		console.log(newItemName, newItemNum);
	};

	const itemObjectValid = ()=>{
		const numValid = newItemNum && Number.parseFloat(newItemNum);
		const nameValid = newItemName && newItemName.split('').find(char=>char !== ' ');
		return numValid && nameValid;
	};

	const clearForm =()=>{
		setNewItemName('');
		setNewItemNum('');
	};


	return(
		<div className='checkout-container'>
			<div className='checkout-header'>
				<p>Checkout a new item:</p>
			</div>
			<input className = 'checkout-form'
				placeholder = 'Enter item name'
				type = 'text'
				value = {newItemName}
				onChange={(e)=>setNewItemName(e.target.value)}></input>
			<input className = 'checkout-form'
				placeholder = 'Enter item number'
				type = 'number'
				value = {newItemNum}
				onChange={(e)=>setNewItemNum(e.target.value)}></input>
			<button className = 'checkout-button btn'
				onClick={()=>{
					if(itemObjectValid()){
						// updateBills
						updateItems();
						clearForm();
					}
				}}>Add item</button>
		</div>
	);
};

export default Checkout;
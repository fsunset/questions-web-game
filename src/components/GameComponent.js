import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';


const GameComponent = () => {
	// For showing text or questions title
	const [messageText, setMessageText] = useState("Para jugar escribe tu nombre y presiona ENTER");

	// For storing user's name
	const [userName, setUserName] = useState("");
	
	// For showing user's info
	const [showUserInfo, setShowUserInfo] = useState(false);

  const handleChange = (e) => {
  	setUserName(e.target.value);
  }

  const handleSubmit = (e) => {
  	e.preventDefault();

  	// Questions Data
		let data = require('../DataJson.json');
		let randomNumber = Math.floor(Math.random() * 3);
		let question = data.data[randomNumber];
		let questionsSelected = [question.id];

		setMessageText(question.question);


		console.log("randomNumber--> " + randomNumber);
		console.table(question);
		console.log(questionsSelected);


  	setShowUserInfo(false);
  	if (userName.length > 0) {
		  setShowUserInfo(true);
  	}
  }

	return (
		<React.Fragment>
			<Collapse in={ showUserInfo }>
				<div className="row">
	        <div className="col-sm-12 alert sub-alert">
	          <h3 className="subtitle">¡Juguemos, { userName }!</h3>
	        </div>
	      </div>
      </Collapse>

      <div className="row">
        <div className="col-sm-12">
          <div className="question-container">
        		<React.Fragment>
          		<p>{ messageText }</p>
          		{ !showUserInfo &&
		            <form onSubmit={ e => handleSubmit(e) }>
					    		<input type="text" className="input-base" value={ userName } onChange={ e => handleChange(e) } />
								</form>
							}
						</React.Fragment>
          </div>
        </div>
      </div>
	  </React.Fragment>
	);
}

export default GameComponent;

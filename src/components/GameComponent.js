import React, { useState } from 'react';
import { Collapse, Modal, Button } from 'react-bootstrap';


const GameComponent = () => {
	// Globals
	let question;
	let questionsSelected = [];
	const lettersArray = ["A", "B", "C", "D"];

	// Show/Hide feedback-modal for each question's option
	const [showModal, setShowModal] = useState(false);

	// Modal Header
	const [modalHeader, setModalHeader] = useState("");

	// Modal info
	const [modalInfo, setModalInfo] = useState("");

	// For showing text or questions title
	const [messageText, setMessageText] = useState("Para jugar escribe tu nombre y presiona ENTER");

	// For showing options for each question
	const [questionOptionsText, setQuestionOptionsText] = useState("");

	// For storing user's name
	const [userName, setUserName] = useState("");
	
	// For showing user's info
	const [showUserInfo, setShowUserInfo] = useState(false);

	// For storing right/wrong answers
	let answersRecords = {
		"right": 0,
		"wrong": 0
	};

  const handleChange = (e) => {
  	setUserName(e.target.value);
  }

  const handleSubmit = (e) => {
  	e.preventDefault();

  	// Questions Data
		let data = require('../DataJson.json');
		let randomNumber = Math.floor(Math.random() * 3);
		question = data.data[randomNumber];
		questionsSelected.push([question.id]);

		// Updating the message within question main box
		setMessageText(question.question);

		// For showing options for each question
		setQuestionOptionsText(questionsBlock(question));

  	setShowUserInfo(false);
  	if (userName.length > 0) {
		  setShowUserInfo(true);
  	}
  }

  // For showing options for each question
	const questionsBlock = (question) => question.options.map((value, index) => {
		return (
			<div key={ index } className="col-sm-6">
		  	<div id={"optionBttn_" + index} className="option-container" onClick={ () => { handleClick(index) } }>
		  		<span>{ lettersArray[index] + " : "}</span>
		  		<span>{ value }</span>
		  	</div>
		  </div>
		)
	});

  const handleClick = (index) => {
		document.getElementById("optionBttn_" + index).classList.add("selected-opt");

  	// Record answer
  	if (index === question.answer) {
  		answersRecords["right"] += 1;
  	} else {
			answersRecords["wrong"] += 1;
  	}

  	setModalHeader("Seleccionaste opción " + lettersArray[index]);
  	setModalInfo(question.feedback[index]);

  	return (
  		setShowModal(true)
  	)
  }

  const handleCloseModal = () => setShowModal(false);

	return (
		<React.Fragment>
			<Modal show={showModal}>
        <Modal.Header>
          <Modal.Title>{ modalHeader }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        	<p>{ modalInfo }</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Siguiente Pregunta
          </Button>
        </Modal.Footer>
      </Modal>

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

      <Collapse in={ true }>
				<div className="row">
					{ questionOptionsText }
	      </div>
      </Collapse>
	  </React.Fragment>
	);
}

export default GameComponent;

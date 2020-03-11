import React, { useState } from 'react';
import { Collapse, Modal, Button } from 'react-bootstrap';

import Firebase from '../firebaseConfig';

const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
let rightAnswersTxt;
let wrongAnswersTxt;

const GameComponent = () => {
	// Globals
	let question;
	const lettersArray = ["A", "B", "C", "D"];
	// Questions Data
	let data = require('../DataJson.json');
	// For saving info Firebase
  const db = Firebase.firestore();

	// Show/Hide feedback-modal for each question's option
	const [showModal, setShowModal] = useState(false);

	// Modal Header
	const [modalHeader, setModalHeader] = useState("");

	// Modal info
	const [modalInfo, setModalInfo] = useState("");

	// For showing text or questions title
	const [messageText, setMessageText] = useState("Para comenzar a jugar presiona ENTER");

	// For showing score at the end of game
	const [scoreTotal, setScoreTotal] = useState("");

	// For showing options for each question
	const [questionOptionsText, setQuestionOptionsText] = useState("");

	// For storing user's name
	const [userName, setUserName] = useState("");
	
	// For showing user's info
	const [showUserInfo, setShowUserInfo] = useState(false);

	// For showing question's option container at the bottom
	const [showOptsInfo, setShowOptsInfo] = useState(false);

	// For storing right/wrong answers
	const [rightAnswers, setRightAnswers] = useState(0);
	const [wrongAnswers, setWrongAnswers] = useState(0);

  const handleChange = (e) => {
  	setUserName(e.target.value);
  }

  const handleSubmit = (e) => {
  	e.preventDefault();

  	// Saving info Firebase
	  const userRef = db.collection("users").add({
	    name: userName.split(",")[0],
	    email: userName.split(",")[1]
	  }); 

		// Show random question
		getQuestion();

  	// Show / hide info on UI
  	setShowUserInfo(false);
  	setShowOptsInfo(false);
  	if (userName.length > 0) {
		  setShowUserInfo(true);
		  setShowOptsInfo(true);
  	}
  }

  // Array for getting random questions
  const getQuestion = (closeModal = false) => {
  	if (userName.length <= 0) {
  		return false;
  	}

  	if (closeModal) {
  		handleCloseModal();

  		document.getElementById("optionBttn_0").classList.remove("selected-opt");
  		document.getElementById("optionBttn_1").classList.remove("selected-opt");
  		document.getElementById("optionBttn_2").classList.remove("selected-opt");
  		document.getElementById("optionBttn_3").classList.remove("selected-opt");
  	}

  	// Set a random num betwen 0 & 11, so we get a question based on it
		const randomNum = nums[Math.floor(Math.random() * nums.length)];
		const elemIndex = nums.indexOf(randomNum);

		nums.splice(elemIndex, 1);
		question = data.data[randomNum];

		// All 6 questions were asked!
		if (question == null) {
			rightAnswersTxt = rightAnswers > 1 ? " respuestas correctas" : " respuesta correcta";
			wrongAnswersTxt = wrongAnswers > 1 ? " respuestas incorrectas" : " respuesta incorrecta";

			// Updating the message within question main box
			setMessageText("¡Felicidades, completaste todas las preguntas!");
			setScoreTotal(rightAnswers + rightAnswersTxt + " & " + wrongAnswers + wrongAnswersTxt);
			setShowOptsInfo(false);
			return false;
		}

		// Updating the message within question main box
		setMessageText(question.question);

		// For showing options for each question
		setQuestionOptionsText(questionOptionsBlock(question));
  }

  // For showing options for each question
	const questionOptionsBlock = (question) => question.options.map((value, index) => {
		return (
			<div key={ index } className="col-lg-6">
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
  		setRightAnswers(parseInt(rightAnswers + 1));
  	} else {
			setWrongAnswers(parseInt(wrongAnswers + 1));
  	}

  	setModalHeader("Seleccionaste la opción " + lettersArray[index]);
  	setModalInfo(question.feedback[index]);

  	return (
  		setShowModal(true)
  	)
  }

  const handleCloseModal = () => setShowModal(false);

	return (
		<React.Fragment>
			<Modal show={ showModal }>
        <Modal.Header>
          <Modal.Title>{ modalHeader }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        	<p>{ modalInfo }</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={ () => { getQuestion(true) } }>
            Siguiente Pregunta
          </Button>
        </Modal.Footer>
      </Modal>

			{/*<Collapse in={ showOptsInfo }>
				<div className="row">
	        <div className="col-sm-12 alert sub-alert">
	          <h3 className="subtitle">¡Juguemos, { userName }!</h3>
	        </div>
	      </div>
      </Collapse>*/}

      <div className="row">
        <div className="col-sm-12">
          <div className="question-container">
        		<React.Fragment>
          		<p>{ messageText }</p>
          		<p>{ scoreTotal }</p>
          		{ !showUserInfo &&
		            <form onSubmit={ e => handleSubmit(e) }>
					    		<input type="text" className="input-base" placeholder='"Nombre,  Email". Separados por coma' value={ userName } onChange={ e => handleChange(e) } />
								</form>
							}
						</React.Fragment>
          </div>
        </div>
      </div>

      <Collapse in={ showOptsInfo }>
				<div className="row">
					{ questionOptionsText }
	      </div>
      </Collapse>
	  </React.Fragment>
	);
}

export default GameComponent;

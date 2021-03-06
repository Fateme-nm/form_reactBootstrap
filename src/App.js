import React, { Component } from 'react';
import FormContact from './components/FormContact/FormContact';
import TableContact from './components/TableContact/TableContact';
import Clock from './components/Clock/Clock';
import {Container, Row, Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component{
  constructor(prop) {
    super(prop)
    this.state = {
      registeredContacts : []
    }
  }

  isValid = (contact, submitContact) => {
    let invalid = (key, msg) => { throw `${key} ${msg}`}
    Object.entries(contact).forEach(([key, value]) => {
      if (value.length == 0) {
        invalid(key, 'is empty!')
      }
      switch(key) {
        case 'First Name': 
        case 'Last Name': {
          if (value.length > 50) {
            invalid(key, 'is more than 50 characters!')
          }
          break;
        }
        case 'Phone': {
          if (value.length != 11) {
            invalid('Phone number', 'must be 11 digits!')
          }
          break;
        }
        case 'Email': {
          if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))) {
            invalid(key, 'is not valid!')
          }
        }
      }
    })
    submitContact()
  }

  handleSubmitContact = contact => {
    let submited = true
    try{
      this.isValid(contact, () => {
        this.setState({registeredContacts: [...this.state.registeredContacts, contact]})
        alert('Successfully registered!')
      })
    }catch(err) {
      alert(err)
      submited = false
    }
    return submited
  }

  handleDeleteContact = contact => {
    this.setState({registeredContacts: this.state.registeredContacts.filter(item => {
      return item !== contact
    })})
  }

  render() {
    return (
      <Container className='mt-4'>
        <Row>
          <Col className='d-flex justify-content-center mb-4'><Clock /></Col>
        </Row>
        <Row>
          <Col><FormContact onSubmitContact = {this.handleSubmitContact}/></Col>
        </Row>
        <Row>
          <Col><TableContact contacts = {this.state.registeredContacts} 
                  onDeleteContact = {this.handleDeleteContact}/></Col>
        </Row>
      </Container>
    );
  }
}

export default App;

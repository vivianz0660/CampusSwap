import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login } from '../actions/userActions'
import FormContainer from '../components/FormContainer'

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin
  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])
  //表单提交函数
  const submitHandler = (e) => {
    e.preventDefault()
    //dispatch login函数
    dispatch(login(email, password))
  }
  return (
    <FormContainer>
      <h1>Login</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email：</Form.Label>
          <Form.Control
            type='email'
            placeholder='Please enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password：</Form.Label>
          <Form.Control
            type='password'
            placeholder='Please enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Login
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          New user？
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Sign up
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
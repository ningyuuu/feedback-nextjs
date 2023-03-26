import { getSession, storeSession } from '@/lib/auth';
import { fetchGet, fetchPost, getAuthorization } from '@/lib/fetch';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEventHandler, useEffect, useState } from 'react';
import { Container, Form } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'

const LoginPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  useEffect(() => {
    const redirectIfLoggedIn = async () => {
      try {
        const res = await fetchGet('/api/users/test')
        if (res) {
          router.push('/')
        }
      } catch (err: any) {
      }
    }

    redirectIfLoggedIn();
  }, [router])

  const loginCall = async () => {
    if (!login) {
      return
    }

    if (!password) {
      return
    }

    let response;
    try {
      response = await fetchPost('/api/auth/login', { login, password })
    } catch (err: any) {
      console.log(err)
    }

    if (response) {
      console.log({ response })
      storeSession(response.access_token)
      location.reload()
    }
  }

  const updateLogin = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target
    setLogin(target.value)
  }

  const updatePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target
    setPassword(target.value)
  }

  return (
    <Container>
      <h1>Login</h1>
      <Form className="mt-6">
        <Form.Group className='mb-3'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={updateLogin}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={updatePassword} />
        </Form.Group>

        <Button variant="primary" onClick={loginCall}>
          Submit
        </Button>
      </Form>
    </Container>
  )
}

export default LoginPage

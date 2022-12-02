import {render, screen, cleanup} from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../Login';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

//testing login button
test('should render login component', () =>{
    render(
        <BrowserRouter>
        <Routes>
        <Route exact path = "/" element = {<Login />}></Route>
        </Routes>
        </BrowserRouter>
    );
    const loginElement = screen.getByTestId('login-1');
    expect(loginElement).toBeInTheDocument();
    expect(loginElement).toHaveTextContent('Login');
})

test('test',() =>{
    expect(true).toBe(true);
})

test('navigate to signup page',() =>{
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
})

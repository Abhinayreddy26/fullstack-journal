import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../components/Navbar';
import * as authUtils from '../utils/auth';

jest.mock('../utils/auth'); // mock the auth utils

describe('Navbar component', () => {
  it('renders public links when not authenticated', () => {
    authUtils.isAuthenticated.mockReturnValue(false);

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText(/Register/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  it('renders dashboard links when authenticated', () => {
    authUtils.isAuthenticated.mockReturnValue(true);
    window.localStorage.setItem('user', JSON.stringify({ username: 'josphat' }));

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText(/All Journals/i)).toBeInTheDocument();
    expect(screen.getByText(/Hi, josphat/i)).toBeInTheDocument();
  });

  it('calls logout function when logout is clicked', () => {
    authUtils.isAuthenticated.mockReturnValue(true);
    const mockLogout = jest.fn();
    authUtils.logout = mockLogout;
    window.localStorage.setItem('user', JSON.stringify({ username: 'josphat' }));

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Logout/i));
    expect(mockLogout).toHaveBeenCalled();
  });
});

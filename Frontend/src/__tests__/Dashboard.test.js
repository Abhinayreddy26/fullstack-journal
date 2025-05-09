import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Dashboard from '../pages/Dashboard';
import api from '../api/api';

jest.mock('../api/api');

describe('Dashboard', () => {
  it('renders journal titles from API', async () => {
    api.get.mockResolvedValue({
      data: [
        { id: 1, title: 'First Journal', content: 'Test content', created_at: '2024-06-01', user: { username: 'Muinde' } },
      ],
    });

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText(/First Journal/i)).toBeInTheDocument();
    });
  });

  it('shows error message on fetch failure', async () => {
    api.get.mockRejectedValue(new Error('Network Error'));

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText(/Failed to load posts/i)).toBeInTheDocument();
    });
  });
});

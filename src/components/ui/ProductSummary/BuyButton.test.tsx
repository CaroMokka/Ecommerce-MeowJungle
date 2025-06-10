import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BuyButton from './BuyButton';

const mockDispatch = jest.fn();

jest.mock('../../../api/cart/useCart', () => ({
    __esModule: true,
    default: () => ({
      dispatch: mockDispatch,
    }),
  }));

  test('BuyButton se renderiza correctamente', () => {
    render(<BuyButton product={{ id: 1, name: 'Producto 1' }} />);
    
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
  });

  test('Llama a dispatch al hacer clic en el botón', async () => {
    render(<BuyButton product={{ id: 1, name: 'Producto 1' }} />);
    const button = screen.getByRole('button', { name: /add to cart/i });
  
    await userEvent.click(button);
  
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'ADD_TO_CART', payload: { id: 1, name: 'Producto 1' } });
  });


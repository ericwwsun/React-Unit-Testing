import App from './App';

describe('App', () => {
  test('to match snapshot', () => {
    const { asFragment } = renderWrapper(<App />);
    expect(asFragment()).toMatchSnapshot();
  });
});

import ReactDOM from 'react-dom';
import App from './components/App';
import GlobalCSS from './globalStyles';

ReactDOM.render(
  <>
    <GlobalCSS />
    <App />
  </>,
  document.querySelector('.root')
);

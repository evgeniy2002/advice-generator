import React from 'react';
import './scss/App.scss';

import dice from './images/icon-dice.svg';
import spinner from './images/spinner.svg';

interface IAdvice {
  id: number;
  advice: string;
}

function App() {
  const [advice, setAdvice] = React.useState<IAdvice>({
    id: 1,
    advice: 'Remember that spiders are more afraid of you, than you are of them.',
  });
  const [generateAdvice, setGenerate] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const [randomColor, setRandomColor] = React.useState<string>('');

  React.useEffect(() => {
    async function fetchAdvice() {
      try {
        setIsLoading(true);

        const res = await fetch('https://api.adviceslip.com/advice');
        const data = await res.json();

        return data;
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
        setGenerate(false);
      }
    }
    if (generateAdvice === true) {
      fetchAdvice().then((data: IAdvice) => setAdvice(Object.values(data)[0]));

      setRandomColor('#' + (Math.random().toString(16) + '000000').substring(2, 8).toUpperCase());
    }
  }, [generateAdvice]);
  return (
    <div className="wrapper">
      <div className="content">
        {isLoading ? (
          <div className="content-spinner">
            <img src={spinner} alt="" />
          </div>
        ) : (
          <>
            <h5 className="content-title" style={{ color: randomColor }}>
              ADVICE #{advice.id}
            </h5>
            <div className="content-body">
              <q>{advice.advice}</q>
            </div>
            <div className="content-end">
              <div className="content-end__each"></div>
              <div className="content-end__each"></div>
            </div>
            <div
              className="content-dice"
              onClick={() => setGenerate(true)}
              style={{ background: randomColor }}>
              <img src={dice} alt="dice" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;

import React from 'react';
import { CardT } from '../logic/logic';

type additionalCardProps = {
  handleCardClick: (key: number, flipCount: number, progress: number) => void;
  flipCount: number;
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
};
export type CardProps = CardT & additionalCardProps;

function Card(props: CardProps) {
  const {
    url,
    isFlipped,
    isVisible,
    key,
    handleCardClick,
    flipCount,
    progress,
    setProgress,
  } = props;
  return (
    <div
      className="scene"
      key={key}
      onClick={() => handleCardClick(key, flipCount, progress)}
    >
      <div
        className="card"
        style={{
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          opacity: isVisible ? 100 : 0,
          cursor: progress === 24 ? 'pointer' : 'default',
        }}
      >
        <div className="card__face card__face--front">
          <img
            className="card__image"
            src="backside.gif"
            alt="backside"
            style={{
              width: '100px',
              height: '100px',
              filter: `${progress === 24 ? 'none' : 'grayscale(90%)'}`,
            }}
          />
        </div>
        <div className="card__face card__face--back">
          <img
            className="card__image"
            data-name="card-image"
            src={url}
            alt="frontside"
            onLoad={() => {
              setProgress(progress + 1);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Card;

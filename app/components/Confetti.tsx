import React from 'react';
import ReactConfetti from 'react-confetti';

type ConfettiProps = {
  shouldRecycle: boolean;
};
export default function Confetti({ shouldRecycle }: ConfettiProps) {
  return <ReactConfetti recycle={shouldRecycle} />;
}

import { useState } from 'react';
import ClickBox from './ClickBox';

function ReactionTime() {
  return (
    <>
      <ClickBox />
      <div className="justify-center flex mt-4">
        <p>
          <b>NOTE:</b> Result will depend on your equipment, such as the refresh rate of your
          monitor.
        </p>
      </div>
    </>
  );
}

export default ReactionTime;

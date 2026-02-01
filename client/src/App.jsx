import { BsLightningChargeFill } from 'react-icons/bs';
import { TbSquareNumber1Filled } from 'react-icons/tb';
import { FaMouse } from 'react-icons/fa';
import { HiHashtag } from 'react-icons/hi';
import { AiOutlineFileText } from 'react-icons/ai';
import { BsKeyboard } from 'react-icons/bs';
import LandingPageLink from './components/LandingPageLink';

function App() {
  return (
    <div className="grid grid-cols-2 gap-8 p-6 max-w-6xl m-auto">
      <LandingPageLink to={'/reactiontime'} text={'Reaction Time'} Icon={BsLightningChargeFill} />

      <LandingPageLink to={'/chimptest'} text={'Chimp Test'} Icon={TbSquareNumber1Filled} />

      <LandingPageLink to={'/mouseaim'} text={'Mouse Aim'} Icon={FaMouse} />

      <LandingPageLink to={'/numbermemory'} text={'Number Memory'} Icon={HiHashtag} />

      <LandingPageLink to={'/verbalmemory'} text={'Verbal Memory'} Icon={AiOutlineFileText} />

      <LandingPageLink to={'/typingspeed'} text={'Typing Speed'} Icon={BsKeyboard} />
    </div>
  );
}

export default App;

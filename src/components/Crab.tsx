import crabMain from "../assets/crabMain.png";
import crabLeft from "../assets/crabLeft.png";
import crabRight from "../assets/crabRight.png";
import sampleIcon from '../assets/sample.png';

interface CrabProps {
    isClosed: boolean;
    hasSample: boolean;
  }
  
  export default function Crab({ isClosed, hasSample }: CrabProps) {
    return (
      <div 
        className="relative w-full h-full"
        style={{
          transform: 'translateY(-75%) translateX(30%)',
          filter: 'drop-shadow(0 10px 8px rgba(0,0,0,0.2))'
        }}
      >
        <img 
          src={crabMain} 
          alt="Основание манипулятора" 
          className="absolute top-0 left-0 w-[35px] h-[80px] z-10" 
        />

        <img 
          src={crabLeft} 
          alt="Левая клешня" 
          className={`
            absolute top-16 right-[77px] w-[30px] h-[60px] 
            origin-[84%_7%] 
            transition-transform duration-300 ease-in-out
            ${isClosed ? 'rotate-[-13deg]' : 'rotate-0'}
          `}
        />
        <img 
          src={crabRight} 
          alt="Правая клешня" 
          className={`
            absolute top-16 left-[22px] w-[30px] h-[60px] 
            origin-[15%_7%] 
            transition-transform duration-300 ease-in-out
            ${isClosed ? 'rotate-[13deg]' : 'rotate-0'}
          `}
        />
  
        {hasSample && (
          <img 
            src={sampleIcon}
            alt="Образец"
            className="absolute size-16 right-10 top-25 transition-opacity duration-200 z-20"
          />
        )}
      </div>
    );
  }
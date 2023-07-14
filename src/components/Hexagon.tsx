import React from "react";

const Hexagon = () => {
  return (
    <div>
      <div className="hexagon"></div>
      <style jsx>{`
        .hexagon {
          width: 500px;
          height: 500px;
          background-color: #FF6B81; /* Pink */
          position: relative;
          transform: rotate(0deg);
          animation: blink 7s linear infinite, spin 25s linear infinite;
          filter: blur(0px);
        }

        .hexagon:before,
        .hexagon:after {
          content: "";
          width: 100%;
          height: 100%;
          background-color: inherit;
          position: absolute;
          top: 0;
          left: 0;
          transform-origin: center;
        }

        .hexagon:before {
          transform: rotate(-60deg);
          filter: drop-shadow(0 0 10px #FF0000); /* Blauer Strahleneffekt */
        }


        .hexagon:after {
          transform: rotate(60deg);
          filter: drop-shadow(0 0 10px #FF0000); /* Blauer Strahleneffekt */
        }

        @keyframes blink {
          0% {
            background-color: #9E5CEA; 
          }
          33% {
            background-color: #9E5CEA; 
          }
          66% {
            background-color: #B026E2; 
          }
          100% {
            background-color: #9E5CEA; 
          }
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(1turn);
          }
        }
      `}</style>
    </div>
  );
};

export default Hexagon;

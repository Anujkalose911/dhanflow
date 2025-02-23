// import React from "react";
// import "../../Assests/CSS/Loader.css";

// const Loader = () => {
//   return (
//     <div className="loader">
//       <h2>Loading...</h2>
//     </div>
//   );
// };

// export default Loader;

import React from "react";
import styled from "styled-components";

// Define the styled wrapper
const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; // Full height of the viewport
`;

const Spinner = styled.div`
  border: 8px solid lightgray;
  border-top: 8px solid blue;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loader = () => {
  return (
    <StyledWrapper>
      <Spinner />
    </StyledWrapper>
  );
};

export default Loader;

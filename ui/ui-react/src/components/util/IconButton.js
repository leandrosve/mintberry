import { Button } from "bloomer/lib/elements/Button";
import React, { useEffect } from "react";
import ReactTooltip from "react-tooltip";
import styled from "styled-components";
const StyledButton = styled(Button)`
  border-radius: 50%;
`;

const IconButton = ({ onClick, ...props}) =>{
  const handleClick = (e)=>{
    e.stopPropagation();
    if(onClick) onClick();
  }
  useEffect(()=>{return ()=>ReactTooltip.hide()})
  return(
    <StyledButton onClick={handleClick} {...props}/>
  )
}
export default IconButton;

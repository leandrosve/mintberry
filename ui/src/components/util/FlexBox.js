import React from 'react';
import PropTypes from 'prop-types';
 
const FlexBox = ({isColumn, isReverse, children}) => {
    
    const flexDirection= (isColumn ? "column" : "row")+(isReverse? "-reverse":"");
    const alignItems= !isColumn ? "center" : null;
    const justifyContent= isColumn ? "center" : null;
    return (
        <div style={{display:"flex", flexDirection:flexDirection, alignItems, justifyContent}}>
            {children}
        </div>
    );
}
 
FlexBox.propTypes = {
    isColumn:PropTypes.bool,
    isReverse:PropTypes.bool,
};
 
export default FlexBox;
import React from "react";

const Reftest = React.forwardRef((_, ref) => {
  return (
    <div ref={ref} className="jumbotron">
      <h5 style={{textAlign:"center"}}> Head News || All rights reserved @Ayub|| React LifeCycle</h5>
    </div>
  );
});

export default Reftest;

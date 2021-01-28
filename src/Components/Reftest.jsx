import React from "react";

const Reftest = React.forwardRef((_, ref) => {
  return (
    <div ref={ref} className="jumbotron">
      <h5>All Reserved @Ayub</h5>
    </div>
  );
});

export default Reftest;

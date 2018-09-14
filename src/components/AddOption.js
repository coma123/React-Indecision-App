import React from "react";

const AddOption = (props) => (
  <div>
    {props.error && <p className="add-option-error">{props.error}</p>}
    <form onSubmit={props.handleAddOption} className="add-option">
      <input type="text" name="option" className="add-option__input" placeholder="Add Your Option Here"/>
      <button className="button">Add Option</button>
    </form>
  </div>
);

export default AddOption;
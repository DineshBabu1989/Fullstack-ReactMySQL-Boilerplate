import React from "react";
/**
 * Edit entry form for editing data in details array in details component
 * @prop {oldEntrydata,@function(getFormdata,submitForm,cancelForm)} props "from the details component"
 * @returns "A form with old entry values in its input field"
 */
const EditFormDetail = props => {
  const { name, age, job } = props.oldEntrydata;
  return (
    <div>
      <form onSubmit={props.submitForm}>
        <input
          type="text"
          placeholder="name"
          name="name"
          onChange={props.getFormdata}
          value={name}
        />
        <br />
        <input
          type="number"
          placeholder="age"
          name="age"
          onChange={props.getFormdata}
          value={age}
        />
        <br />
        <input
          type="text"
          placeholder="job"
          name="job"
          onChange={props.getFormdata}
          value={job}
        />
        <br />
        <input type="submit" value="Submit" />
        <button onClick={props.cancelForm}>Cancel</button>
      </form>
    </div>
  );
};
export default EditFormDetail;

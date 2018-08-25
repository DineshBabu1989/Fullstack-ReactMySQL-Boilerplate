import React from "react";
/**
 * New details entry form component
 * @prop @function{getFormdata,submitForm} props "from the details components to handle data change and form submission"
 * @returns "A form component"
 */
const FormDetail = props => {
  return (
    <form onSubmit={props.submitForm}>
      <input
        type="text"
        placeholder="name"
        name="name"
        onChange={props.getFormdata}
      />
      <br />
      <input
        type="text"
        placeholder="age"
        name="age"
        onChange={props.getFormdata}
      />
      <br />
      <input
        type="text"
        placeholder="job"
        name="job"
        onChange={props.getFormdata}
      />
      <br />
      <input type="submit" value="Submit" />
    </form>
  );
};
export default FormDetail;

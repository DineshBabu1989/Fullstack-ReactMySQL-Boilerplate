import React, { Component } from "react";
import { connect } from "react-redux";
import { postData, getUsers, deleteUser, updateData } from "../actions/actions";
import PropTypes from "prop-types";
import Table from "../components/table";
import FormDetail from "../components/form";
import EditFormDetail from "../components/editForm";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      showTable: false,
      showEditForm: false,
      id: "",
      name: "",
      age: "",
      job: "",
      details: "",
      isLoaded: false
    };
    this.showTable = this.showTable.bind(this);
    this.showForm = this.showForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
    this.handleCancelSubmit = this.handleCancelSubmit.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.editDetails = this.editDetails.bind(this);
  }
  /**
   * Handling form input changes
   * @param {name,age,job} e "events and their corresponding values are updated to component state"
   */
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  /**
   * Handling data submission to remote API
   * @param {name,age,job} e "The values of name,age and job are used to create an object which is passed to the actions and to the remote server"
   */
  handleSubmit(e) {
    e.preventDefault();
    let registerData = {
      name: this.state.name,
      age: this.state.age,
      job: this.state.job
    };
    this.setState({
      name: "",
      age: "",
      job: "",
      showForm: false,
      showEditForm: false,
      showTable: true
    });
    this.props.postData(registerData);
  }
  /**
   * Get user data by using getUsers actions as soon as the component mounts
   */
  componentDidMount() {
    this.props.getUsers();
  }
  /**
   * Receive props and update the local state after the first render
   * @param {nextprops} nextProps "receive state updates after the component's first render"
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.details) {
      this.setState({
        details: nextProps.details,
        isLoaded: true
      });
    }
  }
  /**
   * Controls the visiblity of table on button click
   */
  showTable() {
    this.setState({
      showTable: !this.state.showTable,
      showForm: false,
      showEditForm: false
    });
  }
  /**
   * Controls the visibility of new entry form on click
   */
  showForm() {
    this.setState({
      showForm: !this.state.showForm,
      showEditForm: false,
      showTable: false
    });
  }
  /**
   * Deletes an entry from state "details"
   * @param {i} i is the id of the object to be removed from the details array
   */
  deleteRow(i) {
    this.props.deleteUser(i);
  }
  /**
   * Render table when get request is complete and details prop is received from the reducer
   */
  renderTable() {
    if (!this.state.isLoaded && this.state.showTable) {
      return <div>Loading...</div>;
    } else if (this.state.isLoaded && this.state.showTable) {
      return (
        <Table
          passClick={this.deleteRow}
          detailProp={this.state.details}
          editClick={this.editDetails}
        />
      );
    }
  }
  /**
   * Conditionally render the child form component and pass in function calls as props
   */
  renderForm() {
    if (this.state.showForm) {
      return (
        <div>
          <FormDetail
            getFormdata={this.handleChange}
            submitForm={this.handleSubmit}
          />
        </div>
      );
    }
  }
  /**
   * Edits the selected rows from "details" state
   * Brings the editForm component to visiblity
   * @param {i} i "The unique id of the row entry to be edited"
   * Updates the current "name","age","job" states with object to edit
   */
  editDetails(i) {
    let editEntry = this.state.details;
    editEntry = editEntry.filter(function(obj) {
      return obj.id === i;
    });
    this.setState({
      id: editEntry[0].id,
      name: editEntry[0].name,
      age: editEntry[0].age,
      job: editEntry[0].job,
      showEditForm: !this.state.showEditForm,
      showForm: false
    });
  }
  /**
   *Conditionally render editForm component based on showEditForm state
   *@prop "Current state, @function{handleChange,handleEditSubmit,handleCancelSubmit}"
   */
  showEditForm() {
    if (this.state.showEditForm) {
      return (
        <div>
          <EditFormDetail
            oldEntrydata={this.state}
            getFormdata={this.handleChange}
            submitForm={this.handleEditSubmit}
            cancelForm={this.handleCancelSubmit}
          />
        </div>
      );
    }
  }
  /**
   * Replace an object in the "details" state with new edited object
   * @param {e} e "The submit event from editForm component is received"
   */
  handleEditSubmit(e) {
    e.preventDefault();

    let data = {
      id: this.state.id,
      name: this.state.name,
      age: this.state.age,
      job: this.state.job
    };
    this.props.updateData(data);
    this.setState({
      showEditForm: !this.state.showEditForm,
      showForm: false
    });
  }
  /**
   * Cancel the form submission in case the edit is be aborted
   * @param {e} e "onClick event from editForm cancel button"
   */
  handleCancelSubmit(e) {
    e.preventDefault();
    this.setState({
      showEditForm: false
    });
  }
  /**
   * Render an messsages `Success` or `error` based on the network response and it corresponding error reducer
   */
  handleServerResponse() {
    return <div>{this.props.errors.message}</div>;
  }

  render() {
    return (
      <div>
        <h2>Show all details</h2>
        {this.handleServerResponse()}
        <button onClick={this.showTable}>Show Details</button>
        <button onClick={this.showForm}>New Entry</button>
        {this.renderTable()}
        {this.renderForm()}
        {this.showEditForm()}
      </div>
    );
  }
}
Register.protoTypes = {
  details: PropTypes.array.isRequired,
  postData: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  details: state.details,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { postData, getUsers, deleteUser, updateData }
)(Register);

import React, { Component } from "react";
import { uploadCSV } from "../../actions/adminActions";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import toastr from "toastr";

class ProductUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors && nextProps.errors.erroruploading) {
      toastr.error(
        "Error uploading the file. It may contain data already in the database"
      );
    }
  }

  onSubmit(event) {
    event.preventDefault();
    toastr.info("Started Uploading the data...");
    this.props.uploadCSV(this.state.file);
  }

  onChange(event) {
    this.setState({ file: event.target.files[0] });
  }

  render() {
    return (
      <div className="upload-csv">
        <div className="contaier">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">
                Upload Your Product List
              </h1>
              <p className="lead text-center">
                Let's get some products in our store
              </p>
              <br />
              <br />
              <div className="border border-rounded p-4">
                <form onSubmit={this.onSubmit} encType="multipart/form-data">
                  <p className="lead">Upload your CSV File</p>
                  <small>Only CSV files can be uploaded</small>
                  <br />
                  <br />
                  <input
                    type="file"
                    name="file"
                    className="form-control form-control-lg"
                    onChange={this.onChange}
                    accept="*.csv"
                  />
                  <br />
                  <br />
                  <input
                    type="submit"
                    className="btn btn-info btn-lg"
                    value="Upload Data"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProductUpload.propTypes = {
  uploadCSV: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { uploadCSV }
)(ProductUpload);

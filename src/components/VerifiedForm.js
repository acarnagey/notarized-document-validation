import React, { Component, Fragment } from "react";
import Dropzone from "react-dropzone";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { ReactComponent as UploadSvg } from "../img/upload-drop.svg";
import PdfPreview from "./PdfPreview";
import * as PropTypes from 'prop-types';

class VerifiedForm extends Component {
  state = {
    did: "did:ethr:0x27dFC5414aa6Ca1515411392581e71af2Ef0B921",
    pdfLink: undefined
  }

  handleDidChange = (e) => {
    this.setState({ did: e.target.value });
  };

  handleOnDrop = async (files) => {
    const {handleOnDrop} = {...this.props};
    files = files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    );
    handleOnDrop(files[0]);
    this.setState({ pdfLink: files[0].preview });
  };

  renderFileUploadContainer() {
    const { pdfLink } = { ...this.state };
    return (
      <Dropzone onDrop={this.handleOnDrop}>
        {({ getRootProps, getInputProps }) => (
          <section className="dropzone-container">
            {!pdfLink && this.renderFileUpload(getRootProps, getInputProps)}
            {pdfLink && <PdfPreview fileURL={pdfLink} />}
          </section>
        )}
      </Dropzone>
    );
  }

  renderFileUpload(getRootProps, getInputProps) {
    return (
      <div {...getRootProps()} className="dropzone-form">
        <input {...getInputProps()} />
        <div className="upload">
          <div className="caption">Upload your file by dropping it here...</div>
          <UploadSvg />
        </div>
      </div>
    );
  }

  render() {
    const {did, pdfLink} = {...this.state};
    const {handleFileSubmit} = {...this.props};
    return (
      <div id="top" className="row top-section">
        <div className="col"></div>
        <div className="col-9 text-center">
          <h1>Texas Digital Notary Verification</h1>
          <FormGroup>
            <Label htmlFor="documentTypeSelected" className="prompt">
              What is the DID for this document?
            </Label>
            <Input
              type="text"
              name="didInput"
              id="didInput"
              value={did}
              onChange={this.handleDidChange}
              placeholder="did:ethr:..."
            />
          </FormGroup>
          {this.renderFileUploadContainer()}
          <div style={{ paddingTop: "50px" }}>
            <Button
              className="margin-wide"
              color="primary"
              disabled={!pdfLink}
              onClick={() => handleFileSubmit(did)}
            >
              Submit
            </Button>
          </div>
          <hr />
        </div>
        <div className="col"></div>
      </div>
    );
  }
}

VerifiedForm.propTypes = {
  handleOnDrop: PropTypes.func,
  handleFileSubmit: PropTypes.func
}

export default VerifiedForm;

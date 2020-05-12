import { Document, Page, pdfjs } from "react-pdf";
import React, { Component } from "react";
import * as PropTypes from 'prop-types';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class PdfPreview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 1,
      numPages: undefined
    }
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  render() {
    const {fileURL} = {...this.props};
    const {pageNumber} = {...this.state};
    return (
      <div>
          <Document
            file={fileURL}
            onLoadSuccess={this.onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>
          <p>
            <span
              onClick={() => {
                if (pageNumber - 1 >= 1) {
                  this.setState({ pageNumber: pageNumber - 1 });
                }
              }}
            >
              {" "}
              prev{" "}
            </span>
            Page {pageNumber} of {this.state.numPages}
            <span
              onClick={() => {
                if (this.state.pageNumber + 1 <= this.state.numPages) {
                  this.setState({ pageNumber: this.state.pageNumber + 1 });
                }
              }}
            >
              {" "}
              next{" "}
            </span>
          </p>
        </div>
    )
  }
}

PdfPreview.propTypes = {
  fileURL: PropTypes.string.isRequired,
};

export default PdfPreview;

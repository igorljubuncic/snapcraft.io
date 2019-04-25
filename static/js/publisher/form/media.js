import React, { Fragment } from "react";

import { PropTypes } from "prop-types";

import SortableMediaList from "./mediaList";

class Media extends React.Component {
  constructor(props) {
    super(props);

    this.markForDeletion = this.markForDeletion.bind(this);
    this.mediaChanged = this.mediaChanged.bind(this);

    this.toggleRestrictions = this.toggleRestrictions.bind(this);

    this.state = {
      mediaData: props.mediaData,
      restrictionsVisible: false,
      errors: {}
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { mediaData } = this.state;
    const { mediaLimit } = this.props;

    if (prevState.mediaData !== mediaData && mediaData.length <= mediaLimit) {
      this.props.updateState(mediaData);
    }
  }

  markForDeletion(key) {
    this.setState({
      mediaData: this.state.mediaData.filter(item => item.url !== key)
    });
  }

  mediaChanged(files) {
    const newMediaData = [...this.state.mediaData];
    const errors = {};
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.errors) {
        errors[file.name] = file.errors;
      } else {
        newMediaData.push({
          file,
          url: URL.createObjectURL(file),
          name: file.name,
          type: "screenshot",
          status: "new"
        });
      }
    }

    this.setState({
      mediaData: newMediaData,
      errors: errors
    });
  }

  renderOverLimit() {
    if (this.state.mediaData.length > this.props.mediaLimit) {
      return (
        <div className="p-notification--caution">
          <p className="p-notification__response">
            You have over 5 images uploaded. Not all image will be visible to
            users.
          </p>
        </div>
      );
    }
    return false;
  }

  renderErrors() {
    const { errors } = this.state;
    if (Object.keys(errors).length > 0) {
      return (
        <div className="p-notification--negative">
          <p className="p-notification__response">
            {Object.keys(errors).map(fileName => (
              <Fragment key={`errors-${fileName}`}>
                {fileName}
                &nbsp;
                {errors[fileName].map((error, index) => (
                  <Fragment key={`errors-${fileName}-${index}`}>
                    {error}
                    <br />
                  </Fragment>
                ))}
              </Fragment>
            ))}
          </p>
        </div>
      );
    }
    return false;
  }

  toggleRestrictions() {
    this.setState({
      restrictionsVisible: !this.state.restrictionsVisible
    });
  }

  renderRescrictions() {
    const overlayClasses = ["row"];
    let verb = "Hide";
    if (!this.state.restrictionsVisible) {
      overlayClasses.push("u-hide");
      verb = "Show";
    }
    return (
      <Fragment>
        <p className="p-form-help-text">
          <a role="button" onClick={this.toggleRestrictions}>
            {verb} image restrictions
          </a>
        </p>
        <div className={overlayClasses.join(" ")}>
          <div className="col-8">
            <p>
              <small>
                Accepted image formats include: <b>GIF, JPEG & PNG files.</b>
                <br />
                Min resolution: <b>480 x 480 pixels</b>
                <br />
                Max resolution: <b>3840 x 2160 pixels</b>
                <br />
                Aspect ratio: <b>Between 1:2 and 2:1</b>
                <br />
                File size limit: <b>2MB</b>
                <br />
                Animation min fps: <b>1</b>
                <br />
                Animation max fps: <b>30</b>
                <br />
                Animation max length: <b>40 seconds</b>
              </small>
            </p>
          </div>
        </div>
      </Fragment>
    );
  }

  onSortEnd(params) {
    const { oldIndex, newIndex } = params;
    const newMediaData = [...this.state.mediaData];
    const moved = newMediaData.splice(oldIndex, 1);
    newMediaData.splice(newIndex, 0, moved[0]);

    this.setState({
      mediaData: newMediaData
    });
  }

  render() {
    const mediaList = this.state.mediaData;

    return (
      <Fragment>
        {this.renderOverLimit()}
        {this.renderErrors()}
        <SortableMediaList
          distance={10}
          onSortEnd={this.onSortEnd.bind(this)}
          axis="xy"
          mediaData={mediaList}
          mediaLimit={this.props.mediaLimit}
          restrictions={this.props.restrictions}
          markForDeletion={this.markForDeletion}
          mediaChanged={this.mediaChanged}
        />
        {this.renderRescrictions()}
      </Fragment>
    );
  }
}

Media.defaultProps = {
  mediaLimit: 5,
  mediaData: [],
  updateState: () => {},
  restrictions: {}
};

Media.propTypes = {
  mediaLimit: PropTypes.number,
  mediaData: PropTypes.array,
  updateState: PropTypes.func,
  restrictions: PropTypes.object
};

export { Media as default };

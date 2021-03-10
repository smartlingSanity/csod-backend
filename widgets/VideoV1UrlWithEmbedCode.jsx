import React from "react";
import TextInput from "part:@sanity/components/textinputs/default";
import FormField from "part:@sanity/components/formfields/default";
import PatchEvent, {
  set,
  setIfMissing,
  unset
} from "part:@sanity/form-builder/patch-event";
import {getEmbedCodeForUrl} from "../schemas/data/utils/video"

export default class VideoV1UrlWithEmbedCode extends React.PureComponent {
  state = {
    fetchingEmbedCode: false,
    error: null
  };

  /**
   * Get validation errors for element
   * @return {*}
   */
  getErrors = () => {
    return this.props.markers.filter(
      marker => marker.type === "validation" && marker.level === "error"
    );
  };

  /**
   * onBlur event, trigger fetching of embed code.
   */
  handleBlur = () => {
    const { type, onChange, value } = this.props;

    // Get validation errors that do not apply to the object field, but rather to its children
    const urlErrors = this.getErrors().filter(marker => marker.path.length > 0);

    // Reset embed code since we've either cleared it or we are refetching
    onChange(
      PatchEvent.from(setIfMissing({ _type: type.name }), unset(["embedCode"]))
    );

    // Don't fetch embed code if we have no value (or it does not appear to be a valid URL)
    if (!value || !value.url || urlErrors.length > 0) {
      return;
    }

    // Set the UI into read-only mode while fetching
    this.setState({ fetchingEmbedCode: true, error: null }, () => {
      this.handleReceiveEmbedCode(getEmbedCodeForUrl(value.url));
    });
  };

  /**
   * onChange event for url input
   * @param event
   */
  handleChange = event => {
    const { type, onChange } = this.props;
    const nextValue = event.currentTarget.value;

    // Reset whole field if no value is given
    if (!nextValue) {
      onChange(PatchEvent.from(unset()));
      return;
    }

    // Make sure to persist changes to the URL field while editing it
    // Always guard to make sure the _type property is set.
    onChange(
      PatchEvent.from(
        setIfMissing({ _type: type.name }),
        set(nextValue, ["url"])
      )
    );
  };

  /**
   * update the embedCode field with the value retrieved from the provider.
   * @param code
   */
  handleReceiveEmbedCode = code => {
    const { type, onChange } = this.props;

    // Success, update the "embedCode" field with the received code.
    // Always guard to make sure the _type property is set.
    onChange(
      PatchEvent.from(
        setIfMissing({ _type: type.name }),
        set(code, ["embedCode"])
      )
    );
    this.setState({ fetchingEmbedCode: false, error: null });
  };

  /**
   * We were unable to fetch the embed code.
   * @param error
   */
  handleEmbedCodeError = error => {
    console.error("Failed to retrieve embed code: ", error);
    this.setState({ fetchingEmbedCode: false, error });
  };

  /**
   * Required focus method for the url input.
   */
  focus() {
    if (this._input) {
      this._input.focus();
    }
  }

  /**
   * Set the reference to the input.
   *
   * @param input
   */
  setInput = input => {
    this._input = input;
  };

  /**
   * Render the component.
   * @return {*}
   */
  render() {
    const { level, type, markers, value, readOnly } = this.props;
    const { fetchingEmbedCode, error } = this.state;
    const errors = this.getErrors();
    const fieldError =
      errors && errors.length > 0
        ? errors[0].item.message
        : error && error.message;

    return (
      <FormField
        markers={markers}
        level={level}
        label={type.title}
        description={type.description}
      >
        <TextInput
          customValidity={fieldError || ""}
          type="url"
          value={value && value.url}
          readOnly={readOnly || fetchingEmbedCode}
          placeholder={type.placeholder}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          ref={this.setInput}
        />
        <p>
          <strong>Embed code: </strong>{" "}
          {(value && value.embedCode) || "Enter a URL above."}
        </p>
        {error && <div style={{ color: "#e66666" }}>{error.message}</div>}
      </FormField>
    );
  }
}

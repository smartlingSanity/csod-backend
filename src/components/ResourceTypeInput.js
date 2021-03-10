import PropTypes from "prop-types";
import React from "react";
import Fieldset from "part:@sanity/components/fieldsets/default";
import { setIfMissing } from "part:@sanity/form-builder/patch-event";
import { FormBuilderInput } from "part:@sanity/form-builder";
import { withDocument } from "part:@sanity/form-builder";
import client from "part:@sanity/base/client";
import _ from "lodash/fp";

const filterItems = [
  "Article",
  "Brief",
  "Case Study",
  "Datasheet",
  "Infographic",
  "Research",
  "Video",
  "Webinar",
  "Whitepaper",
];

class ResourceTypeInput extends React.PureComponent {
  static propTypes = {
    type: PropTypes.shape({
      title: PropTypes.string,
      name: PropTypes.string,
    }).isRequired,
    level: PropTypes.number,
    value: PropTypes.shape({
      _type: PropTypes.string,
    }),
    focusPath: PropTypes.array.isRequired,
    onFocus: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
  };

  state = {
    resourceTypes: {},
  };

  firstFieldInput = React.createRef();

  componentDidMount() {
    client
      .fetch(
        `//groq
    *[_type=="filterItem" && name in $filterItems]{
      _id,
      name
    }
  `,
        { filterItems }
      )
      .then((result) => {
        this.setState({
          resourceTypes: result.reduce((prev, next) => {
            return { ...prev, [next._id]: next.name };
          }, {}),
        });
      })
      .catch(console.log);
  }

  handleFieldChange = (field, fieldPatchEvent) => {
    const { onChange, type } = this.props;
    onChange(
      fieldPatchEvent
        .prefixAll(field.name)
        .prepend(setIfMissing({ _type: type.name }))
    );
  };

  focus() {
    this.firstFieldInput.current.focus();
  }

  render() {
    const {
      document,
      type,
      value,
      level,
      focusPath,
      onFocus,
      onBlur,
      filterField,
    } = this.props;
    const selectedResourceType = document.resourceType
      ? this.state.resourceTypes[document.resourceType._ref]
      : null;
    const isWebinar = selectedResourceType === "Webinar";
    const isVideo = selectedResourceType === "Video";
    const isDocument = [
      "Brief",
      "Case Study",
      "Datasheet",
      "Infographic",
      "Research",
      "Whitepaper",
    ].includes(selectedResourceType);
    return (
      <div>
        {type.fieldsets.map((fieldset, i) => {
          if (fieldset.single) {
            const { field } = fieldset;
            if (field.type.hidden) {
              return null;
            }
            return (
              <div style={{ marginTop: i === 0 ? 0 : "1.5rem" }}>
                <FormBuilderInput
                  level={level + 1}
                  ref={i === 0 ? this.firstFieldInput : null}
                  key={field.name}
                  type={field.type}
                  value={value && value[field.name]}
                  onChange={(patchEvent) =>
                    this.handleFieldChange(field, patchEvent)
                  }
                  path={[field.name]}
                  focusPath={focusPath}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  filterField={filterField}
                />
              </div>
            );
          } else {
            return (
              <div style={{ marginTop: "1.5rem" }}>
                <Fieldset name={fieldset.name} legend={fieldset.title}>
                  {fieldset.fields
                    .filter((field) => {
                      const isWebinarField = [
                        "eventLink",
                        "eventDate",
                      ].includes(field.name);
                      const isVideoField = ["video"].includes(field.name);
                      const isDocumentField = ["file"].includes(field.name);
                      return isWebinarField
                        ? isWebinar
                        : isVideoField
                        ? isVideo
                        : isDocumentField
                        ? isDocument
                        : true;
                    })
                    .map((field, i) => {
                      return (
                        <div style={{ marginTop: i === 0 ? 0 : "1.5rem" }}>
                          <FormBuilderInput
                            level={level + 1}
                            key={field.name}
                            type={field.type}
                            value={value && value[field.name]}
                            onChange={(patchEvent) =>
                              this.handleFieldChange(field, patchEvent)
                            }
                            path={[field.name]}
                            focusPath={focusPath}
                            onFocus={onFocus}
                            onBlur={onBlur}
                          />
                        </div>
                      );
                    })}
                </Fieldset>
              </div>
            );
          }
        })}
      </div>
    );
  }
}

export default withDocument(ResourceTypeInput);

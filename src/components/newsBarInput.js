import React from 'react' 
import PropTypes from 'prop-types'
import Fieldset from "part:@sanity/components/fieldsets/default";
import { FormBuilderInput } from "part:@sanity/form-builder";
import { setIfMissing } from "part:@sanity/form-builder/patch-event";
import { withDocument } from "part:@sanity/form-builder";

class NewsBarInputType extends React.Component {
  static propTypes = {
    type: PropTypes.shape({
      title: PropTypes.string,
    }).isRequired,
    value: PropTypes.shape({
      _type: PropTypes.string
    }),
    focusPath: PropTypes.array.isRequired,
    onFocus: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired
  };

  firstFieldInput = React.createRef();

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
      onBlur
    } = this.props;
    const selectedNewsBarType = document.newsBarType ? document.newsBarType: null;
    const isLarge = selectedNewsBarType === "large";
    const isSmall = selectedNewsBarType === "small";
    
    return (
      <div>
        {type.fieldsets.map((fieldset, i) => {
          // if there's only one fieldset
          if (fieldset.single) {
            const { field } = fieldset;
            return (
              <div style={{ marginTop: i === 0 ? 0 : "1.5rem" }}>
                <FormBuilderInput
                  level={level + 1}
                  ref={i === 0 ? this.firstFieldInput : null}
                  key={field.name}
                  type={field.type}
                  value={value && value[field.name]}
                  onChange={patchEvent =>
                    this.handleFieldChange(field, patchEvent)
                  }
                  path={[field.name]}
                  focusPath={focusPath}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
              </div>
            );
          } else {
            // loop through fieldsets if there are multiple
            return (
              <Fieldset name={fieldset.name} legend={fieldset.title}>
                {fieldset.fields
                  .filter(field => {
                    const isUnselected = ['newsBarType'].includes(field.name);
                    const isSmallField = ['newsBarType','backgroundColor','heading','link'].includes(field.name);
                    const isLargeField = ['newsBarType','backgroundColor', 'closeText', 'heading','description', 'buttons', 'notificationBarImage'].includes(field.name);
                    if (isSmall) {
                      return isSmallField;
                    } else if (isLarge) {
                      return isLargeField;
                    } else {
                      return isUnselected;
                    }
                  })
                  .map((field,i) => {
                  return (
                    <div style={{ marginTop: i === 0 ? 0 : "1.5rem" }}>
                      <FormBuilderInput
                            level={level + 1}
                            ref={i === 0 ? this.firstFieldInput : null}
                            key={field.name}
                            type={field.type}
                            value={value && value[field.name]}
                            onChange={patchEvent =>
                              this.handleFieldChange(field, patchEvent)
                            }
                            path={[field.name]}
                            focusPath={focusPath}
                            onFocus={onFocus}
                            onBlur={onBlur}
                          />
                    </div>
                  )})
                }
              </Fieldset>
            )
          }
        })}
      </div>
    )
  }
}

export default withDocument(NewsBarInputType);

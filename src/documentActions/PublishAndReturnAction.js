import { useState, useEffect } from 'react';
import { useDocumentOperation } from '@sanity/react-hooks';

/** Publishes documents but redirects the Sanity
 * user back to the page they were editing before * */
export default function PublishAndReturnAction(props) {
  const { publish } = useDocumentOperation(props.id, props.type);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublishAndReturn, setIsPublishAndReturn] = useState(false);

  const { localStorage } = window;

  useEffect(() => {
    // if the isPublishing state was set to true and the draft has changed
    // to become `null` the document has been published
    if (isPublishing && !props.draft) {
      setIsPublishing(false);
    }
  }, [props.draft]);


  useEffect(() => {
    if (localStorage.getItem('returnAfterPublish')) {
      setIsPublishAndReturn(true);
    }
  }, [localStorage.getItem('returnAfterPublish')]);


  const getPublishLabel = () => {
    const publishLabel = {
      justPublish: {
        publishing: 'Publishing…',
        static: 'Publish',
      },
      publishAndReturn: {
        publishing: 'Publishing and Returning ...',
        static: 'Publish and Return to Previous Page',
      },
    };
    const labelType = isPublishAndReturn ? 'publishAndReturn' : 'justPublish';
    return isPublishing
      ? publishLabel[labelType].publishing : publishLabel[labelType].static;
  };


  return {
    disabled: publish.disabled,
    label: getPublishLabel(),
    onHandle: () => {
      setIsPublishing(true);
      publish.execute();
      props.onComplete();

      // add a delay so the user understands what's going on
      setTimeout(() => {
        if (isPublishAndReturn) {
          const returnPage = localStorage.getItem('returnAfterPublish');
          localStorage.removeItem('returnAfterPublish');
          window.location = returnPage;
        }
      }, 1000);
    },
  };
}

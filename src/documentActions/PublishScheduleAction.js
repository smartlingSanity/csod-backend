import { useState, useEffect } from 'react';
import { useDocumentOperation, useValidationStatus } from '@sanity/react-hooks';

export default function PublishScheduleAction(props) {
  const { publish } = useDocumentOperation(props.id, props.type);
  const { markers } = useValidationStatus(props.id, props.type);
  const [isPublishing, setIsPublishing] = useState(false);

  const errorMarkers = markers.filter(marker => marker.level === 'error');

  useEffect(() => {
    if (isPublishing && !props.draft) {
      setIsPublishing(false);
    }
  }, [props.draft, isPublishing]);

  return {
    disabled: publish.disabled || errorMarkers.length > 0,
    label: isPublishing ? 'Scheduling...' : 'Schedule Publish',
    onHandle: () => {
      setIsPublishing(true);
      publish.execute();
      props.onComplete();
    },
  };
}

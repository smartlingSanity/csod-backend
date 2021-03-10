/* eslint-disable import/no-unresolved */
import defaultResolve, {
  DuplicateAction,
  DeleteAction,
  PublishAction,
} from 'part:@sanity/base/document-actions';
import RouteFieldDuplicateAction from './RouteFieldDuplicateAction';
import RouteFieldDeleteAction from './RouteFieldDeleteAction';
import PublishScheduleAction from './PublishScheduleAction';
import PublishAndReturnAction from './PublishAndReturnAction';

const routeFieldDuplicatePageTypes = ['pressReleasePage', 'resourceDetailPage'];
const publishAndReturnPageTypes = ['route', 'customBackground'];

export default function resolveDocumentActions(props) {
  let resolvedActions = defaultResolve(props);
  const { draft } = props;
  if (routeFieldDuplicatePageTypes.includes(props.type)) {
    resolvedActions = resolvedActions.map((action) => {
      if (action === DuplicateAction) {
        return RouteFieldDuplicateAction;
      }
      if (action === DeleteAction) {
        return RouteFieldDeleteAction;
      }
      return action;
    });
  }
  if (draft) {
    const { scheduledPublishTime } = draft;
    if (scheduledPublishTime) {
      resolvedActions = resolvedActions.map((action) => {
        if (action === PublishAction) {
          return PublishScheduleAction;
        }
        return action;
      });
    }
  }

  if (publishAndReturnPageTypes.includes(props.type)) {
    resolvedActions = resolvedActions.map((action) => {
      switch (action) {
        case PublishAction:
          return PublishAndReturnAction;
        default:
          return action;
      }
    });
  }

  return resolvedActions;
}

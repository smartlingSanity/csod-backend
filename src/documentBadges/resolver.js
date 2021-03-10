// import the default document badge resolver
import defaultResolve from 'part:@sanity/base/document-badges';
import LocaleBadge from './LocaleBadge';
import ScheduledDocumentBadge from './ScheduledDocumentBadge';

export default function resolveDocumentBadges(props) {
  return [...defaultResolve(props), ScheduledDocumentBadge, LocaleBadge];
}

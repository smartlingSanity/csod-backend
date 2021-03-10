import { parseISO, format } from 'date-fns';

export default function ScheduledDocumentBadge({ published }) {
  if (published && published.scheduledPublishTime) {
    const formattedPublishTime = format(parseISO(published.scheduledPublishTime.local), 'dd/MM/yyyy - HH:mm');
    return {
      label: 'Scheduled',
      title: `Publishing at: ${formattedPublishTime}`,
      color: 'info',
    };
  }
  return null;
}

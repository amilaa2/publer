import { ChannelFilterPanel } from '../components/inbox/ChannelFilterPanel';
import { MessageList } from '../components/inbox/MessageList';
import { ConversationDetail } from '../components/inbox/ConversationDetail';
import { useUIStore } from '../stores/useUIStore';

export function InboxPage() {
  const inboxMobileView = useUIStore((s) => s.inboxMobileView);

  return (
    <div
      className={`inbox-layout inbox-view-${inboxMobileView}`}
      style={{ display: 'flex', flex: 1, overflow: 'hidden', height: '100%', minHeight: 0, background: 'var(--canvas)' }}
    >
      <ChannelFilterPanel />
      <MessageList />
      <ConversationDetail />
    </div>
  );
}

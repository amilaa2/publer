import { ChannelFilterPanel } from '../components/inbox/ChannelFilterPanel';
import { MessageList } from '../components/inbox/MessageList';
import { ConversationDetail } from '../components/inbox/ConversationDetail';

export function InboxPage() {
  return (
    <div style={{ display: 'flex', flex: 1, overflow: 'hidden', height: '100%', minHeight: 0, background: 'var(--canvas)' }}>
      <ChannelFilterPanel />
      <MessageList />
      <ConversationDetail />
    </div>
  );
}

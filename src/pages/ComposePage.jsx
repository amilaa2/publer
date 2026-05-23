import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ComposerForm } from '../components/compose/ComposerForm';
import { PreviewPane } from '../components/compose/PreviewPane';
import { usePostsStore } from '../stores/usePostsStore';
import { useAccountsStore } from '../stores/useAccountsStore';

const DEFAULT_MEDIA = [
  { id: 'm1', url: 'https://picsum.photos/seed/post1/800/800', thumbnailUrl: 'https://picsum.photos/seed/post1/200/200', type: 'image' },
];

export function ComposePage() {
  const { postId } = useParams();
  const posts = usePostsStore((s) => s.posts);
  const allAccounts = useAccountsStore((s) => s.accounts);
  const accounts = useMemo(
    () => allAccounts.filter((a) => a.connected),
    [allAccounts]
  );

  const initialPost = postId ? posts.find((p) => p.id === postId) : null;

  const defaultAccountIds = useMemo(
    () => initialPost?.accounts ?? accounts.slice(0, 2).map((a) => a.id),
    [initialPost, accounts]
  );

  const [selectedAccountIds, setSelectedAccountIds] = useState(defaultAccountIds);
  const [caption, setCaption] = useState(initialPost?.caption ?? '');
  const [media, setMedia] = useState(
    initialPost?.media?.length ? initialPost.media : DEFAULT_MEDIA
  );
  const [previewPlatform, setPreviewPlatform] = useState(
    initialPost?.platforms?.[0] ?? 'instagram'
  );

  const selectedPlatforms = useMemo(
    () => [...new Set(accounts.filter((a) => selectedAccountIds.includes(a.id)).map((a) => a.platform))],
    [accounts, selectedAccountIds]
  );

  // Derive active preview platform (no useEffect — avoids update loops)
  const activePreviewPlatform = useMemo(() => {
    if (selectedPlatforms.includes(previewPlatform)) return previewPlatform;
    return selectedPlatforms[0] ?? 'instagram';
  }, [selectedPlatforms, previewPlatform]);

  const previewPlatforms = selectedPlatforms.length ? selectedPlatforms : ['instagram'];

  return (
    <div
      key={postId ?? 'new'}
      style={{ display: 'flex', flex: 1, overflow: 'hidden', height: '100%', minHeight: 0 }}
    >
      <ComposerForm
        key={postId ?? 'new'}
        initialPost={initialPost}
        accounts={accounts}
        selectedAccountIds={selectedAccountIds}
        onSelectedAccountIdsChange={setSelectedAccountIds}
        caption={caption}
        onCaptionChange={setCaption}
        media={media}
        onMediaChange={setMedia}
        selectedPlatforms={selectedPlatforms}
      />
      <PreviewPane
        caption={caption}
        media={media}
        selectedPlatforms={previewPlatforms}
        previewPlatform={activePreviewPlatform}
        setPreviewPlatform={setPreviewPlatform}
        accounts={accounts}
      />
    </div>
  );
}

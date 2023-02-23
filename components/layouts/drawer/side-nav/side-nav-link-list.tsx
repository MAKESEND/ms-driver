import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Divider, List } from '@mui/material';

import { inAppLinks } from '~/constants/side-nav-links';
import type { CustomLink } from '~/constants/side-nav-links';

import SideNavSettings from './side-nav-settings';
import SingleLink from './links/single-link';
import NestedLink from './links/nested-link';

const SideNavLinks: React.FC<{ onPath: string } & CustomLink> = (props) => {
  if (props.nested)
    return <NestedLink parentLink={`/${props.id}`} {...props} />;

  if (props.href) return <SingleLink {...props} />;

  return null;
};

export const SideNavLinkList: React.FC = () => {
  const { asPath } = useRouter();
  const { t } = useTranslation('common');
  const [onPath, setOnPath] = useState<string>('');

  useEffect(() => {
    const paths = asPath.split('/');
    setOnPath(() => paths[paths.length - 1]);
  }, [asPath]);

  return (
    <List>
      {Object.values(inAppLinks).map((link) => {
        if (link.id === 'settings') return null;
        return <SideNavLinks key={link.id} {...link} onPath={onPath} />;
      })}
      <Divider />
      <SideNavSettings
        settingsText={t('sideNav.setting')}
        selected={onPath === 'settings'}
      />
    </List>
  );
};

export default SideNavLinkList;

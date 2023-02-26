import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Divider, List } from '@mui/material';

import { inAppLinks } from '~/constants/side-nav-links';
import type { CustomLink } from '~/constants/side-nav-links';

import SideNavSettings from './side-nav-settings';
import SingleLink from './links/single-link';
import NestedLink from './links/nested-link';

const Links = Object.values(inAppLinks).filter(
  (link) => link.id !== 'settings' && link.id !== 'login' && link.id !== 'auth'
);

const SideNavLinks: React.FC<{ onPath: string } & CustomLink> = (props) => {
  if (props.nested)
    return <NestedLink parentLink={`/${props.id}`} {...props} />;

  if (props.href) return <SingleLink {...props} />;

  return null;
};

export const SideNavLinkList: React.FC = () => {
  const { t } = useTranslation('common');
  const settingsText = t('sideNav.setting') ?? 'Settings';

  const { asPath } = useRouter();
  const [onPath, setOnPath] = useState<string>('');

  useEffect(() => {
    const paths = asPath.split('/');
    setOnPath(paths[paths.length - 1]);
  }, [asPath]);

  return (
    <List>
      {Links.map((link) => {
        return <SideNavLinks key={link.id} {...link} onPath={onPath} />;
      })}
      <Divider />
      <SideNavSettings
        settingsText={settingsText}
        selected={onPath === 'settings'}
      />
    </List>
  );
};

export default SideNavLinkList;

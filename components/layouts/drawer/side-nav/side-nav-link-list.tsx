import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Divider, List } from '@mui/material';

import sideNavLinks from '~/constants/sideNavLink';
import type { Link } from '~/constants/sideNavLink';

import SideNavSettings from './side-nav-settings';
import SingleLink from './links/single-link';
import NestedLink from './links/nested-link';

const SideNavLinks: React.FC<Link> = (props) => {
  if (props?.href) return <SingleLink {...props} />;

  if (props.links?.length) return <NestedLink {...props} />;

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
      {sideNavLinks.map((link) => (
        <SideNavLinks key={link.id} {...link} />
      ))}
      <Divider />
      <SideNavSettings
        settingsText={t('sideNav.setting')}
        selected={onPath === 'settings'}
      />
    </List>
  );
};

export default SideNavLinkList;

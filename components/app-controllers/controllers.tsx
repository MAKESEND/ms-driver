import { Modal as GlobalModal } from '~/components/common/modal/generic-modal';
import { Toast as GlobalToast } from '~/components/common/toast/generic-toast';
import { OnlineIndicator } from '~/components/app-controllers/online-indicator';
import { RouteLoader } from '~/components/app-controllers/route-loader';
import { SessionManager } from '~/components/app-controllers/session-manager';

export const AppControllers: React.FC = () => {
  return (
    <>
      <GlobalModal />
      <GlobalToast />
      <OnlineIndicator />
      <RouteLoader />
      <SessionManager />
    </>
  );
};

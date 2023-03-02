import { OnlineIndicator } from '~/components/app-controllers/online-indicator';
import { SessionManager } from '~/components/app-controllers/session-manager';
import { RouteLoader } from '~/components/app-controllers/route-loader';

export const AppControllers: React.FC = () => {
  return (
    <>
      <OnlineIndicator />
      <SessionManager />
      <RouteLoader />
    </>
  );
};

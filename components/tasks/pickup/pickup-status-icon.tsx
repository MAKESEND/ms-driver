import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import DoneIcon from '@mui/icons-material/Done';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

import { ParcelStatus } from '~/constants/parcel';

type PickupStatus = Extract<
  ParcelStatus,
  ParcelStatus.Pending | ParcelStatus.ReadyToPick | ParcelStatus.PickedUp
>;

export const PickupStatusIcon: React.FC<{ status?: PickupStatus }> = ({
  status,
}) => {
  if (status === ParcelStatus.Pending)
    return <DoNotDisturbIcon color='error' />;

  if (status === ParcelStatus.ReadyToPick)
    return (
      <WarehouseIcon sx={{ color: (theme) => theme.palette.common.orange50 }} />
    );

  if (status === ParcelStatus.PickedUp) return <DoneIcon color='success' />;

  return (
    <QuestionMarkIcon sx={{ color: (theme) => theme.palette.common.blue50 }} />
  );
};

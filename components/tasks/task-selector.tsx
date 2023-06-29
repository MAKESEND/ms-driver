import Link from 'next/link';
import { Button, Stack } from '@mui/material';

import { CheckBoxSelector } from '~/components/tasks/selector/checkbox-selector';
import { SelectorFilter } from '~/components/tasks/selector/selector-filter';

import dynamic from 'next/dynamic';
import { TaskTypes } from '~/constants/tasks';
import { useSetRecoilState } from 'recoil';
import { scannerConfigState } from '~/store/scanner';
const QrCodeScannerIcon = dynamic(
  () => import('@mui/icons-material/QrCodeScanner')
);

export interface TaskSelectorProps {
  href?: string;
  disabled?: boolean;
  taskType: `${TaskTypes}`;
}

export const TaskSelector: React.FC<TaskSelectorProps> = ({
  href,
  disabled = false,
  taskType,
}) => {
  const setScannerConfig = useSetRecoilState(scannerConfigState);
  const onClick = () => {
    setScannerConfig((prev) => ({ ...prev, task: taskType, mode: 'bulk' }));
  };

  return (
    <Stack gap={1} flexDirection='row' width='100%'>
      <CheckBoxSelector disabled={disabled} />
      <SelectorFilter disabled={disabled} />
      {href && (
        <Link href={href} passHref legacyBehavior>
          <Button
            size='small'
            variant='outlined'
            disabled={disabled}
            onClick={onClick}
            sx={{ minWidth: 40, height: 40 }}
          >
            <QrCodeScannerIcon />
          </Button>
        </Link>
      )}
    </Stack>
  );
};

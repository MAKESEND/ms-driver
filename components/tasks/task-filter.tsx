import Fuse from 'fuse.js';
import { useTranslation } from 'next-i18next';
import { useState, useEffect, useRef, useMemo } from 'react';
import { CircularProgress } from '@mui/material';

import type { PickupTask, DropoffTask } from '~/types';

import {
  taskKeysToFilter,
  type TaskTypes,
  type PickupFilterOptions,
  type DropoffFilterOptions,
} from '~/constants/tasks';

import { TaskFilterLayout } from '~/components/tasks/filter/task-filter-layout';
import { FilterOptions } from '~/components/tasks/filter/filter-options';

import { useTasks } from '~/providers/tasks-provider';

import dynamic from 'next/dynamic';
const ClearIcon = dynamic(() => import('@mui/icons-material/Clear'));
const TextField = dynamic(() => import('@mui/material/TextField'), {
  ssr: true,
  loading: () => <CircularProgress />,
});

export type DropoffTaskFilterProps = {
  taskType: `${TaskTypes.Dropoff}`;
  filterOptions: typeof DropoffFilterOptions;
  taskPropsToFilter: keyof DropoffTask;
};

export type PickupTaskFilterProps = {
  taskType: `${TaskTypes.Pickup}`;
  filterOptions: typeof PickupFilterOptions;
  taskPropsToFilter: keyof PickupTask;
};

export type TaskFilterProps = DropoffTaskFilterProps | PickupTaskFilterProps;

export const TaskFilter: React.FC<TaskFilterProps & { label?: string }> = ({
  filterOptions,
  label,
  taskType,
  taskPropsToFilter,
}) => {
  const { t } = useTranslation('tasks');
  const inputLabelText = t('label.searchParcel');

  const [allTasks, setFilteredTasks] = useTasks();

  const timerRef = useRef<NodeJS.Timer>();
  const [searchVal, setSearchVal] = useState<string>('');
  const [fusedParcels, setFusedParcels] = useState<typeof allTasks>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  // TODO: configure to return more precise filter output
  const fuse = useMemo(
    () =>
      new Fuse(allTasks, {
        keys: taskKeysToFilter[taskType],
      }),
    [allTasks, taskType]
  );

  useEffect(() => {
    if (!searchVal) {
      setFusedParcels(allTasks);
    } else {
      clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        const result = fuse.search(searchVal);
        const parcels = result.map(({ item }) => item);
        setFusedParcels(parcels);
      }, 300);
    }

    return () => clearTimeout(timerRef.current);
  }, [fuse, allTasks, searchVal]);

  useEffect(() => {
    if (!selectedOptions.length) {
      setFilteredTasks(fusedParcels);
    } else {
      // TODO: redesign data type to allow multiple filters
      const filteredTasks = fusedParcels.filter((task) =>
        selectedOptions.some(
          (Option) => String(Option) === String(task[taskPropsToFilter])
        )
      );
      setFilteredTasks(filteredTasks);
    }
  }, [
    allTasks,
    taskPropsToFilter,
    fusedParcels,
    selectedOptions,
    setFilteredTasks,
  ]);

  const onInputClear = () => setSearchVal('');

  const onInputSearch = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchVal(event.target.value);

  const EndAdornment = searchVal ? <ClearIcon onClick={onInputClear} /> : null;

  return (
    <TaskFilterLayout>
      <TextField
        size='small'
        variant='outlined'
        label={inputLabelText}
        value={searchVal}
        onChange={onInputSearch}
        sx={{ flexGrow: 1 }}
        InputProps={{
          sx: { height: 40 },
          endAdornment: EndAdornment,
        }}
      />
      <FilterOptions
        label={label}
        taskType={taskType}
        filterOptions={filterOptions}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
    </TaskFilterLayout>
  );
};

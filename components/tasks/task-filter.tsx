import Fuse from 'fuse.js';
import { useTranslation } from 'next-i18next';
import { useState, useEffect, useRef, useMemo } from 'react';
import { CircularProgress } from '@mui/material';

import { createOptionStore } from '~/utils/create-option-store';
import { filterTasks } from '~/utils/filter-tasks';

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
  ssr: false,
  loading: () => <CircularProgress />,
});

export type DropoffTaskFilterProps = {
  taskType: `${TaskTypes.Dropoff}`;
  filterOptions: typeof DropoffFilterOptions;
};

export type PickupTaskFilterProps = {
  taskType: `${TaskTypes.Pickup}`;
  filterOptions: typeof PickupFilterOptions;
};

export type TaskFilterProps = DropoffTaskFilterProps | PickupTaskFilterProps;

export const TaskFilter: React.FC<TaskFilterProps> = ({
  filterOptions,
  taskType,
}) => {
  const { t } = useTranslation('tasks');
  const inputLabelText = t('label.searchParcel');

  const [allTasks, setFilteredTasks] = useTasks();

  const timerRef = useRef<NodeJS.Timer>();
  const [searchVal, setSearchVal] = useState<string>('');
  const [disableFilter, setDisableFilter] = useState<boolean>(false);
  const [fusedParcels, setFusedParcels] = useState<typeof allTasks>([]);
  const [selectedOptions, setSelectedOptions] = useState<typeof filterOptions>(
    createOptionStore(filterOptions)
  );

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
    if (Object.values(selectedOptions).every((store) => !store.length)) {
      setFilteredTasks(fusedParcels);
    } else {
      // TODO: execute in web worker
      setDisableFilter(true);
      setFilteredTasks(filterTasks(fusedParcels, selectedOptions));
      setDisableFilter(false);
    }
  }, [allTasks, fusedParcels, selectedOptions, setFilteredTasks]);

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
        disabled={disableFilter}
        filterOptions={filterOptions}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        taskType={taskType}
        scan={false}
      />
    </TaskFilterLayout>
  );
};

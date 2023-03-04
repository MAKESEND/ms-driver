import Fuse from 'fuse.js';
import { useTranslation } from 'next-i18next';
import { useState, useEffect, useRef, useMemo } from 'react';

import { TaskFilterLayout } from '~/components/tasks/filter/task-filter-layout';
import { FilterOptions } from '~/components/tasks/filter/filter-options';

import { useTasks } from '~/providers/tasks-provider';

export interface TaskFilterProps {}

export const TaskFilter = ({}: TaskFilterProps) => {
  const { t } = useTranslation('tasks');

  return <TaskFilterLayout></TaskFilterLayout>;
};

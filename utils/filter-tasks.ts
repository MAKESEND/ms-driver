type Task = Record<string, any>;

type Filter<T> = {
  [K in keyof T]?: T[K][];
};

export const filterTasks = <T extends Task>(
  tasks: T[],
  filters: Filter<T>
): T[] => {
  const filterKeys = Object.keys(filters);

  const filteredTasks = tasks.filter((task) => {
    const matchFilter = filterKeys.every((filterKey) => {
      const taskProperty = task[filterKey];
      const filterOptions = filters[filterKey as keyof T];

      if (filterOptions?.length) {
        // TODO: confirm filter behavior
        // filter only when at least an option is given
        return filterOptions.includes(taskProperty);
      }

      return true;
    });

    return matchFilter;
  });

  return filteredTasks;
};

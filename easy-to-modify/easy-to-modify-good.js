const statusTypes = {
  pending: 'pending',
  done: 'done',
  overdue: 'overdue',
};
const project = {
  name: 'My super project',
  status: statusTypes.pending,
  progress: 0,
  dues: [
    {
      title: 'Landing',
      date: new Date('2021-10'),
      status: statusTypes.done,
    },
    {
      title: 'User Dashboard',
      date: new Date('2021-10'),
      status: statusTypes.pending,
    },
  ],
};

const dueProcess = (due) => {
  const status = due.status !== statusTypes.done && Date.now() > due.date.getTime() ? statusTypes.overdue : due.status;

  return {
    ...due,
    status,
  };
};

const progressCalculate = (dues) => {
  const totalAmount = dues.length;
  const doneAmount = dues.filter((due) => due.status === statusTypes.done).length;

  return (doneAmount * 100) / totalAmount;
};

const selectStatus = (dues) => {
  const duesStatus = dues.map((due) => due.status);

  if (duesStatus.includes(statusTypes.overdue)) {
    return statusTypes.overdue;
  }

  if (duesStatus.includes(statusTypes.pending)) {
    return statusTypes.pending;
  }

  return statusTypes.done;
};

const projectProcess = (project) => {
  const dues = project.dues.map(dueProcess);
  const progress = progressCalculate(dues);
  const status = selectStatus(dues);

  const updatedProject = {
    ...project,
    progress,
    status,
    dues,
  };

  return updatedProject;
};

console.log(projectProcess(project));

module.exports = {};

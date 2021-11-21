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

const projectProcess = (project) => {
  const dues = project.dues.map((due) => {
    const status =
      due.status !== statusTypes.done && Date.now() > due.date.getTime() ? statusTypes.overdue : due.status;

    return {
      ...due,
      status,
    };
  });

  const totalAmount = dues.length;
  const doneAmount = dues.filter((due) => due.status === statusTypes.done).length;
  const progress = (doneAmount * 100) / totalAmount;

  const duesStatus = dues.map((due) => due.status);

  if (duesStatus.includes(statusTypes.overdue)) {
    return {
      ...project,
      progress,
      status: statusTypes.overdue,
      dues,
    };
  }

  if (duesStatus.includes(statusTypes.pending)) {
    return {
      ...project,
      progress,
      status: statusTypes.pending,
      dues,
    };
  }

  return {
    ...project,
    progress,
    status: statusTypes.done,
    dues,
  };
};

console.log(projectProcess(project));

module.exports = {};

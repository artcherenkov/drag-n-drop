const initialData = {
  tasks: {
    'task-1': {id: `task-1`, content: `UI refresh for login screen`},
    'task-2': {id: `task-2`, content: `Help play laptop`},
    'task-3': {id: `task-3`, content: `Skip buying castle`},
    'task-4': {id: `task-4`, content: `Buy distant relatives`},
    'task-5': {id: `task-5`, content: `UI refresh for login screen`},
    'task-6': {id: `task-6`, content: `Help play laptop`},
    'task-7': {id: `task-7`, content: `Skip buying castle`},
    'task-8': {id: `task-8`, content: `Buy distant relatives`},
  },
  columns:  {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4', 'task-5', 'task-6', 'task-7', 'task-8'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In progress',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: [],
    }
  },
  columnOrder: ['column-1', 'column-2', 'column-3']
}


export default initialData;

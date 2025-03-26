import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { PermissionMiddleware } from 'src/middlewares/PermissionMiddleware';
import { useRequests } from 'src/utils/requests';
import { Container } from '@mui/material';

import { Task } from 'src/models/Task';
import TasksTable from 'src/components/TasksTable';

const Tasks = () => {
    const [requestLoading, setRequestLoading] = useState(true);
    const [tasksData, setTasksData] = useState<Task[]>([])

    const { getTasks } = useRequests();

    const handleGetTasks = async () => {
        const response = await getTasks();

        setTasksData(response.data.tasks)
        setRequestLoading(false)
    }

    useEffect(() => {
        handleGetTasks();
    }, [])

    return (
        <PermissionMiddleware codeName='view_task'>
            <>
                <Helmet>
                    <title>Tasks</title>
                </Helmet>

                <PageTitleWrapper>
                    <PageTitle
                        heading="Tasks"
                        subHeading="Consulte as Taskas dos funcionários e execute ações em cada uma delas"
                    />
                </PageTitleWrapper>
            </>

            <Container
                maxWidth="xl"
                sx={{
                    marginX: requestLoading ? '-10%' : 0,
                    transition: 'all .5s'
                }}
            >


                <TasksTable 
                
                refreshList={handleGetTasks}
                tasksList={tasksData}
                
                /> 
            </Container>
        </PermissionMiddleware>
    );
}

export default Tasks;
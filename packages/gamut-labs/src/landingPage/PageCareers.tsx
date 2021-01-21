import { Text } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';

import { Loading } from '../brand/Loading';
import { DepartmentJobs, Title } from './';

const StyledTitle = styled(Title)`
  margin-bottom: 2rem;
`;

const List = styled.ul`
  max-width: 750px;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  margin: 1rem 0 0;
  padding: 0;
`;

export type GreenhouseDepartment = {
  id: number;
  name: string;
};

export type GreenhouseJob = {
  absolute_url: string;
  internal_job_id: string;
  id: number;
  updated_at: string;
  title: string;
  departments: GreenhouseDepartment[];
};

export type GreenhouseResponse = {
  jobs: GreenhouseJob[];
};

export const fetchJobOpenings = async () => {
  const response = await fetch(
    'https://api.greenhouse.io/v1/boards/codeacademy/jobs?content=true'
  );
  return (await response.json()) as GreenhouseResponse;
};

export const PageCareers: React.FC = () => {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>(
    'loading'
  );

  const [greenhouseJobs, setGreenhouseJobs] = useState<GreenhouseJob[]>();

  useEffect(() => {
    fetchJobOpenings()
      .then((response) => {
        setGreenhouseJobs(response?.jobs);
        setStatus('ready');
      })
      .catch((error) => {
        setStatus('error');
      });
  }, []);

  const jobsByDepartment: { [key: string]: GreenhouseJob[] } = {};

  if (status === 'ready') {
    greenhouseJobs?.forEach((job) => {
      const dept = job.departments[0].name;

      if (!jobsByDepartment[dept]) {
        jobsByDepartment[dept] = [];
      }
      jobsByDepartment[dept].push(job);
    });
  }

  return (
    <div>
      <StyledTitle>Open Positions</StyledTitle>
      {status === 'loading' && <Loading />}
      {status === 'error' && (
        <Text>
          We had some trouble loading this content. Please refresh your browser
          or try again later.
        </Text>
      )}
      {status === 'ready' && (
        <List>
          {Object.entries(jobsByDepartment).map(([dept, jobs]) => (
            <ListItem key={dept}>
              <DepartmentJobs dept={dept} jobs={jobs} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

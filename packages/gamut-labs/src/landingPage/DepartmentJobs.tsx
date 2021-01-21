import { AccordionArea, AccordionButton, Anchor } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React, { useState } from 'react';

import { Text } from '../experimental/Text';
import { GreenhouseJob } from './';

const AccordionTitle = styled(AccordionButton)`
  text-align: left;
  font-weight: normal;
  padding: 0;
`;

const HeaderText = styled(Text)`
  font-weight: 700;
`;

const StyledAnchor = styled(Anchor)`
  text-decoration: none;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  margin: 0.5rem 0;
  padding: 0;
`;

export type DepartmentJobsProps = {
  dept: string;
  jobs: Array<GreenhouseJob>;
};

export const DepartmentJobs: React.FC<DepartmentJobsProps> = ({
  dept,
  jobs,
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <AccordionArea
      expanded={expanded}
      top={
        <AccordionTitle
          expanded={expanded}
          onClick={() => setExpanded((state) => !state)}
        >
          <HeaderText as="h3" fontSize={{ xs: 22, lg: 26 }}>
            {dept}
          </HeaderText>
          {`${jobs.length} open position${jobs.length !== 1 ? 's' : ''}`}
        </AccordionTitle>
      }
    >
      <List>
        {jobs.map((job) => (
          <ListItem key={job.id}>
            <StyledAnchor href={job.absolute_url}>{job.title}</StyledAnchor>
          </ListItem>
        ))}
      </List>
    </AccordionArea>
  );
};

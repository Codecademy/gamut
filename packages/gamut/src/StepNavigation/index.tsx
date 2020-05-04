import React from 'react';
import styles from './styles.scss';
import { ChevronRightIcon } from '@codecademy/gamut';

type StepNavigationProps = {
  steps: string[];
  currentStep: string;
  onStepClick: (step: string) => void;
};

const isVisited = (steps: string[], step: string, currentStep: string) => {
  return steps.indexOf(step) < steps.indexOf(currentStep);
};

const getClassName = (steps: string[], step: string, currentStep: string) => {
  if (isVisited(steps, step, currentStep)) {
    return styles.visited;
  } else if (currentStep === step) {
    return styles.current;
  } else {
    return styles.remaining;
  }
};

const isLastStep = (steps: string[], index: number) => {
  return steps.length - 1 === index;
};

const StepNavigation: React.FC<StepNavigationProps> = props => {
  return (
    <nav className={styles.wrapper} data-testid="stepNavigation">
      <ol>
        {props.steps.map((step, index) => {
          return (
            <li key={step}>
              <button
                data-testid={`${step.toLowerCase()}-nav`}
                className={getClassName(props.steps, step, props.currentStep)}
                disabled={!isVisited(props.steps, step, props.currentStep)}
                onClick={() => props.onStepClick(step)}
                type="button"
              >
                {step}
              </button>
              {!isLastStep(props.steps, index) && (
                <ChevronRightIcon className={styles.chevron} width=".8rem" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default StepNavigation;

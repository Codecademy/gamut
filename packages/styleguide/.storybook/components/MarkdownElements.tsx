import { css, styled } from '@storybook/theming';

export const Code = styled.code(
  (props) => css`
    font-family: ${props.theme.fontCode};
    max-width: 100%;
    overflow-x: auto;
    line-height: 1;
    padding: 5px 7px 1px;
    white-space: nowrap;
    border-radius: 3px;
    font-size: 13px;
    border: 1px solid #eeeeee;
    color: rgba(51, 51, 51, 0.8);
    background-color: #f8f8f8;
    display: inline-block;
    overflow-x: scroll;

    ::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }

    ::-webkit-scrollbar-thumb {
      background: #eeeeee;
    }

    ::-webkit-scrollbar-track {
      background: transparent;
    }
  `
);

import styled from '@emotion/styled';

export const ButtonBase = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  display: inline-block;
  font-family: inherit;
  line-height: normal;
  margin: 0;

  padding: 0;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  white-space: nowrap;

  &:active,
  &:focus {
    // Normally, we would *never* disable outlines: they're required for accessibility!
    // ButtonBase consumers should generally provide their own active styles.
    // Make sure you've talked to a designer if you
    outline: none;
  }
`;

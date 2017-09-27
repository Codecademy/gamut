import React from 'react';
import id from '@codecademy/identity';

const infoOptions = {
  inline: true,
  source: false,
  propTables: false
};

const parseCamelCase = (string) => {
  return string.replace(/([a-zA-Z])(?=[A-Z0-9])/g, '$1-').toLowerCase();
};

const containerStyles = {
  display: 'inline-block',
  marginBottom: '1rem',
  marginRight: '1rem'
};

const headerStyles = {
  fontSize: '22px',
  fontWeight: '400',
  margin: '0 0 10px 0',
  padding: '0'
};

const getSassVariableName = (variablePrefix, variableSuffix) => {
  if (variablePrefix) {
    return `$swatches-${parseCamelCase(variablePrefix)}-${parseCamelCase(variableSuffix)}`;
  }
  return `$color-${parseCamelCase(variableSuffix)}`;
};

const renderSwatch = (data, variablePrefix) => {
  return Object.keys(data).map((variableSuffix) => {
    const swatchStyles = {
      backgroundColor: data[variableSuffix],
      height: '160px',
      margin: '10px 0',
      width: '160px'
    };
    const sassVariableName = getSassVariableName(variablePrefix, variableSuffix);
    return (
      <div style={containerStyles} key={sassVariableName}>
        <div style={swatchStyles} />
        <span style={{fontSize: '13px'}}>
          {sassVariableName}<br />
          {data[variableSuffix]}
        </span>
      </div>
    );
  });
};

export default {
  title: 'Colors',
  story: () => (
    <div>
      <h3>Basic Colors</h3>
      <div>
        {renderSwatch(id.color)}
      </div>
      <div>
        {Object.keys(id.swatches).map((color) => {
          if (['basic', 'code'].includes(color)) return null;
          return (
            <div>
              <h2 style={headerStyles}>{parseCamelCase(color)}</h2>
              {renderSwatch(id.swatches[color], color)}
            </div>
          );
        })}
      </div>
      <h3>Editor Colors</h3>
      {renderSwatch(id.swatches.code, 'code')}
    </div>
  ),
  options: infoOptions
  // editor: {
  //   title: 'Colors: Editor',
  //   story: () => (
  //     <div>
  //       {renderSwatch(id.swatches.code, 'code')}
  //     </div>
  //   ),
  //   options: infoOptions
  // }
};

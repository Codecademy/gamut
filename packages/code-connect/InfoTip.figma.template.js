// url=https://www.figma.com/design/ReGfRNillGABAj5SlITalN/%F0%9F%93%90-Gamut?node-id=36743-20136

const figma = require('figma')

const instance = figma.selectedInstance

const emphasis = instance.getEnum('emphasis', {
  low: 'low',
  high: 'high',
})

const alignmentInstance = instance.findInstance('.infotip-alignment')
const alignment = alignmentInstance.getEnum('alignment', {
  'top-left': 'top-left',
  'top-right': 'top-right',
  'bottom-left': 'bottom-left',
  'bottom-right': 'bottom-right',
})

// const tipInfo = alignmentInstance.findInstance('tip')
// Try different approaches to find the tip layer:

// Option 1: Look for text content directly on the main instance
const info1 = instance.getString('info')

// Option 2: Look for text layer with different names
const info2 = instance.findText('tip')
const info3 = instance.findText('info')
const info4 = instance.findText('✏️info tip')

// Option 3: Look within the alignment instance
const info5 = alignmentInstance.findText('tip')
const info6 = alignmentInstance.findText('info')

// Use one of these that works:
const info = info1 || info2?.textContent || info3?.textContent || info4?.textContent || info5?.textContent || info6?.textContent || 'Info content'

export default {
  example: figma.code`
    <InfoTip
      emphasis={${emphasis}}
      alignment={${alignment}}
      info1={${info1}}
      info2={${info2}}
      info3={${info3}}
      info4={${info4}}
      info5={${info5}}
      info6={${info6}}
    />
  `,
  id: 'InfoTip',
  metadata: {
    nestable: true
  }
}

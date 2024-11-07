import {
  AccordionAreaDeprecated,
  AccordionButtonDeprecated,
} from '@codecademy/gamut';
import React from "react";

const AccordionDeprecatedTop: React.FC<typeof AccordionButtonDeprecated> = () => {
  return (
    <AccordionButtonDeprecated expanded>
      Click me!
    </AccordionButtonDeprecated>
  )
}

export const AccordionAreaDeprecatedExample1: React.FC<typeof AccordionAreaDeprecated> = () => {
  return (
    <AccordionAreaDeprecated top="hi">
      Hidden treasure!
    </AccordionAreaDeprecated>
  );
}


// <Canvas>
//   <Story
//     name="AccordionAreaDeprecated"
//     args={{
//       expanded: true,
//       top: (
//         <AccordionButtonDeprecated expanded>
//           Click me!
//         </AccordionButtonDeprecated>
//       ),
//     }}
//   >
//     {(args) => <AccordionAreaDeprecated {...args} />}
//   </Story>
// </Canvas>


export const AccordionAreaDeprecatedExample = () => {
  return (
    <AccordionAreaDeprecated top={AccordionDeprecatedTop}>
      Hidden treasure!
    </AccordionAreaDeprecated>
  );
}

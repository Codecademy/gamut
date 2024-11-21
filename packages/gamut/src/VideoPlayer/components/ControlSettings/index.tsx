import { GearIcon } from "@codecademy/gamut-icons";
import { coreTheme, GamutProvider } from "@codecademy/gamut-styles";
import { useRef, useState } from "react";
import { IconButton } from "../../../Button";
import { Popover } from "../../../Popover";

export const ControlSettings: React.FC<any> = ({ text, player, ...props }) => {
    const [show, setShow] = useState(false);
    const target = useRef<HTMLButtonElement>(null);
    return (
      <GamutProvider theme={coreTheme} useCache useGlobals>
        <div style={{
          height: '100%', 
          position: 'relative'
        }}>
          <IconButton
            // variant="secondary"
            size="small"
            ref={target} 
            onClick={() => setShow(!show)}
            icon={GearIcon}
            tip="Open Settings"
          />
          <Popover onRequestClose={() => {setShow(false)}} isOpen={show} targetRef={target} align='left' position='above'>
            <>
              Settings
            </>
          </Popover>
        </div>
      </GamutProvider>
    )
  }

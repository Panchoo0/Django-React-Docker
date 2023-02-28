import { createGlobalStyle } from 'styled-components';
import { THEMES } from "../../utils/config"

export const GlobalStylesLight = createGlobalStyle`
  html {
    --color-body: ${props => props.theme.beige};
    --color-sidebar: ${props => props.theme.verdePalido};
    --color-text: ${props => props.theme.earth};
    --color-sage: ${props => props.theme.sage};
    --color-natuer: ${props => props.theme.nature};
  }
 
`;

export const GlobalStylesDark = createGlobalStyle`
  html {
    --color-body: ${props => props.theme.beige};
    --color-sidebar: ${props => props.theme.verdePalido};
    --color-text: ${props => props.theme.earth};
    --color-sage: ${props => props.theme.sage};
    --color-natuer: ${props => props.theme.nature};

  }
 
`;


export const GlobalStyles = ({open}) => {

    return (<>
      {open ?
        <GlobalStylesLight theme={THEMES}/> : <GlobalStylesDark theme={THEMES}/>
      }

    </>)

}
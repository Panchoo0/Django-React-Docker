import { createGlobalStyle } from 'styled-components';
import { THEMES } from "../../utils/config"

export const GlobalStylesLight = createGlobalStyle`
  html {
    --color-body: ${props => props.theme.nature};
    --color-sidebar: ${props => props.theme.verdePalido};
    --color-text: ${props => props.theme.earth};
    --color-border: ${props => props.theme.earth};
    --color-contrastText: ${props => props.theme.crema};
    --color-component: ${props => props.theme.nature};
    --color-filledButton: ${props => props.theme.sage};
    --color-icons: ${props => props.theme.greys.black};
    --color-hover:  ${props => props.theme.nature};
    --color-selectedButtonText: ${props => props.theme.earth};
    --color-unSelectedButtonText: ${props => props.theme.crema};
    --color-boxShadow : ${props => props.theme.earth};
  }
 
`;

export const GlobalStylesDark = createGlobalStyle`
  html {
    --color-body: ${props => props.theme.greys.lightBlack};
    --color-sidebar: ${props => props.theme.greys.darkGrey};
    --color-text: ${props => props.theme.crema};
    --color-border: ${props => props.theme.crema};
    --color-contrastText: ${props => props.theme.crema};
    --color-component: ${props => props.theme.greys.darkGrey};
    --color-filledButton: ${props => props.theme.salmon};
    --color-icons: ${props => props.theme.crema};
    --color-hover:  ${props => props.theme.salmon};
    --color-selectedButtonText: ${props => props.theme.crema};
    --color-unSelectedButtonText: ${props => props.theme.greys.lighterGrey};
    --color-boxShadow : ${props => props.theme.greys.midGrey};
    --color-edit: ${props => props.theme.azul};
    --color-delete: ${props => props.theme.red};
    --color-hover2: ${props => props.theme.verde};
    --color-submit: ${props => props.theme.nature};

  }
 
`;


export const GlobalStyles = ({darkMode}) => {

    return (<>
      {!darkMode ?
        <GlobalStylesLight theme={THEMES}/> : <GlobalStylesDark theme={THEMES}/>
      }

    </>)

}
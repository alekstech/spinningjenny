import { createMuiTheme } from 'material-ui/styles'

const theme = createMuiTheme({
	'typography': {
		htmlFontSize: 'calc(16px + 6 * ((100vw - 320px) / 1200))'
	}
})

export default theme
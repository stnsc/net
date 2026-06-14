import GridBackground from './components/GridBackground'
import ViewportBorder from './components/ViewportBorder'
import { useGridLogo } from './hooks/useGridLogo'

function App() {
  const [groups, setText] = useGridLogo([
    { id: 'logo', x: 2, y: 2 },
    { id: 'nav',  x: 2, y: 5 },
  ])

  return (
    <>
      <ViewportBorder />
      <GridBackground
        groups={groups}
        onLogoClick={(id, col, row) => console.log('clicked:', id, '| col:', col, 'row:', row)}
      />
    </>
  )
}

export default App

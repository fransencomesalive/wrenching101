import fs from 'fs'
import path from 'path'
import BikeGeometryClient from './BikeGeometryClient'

export default function BikeGeometryDiagram() {
  const svg = fs.readFileSync(
    path.join(process.cwd(), 'public/diagrams/BikeGeo-chart.svg'),
    'utf-8'
  )
  return <BikeGeometryClient svgMarkup={svg} />
}

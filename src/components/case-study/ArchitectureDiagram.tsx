import type {
  ArchitectureDiagram as DiagramData,
  DiagramNode,
} from '../../data/types'
import './ArchitectureDiagram.css'

function Node({ node }: { node: DiagramNode }) {
  return (
    <>
      <div className="diagram__node">
        <span className="diagram__label">{node.label}</span>
        {node.note && <span className="diagram__note">{node.note}</span>}
      </div>
      {node.children && (
        <ul className="diagram__branches">
          {node.children.map((child) => (
            <li key={child.label}>
              <Node node={child} />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

/** A simple top-to-bottom flow built from semantic lists (no images). */
export function ArchitectureDiagram({ diagram }: { diagram: DiagramData }) {
  return (
    <figure className="diagram">
      <figcaption className="diagram__title">{diagram.title}</figcaption>
      <p className="visually-hidden">{diagram.description}</p>
      <ol className="diagram__flow">
        {diagram.flow.map((node) => (
          <li key={node.label} className="diagram__step">
            <Node node={node} />
          </li>
        ))}
      </ol>
    </figure>
  )
}

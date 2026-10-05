import type { ImageAsset } from '../data/types'
import './Media.css'

interface MediaProps {
  image?: ImageAsset
  /** Faint caption for the empty state, shown until an image exists. */
  label?: string
  /** Applied to the wrapper; use it to size and filter the slot. */
  className?: string
}

/** Fills its container with an image, or an intentional tile until one exists. */
export function Media({ image, label, className = '' }: MediaProps) {
  return (
    <div className={`media ${className}`.trim()}>
      {image ? (
        <img className="media__img" src={image.src} alt={image.alt} loading="lazy" />
      ) : (
        <div className="media__empty" aria-hidden="true">
          {label && <span className="media__label">{label}</span>}
        </div>
      )}
    </div>
  )
}

import type { ImageAsset } from '../data/types'
import './Media.css'

interface MediaProps {
  image?: ImageAsset
  /** Faint caption for the empty state, shown until an image exists. */
  label?: string
  /** Load immediately (above the fold) instead of lazily. */
  priority?: boolean
  /** Applied to the wrapper; use it to size and filter the slot. */
  className?: string
}

/** Fills its container with an image, or an intentional tile until one exists. */
export function Media({ image, label, priority = false, className = '' }: MediaProps) {
  return (
    <div className={`media ${className}`.trim()}>
      {image ? (
        <img
          className="media__img"
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
        />
      ) : (
        <div className="media__empty" aria-hidden="true">
          {label && <span className="media__label">{label}</span>}
        </div>
      )}
    </div>
  )
}

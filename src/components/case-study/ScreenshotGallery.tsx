import { useEffect, useRef, useState } from 'react'
import type { ImageAsset } from '../../data/types'
import './ScreenshotGallery.css'

interface ScreenshotGalleryProps {
  images: ImageAsset[]
  /** Used in the accessible names of the gallery controls. */
  projectName: string
}

/** Responsive grid with a keyboard-accessible lightbox built on <dialog>. */
export function ScreenshotGallery({ images, projectName }: ScreenshotGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const open = activeIndex !== null

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  const active = activeIndex === null ? undefined : images[activeIndex]
  const step = (delta: number) =>
    setActiveIndex((index) =>
      index === null ? index : (index + delta + images.length) % images.length,
    )

  return (
    <>
      <ul className="gallery">
        {images.map((image, index) => (
          <li key={image.src}>
            <button
              type="button"
              className="gallery__thumb"
              onClick={() => setActiveIndex(index)}
              aria-label={`Enlarge screenshot ${index + 1} of ${images.length}: ${image.caption ?? projectName}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading="lazy"
                decoding="async"
              />
            </button>
            {image.caption && <p className="gallery__caption">{image.caption}</p>}
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label={`${projectName} screenshots`}
        onClose={() => setActiveIndex(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setActiveIndex(null)
        }}
        onKeyDown={(event) => {
          if (images.length < 2) return
          if (event.key === 'ArrowRight') step(1)
          if (event.key === 'ArrowLeft') step(-1)
        }}
      >
        {active && (
          <figure className="lightbox__figure">
            <img src={active.src} alt={active.alt} className="lightbox__img" />
            <figcaption className="lightbox__caption">
              {active.caption} ({(activeIndex ?? 0) + 1} of {images.length})
            </figcaption>
          </figure>
        )}
        <div className="lightbox__controls">
          {images.length > 1 && (
            <>
              <button type="button" className="lightbox__btn" onClick={() => step(-1)}>
                Previous
              </button>
              <button type="button" className="lightbox__btn" onClick={() => step(1)}>
                Next
              </button>
            </>
          )}
          <button
            type="button"
            className="lightbox__btn lightbox__btn--close"
            onClick={() => setActiveIndex(null)}
          >
            Close
          </button>
        </div>
      </dialog>
    </>
  )
}

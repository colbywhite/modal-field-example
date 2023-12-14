import { forwardRef, type PropsWithChildren } from 'react'

const Dialog = forwardRef<HTMLDialogElement, PropsWithChildren>(
  ({ children }, ref) => {
    return (
      <dialog className="modal bg-base-300 bg-opacity-60" ref={ref}>
        <div className="modal-box border border-primary">{children}</div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    )
  }
)

export default Dialog

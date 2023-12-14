import type { MutableRefObject, PropsWithChildren } from 'react'

const Dialog = ({
  dialogRef,
  children,
}: PropsWithChildren<{ dialogRef: MutableRefObject<HTMLDialogElement> }>) => {
  return (
    <dialog className="modal bg-base-300 bg-opacity-60" ref={dialogRef}>
      <div className="modal-box border border-primary">{children}</div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
}

export default Dialog

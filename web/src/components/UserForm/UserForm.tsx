import { useRef, useState } from 'react'

import {
  EmailField,
  FieldError,
  Form,
  InputField,
  Submit,
  useForm,
} from '@redwoodjs/forms'

import Dialog from 'src/components/Dialog/Dialog'
import NameForm, { type Name } from 'src/components/NameForm/NameForm'

type User = {
  email: string
  name: Name
}

export type SubmitUserFunction = (user: User) => Promise<void>

const UserForm = ({ onSubmit }: { onSubmit: SubmitUserFunction }) => {
  const dialogRef = useRef<HTMLDialogElement>()
  const [loading, setLoading] = useState(false)
  const formMethods = useForm<User>()
  const value = formMethods.watch()
  const wrappedOnSubmit: SubmitUserFunction = async (user) => {
    setLoading(true)
    return onSubmit(user).finally(() => {
      formMethods.reset()
      setLoading(false)
    })
  }
  return (
    <>
      <h3>Create user form</h3>
      <Form
        className="mx-auto w-fit"
        onSubmit={wrappedOnSubmit}
        formMethods={formMethods}
      >
        <div className="form-control">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="label">
            <span className="label-text mr-2 w-32">Email</span>
            <EmailField
              name="email"
              disabled={loading}
              className="input input-bordered input-secondary w-full max-w-xs"
              errorClassName="input input-bordered input-secondary w-full max-w-xs input-error"
              validation={{ required: true }}
            />
          </label>
          <FieldError
            name="email"
            className="my-1 rounded border border-error-content bg-error p-1 text-sm italic text-error-content"
          />
        </div>

        <div className="form-control">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="label">
            <span className="label-text mr-2 w-32">First name</span>
            <InputField
              name="name.first"
              disabled={true}
              className="input input-bordered input-secondary w-full max-w-xs"
              errorClassName="input input-bordered input-secondary w-full max-w-xs input-error"
              validation={{ required: true }}
            />
          </label>
        </div>

        <div className="form-control">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="label">
            <span className="label-text mr-2 w-32">Last name</span>
            <InputField
              name="name.last"
              disabled={true}
              className="input input-bordered input-secondary w-full max-w-xs"
              errorClassName="input input-bordered input-secondary w-full max-w-xs input-error"
              validation={{ required: true }}
            />
          </label>
        </div>

        <div className="form-control">
          <button
            type="button"
            disabled={loading}
            className="btn btn-accent"
            onClick={() => dialogRef.current.show()}
          >
            Create name
          </button>
        </div>

        <div className="form-control mt-4">
          <Submit disabled={loading} className="btn btn-primary">
            Create user
          </Submit>
        </div>
      </Form>
      <h3>Current state</h3>
      <pre>
        <code>{JSON.stringify(value, null, 2)}</code>
      </pre>
      <Dialog ref={dialogRef}>
        <NameForm
          onSubmit={async (name) => {
            formMethods.setValue('name', name)
            dialogRef.current.close()
          }}
        />
      </Dialog>
    </>
  )
}

export default UserForm

import { useState } from 'react'

import { FieldError, Form, Submit, TextField, useForm } from '@redwoodjs/forms'

export type Name = {
  first: string
  last: string
}
export type SubmitNameFunction = (name: Name) => Promise<void>

const NameForm = ({ onSubmit }: { onSubmit: SubmitNameFunction }) => {
  const [loading, setLoading] = useState(false)
  const formMethods = useForm<Name>()
  const value = formMethods.watch()
  const wrappedOnSubmit: SubmitNameFunction = async (user) => {
    setLoading(true)
    return onSubmit(user).finally(() => {
      formMethods.reset()
      setLoading(false)
    })
  }
  return (
    <>
      <h3>Create user name via modal</h3>
      <Form
        className="mx-auto w-fit"
        onSubmit={wrappedOnSubmit}
        formMethods={formMethods}
      >
        <div className="form-control">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="label">
            <span className="label-text mr-2 w-32">First</span>
            <TextField
              name="first"
              disabled={loading}
              className="input input-bordered input-secondary w-full max-w-xs"
              errorClassName="input input-bordered input-secondary w-full max-w-xs input-error"
              validation={{ required: true }}
            />
          </label>
          <FieldError
            name="first"
            className="my-1 rounded border border-error-content bg-error p-1 text-sm italic text-error-content"
          />

          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="label">
            <span className="label-text mr-2 w-32">Last</span>
            <TextField
              name="last"
              disabled={loading}
              className="input input-bordered input-secondary w-full max-w-xs"
              errorClassName="input input-bordered input-secondary w-full max-w-xs input-error"
              validation={{ required: true }}
            />
          </label>
          <FieldError
            name="last"
            className="my-1 rounded border border-error-content bg-error p-1 text-sm italic text-error-content"
          />

          <div className="form-control mt-4">
            <Submit disabled={loading} className="btn btn-primary">
              Submit
            </Submit>
          </div>
        </div>
      </Form>
      <h3>Current state</h3>
      <pre>
        <code>{JSON.stringify(value, null, 2)}</code>
      </pre>
    </>
  )
}

export default NameForm

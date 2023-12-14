import { useState } from 'react'

import { EmailField, FieldError, Form, Submit, useForm } from '@redwoodjs/forms'

type User = {
  email: string
}

export type SubmitUserFunction = (user: User) => Promise<void>

const UserForm = ({ onSubmit }: { onSubmit: SubmitUserFunction }) => {
  const [loading, setLoading] = useState(false)
  const wrappedOnSubmit: SubmitUserFunction = async (user) => {
    setLoading(true)
    return onSubmit(user).finally(() => setLoading(false))
  }
  const formMethods = useForm<User>()
  const value = formMethods.watch()
  return (
    <>
      <h3>Form</h3>
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

export default UserForm

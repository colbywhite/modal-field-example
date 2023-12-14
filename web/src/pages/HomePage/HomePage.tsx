import { MetaTags } from '@redwoodjs/web'
import { Toaster, toast } from '@redwoodjs/web/toast'

import { RedwoodSplashLayout } from 'src/components/RedwoodSplashLayout/RedwoodSplashLayout'
import UserForm, {
  type SubmitUserFunction,
} from 'src/components/UserForm/UserForm'

const HomePage = () => {
  const submitEntity: SubmitUserFunction = (_) => {
    return toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
      loading: 'Pretending to create an entity',
      success: 'Entity created',
      error: 'Entity creation failed',
    })
  }
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <RedwoodSplashLayout>
        <p>
          This is an attempt to recreate the bug from{' '}
          <a href="https://github.com/redwoodjs/redwood/issues/9143">
            {' '}
            redwoodjs/redwood#9143{' '}
          </a>
          .
        </p>
        <UserForm onSubmit={submitEntity} />
        <Toaster />
      </RedwoodSplashLayout>
    </>
  )
}

export default HomePage
